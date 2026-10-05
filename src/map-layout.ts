import type { Paper } from './types';
import { tracks } from './tracks.ts';

// Use the complete catalog so filtering never moves a paper to another year.
export function createMapLayout(papers: Paper[]) {
  const positions = new Map<string, number>();
  const years: { year: number; x: number; start: number; end: number }[] = [];
  let cursor = 290;
  for (const year of [...new Set(papers.map(p => p.year))].sort((a, b) => a - b)) {
    const groups = tracks.map(t => papers.filter(p => p.year === year && p.track === t.id)
      .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle)));
    const columns = Math.max(1, ...groups.map(group => group.length));
    const width = columns * 180;
    groups.forEach(group => group.forEach((p, i) => positions.set(p.id, cursor + 90 + i * 180)));
    years.push({ year, x: cursor + width / 2, start: cursor, end: cursor + width });
    cursor += width + 60;
  }
  return { positions, years, width: Math.max(1080, cursor + 30), height: 94 + (tracks.length - 1) * 78 + 70 };
}
