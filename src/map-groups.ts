import type { Paper, PresentPaper } from './types';
import { tracks } from './tracks.ts';

export type Grouping = 'track' | 'year';
export interface PaperGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  papers: Paper[];
}

export function groupPapers(papers: Paper[], grouping: Grouping, present?: PresentPaper): PaperGroup[] {
  const sorted = [...papers].sort((a, b) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle));
  if (grouping === 'year') {
    return [...new Set(sorted.map(p => p.year))].map(year => ({
      id: String(year), name: String(year), description: '同年发表的研究', color: '#258477',
      papers: sorted.filter(p => p.year === year),
    }));
  }
  if (present) {
    const labels = new Map(sorted.map(p => [present(p).groupId, present(p)]));
    return [...labels].map(([id, label]) => ({ id, name: label.name, color: label.color, description: '按分类组织阅读', papers: sorted.filter(p => present(p).groupId === id) }));
  }
  const order = ['rendering', 'active', 'lightfield', 'geometry', 'materials', 'pointcloud', 'lidar', 'registration', 'capture', 'understanding', 'holography', 'volumetric', 'fusion'];
  return [...tracks].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    .map(track => ({ ...track, papers: sorted.filter(p => p.track === track.id) }))
    .filter(group => group.papers.length);
}
