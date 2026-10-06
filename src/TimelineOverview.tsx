import { useState, type CSSProperties } from 'react';
import { TimelineRoutes } from './TimelineRoutes';
import { groupPapers } from './map-groups';
import type { Paper } from './types';

export function TimelineOverview({ papers, onSelect, onDetail }: {
  papers: Paper[]; onSelect: (paper: Paper) => void; onDetail: () => void;
}) {
  const [mode, setMode] = useState<'timeline' | 'directions' | 'all'>('timeline');
  const showAll = mode === 'all';
  const [selection, setSelection] = useState<{ groupId: string; start?: number; end?: number } | null>(null);
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
  const selectedGroup = groups.find(group => group.id === selection?.groupId);
  const selectedPapers = selectedGroup?.papers.filter(paper => selection?.start === undefined ||
    (paper.year >= selection.start && paper.year <= selection.end!))
    .sort((a, b) => a.year - b.year || a.shortTitle.localeCompare(b.shortTitle)) ?? [];
  return <div className={`timeline-overview${showAll ? ' show-all' : ' is-glance'}`} style={{ '--periods': columns.length } as CSSProperties}>
    <div className="overview-toolbar">
      <div><span className="overview-kicker">RESEARCH THROUGH TIME</span><h3>高光谱三维视觉 · 研究时间轴</h3><p>{groups.length} 个方向 · {papers.length} 篇论文 · {mode === 'timeline' ? '方向与时间一览 · 点击展开论文' : showAll ? '全部展示' : '点击方向或时间节点展开论文'}</p></div>
      <div className="overview-actions"><div className="overview-density" role="group" aria-label="时间轴展示密度"><button aria-pressed={mode === 'timeline'} onClick={() => setMode('timeline')}>时间轴</button><button aria-pressed={mode === 'directions'} onClick={() => setMode('directions')}>方向全景</button><button aria-pressed={showAll} onClick={() => setMode('all')}>全部论文</button></div><button className="overview-advanced" onClick={onDetail}>导出完整 SVG ↓</button></div>
    </div>
    {mode !== 'timeline' && <div className="overview-key">{showAll && <><span><i className="core-marker"/>核心研究</span><span><i className="related-marker"/>相关研究</span></>}<p>{showAll ? '横向看时间，纵向看方向；圆点核心、方点相关。' : '横向看时间，纵向看方向；数字为篇数，节点旁为阶段代表论文。'}</p></div>}
    {mode === 'timeline' && papers.length > 0 && <TimelineRoutes groups={groups} periods={columns} selection={selection} onSelect={setSelection} onPaperSelect={onSelect}/>}
    {mode === 'directions' && <div className="atlas-panorama" style={{ '--periods': columns.length } as CSSProperties}>
      <div className="panorama-axis"><span>研究方向</span>{columns.map(column => <span key={column.start}>{column.label}</span>)}</div>
      {groups.map(group => <div className="panorama-row" key={group.id} style={{ '--route': group.color } as CSSProperties}>
        <button className="panorama-name" title={group.description} aria-expanded={selection?.groupId === group.id} aria-controls={selectedGroup ? "panorama-papers" : undefined}
          onClick={() => setSelection({ groupId: group.id })}><i/><span>{group.name}</span><small>{group.papers.length}</small></button>
        {columns.map(column => {
          const cell = group.papers.filter(paper => paper.year >= column.start && paper.year <= column.end);
          const representative = [...cell].sort((a, b) => Number(b.scope === '核心研究') - Number(a.scope === '核心研究') || b.year - a.year || a.shortTitle.localeCompare(b.shortTitle))[0];
          const active = selection?.groupId === group.id && selection.start === column.start;
          return <div className="panorama-period" key={column.start}>
            {cell.length ? <button className={`panorama-node${active ? ' active' : ''}`} aria-expanded={active} aria-controls={selectedGroup ? "panorama-papers" : undefined}
              aria-label={`${group.name} ${column.label}，展开 ${cell.length} 篇论文`} title={`${column.label} · ${cell.length} 篇论文 · ${representative.shortTitle}`}
              onClick={() => setSelection(active ? null : { groupId: group.id, start: column.start, end: column.end })}>
              <b style={{ '--weight': Math.min(1, cell.length / 8) } as CSSProperties}>{cell.length}</b><span>{representative.shortTitle}</span>
            </button> : <span className="panorama-gap" aria-label={`${column.label} 暂无收录`}>—</span>}
          </div>;
        })}
      </div>)}
    </div>}
    {mode === 'directions' && selectedGroup && <section className="panorama-detail" id="panorama-papers" aria-label="选中阶段的论文" style={{ '--route': selectedGroup.color } as CSSProperties}>
      <div className="panorama-detail-heading"><div><h4>{selectedGroup.name} <span>{selection?.start === undefined ? '全部年份' : `${selection.start}${selection.end === selection.start ? '' : `–${selection.end}`}` } · {selectedPapers.length} 篇</span></h4><p>{selectedGroup.description}</p></div><button onClick={() => setSelection(null)} aria-label="收起阶段论文">收起 ×</button></div>
      <div className="panorama-paper-list">{selectedPapers.map(paper => <button className={`overview-paper${paper.scope === '核心研究' ? ' is-core' : ''}`} key={paper.id} data-overview-paper={paper.id} onClick={() => onSelect(paper)}>
        <i aria-hidden="true"/><div><strong>{paper.shortTitle}</strong><span>{paper.venue} · {paper.year} · {paper.scope}</span><p>{paper.summary}</p></div>
      </button>)}</div>
    </section>}
    {showAll && <div className="overview-matrix">
      <div className="overview-axis" aria-hidden="true"><span>研究方向 <small>从左到右看时间</small></span>{columns.map(column => <span key={column.start}>{column.label}</span>)}</div>
      <div className="overview-routes" aria-label={`${papers.length} 篇论文的时间轴总览`}>
        {groups.map((group, index) => <section key={group.id} className="overview-route" aria-label={group.name} style={{ '--route': group.color } as CSSProperties}>
          <div className="overview-route-name"><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{group.name}</strong><p>{group.description}</p><small>{group.papers.length} 篇论文</small></div></div>
          {columns.map(column => {
            const cell = group.papers.filter(paper => paper.year >= column.start && paper.year <= column.end)
              .sort((a, b) => a.year - b.year || a.shortTitle.localeCompare(b.shortTitle));
            return <div key={column.start} className={`overview-cell${cell.length ? ' has-papers' : ''}`}>
              <span className="overview-cell-heading"><span>{column.label}</span><button disabled={!cell.length || showAll} aria-label={`${group.name} ${column.label}，查看全部 ${cell.length} 篇论文`} onClick={() => setMode('all')}>{cell.length ? `${cell.length} 篇` : ''}</button></span>
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
    </div>}
    <div className="overview-footer"><span>{mode === 'timeline' ? '代表论文优先核心研究 · 方向归类不表示方法继承' : '早期合并为阶段 · 列宽不表示时长 · 方向归类不表示方法继承'}</span><span>篇数仅表示当前收录分布</span></div>
  </div>;
}
