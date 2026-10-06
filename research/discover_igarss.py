"""Scan IGARSS accepted-paper titles; register candidates without implying publication or scope verification."""
import argparse
import hashlib
import json
import re
from datetime import date
from pathlib import Path

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
SPECTRAL = re.compile(r'hyperspectral|multispectral|multi-spectral|cross-spectral|spectral lidar', re.I)
GEOMETRY = re.compile(r'\b3[ -]?d\b|point[ -]?cloud|lidar|slam|stereo|geometry|geometric|radiative|depth|photogram|normal|registration|tomograph', re.I)


def normalize(title):
    return re.sub(r'\W+', ' ', title.casefold()).strip()


def scan(year, cached=None):
    url = f'https://{year}.ieeeigarss.org/papers/accepted_papers.php'
    html = cached.read_text() if cached else requests.get(url, timeout=45)
    if not cached:
        html.raise_for_status()
        html = html.text
    soup = BeautifulSoup(html, 'html.parser')
    papers = []
    for row in soup.select('table tr'):
        cells = row.find_all('td')
        if len(cells) != 2 or not cells[0].get_text(strip=True).isdigit():
            continue
        papers.append({'paperNumber': cells[0].get_text(strip=True),
                       'title': cells[1].get_text(' ', strip=True)})
    if not papers:
        raise ValueError(f'No accepted-paper rows parsed for {year}')
    matches = [paper for paper in papers if SPECTRAL.search(paper['title']) and GEOMETRY.search(paper['title'])]
    return {'year': year, 'url': url, 'titleCount': len(papers), 'matches': matches,
            'sourceSha256': hashlib.sha256(html.encode()).hexdigest(), 'titles': papers}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('years', nargs='+', type=int)
    parser.add_argument('--cache-directory', type=Path, help='Read previously downloaded hs3d-igarss-YEAR.html files')
    args = parser.parse_args()
    checked = date.today().isoformat()
    catalog = json.loads((ROOT / 'src/data/catalog.json').read_text())
    survey_path = ROOT / 'research/survey.json'
    survey = json.loads(survey_path.read_text())
    known_papers = {normalize(p['title']): p['id'] for p in catalog['papers']}
    known_candidates = {normalize(p['title']): p for p in survey['candidates']}
    manifest = {'checkedAt': checked, 'scope': 'Accepted-paper title keyword scan only; not full abstract screening, publication verification, or exhaustive semantic coverage', 'years': []}
    added = 0
    for year in args.years:
        cached = args.cache_directory / f'hs3d-igarss-{year}.html' if args.cache_directory else None
        result = scan(year, cached)
        manifest['years'].append(result)
        for match in result['matches']:
            key = normalize(match['title'])
            if key in known_papers:
                match['existingPaperId'] = known_papers[key]
                continue
            if key in known_candidates:
                continue
            candidate = {'title': match['title'], 'year': year, 'venue': 'IGARSS',
                         'url': result['url'], 'status': 'pending_scope',
                         'paperNumber': match['paperNumber'],
                         'note': 'Official accepted-paper title only. Verify original abstract, final DOI/publication, optical spectrum vs graph spectrum, real geometry vs tensor dimensions, and conference/journal version relationship before inclusion.'}
            survey['candidates'].append(candidate)
            known_candidates[key] = candidate
            added += 1
        survey['queries'].append({'date': checked, 'engine': 'official IGARSS accepted-paper directory',
                                  'query': f'IGARSS {year}: optical spectral terms paired with geometry terms',
                                  'url': result['url'], 'titleCount': result['titleCount'],
                                  'candidateCount': len(result['matches'])})
        print(f"IGARSS {year}: {result['titleCount']} titles, {len(result['matches'])} keyword candidates")
    (ROOT / 'research/sources' / f'igarss-title-scan-{checked}.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    survey_path.write_text(json.dumps(survey, ensure_ascii=False, indent=2) + '\n')
    print(f'Registered {added} new candidates; no papers automatically included.')


if __name__ == '__main__':
    main()
