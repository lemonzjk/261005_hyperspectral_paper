"""Maintain a resumable newest-first queue and record each visually verified paper figure."""
import argparse
import hashlib
import json
import shutil
from datetime import date
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / 'src/data/catalog.json'
REGISTRY = ROOT / 'research/figures.json'


def save(path, value):
    temporary = path.with_suffix(path.suffix + '.tmp')
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
    temporary.replace(path)


def synchronize():
    catalog = json.loads(CATALOG.read_text())
    registry = json.loads(REGISTRY.read_text()) if REGISTRY.exists() else {'updatedAt': str(date.today()), 'papers': []}
    previous = {entry['paperId']: entry for entry in registry['papers']}
    registry['papers'] = []
    for paper in sorted(catalog['papers'], key=lambda item: (-item['year'], item['shortTitle'].casefold(), item['id'])):
        entry = previous.get(paper['id'], {'paperId': paper['id'], 'status': 'pending', 'attempts': []})
        entry.update(year=paper['year'], title=paper['title'], paperUrl=paper['paper'])
        if paper.get('frameworkFigures'):
            entry.update(status='needs_review' if any(figure.get('verificationStatus') == 'pending' for figure in paper['frameworkFigures']) else 'verified', figures=paper['frameworkFigures'])
            paper.pop('frameworkFigureSearch', None)
        elif entry['attempts']:
            latest = entry['attempts'][-1]
            paper['frameworkFigureSearch'] = {'status': entry['status'], 'note': latest['note'], 'sourceUrl': latest['url'], 'checkedAt': latest['date']}
        registry['papers'].append(entry)
    return catalog, registry


parser = argparse.ArgumentParser(description=__doc__)
subcommands = parser.add_subparsers(dest='command', required=True)
subcommands.add_parser('init')
queue = subcommands.add_parser('queue')
queue.add_argument('--year', type=int)
add = subcommands.add_parser('add')
add.add_argument('record', help='JSON record including paperId, localFile, sourceUrl, figureLabel, caption and verificationNote')
attempt = subcommands.add_parser('attempt')
attempt.add_argument('paper_id')
attempt.add_argument('--url', required=True)
attempt.add_argument('--note', required=True)
attempt.add_argument('--status', choices=['pending', 'needs_access', 'no_framework'], default='needs_access')
args = parser.parse_args()
catalog, registry = synchronize()
if args.command == 'add':
    record = json.loads(Path(args.record).read_text())
    paper = next(item for item in catalog['papers'] if item['id'] == record['paperId'])
    for key in ['sourceUrl', 'figureLabel', 'caption', 'verificationNote']:
        if not record.get(key):
            raise ValueError(f'Missing {key}')
    if not record['sourceUrl'].startswith('https://'):
        raise ValueError('An original HTTPS source is required')
    local = Path(record['localFile'])
    with Image.open(local) as picture:
        width, height = picture.size
        picture.verify()
    if min(width, height) < 100:
        raise ValueError('Image too small for a readable framework diagram')
    filename = record.get('filename', 'framework' + local.suffix.lower())
    if Path(filename).name != filename or chr(92) in filename or '..' in filename or not filename.startswith('framework'):
        raise ValueError('Use a framework-prefixed local filename')
    destination = ROOT / 'public/figures' / paper['id'] / filename
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists() and destination.read_bytes() != local.read_bytes():
        raise ValueError('An existing figure must not be silently overwritten; choose a versioned filename')
    if local.resolve() != destination.resolve():
        shutil.copyfile(local, destination)
    figure = {key: value for key, value in record.items() if key not in ['paperId', 'localFile', 'filename']}
    figure.update(path=destination.relative_to(ROOT / 'public').as_posix(), width=width, height=height,
                  verificationStatus='verified', verifiedAt=str(date.today()), sha256=hashlib.sha256(destination.read_bytes()).hexdigest(),
                  attribution=f"{paper['authors']} · {paper['venue']} {paper['year']}")
    existing = paper.setdefault('frameworkFigures', [])
    existing[:] = [item for item in existing if item['path'] != figure['path']]
    existing.append(figure)
    paper.pop('frameworkFigureSearch', None)
    # Persist immediately for this one paper, before moving on to any next result.
    save(CATALOG, catalog)
    entry = next(item for item in registry['papers'] if item['paperId'] == paper['id'])
    entry.update(status='needs_review' if any(figure.get('verificationStatus') == 'pending' for figure in existing) else 'verified', figures=existing)
    print(f"Saved {paper['year']} {paper['shortTitle']}: {figure['path']}")
elif args.command == 'attempt':
    if not args.url.startswith('https://'):
        raise ValueError('An original HTTPS source is required')
    entry = next(item for item in registry['papers'] if item['paperId'] == args.paper_id)
    entry['attempts'].append({'date': str(date.today()), 'url': args.url, 'note': args.note})
    if entry['status'] not in ('verified', 'needs_review'):
        entry['status'] = args.status
        paper = next(item for item in catalog['papers'] if item['id'] == args.paper_id)
        paper['frameworkFigureSearch'] = {'status': args.status, 'note': args.note, 'sourceUrl': args.url, 'checkedAt': str(date.today())}
registry['updatedAt'] = str(date.today())
save(CATALOG, catalog)
save(REGISTRY, registry)
if args.command == 'queue':
    for entry in registry['papers']:
        if entry['status'] != 'verified' and (args.year is None or args.year == entry['year']):
            print(f"{entry['year']}\t{entry['paperId']}\t{entry['status']}\t{entry['title']}")
