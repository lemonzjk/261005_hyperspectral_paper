"""Search official CVF proceedings; discoveries stay pending until individually reviewed."""
import concurrent.futures
import json
import re
import urllib.request
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
SURVEY = ROOT / 'survey.json'
indexes = [('CVPR', y) for y in range(2013, 2027)] + [('ICCV', y) for y in range(2013, 2026, 2)]

def fetch(index):
    venue, year = index
    url = f'https://openaccess.thecvf.com/{venue}{year}?day=all'
    try:
        page = BeautifulSoup(urllib.request.urlopen(url, timeout=30).read(), 'html.parser')
        titles = page.select('.ptitle a')
        if not titles:
            raise ValueError('No proceedings titles found; coverage unverified')
        matches = []
        for link in titles:
            title = link.get_text(' ', strip=True)
            if not re.search(r'hyperspectral|multispectral|multi-spectral|spectral|spectrum', title, re.I):
                continue
            href = link['href']
            if not href.startswith('http'):
                href = 'https://openaccess.thecvf.com/' + href.lstrip('/')
            matches.append({'title': title, 'venue': venue, 'year': year, 'url': href,
                            'status': 'pending_scope', 'discovery': 'official_CVF_proceedings'})
        return {'venue': venue, 'year': year, 'url': url, 'status': 'scanned',
                'titleCount': len(titles), 'matches': matches}
    except Exception as error:
        return {'venue': venue, 'year': year, 'url': url, 'status': 'failed', 'error': str(error)}

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    for result in pool.map(fetch, indexes):
        manifestPath = ROOT / 'sources/cvf-proceedings.json'
        manifest = json.loads(manifestPath.read_text()) if manifestPath.exists() else []
        manifest = [r for r in manifest if (r['venue'], r['year']) != (result['venue'], result['year'])]
        manifest.append(result)
        manifestPath.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
        survey = json.loads(SURVEY.read_text())
        for candidate in result.get('matches', []):
            if not any(c['title'].casefold() == candidate['title'].casefold() for c in survey['candidates']):
                survey['candidates'].append(candidate)
                SURVEY.write_text(json.dumps(survey, ensure_ascii=False, indent=2) + '\n')
        print(result['venue'], result['year'], result['status'], result.get('titleCount', 0), len(result.get('matches', [])), flush=True)
