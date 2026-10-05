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
    const y = 115 + index * 78;
    const stations = columns.flatMap(column => {
      const sameYear = group.papers.filter(p => p.year === column.year).sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
      return sameYear.map((paper, slot) => ({ paper, x: column.x + (slot + .5) * column.width / sameYear.length, y }));
    });
    // Small parallel offsets create metro-style bends without implying citations.
    const routed = stations.map((station, index) => ({ ...station, y: y + (index % 3 === 1 ? 12 : 0) }));
    const route = routed.map((station, index) => {
      if (!index) return `M${station.x - 24} ${station.y + 24} L${station.x} ${station.y}`;
      const previous = routed[index - 1];
      const bend = Math.min(24, (station.x - previous.x) / 3);
      return `H${station.x - bend} L${station.x} ${station.y}`;
    }).join(' ') + (routed.length ? ' l24 -24' : '');
    return { ...group, y, stations: routed, route };
  });
  return { columns, lanes, width: cursor + 80, height: Math.max(360, 175 + groups.length * 78) };
}
