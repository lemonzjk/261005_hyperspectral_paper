import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { tracks as trackDefinitions } from '../src/tracks.ts';
import { timelineLayout } from '../src/timeline-layout.ts';
import { groupPapers } from '../src/map-groups.ts';

const context = readFileSync(new URL('../CONTEXT.md', import.meta.url), 'utf8');
const contextCharacters = [...context].length;
const contextLines = context.split('\n').length - (context.endsWith('\n') ? 1 : 0);
assert(contextCharacters <= 2000, `CONTEXT.md exceeds 2,000 characters: ${contextCharacters}`);
assert(contextLines <= 60, `CONTEXT.md exceeds 60 lines: ${contextLines}`);

const catalog = JSON.parse(readFileSync(new URL('../src/data/catalog.json', import.meta.url)));
const ids = new Set();
const tracks = new Set(trackDefinitions.map(t => t.id));
for (const paper of catalog.papers) {
  assert(!ids.has(paper.id), `Duplicate paper: ${paper.id}`);
  ids.add(paper.id);
  assert(tracks.has(paper.track), `Unknown track: ${paper.id}`);
  for (const key of ['id', 'shortTitle', 'title', 'authors', 'venue', 'summary', 'input', 'output', 'mechanism', 'readingNote', 'citation']) assert(typeof paper[key] === 'string' && paper[key].trim(), `Missing ${key}: ${paper.id}`);
  assert(Number.isInteger(paper.year), `Invalid year: ${paper.id}`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(paper.verifiedAt), `Missing verification date: ${paper.id}`);
  for (const url of [paper.paper, paper.code].filter(Boolean)) assert(new URL(url).protocol === 'https:', `Expected HTTPS: ${paper.id}`);
}
const figureRegistry = JSON.parse(readFileSync(new URL('../research/figures.json', import.meta.url)));
assert.equal(figureRegistry.papers.length, catalog.papers.length, 'Figure queue must cover every paper');
assert.equal(new Set(figureRegistry.papers.map(entry => entry.paperId)).size, catalog.papers.length, 'Duplicate paper in figure queue');
let figureCount = 0;
for (const entry of figureRegistry.papers) {
  const paper = catalog.papers.find(item => item.id === entry.paperId);
  assert(paper, `Unknown figure queue paper: ${entry.paperId}`);
  assert.equal(entry.year, paper.year, `Figure queue year mismatch: ${paper.id}`);
  assert.equal(entry.title, paper.title, `Figure queue title mismatch: ${paper.id}`);
  assert(Array.isArray(entry.attempts), `Missing search history: ${paper.id}`);
  for (const attempt of entry.attempts) {
    assert(new URL(attempt.url).protocol === 'https:' && attempt.note?.trim(), `Invalid search attempt: ${paper.id}`);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(attempt.date), `Invalid search date: ${paper.id}`);
  }
  assert(['pending', 'verified', 'needs_access', 'no_framework'].includes(entry.status), `Invalid figure status: ${paper.id}`);
  if (entry.status === 'verified') assert(paper.frameworkFigures?.length, `Missing verified figures: ${paper.id}`);
  assert.deepEqual(entry.figures ?? [], paper.frameworkFigures ?? [], `Registry/catalog figure mismatch: ${paper.id}`);
  if (paper.frameworkFigureSearch) {
    const latest = entry.attempts.at(-1);
    assert.deepEqual(paper.frameworkFigureSearch, { status: entry.status, note: latest?.note, sourceUrl: latest?.url, checkedAt: latest?.date }, `Search status mismatch: ${paper.id}`);
    assert(!paper.frameworkFigures?.length, `Verified paper still marked missing: ${paper.id}`);
  }
  for (const figure of paper.frameworkFigures ?? []) {
    assert(figure.path.startsWith(`figures/${paper.id}/`) && !figure.path.includes('..'), `Invalid figure path: ${paper.id}`);
    const local = new URL(`../public/${figure.path}`, import.meta.url);
    assert(existsSync(local), `Missing framework image: ${paper.id}`);
    assert.equal(createHash('sha256').update(readFileSync(local)).digest('hex'), figure.sha256, `Figure checksum mismatch: ${paper.id}`);
    assert(figure.width >= 100 && figure.height >= 100, `Unreadable image: ${paper.id}`);
    for (const key of ['figureLabel', 'caption', 'verificationNote', 'attribution']) assert(figure[key]?.trim(), `Missing figure ${key}: ${paper.id}`);
    assert(new URL(figure.sourceUrl).protocol === 'https:', `Invalid figure source: ${paper.id}`);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(figure.verifiedAt), `Missing figure verification: ${paper.id}`);
    if (figure.page !== undefined) assert(Number.isInteger(figure.page) && figure.page > 0, `Invalid PDF page: ${paper.id}`);
    figureCount++;
  }
}
assert(figureRegistry.papers.every((entry, index, entries) => index === 0 || entries[index - 1].year >= entry.year), 'Figure queue must be newest first');
console.log(`Framework figures valid: ${figureCount} images; ${figureRegistry.papers.length} papers in resumable queue.`);
for (const dataset of catalog.datasets) {
  assert(dataset.paperIds.every(id => ids.has(id)), `Unknown paper in dataset: ${dataset.id}`);
  assert(new URL(dataset.source).protocol === 'https:', `Expected HTTPS: ${dataset.id}`);
  assert(dataset.availability, `Missing availability: ${dataset.id}`);
}
for (const grouping of ['track', 'year']) {
  const grouped = groupPapers(catalog.papers, grouping).flatMap(group => group.papers.map(p => p.id));
  assert.equal(grouped.length, catalog.papers.length, `Missing papers in ${grouping} groups`);
  assert.equal(new Set(grouped).size, catalog.papers.length, `Duplicate papers in ${grouping} groups`);
}
console.log(`Catalog valid: ${catalog.papers.length} papers, ${catalog.datasets.length} dataset resources.`);
console.log(`Context valid: ${contextCharacters}/2000 characters, ${contextLines}/60 lines.`);

for (const papers of [catalog.papers, [], ...trackDefinitions.map(track => catalog.papers.filter(p => p.track === track.id))]) {
  const layout = timelineLayout(papers);
  const stations = layout.lanes.flatMap(lane => lane.stations);
  assert.equal(stations.length, papers.length, 'Timeline must contain every filtered paper');
  assert.equal(new Set(stations.map(s => s.paper.id)).size, papers.length, 'Timeline stations must be unique');
  for (const lane of layout.lanes) {
    lane.stations.forEach((station, index) => {
      assert(station.x > 240 && station.x < layout.width, 'Station must fit timeline');
      if (index) assert(station.x - lane.stations[index - 1].x >= 150, 'Timeline labels must not overlap');
    });
  }
}
console.log('Timeline valid: full and filtered coverage, unique stations, no label collisions.');
