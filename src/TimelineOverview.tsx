import { useState, type CSSProperties } from 'react';
import { groupPapers } from './map-groups';
import type { Paper } from './types';

export function TimelineOverview({ papers, onSelect, onDetail }: {
  papers: Paper[]; onSelect: (paper: Paper) => void; onDetail: () => void;
}) {
  const [expandedCells, setExpandedCells] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const groups = groupPapers(papers, 'track');
  const years = [...new Set(papers.map(paper => paper.year))].sort((a, b) => a - b);
  const latest = years.at(-1) ?? new Date().getFullYear();
  const earliest = years[0] ?? latest;
  // Periods keep the overview within the page width; column widths do not encode duration.
  const ranges = [
    [earliest, latest - 7], [Math.max(earliest, latest - 6), latest - 3],
    ...Array.from({ length: 3 }, (_, index) => [latest - 2 + index, latest - 2 + index]),
  ].filter(([start, end]) => start <= end && years.some(year => year >= start && year <= end));
  const columns = ranges.map(([start, end]) => ({ start, end, label: start === end ? String(start) : `${start}–${end}` }));
  const toggleCell = (id: string) => setExpandedCells(previous => {
    const next = new Set(previous);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  return <div className="timeline-overview" style={{ '--periods': columns.length } as CSSProperties}>
    <div className="overview-toolbar">
      <div><span className="overview-kicker">RESEARCH THROUGH TIME</span><h3>一张图，看清研究方向与时间</h3><p>{groups.length} 个方向 · {papers.length} 篇论文 · 点击论文查看详情</p></div>
      <div className="overview-actions"><button aria-pressed={showAll} onClick={() => { setShowAll(value => !value); setExpandedCells(new Set()); }}>{showAll ? '收起为全景' : '展开全部论文'}</button><button className="overview-advanced" onClick={onDetail}>详细图 / 导出 ↗</button></div>
    </div>
    <div className="overview-key"><span><i className="core-marker"/>核心研究</span><span><i className="related-marker"/>相关研究</span><p>每格先显示 1 篇，优先核心研究、再按年份从新到旧；点击「+ 篇数」展开。</p></div>
    <div className="overview-matrix">
      <div className="overview-axis" aria-hidden="true"><span>研究方向 <small>从左到右看时间</small></span>{columns.map(column => <span key={column.start}>{column.label}</span>)}</div>
      <div className="overview-routes" aria-label={`${papers.length} 篇论文的时间轴总览`}>
        {groups.map((group, index) => <section key={group.id} className="overview-route" aria-label={group.name} style={{ '--route': group.color } as CSSProperties}>
          <div className="overview-route-name"><span>{String(index + 1).padStart(2, '0')}</span><div><strong title={group.description}>{group.name}</strong><small>{group.papers.length} 篇论文</small></div></div>
          {columns.map(column => {
            const cell = group.papers.filter(paper => paper.year >= column.start && paper.year <= column.end)
              .sort((a, b) => Number(b.scope === '核心研究') - Number(a.scope === '核心研究') || b.year - a.year || a.shortTitle.localeCompare(b.shortTitle));
            const id = `${group.id}-${column.start}`;
            const expanded = showAll || expandedCells.has(id);
            const visible = expanded ? cell : cell.slice(0, 1);
            return <div key={column.start} className={`overview-cell${cell.length ? ' has-papers' : ''}`}>
              <span className="overview-mobile-period">{column.label}<small>{cell.length} 篇</small></span>
              <div id={`papers-${id}`} className="overview-cell-papers">
                {visible.map(paper => <button key={paper.id} className={`overview-paper${paper.scope === '核心研究' ? ' is-core' : ''}`} data-overview-paper={paper.id}
                  aria-label={`${paper.shortTitle}，${paper.venue} ${paper.year}，${paper.scope}，查看详情`}
                  title={`${paper.title} · ${paper.scope}`} onClick={() => onSelect(paper)}>
                  <i aria-hidden="true"/><div><strong>{paper.shortTitle}</strong><span>{paper.venue} · {paper.year}</span></div>
                </button>)}
              </div>
              {cell.length > 1 && !showAll && <button className="overview-more" aria-expanded={expanded} aria-controls={`papers-${id}`} aria-label={`${group.name} ${column.label}，${expanded ? '收起论文' : `展开其余 ${cell.length - 1} 篇论文`}`} onClick={() => toggleCell(id)}>{expanded ? '收起 −' : `+ ${cell.length - 1} 篇`}</button>}
              {!cell.length && <span className="overview-empty" aria-label="该阶段暂无收录论文">—</span>}
            </div>;
          })}
        </section>)}
      </div>
    </div>
    <div className="overview-footer"><span>早期合并为阶段 · 列宽不表示时长 · 方向归类不表示方法继承</span><span>篇数仅表示当前收录分布</span></div>
  </div>;
}
