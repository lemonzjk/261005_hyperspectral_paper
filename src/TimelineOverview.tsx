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
  // Periods keep the overview within the page width; column widths do not encode duration.
  const ranges = [
    [earliest, latest - 7], [Math.max(earliest, latest - 6), latest - 3],
    ...Array.from({ length: 3 }, (_, index) => [latest - 2 + index, latest - 2 + index]),
  ].filter(([start, end]) => start <= end && years.some(year => year >= start && year <= end));
  const columns = ranges.map(([start, end]) => ({ start, end, label: start === end ? String(start) : `${start}–${end}` }));
  return <div className="timeline-overview" style={{ '--periods': columns.length } as CSSProperties}>
    <div className="overview-toolbar">
      <div><span className="overview-kicker">RESEARCH THROUGH TIME</span><h3>沿时间，读懂每个研究方向</h3><p>{groups.length} 个方向 · {papers.length} 篇论文全部展示 · 点击论文查看详情</p></div>
      <div className="overview-actions"><span className="overview-open-label">无需拖动或缩放</span><button className="overview-advanced" onClick={onDetail}>详细图 / 导出 ↗</button></div>
    </div>
    <div className="overview-key"><span><i className="core-marker"/>核心研究</span><span><i className="related-marker"/>相关研究</span><p>横向看时间，纵向看方向；同一阶段按年份从早到晚排列。</p></div>
    <div className="overview-matrix">
      <div className="overview-axis" aria-hidden="true"><span>研究方向 <small>从左到右看时间</small></span>{columns.map(column => <span key={column.start}>{column.label}</span>)}</div>
      <div className="overview-routes" aria-label={`${papers.length} 篇论文的时间轴总览`}>
        {groups.map((group, index) => <section key={group.id} className="overview-route" aria-label={group.name} style={{ '--route': group.color } as CSSProperties}>
          <div className="overview-route-name"><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{group.name}</strong><p>{group.description}</p><small>{group.papers.length} 篇论文</small></div></div>
          {columns.map(column => {
            const cell = group.papers.filter(paper => paper.year >= column.start && paper.year <= column.end)
              .sort((a, b) => a.year - b.year || a.shortTitle.localeCompare(b.shortTitle));
            return <div key={column.start} className={`overview-cell${cell.length ? ' has-papers' : ''}`}>
              <span className="overview-cell-heading"><span>{column.label}</span><small>{cell.length ? `${cell.length} 篇` : ''}</small></span>
              <div className="overview-cell-papers">
                {cell.map(paper => <button key={paper.id} className={`overview-paper${paper.scope === '核心研究' ? ' is-core' : ''}`} data-overview-paper={paper.id}
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
