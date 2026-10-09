/** Keep names as recorded; do not infer identities from initials or similar spellings. */
export const splitAuthors = (authors: string): string[] => authors
  .split(/\s*(?:[,;，；]|\band\b)\s*/i)
  .map(name => name.trim())
  .filter(name => name && !/^(?:et\s+al\.?|等|待核验|unknown)$/i.test(name));

const normalize = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().trim();
const nameKey = (value: string) => normalize(value).split(/\s+/).sort().join(' ');

/** All query words must match one author, never different coauthors or the title. */
export function matchesAuthor(authors: string, query: string): boolean {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  return !words.length || splitAuthors(authors).some(name => words.every(word => normalize(name).includes(word)));
}

/** A recognized complete name takes precedence over partial-name matching. */
export function createAuthorMatcher(query: string, papers: readonly { authors: string }[]) {
  const key = nameKey(query);
  const exact = Boolean(key) && papers.some(paper => splitAuthors(paper.authors).some(name => nameKey(name) === key));
  return (authors: string) => exact
    ? splitAuthors(authors).some(name => nameKey(name) === key)
    : matchesAuthor(authors, query);
}

/** Complete author names in the main search must not match unrelated coauthors. */
export function createPaperQueryMatcher(query: string, papers: readonly { authors: string }[]) {
  const key = nameKey(query);
  const exactAuthor = Boolean(key) && papers.some(paper => splitAuthors(paper.authors).some(name => nameKey(name) === key));
  const words = query.trim().toLowerCase().split(/\s+/);
  return (authors: string, text: string) => exactAuthor
    ? splitAuthors(authors).some(name => nameKey(name) === key)
    : words.every(word => text.toLowerCase().includes(word));
}
