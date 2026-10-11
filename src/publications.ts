import policy from './data/collection-policy.json' with { type: 'json' };

/** Normalize display/filter names without rewriting publisher names or BibTeX. */
export function canonicalVenue(venue: string): string {
  return (policy.venueAliases as Record<string, string>)[venue] ?? venue;
}

export function allowedPublication(venue: string): boolean {
  const canonical = canonicalVenue(venue);
  return canonical === policy.preprintVenue || policy.allowedVenues.includes(canonical);
}

export type PublicationScope = 'whitelist' | 'arxiv' | 'outside';
export const publicationScopeLabels: Record<PublicationScope, string> = {
  whitelist: '顶会顶刊（白名单）',
  arxiv: 'arXiv预印本',
  outside: '白名单外（周峻专项）',
};

/** Classify the recorded publication venue, not links to alternative versions. */
export function publicationScope(venue: string): PublicationScope {
  const canonical = canonicalVenue(venue);
  if (canonical === policy.preprintVenue) return 'arxiv';
  return policy.allowedVenues.includes(canonical) ? 'whitelist' : 'outside';
}
