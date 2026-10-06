import { useRef, type CSSProperties } from 'react';
import { groupPapers } from './map-groups';
import type { Paper } from './types';

export function TimelineOverview({ papers, onSelect, onDetail }: {
  papers: Paper[]; onSelect: (paper: Paper) => void; onDetail: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
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
  const jumpTo = (groupId: string, start: number) => {
    const cell = root.current?.querySelector<HTMLElement>(`[data-period-cell="${groupId}-${start}"]`);
    cell?.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    cell?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
  };
  return <div ref={root} className="timeline-overview" style={{ '--periods': columns.length } as CSSProperties}>
    <div className="overview-toolbar">
      <div><strong>高光谱三维视觉 · 研究时间轴</strong><p>{groups.length} 个方向 · {papers.length} 篇论文 · 点击论文查看方法与来源</p></div>
      <button onClick={onDetail}>展开详细时间轴 ↗</button>
    </div>
    <section className="atlas-glance" aria-label="研究方向与时间全景">
      <div className="glance-heading"><h3>先看全景</h3><p>颜色对应方向 · 数字为收录篇数 · 点击色块定位论文</p></div>
      <div className="glance-axis"><span>研究方向</span>{columns.map(column => <span key={column.start}>{column.label}</span>)}</div>
      {groups.map(group => <div className="glance-row" key={group.id} style={{ '--route': group.color } as CSSProperties}>
        <div className="glance-name"><i/><strong>{group.name}</strong><small>{group.papers.length}</small></div>
        {columns.map(column => {
          const cell = group.papers.filter(paper => paper.year >= column.start && paper.year <= column.end);
          return cell.length ? <button key={column.start} className="glance-cell" style={{ '--strength': Math.min(55, 12 + cell.length * 4) + '%' } as CSSProperties}
            aria-label={`${group.name}，${column.label}，${cell.length} 篇，定位论文`} onClick={() => jumpTo(group.id, column.start)}>
            <b>{cell.length}</b><span>篇</span>
          </button> : <span key={column.start} className="glance-gap" aria-label={`${column.label} 暂无收录`}>—</span>;
        })}
      </div>)}
      <p className="glance-note">反映当前收录分布，不代表领域规模。早期合并为阶段，列宽不表示时长。</p>
    </section>
    <div className="overview-reading-heading"><h3>沿时间轴读论文</h3><span>简称、会议与年份直接可见，点击查看详情</span></div>
    <div className="overview-axis" aria-hidden="true"><span>研究方向</span>{columns.map(column => <span key={column.start}>{column.label}</span>)}</div>
    <div className="overview-routes" aria-label={`${papers.length} 篇论文的时间轴总览`}>
      {groups.map((group, index) => <section key={group.id} className="overview-route" aria-label={group.name} style={{ '--route': group.color } as CSSProperties}>
        <div className="overview-route-name"><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{group.name}</strong><p>{group.description}</p><small>{group.papers.length} 篇论文</small></div></div>
        {columns.map(column => {
          const cell = group.papers.filter(paper => paper.year >= column.start && paper.year <= column.end)
            .sort((a, b) => a.year - b.year || a.shortTitle.localeCompare(b.shortTitle));
          return <div key={column.start} data-period-cell={`${group.id}-${column.start}`} className={`overview-cell${cell.length ? ' has-papers' : ''}`}>
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
