import type { Paper } from './types';
import { groupPapers } from './map-groups.ts';

/** Year spacing expands with publication density so station labels never overlap. */
export function timelineLayout(papers: Paper[]) {
  const groups = groupPapers(papers, 'track');
  const years = [...new Set(papers.map(p => p.year))].sort((a, b) => a - b);
  let cursor = 260;
  const columns = years.map(year => {
    const density = Math.max(1, ...groups.map(g => g.papers.filter(p => p.year === year).length));
    const width = Math.max(150, density * 180);
    const column = { year, x: cursor, width };
    cursor += width;
    return column;
  });
  const lanes = groups.map((group, index) => {
    const y = 140 + index * 105;
    const stations = columns.flatMap(column => {
      const sameYear = group.papers.filter(p => p.year === column.year).sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
      return sameYear.map((paper, slot) => ({ paper, x: column.x + (slot + .5) * column.width / sameYear.length, y }));
    });
    return { ...group, y, stations };
  });
  return { columns, lanes, width: cursor + 80, height: Math.max(360, 220 + groups.length * 105) };
}
