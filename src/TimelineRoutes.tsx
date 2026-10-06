import type { CSSProperties } from 'react';
import type { PaperGroup } from './map-groups';
import type { Paper } from './types';
interface TimelinePeriod { start: number; end: number; label: string }

export function TimelineRoutes({ groups, periods, selection, onSelect, onPaperSelect }: {
  groups: PaperGroup[]; periods: TimelinePeriod[];
  selection: { groupId: string; start?: number; end?: number } | null;
  onPaperSelect: (paper: Paper) => void;
  onSelect: (value: { groupId: string; start?: number; end?: number } | null) => void;
}) {
  return <div className="route-atlas" style={{ '--periods': periods.length } as CSSProperties}>
    <div className="route-atlas-heading"><div><span>RESEARCH LANDSCAPE</span><h4>沿着时间，找到你的研究方向</h4></div><p>点站点展开论文<br/>期刊／会议与年份直接可见</p></div>
    <div className="route-atlas-axis"><span>研究方向 <small>{groups.length} 条研究线路</small></span>{periods.map(period => <span key={period.start}>{period.start === period.end ? period.start : <>{period.start}<small>— {period.end}</small></>}<i/></span>)}</div>
    <div className="route-atlas-lanes">
      {groups.map((group, index) => {
        const cells = periods.map(period => group.papers.filter(paper => paper.year >= period.start && paper.year <= period.end));
        const first = cells.findIndex(cell => cell.length);
        const last = cells.length - 1 - [...cells].reverse().findIndex(cell => cell.length);
        const selectedPapers = group.papers.filter(paper => selection?.start === undefined || paper.year >= selection.start && paper.year <= selection.end!)
          .sort((a, b) => a.year - b.year || a.shortTitle.localeCompare(b.shortTitle));
        return <div className="route-atlas-group" key={group.id} style={{ '--route': group.color } as CSSProperties}><div className={`route-atlas-lane${selection?.groupId === group.id ? ' is-selected' : ''}`} key={group.id} style={{ '--route': group.color } as CSSProperties}>
          <button className="route-atlas-name" aria-expanded={selection?.groupId === group.id} onClick={() => onSelect(selection?.groupId === group.id && selection.start === undefined ? null : { groupId: group.id })}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{group.name}</strong><small>{group.papers.length} 篇论文</small></div></button>
          <div className="route-atlas-stations">
            <svg className="route-atlas-line" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><path d={`M${(first + .5) / periods.length * 1000} 15H${(last + .5) / periods.length * 1000}`} stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round"/></svg>
            {cells.map((cell, cellIndex) => {
              const period = periods[cellIndex];
              const representative = [...cell].sort((a, b) => Number(b.scope === '核心研究') - Number(a.scope === '核心研究') || b.year - a.year || a.shortTitle.localeCompare(b.shortTitle))[0];
              const active = selection?.groupId === group.id && selection.start === period.start;
              return <div className="route-atlas-cell" key={period.start}>
                {representative ? <button className={`route-atlas-node${active ? ' active' : ''}`} aria-expanded={active} aria-controls={selection ? 'panorama-papers' : undefined}
                  aria-label={`${group.name} ${period.label}，展开 ${cell.length} 篇论文`} title={`${representative.title} · ${representative.venue} ${representative.year} · 本阶段 ${cell.length} 篇`}
                  onClick={() => onSelect(active ? null : { groupId: group.id, start: period.start, end: period.end })}>
                  <span className="route-atlas-marker"><i/><small>{cell.length > 1 ? `+${cell.length - 1}` : ''}</small></span>
                  <strong>{representative.shortTitle}</strong><span className="route-atlas-publication">{representative.venue} · {representative.year}</span>
                </button> : <span className="route-atlas-blank" aria-label={`${period.label} 暂无收录`}/>}
              </div>;
            })}
          </div>
        </div>{selection?.groupId === group.id && <section className="route-atlas-detail" id="panorama-papers" aria-label="选中阶段的论文">
          <div className="panorama-detail-heading"><div><h4>{group.name} <span>{selection.start === undefined ? '全部年份' : `${selection.start}${selection.end === selection.start ? '' : `–${selection.end}`}`} · {selectedPapers.length} 篇</span></h4><p>{group.description}</p></div><button onClick={() => onSelect(null)} aria-label="收起阶段论文">收起 ×</button></div>
          <div className="panorama-paper-list">{selectedPapers.map(paper => <button className={`overview-paper${paper.scope === '核心研究' ? ' is-core' : ''}`} key={paper.id} data-overview-paper={paper.id} onClick={() => onPaperSelect(paper)}><i aria-hidden="true"/><div><strong>{paper.shortTitle}</strong><span>{paper.venue} · {paper.year}{paper.publicationStatus === 'early_access' ? ' · 在线先行' : ''} · {paper.scope}</span><p>{paper.summary}</p></div></button>)}</div>
        </section>}</div>;
      })}
    </div>
    <div className="route-atlas-note"><span><i/>站点旁显示代表论文 · +N 为同阶段其他论文</span><span>早期按阶段合并，间距不表示实际时长</span></div>
  </div>;
}
