"""Scan a journal's Crossref deposit inventory; publisher completeness is unproven.

Example: python research/hyperspectral/crossref-inventory.py "Optics Letters" 0146-9592 2007
Cached API responses may be replayed with --response-files PATH [PATH ...].
"""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import requests

ROOT = Path(__file__).resolve().parent
KEYWORDS = ['hyperspectral', 'multispectral', 'spectral imaging', 'coded aperture',
            'compressive imaging', 'compressive spectral']


def scan(venue, issn, year, response_files=None):
    url = f'https://api.crossref.org/journals/{issn}/works'
    query_filter = f'from-pub-date:{year}-01-01,until-pub-date:{year}-12-31'
    cursor = '*'
    titles, pages, totals = {}, [], []
    replay = iter(response_files or [])
    while True:
        if response_files:
            path = Path(next(replay))
            raw = path.read_bytes()
            checked = datetime.fromtimestamp(path.stat().st_mtime, timezone.utc).isoformat()
        else:
            response = requests.get(url, params={'filter': query_filter, 'rows': 1000,
                                                'cursor': cursor}, timeout=45)
            response.raise_for_status()
            raw = response.content
            checked = datetime.now(timezone.utc).isoformat()
        payload = json.loads(raw)['message']
        total = payload['total-results']
        totals.append(total)
        items = payload['items']
        pages.append({'page': len(pages) + 1, 'retrievedAt': checked,
                      'itemCount': len(items), 'registeredTotal': total,
                      'hashInput': 'saved_response_json' if response_files else 'http_response_bytes',
                      'responseSha256': hashlib.sha256(raw).hexdigest()})
        previous = len(titles)
        for item in items:
            doi = item['DOI'].lower()
            titles[doi] = {key: item.get(key) for key in
                           ['DOI', 'title', 'author', 'published', 'volume', 'issue', 'page', 'type']}
        if len(titles) >= total:
            break
        if not items or len(titles) == previous:
            raise ValueError('Pagination ended without collecting the registered total')
        cursor = payload['next-cursor']
    if len(set(totals)) != 1 or len(titles) != totals[0]:
        raise ValueError('Inventory changed during pagination; completeness unverified')
    return {'url': url, 'issn': issn, 'venue': venue, 'year': year,
            'filter': query_filter, 'rows': 1000, 'pages': pages,
            'registeredTotal': totals[0], 'uniqueDoiCount': len(titles),
            'coverageBoundary': '仅为查询时 Crossref 登记的出版日期年度集合；不能证明出版社年度全部论文均已登记。',
            'titles': list(titles.values())}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('venue')
    parser.add_argument('issn')
    parser.add_argument('year', type=int)
    parser.add_argument('--response-files', nargs='+')
    args = parser.parse_args()
    snapshot = scan(args.venue, args.issn, args.year, args.response_files)
    survey_path = ROOT / 'survey.json'
    survey = json.loads(survey_path.read_text())
    slug = re.sub(r'[^a-z0-9]+', '-', args.venue.lower()).strip('-')
    sid = f'{slug}-{args.year}-crossref-imaging-terms'
    path = ROOT / 'sources' / f'{slug}-{args.year}-crossref-titles.json'
    path.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + '\n')
    matches = [item for item in snapshot['titles'] if
               any(term in ' '.join(item['title'] or []).lower() for term in KEYWORDS)]
    existing = {(c['searchId'], c['url']): c for c in survey['candidates']}
    for item in matches:
        url = 'https://doi.org/' + item['DOI'].lower()
        if (sid, url) not in existing:
            survey['candidates'].append({'title': ' '.join(item['title']), 'url': url,
                'venue': args.venue, 'year': args.year, 'searchId': sid,
                'discoveredAt': survey['cutoffDate'], 'decision': 'pending',
                'reason': '登记题名命中成像任务词；光学高光谱关系和摘要待核验。'})
    candidates = [c for c in survey['candidates'] if c['searchId'] == sid]
    reviewed = sum(c['decision'] != 'pending' for c in candidates)
    record = {'id': sid, 'venue': args.venue, 'year': args.year,
        'keywordGroup': 'optical-imaging-title',
        'date': survey['cutoffDate'], 'queriedAt': snapshot['pages'][0]['retrievedAt'],
        'method': 'Crossref 出版社登记元数据年度集合，按游标完整分页并逐题名扫描成像任务词',
        'keywords': KEYWORDS, 'url': snapshot['url'],
        'pagination': f"rows=1000，{len(snapshot['pages'])} 页；{snapshot['uniqueDoiCount']} 个不同 DOI 与登记总数一致；出版社目录尚未交叉核验",
        'titleCount': snapshot['uniqueDoiCount'], 'candidateCount': len(matches),
        'reviewedCount': reviewed, 'status': 'metadata_title_scan_complete',
        'statusLabel': f'登记题名扫描完成；{reviewed}/{len(matches)} 候选已处理；出版社年度覆盖未证明',
        'sourceSnapshot': str(path.relative_to(ROOT)),
        'htmlSha256': hashlib.sha256(path.read_bytes()).hexdigest(),
        'gaps': ['Crossref 未登记论文及出版日期/卷期年度差异尚未核对',
                 '出版社全部目录、全量摘要、其他关键词和引文尚未完成']}
    survey['searches'] = [s for s in survey['searches'] if s['id'] != sid] + [record]
    groups = survey['matrixDefinition']['keywordGroups']
    if not any(group['id'] == 'optical-imaging-title' for group in groups):
        groups.append({'id': 'optical-imaging-title', 'keywords': KEYWORDS, 'status': 'active'})
    survey_path.write_text(json.dumps(survey, ensure_ascii=False, indent=2) + '\n')
    print(f"{args.venue} {args.year}: {len(snapshot['titles'])} deposited titles; {len(matches)} matches; {reviewed} reviewed")


if __name__ == '__main__':
    main()
