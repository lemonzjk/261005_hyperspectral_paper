"""Scan a complete ICML PMLR volume, checking metadata against its official index.

Requires requests, beautifulsoup4 and PyYAML.
Run: python research/hyperspectral/pmlr-inventory.py ICML 2023 202
This is a bounded title/abstract keyword scan, not complete subject coverage.
"""
import argparse
from datetime import datetime, timezone
import gzip
import hashlib
import json
from pathlib import Path
from urllib.parse import urljoin

from bs4 import BeautifulSoup
import requests
import yaml

ROOT = Path(__file__).resolve().parent
TITLE_TERMS = ['hyperspectral', 'multispectral', 'multi-spectral', 'spectral', 'spectrum']
ABSTRACT_TERMS = ['hyperspectral', 'hyper-spectral', 'multispectral', 'multi-spectral',
                  'spectral imaging', 'imaging spectroscopy', 'spectral reconstruction',
                  'spectral unmixing', 'remote sensing', 'earth observation', 'satellite imagery']


def save(path, value):
    temporary = path.with_suffix(path.suffix + '.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
    temporary.replace(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('venue', choices=['ICML'])
    parser.add_argument('year', type=int)
    parser.add_argument('volume', type=int)
    args = parser.parse_args()
    survey = json.loads((ROOT / 'survey.json').read_text())
    identifier = f'icml-{args.year}-pmlr-title-abstract-optical-terms'
    base = f'https://proceedings.mlr.press/v{args.volume}/'
    metadata_url = urljoin(base, 'assets/bib/citeproc.yaml')
    prefix = f'icml-{args.year}-pmlr'
    record = dict(id=identifier, venue=args.venue, year=args.year, date=survey['cutoffDate'],
                  method='官方单卷完整目录与官方全量摘要元数据按原文URL逐项核对；题名宽词与摘要光学/遥感词分字段扫描',
                  keywords=list(dict.fromkeys(TITLE_TERMS + ABSTRACT_TERMS)),
                  titleKeywords=TITLE_TERMS, abstractKeywords=ABSTRACT_TERMS,
                  url=base, metadataUrl=metadata_url, titleCount=0, candidateCount=0,
                  reviewedCount=0, status='failed', statusLabel='访问或目录一致性核验失败',
                  pagination='官方单卷目录与无截断全量citeproc.yaml；尚待一致性验证',
                  gaps=['仅完成注明关键词的题名/摘要筛选；其他任务词、正文与引用链仍待查',
                        '其他年度、workshop或独立分卷不在此卷覆盖声明中'])
    prior = next((item for item in survey['searches'] if item['id'] == identifier), None)
    try:
        pages = []
        responses = []
        for url in [base, metadata_url]:
            response = requests.get(url, timeout=60)
            response.raise_for_status()
            pages.append(dict(url=url, queriedAt=datetime.now(timezone.utc).isoformat(),
                              httpStatus=response.status_code,
                              responseSha256=hashlib.sha256(response.content).hexdigest(),
                              hashInput='http_response_bytes'))
            responses.append(response.content)
        html = BeautifulSoup(responses[0].decode('utf-8'), 'html.parser')
        titles = []
        for paper in html.select('.paper'):
            title = paper.select_one('.title')
            abstract_link = next((a for a in paper.select('a[href]') if a.get_text(strip=True) == 'abs'), None)
            if title is None or abstract_link is None:
                raise ValueError('Official index has a paper without a title or abstract URL')
            titles.append(dict(title=title.get_text(' ', strip=True), url=urljoin(base, abstract_link['href'])))
        metadata = yaml.safe_load(responses[1].decode('utf-8'))
        if not titles or not isinstance(metadata, list):
            raise ValueError('Missing official title list or metadata list')
        index_urls = {paper['url'] for paper in titles}
        metadata_urls = {paper['URL'] for paper in metadata}
        if len(index_urls) != len(titles) or len(metadata_urls) != len(metadata) or index_urls != metadata_urls:
            raise ValueError('Index/metadata URL sets or uniqueness differ; completeness unverified')
        for paper in metadata:
            date_parts = paper['issued']['date-parts']
            issued_year = date_parts[0][0] if isinstance(date_parts[0], list) else date_parts[0]
            if issued_year != args.year or int(paper['volume']) != args.volume:
                raise ValueError('Metadata year or volume disagrees with requested annual scope')
            if 'International Conference on Machine Learning' not in paper['container-title']:
                raise ValueError('Metadata venue is not ICML')
            if not isinstance(paper.get('abstract'), str) or not paper['abstract'].strip():
                raise ValueError('A metadata entry lacks an abstract; full abstract scan unverified')
        matched = []
        for paper in metadata:
            title_terms = [term for term in TITLE_TERMS if term in paper['title'].lower()]
            abstract_terms = [term for term in ABSTRACT_TERMS if term in paper['abstract'].lower()]
            if title_terms or abstract_terms:
                matched.append(dict(title=paper['title'], url=paper['URL'], pdf=paper['PDF'],
                                    authors=paper['author'], abstract=paper['abstract'],
                                    matchedTitleTerms=title_terms, matchedAbstractTerms=abstract_terms))
        # Keep the exact bodies for replay: hashes above describe decompressed bytes.
        raw_paths = [f'sources/{prefix}-index.html.gz', f'sources/{prefix}-citeproc.yaml.gz']
        for path, body in zip(raw_paths, responses):
            (ROOT / path).write_bytes(gzip.compress(body, mtime=0))
        snapshot_path = ROOT / 'sources' / f'{prefix}-all-titles.json'
        save(snapshot_path, dict(url=base, metadataUrl=metadata_url, checkedAt=survey['cutoffDate'],
                                 pages=pages, rawSnapshots=raw_paths, titleCount=len(titles),
                                 abstractCount=len(metadata), indexMetadataUrlSetsEqual=True,
                                 titleKeywordHits=sum(bool(p['matchedTitleTerms']) for p in matched),
                                 abstractKeywordHits=sum(bool(p['matchedAbstractTerms']) for p in matched),
                                 titles=titles, candidates=matched))
        existing = {(candidate['searchId'], candidate['url']): candidate for candidate in survey['candidates']}
        for paper in matched:
            if (identifier, paper['url']) not in existing:
                survey['candidates'].append(dict(title=paper['title'], url=paper['url'], venue=args.venue,
                                                year=args.year, searchId=identifier,
                                                discoveredAt=survey['cutoffDate'], decision='pending',
                                                reason='官方题名/摘要关键词命中；独立总库范围和原文关系待审'))
        reviewed = sum(existing.get((identifier, p['url']), {}).get('decision', 'pending') != 'pending'
                       for p in matched)
        record.update(titleCount=len(titles), abstractCount=len(metadata), candidateCount=len(matched),
                      reviewedCount=reviewed, queriedAt=pages[0]['queriedAt'], directoryPages=pages,
                      htmlSha256=pages[0]['responseSha256'], sourceSnapshot=str(snapshot_path.relative_to(ROOT)),
                      pagination=f'单页目录{len(titles)}篇与全量元数据{len(metadata)}摘要URL集合完全一致；无条数截断',
                      status='title_and_abstract_scan_complete', statusLabel='指定题名/摘要词扫描完成；命中候选待审')
        if prior and prior['status'] == 'keyword_candidates_reviewed' and reviewed == len(matched):
            record.update(status=prior['status'], statusLabel=prior['statusLabel'])
        if prior:
            failures = list(prior.get('retryFailures', []))
            if prior['status'] == 'failed':
                failures.append(prior)
            if failures:
                record['retryFailures'] = failures
    except Exception as error:
        record['failureReason'] = str(error)
        if prior:
            prior.setdefault('retryFailures', []).append(record)
            record = prior
    survey['searches'] = [item for item in survey['searches'] if item['id'] != identifier] + [record]
    save(ROOT / 'survey.json', survey)
    print(json.dumps(record, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
