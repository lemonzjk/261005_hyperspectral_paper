import { useState, type CSSProperties } from 'react';
import { groupPapers } from './map-groups';
import type { Paper } from './types';

export function TimelineOverview({ papers, onSelect, onDetail }: {
  papers: Paper[]; onSelect: (paper: Paper) => void; onDetail: () => void;
}) {
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
  return <div className={`timeline-overview${showAll ? ' show-all' : ' is-glance'}`} style={{ '--periods': columns.length } as CSSProperties}>
    <div className="overview-toolbar">
      <div><span className="overview-kicker">RESEARCH THROUGH TIME</span><h3>沿时间，读懂每个研究方向</h3><p>{groups.length} 个方向 · {papers.length} 篇论文 · {showAll ? '全部展示' : '每阶段显示代表论文'} · 点击论文查看详情</p></div>
      <div className="overview-actions"><div className="overview-density" role="group" aria-label="时间轴展示密度"><button aria-pressed={!showAll} onClick={() => setShowAll(false)}>方向全景</button><button aria-pressed={showAll} onClick={() => setShowAll(true)}>全部论文</button></div><button className="overview-advanced" onClick={onDetail}>详细图 / 导出 ↗</button></div>
    </div>
    <div className="overview-key"><span><i className="core-marker"/>核心研究</span><span><i className="related-marker"/>相关研究</span><p>横向看时间，纵向看方向；圆点核心、方点相关。</p></div>
    <div className="overview-matrix">
      <div className="overview-axis" aria-hidden="true"><span>研究方向 <small>从左到右看时间</small></span>{columns.map(column => <span key={column.start}>{column.label}</span>)}</div>
      <div className="overview-routes" aria-label={`${papers.length} 篇论文的时间轴总览`}>
        {groups.map((group, index) => <section key={group.id} className="overview-route" aria-label={group.name} style={{ '--route': group.color } as CSSProperties}>
          <div className="overview-route-name"><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{group.name}</strong><p>{group.description}</p><small>{group.papers.length} 篇论文</small></div></div>
          {columns.map(column => {
            const cell = group.papers.filter(paper => paper.year >= column.start && paper.year <= column.end)
              .sort((a, b) => a.year - b.year || a.shortTitle.localeCompare(b.shortTitle));
            return <div key={column.start} className={`overview-cell${cell.length ? ' has-papers' : ''}`}>
              <span className="overview-cell-heading"><span>{column.label}</span><button disabled={!cell.length || showAll} aria-label={`${group.name} ${column.label}，查看全部 ${cell.length} 篇论文`} onClick={() => setShowAll(true)}>{cell.length ? `${cell.length} 篇` : ''}</button></span>
              <div className="overview-cell-papers">
                {(showAll ? cell : [...cell].sort((a, b) => Number(b.scope === '核心研究') - Number(a.scope === '核心研究') || b.year - a.year || a.shortTitle.localeCompare(b.shortTitle)).slice(0, 1)).map(paper => <button key={paper.id} className={`overview-paper${paper.scope === '核心研究' ? ' is-core' : ''}`} data-overview-paper={paper.id}
                  aria-label={`${paper.shortTitle}，${paper.venue} ${paper.year}，${paper.scope}，查看详情`}
                  title={`${paper.title} · ${paper.scope}`} onClick={() => onSelect(paper)}>
                  <i aria-hidden="true"/><div><strong>{paper.shortTitle}</strong><span>{paper.venue} · {paper.year}</span></div>
                </button>)}
              </div>

              {!cell.length && <span className="overview-empty" aria-label="该阶段暂无收录论文">—</span>}
            </div>;
          })}
        </section>)}
      </div>
    </div>
    <div className="overview-footer"><span>早期合并为阶段 · 列宽不表示时长 · 方向归类不表示方法继承</span><span>篇数仅表示当前收录分布</span></div>
  </div>;
}
