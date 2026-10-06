export type TrackId = 'capture' | 'geometry' | 'rendering' | 'materials' | 'understanding' | 'active' | 'lightfield' | 'lidar' | 'pointcloud' | 'registration' | 'fusion' | 'holography' | 'volumetric';
export interface FrameworkFigure {
  path: string; figureLabel: string; caption: string; sourceUrl: string;
  imageUrl?: string; page?: number; width: number; height: number;
  verifiedAt: string; sha256: string; attribution: string; verificationNote: string;
}
export interface Paper {
  id: string; shortTitle: string; title: string; authors: string; year: number;
  venue: string; track: TrackId; representation: string; scope: string;
  tags: string[]; summary: string; input: string; output: string; mechanism: string;
  readingNote: string; paper: string; code?: string; verifiedAt: string;
  citation: string; mapX?: number;
  doi?: string; publicationName?: string; verificationLevel?: string;
  publicationStatus?: string; venueTier?: string; frameworkFigures?: FrameworkFigure[];
  frameworkFigureSearch?: { status: 'pending' | 'needs_access' | 'no_framework'; note: string; sourceUrl: string; checkedAt: string };
}
export interface Dataset {
  id: string; name: string; subtitle: string; type: string; description: string;
  facts: { label: string; value: string }[]; paperIds: string[]; source: string;
  availability: string;
}
