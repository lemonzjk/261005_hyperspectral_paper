import type { LibraryCategory, Paper, PresentPaper } from './types';
import { createAuthorMatcher, createPaperQueryMatcher } from './authors.ts';
import { canonicalVenue } from './publications.ts';
import { materialStatus } from './materials.ts';

/** Stable sorting preserves catalog order when paper counts are equal. */
export const sortByPaperCount = <T extends { id: string }>(items: T[], count: (id: string) => number): T[] =>
  [...items].sort((a, b) => count(b.id) - count(a.id));

export const libraryPresentation = (categories: LibraryCategory[]): PresentPaper => paper => {
  const labels = categories.filter(category => paper.library?.categoryIds.includes(category.id));
  return {
    name: labels.map(category => category.name).join(' · ') || '待分类',
    color: labels[0]?.color ?? '#999999',
    groupId: labels.map(category => category.id).sort().join('+') || 'pending',
    scope: { hyperspectral: '高光谱研究', multispectral: '多光谱关联', foundation: '基础方法', pending: '关系待核验' }[paper.library?.relation ?? 'pending'],
  };
};

export interface LibraryFilters {
  query: string; author: string; yearFrom: string; yearTo: string; venues: string[];
  categoryIds: string[]; pending: boolean; reading: string; materials?: string;
}

/** Categories use union; other filter dimensions use intersection. */
export function filterLibrary(papers: Paper[], filters: LibraryFilters, categories: LibraryCategory[], excludeCategories = false) {
  const present = libraryPresentation(categories);
  const authorMatches = createAuthorMatcher(filters.author, papers);
  const queryMatches = createPaperQueryMatcher(filters.query, papers);
  return papers.filter(paper => paper.collections.includes('hyperspectral') &&
    (!filters.yearFrom || paper.year >= Number(filters.yearFrom)) &&
    (!filters.yearTo || paper.year <= Number(filters.yearTo)) &&
    (!filters.venues.length || filters.venues.includes(paper.venue)) &&
    (!filters.reading || paper.library?.readingProgress === filters.reading) &&
    (!filters.materials || materialStatus(paper) === filters.materials) &&
    authorMatches(paper.authors) &&
    queryMatches(paper.authors,
      `${paper.title} ${paper.shortTitle} ${paper.authors} ${paper.summary} ${paper.venue} ${paper.doi ?? ''} ${paper.tags.join(' ')} ${present(paper).name} ${paper.library?.researchQuestion ?? ''}`) &&
    (excludeCategories || (filters.pending ? !paper.library?.categoryIds.length :
      !filters.categoryIds.length || filters.categoryIds.some(id => paper.library?.categoryIds.includes(id))))
  ).sort((a, b) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle));
}

export function readLibraryFilters(search: string, categories: LibraryCategory[], papers: Paper[]): LibraryFilters {
  const params = new URLSearchParams(search);
  const year = (key: string) => /^\d{4}$/.test(params.get(key) ?? '') ? params.get(key)! : '';
  let yearFrom = year('yearFrom') || year('year');
  let yearTo = year('yearTo') || year('year');
  if (yearFrom && yearTo && Number(yearFrom) > Number(yearTo)) [yearFrom, yearTo] = [yearTo, yearFrom];
  const pending = params.get('classification') === 'pending';
  return { query: params.get('q') ?? '', author: params.get('author') ?? '', yearFrom, yearTo,
    venues: [...new Set(params.getAll('venue').map(canonicalVenue).filter(venue => papers.some(paper => paper.venue === venue)))],
    categoryIds: pending ? [] : [...new Set(params.getAll('category').filter(id => categories.some(category => category.id === id)))],
    pending, reading: ['pending', 'title_only', 'abstract_read', 'full_text_read'].includes(params.get('reading') ?? '') ? params.get('reading')! : '',
    materials: ['full_text', 'partial_text', 'figures', 'restricted', 'pending'].includes(params.get('materials') ?? '') ? params.get('materials')! : '',
  };
}
