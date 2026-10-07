"""Audit one official CVF venue/year for the independent hyperspectral collection.

Title scanning is bounded by the recorded keywords, not a claim of domain coverage.
Run: python research/hyperspectral/discover.py CVPR 2022
"""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
KEYWORDS = ['hyperspectral', 'multispectral', 'multi-spectral', 'spectral', 'spectrum']


def save(path, value):
    temporary = path.with_suffix('.json.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
    temporary.replace(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('venue', choices=['CVPR', 'ICCV', 'NeurIPS'])
    parser.add_argument('year', type=int)
    args = parser.parse_args()
    survey = json.loads((ROOT / 'survey.json').read_text())
    url = f'https://proceedings.neurips.cc/paper_files/paper/{args.year}' if args.venue == 'NeurIPS' else f'https://openaccess.thecvf.com/{args.venue}{args.year}?day=all'
    identifier = f'{args.venue.lower()}-{args.year}-title-optical-terms'
    record = {'id': identifier, 'venue': args.venue, 'year': args.year,
              'date': survey['cutoffDate'], 'queriedAt': datetime.now(timezone.utc).isoformat(),
              'method': '官方年度目录逐题名关键词扫描，再逐篇核验命中摘要', 'keywords': KEYWORDS,
              'url': url, 'pagination': '单页官方年度目录，含主会及数据集评测 Track；无结果条数截断' if args.venue == 'NeurIPS' else 'day=all；单页全年官方目录；无结果条数截断',
              'titleCount': 0, 'status': 'failed', 'statusLabel': '访问失败',
              'gaps': ['关键词未命中论文、参考文献和后续引用、摘要全量检索尚未完成']}
    try:
        response = requests.get(url, timeout=45)
        response.raise_for_status()
        html = BeautifulSoup(response.text, 'html.parser')
        titles = [{'title': link.get_text(' ', strip=True), 'url': urljoin(url, link['href'])}
                  for link in html.select('li a[href*="Abstract"]' if args.venue == 'NeurIPS' else '.ptitle a')]
        if not titles:
            raise ValueError('No titles in official directory; coverage unverified')
        digest = hashlib.sha256(response.content).hexdigest()
        snapshot = {'url': url, 'checkedAt': survey['cutoffDate'], 'htmlSha256': digest,
                    'titleCount': len(titles), 'titles': titles}
        path = ROOT / 'sources' / f'{args.venue.lower()}-{args.year}-all-titles.json'
        save(path, snapshot)
        record.update(titleCount=len(titles), sourceSnapshot=str(path.relative_to(ROOT)),
                      status='title_scan_complete', statusLabel='题名扫描完成；摘要审查待完成', htmlSha256=digest)
        matched = [title for title in titles if any(re.search(term, title['title'], re.I) for term in KEYWORDS)]
        candidates = {entry['url']: entry for entry in survey['candidates']}
        for title in matched:
            if title['url'] not in candidates:
                survey['candidates'].append({**title, 'venue': args.venue, 'year': args.year,
                    'discoveredAt': survey['cutoffDate'], 'searchId': identifier,
                    'decision': 'pending', 'reason': '题名关键词命中，需独立总库范围审查'})
        record.update(candidateCount=len(matched), reviewedCount=sum(candidates.get(title['url'], {}).get('decision', 'pending') != 'pending' for title in matched))
    except Exception as error:
        record['failureReason'] = str(error)
    prior = next((entry for entry in survey['searches'] if entry['id'] == identifier), None)
    survey['searches'] = [entry for entry in survey['searches'] if entry['id'] != identifier]
    if record['status'] == 'failed' and prior:
        prior.setdefault('retryFailures', []).append(record)
        record = prior
    survey['searches'].append(record)
    save(ROOT / 'survey.json', survey)
    print(json.dumps(record, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
