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
from urllib.parse import urljoin, urlsplit

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
KEYWORDS = ['hyperspectral', 'multispectral', 'multi-spectral', 'spectral', 'spectrum']


def save(path, value):
    temporary = path.with_suffix('.json.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
    temporary.replace(path)


def fetch_directory(url, venue):
    """Follow every day linked by a CVF index; a partial directory is a failure."""
    pages = []

    def fetch(page_url):
        response = requests.get(page_url, timeout=45)
        response.raise_for_status()
        html = BeautifulSoup(response.text, 'html.parser')
        selector = 'li a[href*="Abstract"]' if venue == 'NeurIPS' else '.ptitle a'
        titles = [{'title': link.get_text(' ', strip=True), 'url': urljoin(page_url, link['href'])}
                  for link in html.select(selector)]
        pages.append({'url': page_url, 'queriedAt': datetime.now(timezone.utc).isoformat(),
                      'htmlSha256': hashlib.sha256(response.content).hexdigest(), 'titleCount': len(titles)})
        return html, titles

    html, titles = fetch(url)
    if titles:
        return titles, pages
    if venue == 'NeurIPS':
        raise ValueError('No titles in official directory; coverage unverified')
    parts = urlsplit(url)
    index_url = f'{parts.scheme}://{parts.netloc}{parts.path}'
    index, unused = fetch(index_url)
    days = list(dict.fromkeys(urljoin(index_url, link['href']) for link in index.select('a[href*="day="]')
                             if 'day=all' not in link['href']))
    if not days:
        raise ValueError('No titles or linked day directories; coverage unverified')
    combined = {}
    for day_url in days:
        unused, daily = fetch(day_url)
        if not daily:
            raise ValueError(f'No titles in linked day directory: {day_url}; coverage unverified')
        for paper in daily:
            if paper['url'] in combined and combined[paper['url']]['title'] != paper['title']:
                raise ValueError(f'Conflicting duplicate title: {paper["url"]}')
            combined[paper['url']] = paper
    return list(combined.values()), pages


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
              'url': url, 'pagination': '单页官方年度目录；集合以该目录实际列出论文为限，未另扫Track/Workshop；无结果条数截断' if args.venue == 'NeurIPS' else 'day=all；单页全年官方目录；无结果条数截断',
              'titleCount': 0, 'status': 'failed', 'statusLabel': '访问失败',
              'gaps': ['关键词未命中论文、参考文献和后续引用、摘要全量检索尚未完成']}
    try:
        titles, pages = fetch_directory(url, args.venue)
        digest = pages[0]['htmlSha256']
        snapshot = {'url': url, 'checkedAt': survey['cutoffDate'], 'htmlSha256': digest,
                    'titleCount': len(titles), 'pages': pages, 'titles': titles}
        record['directoryPages'] = pages
        if len(pages) > 1:
            record['pagination'] = 'day=all 无题名；读取官方入口并遍历其全部日目录，按原文 URL 去重；无条数截断'
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
    if record['status'] != 'failed' and prior:
        failures = prior.get('retryFailures', [])
        if prior['status'] == 'failed':
            failures = [*failures, prior]
        if failures:
            record['retryFailures'] = failures
        if prior['status'] == 'keyword_candidates_reviewed' and record['reviewedCount'] == record['candidateCount']:
            record.update(status=prior['status'], statusLabel=prior['statusLabel'])
    survey['searches'] = [entry for entry in survey['searches'] if entry['id'] != identifier]
    if record['status'] == 'failed' and prior:
        prior.setdefault('retryFailures', []).append(record)
        record = prior
    survey['searches'].append(record)
    save(ROOT / 'survey.json', survey)
    print(json.dumps(record, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
