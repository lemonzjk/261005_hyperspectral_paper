import { Fragment, useState, type CSSProperties } from 'react';
import { groupPapers } from './map-groups';
import type { Paper } from './types';

export function TimelineOverview({ papers, onSelect, onDetail }: {
  papers: Paper[]; onSelect: (paper: Paper) => void; onDetail: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const groups = groupPapers(papers, 'track');
  const years = [...new Set(papers.map(paper => paper.year))].sort((a, b) => a - b);
  const latest = years.at(-1) ?? new Date().getFullYear();
  const ranges = [
    [years[0] ?? latest, latest - 10], [latest - 9, latest - 7], [latest - 6, latest - 5],
    ...Array.from({ length: 5 }, (_, index) => [latest - 4 + index, latest - 4 + index]),
  ].filter(([start, end]) => start <= end && years.some(year => year >= start && year <= end));
  const columns = ranges.map(([start, end]) => ({ start, end, label: start === end ? String(start) : `${start}–${end}` }));
  return <div className="timeline-overview" style={{ '--periods': columns.length } as CSSProperties}>
    <div className="overview-toolbar">
      <div><strong>研究时间轴</strong><p>沿年份看发展，沿线路选方向</p></div>
      <button onClick={onDetail}>展开详细时间轴 ↗</button>
    </div>
    <div className="overview-axis" aria-hidden="true"><span>研究方向 <small>{groups.length} 条线路</small></span>{columns.map(column => <span key={column.start}>{column.label}</span>)}</div>
    <div className="overview-routes" aria-label={`${papers.length} 篇论文的时间轴总览`}>
      {groups.map((group, index) => {
        const cells = columns.map(column => group.papers.filter(paper => paper.year >= column.start && paper.year <= column.end));
        const first = cells.findIndex(cell => cell.length);
        const last = cells.length - 1 - [...cells].reverse().findIndex(cell => cell.length);
        const selectedIndex = cells.findIndex((_, cellIndex) => selected === `${group.id}:${columns[cellIndex].start}`);
        const chosen = cells[selectedIndex];
        return <Fragment key={group.id}>
          <div className="overview-route" style={{ '--route': group.color } as CSSProperties}>
            <div className="overview-route-name"><span>{String(index + 1).padStart(2, '0')}</span><strong>{group.name}</strong><small>{group.papers.length}</small></div>
            {cells.map((cell, cellIndex) => {
              const key = `${group.id}:${columns[cellIndex].start}`;
              const representative = cell.find(paper => paper.scope === '核心研究') ?? cell[0];
              return <div key={key} className={`overview-cell${cellIndex >= first && cellIndex <= last ? ' on-route' : ''}${cellIndex === first ? ' route-start' : ''}${cellIndex === last ? ' route-end' : ''}`}>
                {representative && <button className={`overview-stop${selected === key ? ' selected' : ''}`} aria-expanded={selected === key}
                  aria-label={`${group.name}，${columns[cellIndex].label}，${cell.length} 篇论文`}
                  title={cell.map(paper => `${paper.shortTitle} · ${paper.venue} ${paper.year}`).join('\n')}
                  onClick={() => setSelected(selected === key ? null : key)}>
                  <span className="overview-stop-title">{representative.shortTitle}</span><span className="overview-stop-count">{cell.length}</span>
                </button>}
              </div>;
            })}
          </div>
          {chosen && <div className="overview-selection" style={{ '--route': group.color } as CSSProperties}>
            <div className="overview-selection-heading"><strong>{group.name} · {columns[selectedIndex].label}</strong><button onClick={() => setSelected(null)} aria-label="收起所选论文">收起 ×</button></div>
            <div className="overview-selection-papers">{chosen.map(paper => <button key={paper.id} data-overview-paper={paper.id} onClick={() => onSelect(paper)}>
              <span className="overview-paper-meta">{paper.year} · {paper.venue}<small>{paper.scope}</small></span><strong>{paper.shortTitle}</strong><span className="overview-paper-title">{paper.title}</span>
            </button>)}</div>
          </div>}
        </Fragment>;
      })}
    </div>
    <div className="overview-footer"><span><i/> 站点数字为论文数 · 点击展开全部论文</span><span>早期年份合并展示 · 线路表示研究方向，不表示继承关系</span></div>
  </div>;
}
