import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { tracks as trackDefinitions } from '../src/tracks.ts';
import { timelineLayout } from '../src/timeline-layout.ts';
import { groupPapers } from '../src/map-groups.ts';
import { filterLibrary, libraryPresentation, readLibraryFilters, sortByPaperCount } from '../src/library.ts';
import { matchesAuthor, splitAuthors } from '../src/authors.ts';

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
  assert(Array.isArray(paper.collections) && paper.collections.length && paper.collections.every(collection => ['hs3d', 'hyperspectral'].includes(collection)), `Invalid collection membership: ${paper.id}`);
  if (paper.collections.includes('hs3d')) assert(tracks.has(paper.track) && ['核心研究', '相关研究'].includes(paper.scope), `Invalid three-dimensional topic metadata: ${paper.id}`);
  else assert(paper.track === undefined && paper.scope === undefined, `General-library paper must not receive three-dimensional metadata: ${paper.id}`);
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
  assert(['pending', 'verified', 'needs_access', 'no_framework', 'needs_review'].includes(entry.status), `Invalid figure status: ${paper.id}`);
  if (entry.status === 'verified') assert(paper.frameworkFigures?.length && paper.frameworkFigures.every(figure => figure.verificationStatus !== 'pending'), `Invalid verified figures: ${paper.id}`);
  if (entry.status === 'needs_review') assert(paper.frameworkFigures?.some(figure => figure.verificationStatus === 'pending'), `Missing pending upload: ${paper.id}`);
  if (paper.frameworkFigures?.some(figure => figure.verificationStatus === 'pending')) assert.equal(entry.status, 'needs_review', `Pending upload marked verified: ${paper.id}`);
  assert.deepEqual(entry.figureHistory ?? [], paper.frameworkFigureHistory ?? [], `Figure history mismatch: ${paper.id}`);
  for (const history of paper.frameworkFigureHistory ?? []) {
    assert(/^\d{4}-\d{2}-\d{2}$/.test(history.replacedAt), `Invalid replacement date: ${paper.id}`);
    assert([...(paper.frameworkFigures ?? []), ...(paper.frameworkFigureHistory ?? []).map(item => item.figure)].some(figure => figure.path === history.replacementPath), `Missing replacement image: ${paper.id}`);
  }
  assert.deepEqual(entry.figures ?? [], paper.frameworkFigures ?? [], `Registry/catalog figure mismatch: ${paper.id}`);
  if (paper.frameworkFigureSearch) {
    const latest = entry.attempts.at(-1);
    assert.deepEqual(paper.frameworkFigureSearch, { status: entry.status, note: latest?.note, sourceUrl: latest?.url, checkedAt: latest?.date }, `Search status mismatch: ${paper.id}`);
    assert(!paper.frameworkFigures?.length, `Verified paper still marked missing: ${paper.id}`);
  }
  for (const figure of [...(paper.frameworkFigures ?? []), ...(paper.frameworkFigureHistory ?? []).map(item => item.figure)]) {
    assert(figure.path.startsWith(`figures/${paper.id}/`) && !figure.path.includes('..'), `Invalid figure path: ${paper.id}`);
    const local = new URL(`../public/${figure.path}`, import.meta.url);
    assert(existsSync(local), `Missing framework image: ${paper.id}`);
    assert.equal(createHash('sha256').update(readFileSync(local)).digest('hex'), figure.sha256, `Figure checksum mismatch: ${paper.id}`);
    assert(figure.width >= 100 && figure.height >= 100, `Unreadable image: ${paper.id}`);
    for (const key of ['figureLabel', 'caption', 'verificationNote', 'attribution']) assert(figure[key]?.trim(), `Missing figure ${key}: ${paper.id}`);
    assert(new URL(figure.sourceUrl).protocol === 'https:', `Invalid figure source: ${paper.id}`);
    if (figure.verificationStatus === 'pending') {
      assert(/^\d{4}-\d{2}-\d{2}$/.test(figure.uploadedAt), `Missing upload date: ${paper.id}`);
      assert(!figure.verifiedAt, `Unverified upload has verification date: ${paper.id}`);
    } else {
      assert(figure.verificationStatus === undefined || figure.verificationStatus === 'verified', `Invalid verification status: ${paper.id}`);
      assert(/^\d{4}-\d{2}-\d{2}$/.test(figure.verifiedAt), `Missing figure verification: ${paper.id}`);
    }
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
const topicPapers = catalog.papers.filter(paper => paper.collections.includes('hs3d'));
for (const grouping of ['track', 'year']) {
  const grouped = groupPapers(topicPapers, grouping).flatMap(group => group.papers.map(p => p.id));
  assert.equal(grouped.length, topicPapers.length, `Missing papers in ${grouping} groups`);
  assert.equal(new Set(grouped).size, topicPapers.length, `Duplicate papers in ${grouping} groups`);
}
console.log(`Catalog valid: ${catalog.papers.length} papers, ${catalog.datasets.length} dataset resources.`);
console.log(`Context valid: ${contextCharacters}/2000 characters, ${contextLines}/60 lines.`);

for (const papers of [topicPapers, [], ...trackDefinitions.map(track => catalog.papers.filter(p => p.track === track.id))]) {
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

// Collection migration must preserve all original topic members and publication facts.
const baseline = JSON.parse(readFileSync(new URL('../research/hyperspectral/legacy-topic-baseline.json', import.meta.url)));
assert.deepEqual(topicPapers.map(paper => paper.id).sort(), baseline.papers.map(paper => paper.id).sort(), 'General-library additions changed topic membership');
for (const before of baseline.papers) {
  const current = topicPapers.find(paper => paper.id === before.id);
  for (const [key, value] of Object.entries(before)) assert.deepEqual(current[key] ?? null, value, `Legacy topic fact changed: ${before.id}/${key}`);
}
const categories = catalog.libraryCategories;
assert.equal(new Set(categories.map(category => category.id)).size, categories.length, 'Duplicate library category ID');
for (const category of categories) {
  assert(['task', 'method', 'application'].includes(category.dimension), 'Invalid label dimension');
  assert(['provisional', 'confirmed', 'retired'].includes(category.status), 'Invalid category status');
  assert(category.definition?.trim() && category.rationale?.trim() && category.history.length, 'Category needs definition and change rationale');
  assert(category.evidencePaperIds.length && category.evidencePaperIds.every(id => ids.has(id)), 'Category needs known evidence papers');
  assert.deepEqual([...category.evidencePaperIds].sort(), catalog.papers.filter(paper => paper.library?.categoryIds.includes(category.id)).map(paper => paper.id).sort(), `Category evidence and assignments differ: ${category.id}`);
}
const libraryPapers = catalog.papers.filter(paper => paper.collections.includes('hyperspectral'));
for (const paper of libraryPapers) {
  const notes = paper.library;
  assert(notes && ['pending', 'provisional', 'confirmed'].includes(notes.classificationStatus), `Missing library record: ${paper.id}`);
  assert.equal(new Set(notes.categoryIds).size, notes.categoryIds.length, `Duplicate paper labels: ${paper.id}`);
  assert(notes.categoryIds.every(id => categories.some(category => category.id === id)), `Unknown library label: ${paper.id}`);
  assert.equal(notes.classificationStatus === 'pending', notes.categoryIds.length === 0, `Classification state mismatch: ${paper.id}`);
  assert(['hyperspectral', 'multispectral', 'foundation', 'pending'].includes(notes.relation) && notes.relationNote.trim(), `Missing optical relationship: ${paper.id}`);
  assert(['pending', 'title_only', 'abstract_read', 'full_text_read'].includes(notes.readingProgress), `Unknown reading state: ${paper.id}`);
  assert(['pending', 'abstract_verified', 'full_text_verified'].includes(notes.verificationStatus), `Unknown verification state: ${paper.id}`);
  for (const key of ['researchQuestion', 'datasets', 'experimentSetting', 'conclusions', 'limitations', 'methodFamilyId']) assert(notes[key]?.trim(), `Missing library note ${key}: ${paper.id}`);
  if (notes.verificationStatus !== 'pending') assert(notes.evidence.length, `Verified note lacks evidence: ${paper.id}`);
  for (const evidence of notes.evidence) assert(new URL(evidence.url).protocol === 'https:' && evidence.supports.length && /^\d{4}-\d{2}-\d{2}$/.test(evidence.checkedAt), `Invalid evidence: ${paper.id}`);
  if (notes.classificationReview) {
    const review = notes.classificationReview;
    assert(/^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt) && review.rationale.trim(), `Missing classification rationale: ${paper.id}`);
    assert(['catalog_evidence', 'catalog_and_primary_source'].includes(review.basis), `Unknown classification evidence basis: ${paper.id}`);
    assert(notes.categoryIds.some(id => categories.find(category => category.id === id)?.dimension === 'task'), `Reviewed paper lacks a research task: ${paper.id}`);
    assert.notEqual(notes.relation, 'pending', `Reviewed paper lacks an optical relationship: ${paper.id}`);
    assert.deepEqual(review.evidenceFields, ['title', 'summary', 'input', 'output', 'mechanism', 'readingNote'], `Incomplete classification evidence: ${paper.id}`);
    assert.equal(review.evidenceDigest, createHash('sha256').update(JSON.stringify(review.evidenceFields.map(field => paper[field]))).digest('hex'), `Classification needs review after evidence changed: ${paper.id}`);
    const sourceUrls = [paper.paper, ...notes.evidence.map(evidence => evidence.url)];
    assert(review.sourceUrls.length && review.sourceUrls.every(url => sourceUrls.includes(url)), `Untraceable classification source: ${paper.id}`);
  }
  for (const version of notes.versions) {
    assert(new URL(version.url).protocol === 'https:' && Number.isInteger(version.year) && version.relation, `Invalid version: ${paper.id}`);
    if (version.arxivId) assert(version.metadataStatus || (version.arxivVersion && version.firstSubmittedAt && version.updatedAt), `Missing arXiv version audit state: ${paper.id}`);
  }
}
// The review has a fixed scope; future additions can still enter as pending.
const classificationAudit = JSON.parse(readFileSync(new URL('../research/hyperspectral/classification-audit.json', import.meta.url)));
assert.equal(new Set(classificationAudit.reviewedPaperIds).size, classificationAudit.reviewedPaperIds.length, 'Duplicate classification audit entry');
for (const id of classificationAudit.reviewedPaperIds) {
  const paper = libraryPapers.find(paper => paper.id === id);
  assert(paper?.library.classificationReview && paper.library.classificationStatus !== 'pending', `Reviewed entry missing its classification: ${id}`);
}
for (const check of classificationAudit.sourceChecks) {
  const paper = libraryPapers.find(paper => paper.id === check.paperId);
  assert(paper.library.evidence.some(evidence => evidence.url === check.url && evidence.level === check.level && check.supports.every(support => evidence.supports.includes(support))), `Classification source check missing: ${check.paperId}`);
}
// Exercise distinctions that motivated this review, not just label existence.
const classificationCases = [
  ['hmat', ['hsi-lidar-classification', 'transformer'], ['surface-reconstruction', 'pointcloud-classification']],
  ['spectralmoe-dgss', ['semantic-segmentation', 'domain-adaptation'], ['hsi-lidar-classification']],
  ['s4dr-net', ['representation-learning', 'pointcloud-classification'], ['surface-reconstruction']],
  ['optimized-cnn-mslidar', ['land-cover-classification'], ['pointcloud-classification']],
  ['mst-cassi', ['spectral-reconstruction', 'transformer'], ['volumetric-imaging', 'computational-imaging']],
  ['hspa-restoration-cvpr', ['volumetric-imaging', 'spectral-data-restoration'], []],
  ['fiducial-hsi-mapping', ['spectral-pointcloud-generation', 'biomedical-imaging'], ['volumetric-imaging']],
  ['understory-hsl', ['soil-property-estimation', 'spectral-radiative-transfer'], ['vegetation-biophysical-estimation']],
  ['leaf-incidence-hsl', ['radiometric-calibration'], ['vegetation-biophysical-estimation']],
  ['satmae-2022', ['representation-learning', 'datasets-benchmarks'], ['spectral-reconstruction']],
  ['dimensional-dilemma', ['spectral-pointcloud-generation', 'pointcloud-classification'], ['datasets-benchmarks']],
];
for (const [id, included, excluded] of classificationCases) {
  const labels = libraryPapers.find(paper => paper.id === id).library.categoryIds;
  assert(included.every(label => labels.includes(label)) && excluded.every(label => !labels.includes(label)), `Classification boundary regression: ${id}`);
}
assert.equal(libraryPapers.find(paper => paper.id === 'spectralnerf').library.relation, 'multispectral');
console.log(`Classification review valid: ${classificationAudit.reviewedPaperIds.length} papers with task assignments and traceable evidence.`);
// Detect cross-entry versions before their counts can be mistaken for separate methods.
const normalizeTitle = value => value.normalize('NFKD').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
function assertDistinctMethods(papers) {
  const identityIndex = new Map();
  for (const paper of papers) {
    const arxiv = paper.paper.match(/arxiv\.org\/(?:abs|pdf)\/(\d{4}\.\d{4,5})/i)?.[1];
    const versionDois = (paper.library?.versions ?? []).map(version => {
      const url = new URL(version.url);
      return version.doi || (url.hostname === 'doi.org' ? decodeURIComponent(url.pathname.slice(1)) : undefined);
    });
    const keys = new Set([
      'title:' + normalizeTitle(paper.title),
      ...[paper.doi, ...versionDois].filter(Boolean).map(doi => 'doi:' + doi.toLowerCase()),
      ...[arxiv, ...(paper.library?.versions ?? []).map(version => version.arxivId)].filter(Boolean).map(id => 'arxiv:' + id),
    ]);
    for (const key of keys) {
      const previous = identityIndex.get(key);
      if (previous && previous.id !== paper.id) {
        assert(previous.library?.methodFamilyId && paper.library?.methodFamilyId, `Duplicate identity needs explicit method-family association: ${key}`);
        assert.equal(previous.library.methodFamilyId, paper.library.methodFamilyId, `Duplicate identity needs explicit method-family association: ${previous.id}/${paper.id}/${key}`);
      }
      identityIndex.set(key, paper);
    }
  }
}
assertDistinctMethods(catalog.papers);
// An earlier publication's DOI must collide with its linked journal method,
// even when the earlier DOI exists only in a version URL.
const versionParent = { id: 'journal', title: 'Journal method', paper: 'https://example.org/journal', library: { methodFamilyId: 'linked', versions: [{ url: 'https://doi.org/10.1117/12.734058' }] } };
const versionChild = { id: 'conference', title: 'Earlier title', paper: 'https://example.org/conference', doi: '10.1117/12.734058', library: { methodFamilyId: 'unlinked', versions: [] } };
assert.throws(() => assertDistinctMethods([versionParent, versionChild]), /Duplicate identity/);
assertDistinctMethods([versionParent, { ...versionChild, library: { ...versionChild.library, methodFamilyId: 'linked' } }]);
console.log('Identity audit valid: normalized titles, DOIs, arXiv IDs and explicit version families.');

// Test union semantics, counts independent of category selection, URL roundtrip, and SVG coverage.
const blank = { query: '', author: '', yearFrom: '', yearTo: '', venues: [], categoryIds: [], pending: false, reading: '' };
assert(matchesAuthor('Janja Avbelj, Rupert Müller', 'MULLER'), 'Author matching ignores case and diacritics');
assert(matchesAuthor('Antonio Plaza; Qian Du', 'Plaza Antonio'), 'Name words may be entered in either order');
assert(!matchesAuthor('Antonio Plaza, Qian Du', 'Antonio Du'), 'Do not combine names of different coauthors');
assert.deepEqual(splitAuthors('Qian Du and Antonio Plaza, et al.'), ['Qian Du', 'Antonio Plaza']);
const authorFixture = libraryPapers.slice(0, 2).map((paper, index) => ({ ...paper,
  authors: index ? 'Qian Du' : 'Antonio Plaza', title: index ? 'Antonio Plaza study' : paper.title,
  year: 2024,
}));
assert.deepEqual(filterLibrary(authorFixture, { ...blank, author: 'Plaza', yearFrom: '2024' }, categories).map(paper => paper.id), [authorFixture[0].id], 'Author filter uses authors only and intersects with years');
assert.equal(filterLibrary(authorFixture, { ...blank, author: 'Plaza', yearFrom: '2025' }, categories).length, 0, 'Year filter may exclude an author match');
assert.equal(readLibraryFilters('?author=Rupert%20M%C3%BCller', categories, libraryPapers).author, 'Rupert Müller', 'Author URL preserves Unicode');
const sortingFixture = [{ id: 'first' }, { id: 'second' }, { id: 'third' }];
assert.deepEqual(sortByPaperCount(sortingFixture, id => id === 'first' ? 1 : 3).map(item => item.id), ['second', 'third', 'first'], 'Sort by descending count with stable ties');
assert.deepEqual(sortingFixture.map(item => item.id), ['first', 'second', 'third'], 'Sorting must not mutate catalog order');
for (const scope of [blank, { ...blank, query: 'LiDAR' }, { ...blank, yearFrom: '2022', venues: ['CVPR'] }]) {
  const base = filterLibrary(libraryPapers, scope, categories, true);
  const count = id => base.filter(paper => paper.library.categoryIds.includes(id)).length;
  const sorted = sortByPaperCount(categories.filter(category => category.dimension === 'task'), count);
  assert(sorted.every((category, index) => index === 0 || count(sorted[index - 1].id) >= count(category.id)), 'Tasks must follow current filtered counts');
}
const present = libraryPresentation(categories);
assert.equal(filterLibrary(libraryPapers, blank, categories).length, libraryPapers.length);
const layout = timelineLayout(libraryPapers, present);
assert.equal(layout.lanes.flatMap(lane => lane.stations).length, libraryPapers.length, 'Library SVG dropped papers');
for (const category of categories) {
  const result = filterLibrary(libraryPapers, { ...blank, categoryIds: [category.id] }, categories);
  assert.deepEqual(result.map(paper => paper.id).sort(), libraryPapers.filter(paper => paper.library.categoryIds.includes(category.id)).map(paper => paper.id).sort());
}
const chosen = categories.slice(0, 2).map(category => category.id);
const union = filterLibrary(libraryPapers, { ...blank, categoryIds: chosen }, categories);
assert.equal(union.length, new Set(union.map(paper => paper.id)).size);
assert.equal(union.length, libraryPapers.filter(paper => paper.library.categoryIds.some(id => chosen.includes(id))).length, 'Category selections must use union');
assert.equal(filterLibrary(libraryPapers, { ...blank, pending: true }, categories).length, libraryPapers.filter(paper => !paper.library.categoryIds.length).length);
assert.equal(filterLibrary(libraryPapers, { ...blank, categoryIds: chosen }, categories, true).length, libraryPapers.length);
const parsed = readLibraryFilters('?category=' + chosen.join('&category=') + '&venue=CVPR&venue=arXiv&yearFrom=2024&yearTo=2022', categories, libraryPapers);
assert.deepEqual(parsed.categoryIds, chosen);
assert.deepEqual(parsed.venues, ['CVPR', 'arXiv']);
assert.equal(parsed.yearFrom, '2022'); assert.equal(parsed.yearTo, '2024');
const survey = JSON.parse(readFileSync(new URL('../research/hyperspectral/survey.json', import.meta.url)));
for (const candidate of survey.candidates) {
  assert(['pending', 'included', 'excluded', 'duplicate'].includes(candidate.decision) && candidate.reason, 'Candidate needs explicit decision and reason');
  if (['included', 'duplicate'].includes(candidate.decision)) assert(ids.has(candidate.paperId), 'Included candidate must resolve to catalog');
  if (candidate.decision !== 'pending') assert(candidate.evidencePath && existsSync(new URL('../' + candidate.evidencePath, import.meta.url)), 'Reviewed candidate needs saved source evidence');
}
for (const search of survey.searches) {
  assert(search.keywords.length && search.pagination && search.gaps.length, 'Search audit needs keywords, pagination, and gaps');
  if (search.status === 'keyword_candidates_reviewed') {
    const candidates = survey.candidates.filter(candidate => candidate.searchId === search.id);
    assert.equal(candidates.length, search.candidateCount);
    assert.equal(candidates.filter(candidate => candidate.decision !== 'pending').length, search.reviewedCount);
    assert.equal(search.reviewedCount, search.candidateCount, 'Completed keyword review has pending decisions');
  }
}
console.log(`Library valid: ${libraryPapers.length} entries, ${categories.length} labels; original ${topicPapers.length} topic members preserved; multi-label filters and export verified.`);
