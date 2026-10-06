import type { CSSProperties } from 'react';
import { groupPapers } from './map-groups';
import type { Paper } from './types';

export function TimelineOverview({ papers, onSelect, onDetail }: {
  papers: Paper[]; onSelect: (paper: Paper) => void; onDetail: () => void;
}) {
  const groups = groupPapers(papers, 'track');
  const years = [...new Set(papers.map(paper => paper.year))].sort((a, b) => a - b);
  const latest = years.at(-1) ?? new Date().getFullYear();
  const earliest = years[0] ?? latest;
  // Earlier work is grouped into periods so paper titles retain room to breathe.
  const ranges = [
    [earliest, latest - 7], [Math.max(earliest, latest - 6), latest - 3],
    ...Array.from({ length: 3 }, (_, index) => [latest - 2 + index, latest - 2 + index]),
  ].filter(([start, end]) => start <= end && years.some(year => year >= start && year <= end));
  const columns = ranges.map(([start, end]) => ({ start, end, label: start === end ? String(start) : `${start}–${end}` }));
  return <div className="timeline-overview" style={{ '--periods': columns.length } as CSSProperties}>
    <div className="overview-toolbar">
      <div><strong>高光谱三维视觉 · 研究时间轴</strong><p>{groups.length} 个方向 · {papers.length} 篇论文 · 点击论文查看方法与来源</p></div>
      <button onClick={onDetail}>展开详细时间轴 ↗</button>
    </div>
    <div className="overview-axis" aria-hidden="true"><span>研究方向</span>{columns.map(column => <span key={column.start}>{column.label}</span>)}</div>
    <div className="overview-routes" aria-label={`${papers.length} 篇论文的时间轴总览`}>
      {groups.map((group, index) => <section key={group.id} className="overview-route" aria-label={group.name} style={{ '--route': group.color } as CSSProperties}>
        <div className="overview-route-name"><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{group.name}</strong><p>{group.description}</p><small>{group.papers.length} 篇论文</small></div></div>
        {columns.map(column => {
          const cell = group.papers.filter(paper => paper.year >= column.start && paper.year <= column.end)
            .sort((a, b) => a.year - b.year || a.shortTitle.localeCompare(b.shortTitle));
          return <div key={column.start} className={`overview-cell${cell.length ? ' has-papers' : ''}`}>
            <span className="overview-mobile-period">{column.label}</span>
            {cell.map(paper => <button key={paper.id} className="overview-paper" data-overview-paper={paper.id}
              aria-label={`${paper.shortTitle}，${paper.venue} ${paper.year}，查看详情`}
              title={paper.title} onClick={() => onSelect(paper)}>
              <strong>{paper.shortTitle}</strong><span>{paper.venue} · {paper.year}</span>
            </button>)}
            {!cell.length && <span className="overview-empty" aria-label="该阶段暂无收录论文">—</span>}
          </div>;
        })}
      </section>)}
    </div>
    <div className="overview-footer"><span>全部论文直接展示 · 从左到右看时间，从上到下看方向</span><span>早期按阶段合并，列宽不表示时长 · 方向归类不表示方法继承</span></div>
  </div>;
}
