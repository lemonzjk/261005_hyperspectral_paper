export type TrackId = 'capture' | 'geometry' | 'rendering' | 'materials' | 'understanding' | 'active' | 'lightfield' | 'lidar' | 'pointcloud' | 'registration' | 'fusion' | 'holography' | 'volumetric';
export interface FrameworkFigure {
  path: string; figureLabel: string; caption: string; sourceUrl: string;
  imageUrl?: string; page?: number; width: number; height: number;
  verifiedAt?: string; uploadedAt?: string; verificationStatus?: 'pending' | 'verified'; sha256: string; attribution: string; verificationNote: string;
}
export interface Paper {
  id: string; shortTitle: string; title: string; authors: string; year: number;
  venue: string; track?: TrackId; representation: string; scope?: string;
  collections: ('hs3d' | 'hyperspectral')[];
  library?: LibraryNotes;
  tags: string[]; summary: string; input: string; output: string; mechanism: string;
  readingNote: string; paper: string; code?: string; verifiedAt: string;
  citation: string; mapX?: number;
  doi?: string; publicationName?: string; publicationTrack?: string; verificationLevel?: string;
  publicationStatus?: string; venueTier?: string; frameworkFigures?: FrameworkFigure[];
  frameworkFigureHistory?: { figure: FrameworkFigure; replacedAt: string; replacementPath: string }[];
  frameworkFigureSearch?: { status: 'pending' | 'needs_access' | 'no_framework'; note: string; sourceUrl: string; checkedAt: string };
}
export interface Dataset {
  id: string; name: string; subtitle: string; type: string; description: string;
  facts: { label: string; value: string }[]; paperIds: string[]; source: string;
  availability: string;
}

export interface LibraryCategory {
  id: string; name: string; dimension: 'task' | 'method' | 'application';
  definition: string; status: 'provisional' | 'confirmed' | 'retired';
  color: string; createdAt: string; rationale: string; evidencePaperIds: string[];
  history: { date: string; action: string; reason: string; redirectTo?: string[] }[];
}
export interface LibraryNotes {
  categoryIds: string[]; classificationStatus: 'pending' | 'provisional' | 'confirmed';
  classificationReview?: {
    reviewedAt: string; basis: 'catalog_evidence' | 'catalog_and_primary_source'; rationale: string;
    evidenceFields: string[]; evidenceDigest: string; sourceUrls: string[];
  };
  relation: 'hyperspectral' | 'multispectral' | 'foundation' | 'pending'; relationNote: string;
  readingProgress: 'title_only' | 'abstract_read' | 'full_text_read' | 'pending';
  verificationStatus: 'pending' | 'abstract_verified' | 'full_text_verified';
  researchQuestion: string; datasets: string; experimentSetting: string;
  conclusions: string; limitations: string; dataLinks: string[];
  evidence: { url: string; checkedAt: string; level: string; supports: string[] }[];
  versions: { id: string; type: string; url: string; year: number; relation: string;
    doi?: string;
    arxivId?: string; arxivVersion?: string; firstSubmittedAt?: string; updatedAt?: string;
    metadataStatus?: string }[];
  methodFamilyId: string;
}
export interface PaperPresentation { name: string; color: string; scope: string; groupId: string }
export type PresentPaper = (paper: Paper) => PaperPresentation;
