import type { Paper } from './types';
import { tracks } from './tracks.ts';

export type Grouping = 'track' | 'year';
export interface PaperGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  papers: Paper[];
}

export function groupPapers(papers: Paper[], grouping: Grouping): PaperGroup[] {
  const sorted = [...papers].sort((a, b) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle));
  if (grouping === 'year') {
    return [...new Set(sorted.map(p => p.year))].map(year => ({
      id: String(year), name: String(year), description: '同年发表的研究', color: '#258477',
      papers: sorted.filter(p => p.year === year),
    }));
  }
  const order = ['rendering', 'active', 'lightfield', 'geometry', 'materials', 'pointcloud', 'lidar', 'registration', 'capture', 'understanding', 'holography', 'fusion'];
  return [...tracks].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    .map(track => ({ ...track, papers: sorted.filter(p => p.track === track.id) }))
    .filter(group => group.papers.length);
}
