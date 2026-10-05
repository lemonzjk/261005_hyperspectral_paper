import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const catalog = JSON.parse(readFileSync(new URL('../src/data/catalog.json', import.meta.url)));
const ids = new Set();
const tracks = new Set(['capture', 'geometry', 'rendering', 'materials', 'understanding']);
for (const paper of catalog.papers) {
  assert(!ids.has(paper.id), `Duplicate paper: ${paper.id}`);
  ids.add(paper.id);
  assert(tracks.has(paper.track), `Unknown track: ${paper.id}`);
  for (const key of ['id', 'shortTitle', 'title', 'authors', 'venue', 'summary', 'input', 'output', 'mechanism', 'readingNote', 'citation']) assert(typeof paper[key] === 'string' && paper[key].trim(), `Missing ${key}: ${paper.id}`);
  assert(Number.isInteger(paper.year), `Invalid year: ${paper.id}`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(paper.verifiedAt), `Missing verification date: ${paper.id}`);
  for (const url of [paper.paper, paper.code].filter(Boolean)) assert(new URL(url).protocol === 'https:', `Expected HTTPS: ${paper.id}`);
  assert(paper.mapX >= 280 && paper.mapX <= 980, `Node outside map: ${paper.id}`);
}
for (const dataset of catalog.datasets) {
  assert(dataset.paperIds.every(id => ids.has(id)), `Unknown paper in dataset: ${dataset.id}`);
  assert(new URL(dataset.source).protocol === 'https:', `Expected HTTPS: ${dataset.id}`);
  assert(dataset.availability, `Missing availability: ${dataset.id}`);
}
for (let i = 0; i < catalog.papers.length; i++) {
  for (const other of catalog.papers.slice(i + 1)) {
    const paper = catalog.papers[i];
    if (paper.track === other.track) assert(Math.abs(paper.mapX - other.mapX) >= 150, `Overlapping map labels: ${paper.id}, ${other.id}`);
  }
}
console.log(`Catalog valid: ${catalog.papers.length} papers, ${catalog.datasets.length} dataset resources.`);
