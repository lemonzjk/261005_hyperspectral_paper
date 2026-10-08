"""Extract dotted-leader IEEE proceedings titles and retain conservative audit links.

First run pdftotext -layout INPUT.pdf OUTPUT.txt. This parser expects titles at
column zero and indented author rows, and fails rather than dropping fragments.
It creates a resumable title inventory; it does not screen papers or infer DOIs.
"""
import argparse
import json
from pathlib import Path
import re
import unicodedata

ROOT = Path(__file__).resolve().parents[2]


def normalize(title):
    ascii_title = unicodedata.normalize('NFKD', title).encode('ascii', 'ignore').decode()
    return re.sub('[^a-z0-9]', '', ascii_title.lower())


def extract(text, first_page):
    entries, fragments, current = [], [], None
    for page_number, page in enumerate(text.split('\f'), 1):
        if page_number < first_page:
            continue
        for line in page.splitlines():
            if not line.strip() or line.strip() in ['TABLE OF CONTENTS', 'Author Index']:
                continue
            if line.startswith(' '):
                if current is None or fragments:
                    raise ValueError(f'Unexpected indented row on PDF page {page_number}')
                current['authorsFromToc'] += ' ' + line.strip()
                continue
            match = re.match(r'^(.*?)\.{3,}\s*(\d+)\s*$', line)
            if match:
                current = {'title': ' '.join(fragments + [match[1].strip()]),
                           'startPage': int(match[2]), 'tocPdfPage': page_number,
                           'authorsFromToc': ''}
                entries.append(current)
                fragments = []
            else:
                fragments.append(line.strip())
    if fragments:
        raise ValueError(f'Unparsed title fragments: {fragments}')
    if len(entries) != len({x['startPage'] for x in entries}):
        raise ValueError('Duplicate proceedings start pages')
    if len(entries) != len({normalize(x['title']) for x in entries}):
        raise ValueError('Duplicate normalized titles')
    for order, item in enumerate(entries, 1):
        item['authorsFromToc'] = item['authorsFromToc'].strip()
        if not item['authorsFromToc']:
            raise ValueError(f'Missing authors for entry {order}')
        item['order'] = order
    return entries


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('text_file', type=Path)
    parser.add_argument('--first-toc-page', type=int, default=3)
    parser.add_argument('--venue', required=True)
    parser.add_argument('--year', type=int, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    entries = extract(args.text_file.read_text(), args.first_toc_page)
    catalog = json.loads((ROOT / 'src/data/catalog.json').read_text())
    survey = json.loads((ROOT / 'research/hyperspectral/survey.json').read_text())
    for item in entries:
        title = normalize(item['title'])
        item['catalogPaperIds'] = [p['id'] for p in catalog['papers']
                                   if p['year'] == args.year and p['venue'] == args.venue
                                   and normalize(p['title']) == title]
        item['trackedDecisions'] = [
            {'decision': p['decision'], 'searchId': p['searchId'],
             'doi': p.get('doi'), 'reason': p.get('reason')}
            for p in survey['candidates']
            if p.get('year') == args.year and p.get('venue') == args.venue
            and normalize(p.get('title', '')) == title]
        item['auditStatus'] = ('catalog_title_linked' if item['catalogPaperIds'] else
                               'tracked_decision' if item['trackedDecisions'] else 'unreviewed')
    args.output.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n')
    print(f'Extracted {len(entries)} title entries; screening remains separate.')


if __name__ == '__main__':
    main()
