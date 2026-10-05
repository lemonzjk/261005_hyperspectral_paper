import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { tracks as trackDefinitions } from '../src/tracks.ts';
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
