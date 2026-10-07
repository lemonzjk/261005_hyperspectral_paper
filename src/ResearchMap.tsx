import { TimelineOverview } from './TimelineOverview';
import { timelineLayout } from './timeline-layout';
import type { Paper, PresentPaper } from './types';

/** Browsing follows document scrolling; the complete annual diagram is an export. */
export function ResearchMap({ papers, onSelect, present, filename = 'hs3d-research-timeline.svg' }: { papers: Paper[]; onSelect: (paper: Paper) => void; present?: PresentPaper; filename?: string }) {
  const exportSvg = () => {
    const layout = timelineLayout(papers, present);
    const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]!);
    const content = `<svg xmlns="http://www.w3.org/2000/svg" width="${layout.width}" height="${layout.height}" viewBox="0 0 ${layout.width} ${layout.height}">
      <rect width="100%" height="100%" fill="white"/>
      <g font-family="Arial, Microsoft YaHei, sans-serif">
      <text x="28" y="47" fill="#456052" font-size="14">研究方向 / 发表年份</text>
      ${layout.columns.map(column => `<text x="${column.x + column.width / 2}" y="47" text-anchor="middle" fill="#294b3b" font-size="16">${column.year}</text><path d="M${column.x} 65V${layout.height - 55}" stroke="#e6ece8"/>`).join('')}
      ${layout.lanes.map(lane => `<text x="28" y="${lane.y}" fill="${lane.color}" font-size="15">${escape(lane.name)}</text><path d="${lane.route}" fill="none" stroke="${lane.color}" stroke-width="2"/>${lane.stations.map(({ paper, x, y }) => `<g><title>${escape(paper.title)}</title><circle cx="${x}" cy="${y}" r="5" fill="white" stroke="${lane.color}" stroke-width="2"/><text x="${x}" y="${y - 32}" text-anchor="middle" fill="#263d32" font-size="12">${escape(paper.shortTitle.length > 22 ? paper.shortTitle.slice(0, 21) + '…' : paper.shortTitle)}</text><text x="${x}" y="${y - 14}" text-anchor="middle" fill="#64786b" font-size="10">${escape(paper.venue)} · ${paper.year}</text></g>`).join('')}`).join('')}
      <text x="28" y="${layout.height - 25}" fill="#64786b" font-size="12">同一线路用于组织阅读，不表示直接继承关系 · 论文年份以收录版本为准</text>
      </g></svg>`;
    const url = URL.createObjectURL(new Blob([content], { type: 'image/svg+xml' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <TimelineOverview key={papers.map(paper => paper.id).join(',')} papers={papers} onSelect={onSelect} onDetail={exportSvg} present={present}/>;
}
