import policy from './data/collection-policy.json' with { type: 'json' };

/** Normalize display/filter names without rewriting publisher names or BibTeX. */
export function canonicalVenue(venue: string): string {
  return (policy.venueAliases as Record<string, string>)[venue] ?? venue;
}

export function allowedPublication(venue: string): boolean {
  const canonical = canonicalVenue(venue);
  return canonical === policy.preprintVenue || policy.allowedVenues.includes(canonical);
}
