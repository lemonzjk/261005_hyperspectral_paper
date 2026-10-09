/** Keep names as recorded; do not infer identities from initials or similar spellings. */
export const splitAuthors = (authors: string): string[] => authors
  .split(/\s*(?:[,;，；]|\band\b)\s*/i)
  .map(name => name.trim())
  .filter(name => name && !/^(?:et\s+al\.?|等|待核验|unknown)$/i.test(name));

const normalize = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase().trim();

/** All query words must match one author, never different coauthors or the title. */
export function matchesAuthor(authors: string, query: string): boolean {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  return !words.length || splitAuthors(authors).some(name => words.every(word => normalize(name).includes(word)));
}
