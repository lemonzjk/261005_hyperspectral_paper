"""Record curated research entries one at a time from a JSON object or array on stdin."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / 'src/data/catalog.json'
SURVEY = ROOT / 'research/survey.json'
entries = json.load(sys.stdin)
if isinstance(entries, dict):
    entries = [entries]
for entry in entries:
    catalog = json.loads(CATALOG.read_text())
    entry.setdefault('verifiedAt', '2026-10-06')
    entry.setdefault('verificationLevel', 'official_abstract')
    entry.setdefault('publicationStatus', 'published')
    entry.setdefault('venueTier', 'target')
    if 'citation' not in entry:
        kind = 'article' if entry['venue'] in ['TPAMI', 'IJCV', 'TIP', 'TOG', 'TGRS', 'ISPRS JPRS', 'RSE', 'PR', 'Nature Photonics', 'Nature Communications', 'Nature Methods', 'Science China Information Sciences', 'Optica', 'Photonics Research', 'Light: Science & Applications', 'Information Fusion'] else 'inproceedings'
        fields = {'title': entry['title'], 'author': entry['authors'].replace(', ', ' and '),
                  'year': str(entry['year']), 'journal' if kind == 'article' else 'booktitle': entry.get('publicationName', entry['venue']),
                  'url': entry['paper']}
        if entry.get('doi'):
            fields['doi'] = entry['doi']
        entry['citation'] = '@' + kind + '{' + entry['id'].replace('-', '') + ',\n' + ',\n'.join('  ' + k + '={' + v + '}' for k, v in fields.items()) + '\n}'
    for key in ['id', 'shortTitle', 'title', 'authors', 'year', 'venue', 'track', 'representation', 'scope', 'tags', 'summary', 'input', 'output', 'mechanism', 'readingNote', 'paper']:
        if key not in entry:
            raise ValueError(f'Missing {key}')
    existing = next((p for p in catalog['papers'] if p['id'] == entry['id']), None)
    if existing:
        existing.update(entry)
    else:
        if any(p['title'].casefold() == entry['title'].casefold() for p in catalog['papers']):
            raise ValueError(f'Duplicate title: {entry["title"]}')
        catalog['papers'].append(entry)
    catalog['updatedAt'] = '2026-10-06'
    CATALOG.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n')
    survey = json.loads(SURVEY.read_text())
    candidate = next((p for p in survey['candidates'] if p['title'] == entry['title']), None)
    record = {'title': entry['title'], 'paperId': entry['id'], 'year': entry['year'],
              'venue': entry['venue'], 'url': entry['paper'], 'status': 'included',
              'verificationLevel': entry['verificationLevel']}
    if candidate:
        candidate.update(record)
    else:
        survey['candidates'].append(record)
    SURVEY.write_text(json.dumps(survey, ensure_ascii=False, indent=2) + '\n')
    print(f'Recorded: {entry["venue"]} {entry["year"]} — {entry["title"]}')
