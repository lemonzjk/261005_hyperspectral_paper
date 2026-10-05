export type TrackId = 'capture' | 'geometry' | 'rendering' | 'materials' | 'understanding';
export interface Paper {
  id: string; shortTitle: string; title: string; authors: string; year: number;
  venue: string; track: TrackId; representation: string; scope: string;
  tags: string[]; summary: string; input: string; output: string; mechanism: string;
  readingNote: string; paper: string; code?: string; verifiedAt: string;
  citation: string; mapX: number;
}
export interface Dataset {
  id: string; name: string; subtitle: string; type: string; description: string;
  facts: { label: string; value: string }[]; paperIds: string[]; source: string;
  availability: string;
}
