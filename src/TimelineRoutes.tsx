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
  const jumpToGroup = (groupId: string, start?: number, end?: number) => {
    onSelect({ groupId, start, end });
    requestAnimationFrame(() => document.getElementById(`timeline-${groupId}`)?.scrollIntoView({ block: 'start' }));
  };
  return <>
    <section className="atlas-glance" aria-label="全部方向的时间分布速览" style={{ '--periods': periods.length } as CSSProperties}>
      <div className="atlas-glance-heading"><h4>研究全景</h4><p>颜色越深，收录越多 · 点数字定位论文</p></div>
      <div className="atlas-glance-axis"><span>研究方向</span>{periods.map(period => <span key={period.start}>{period.label}</span>)}</div>
      {groups.map(group => <div className="atlas-glance-row" key={group.id} style={{ '--route': group.color } as CSSProperties}>
        <button className="atlas-glance-name" onClick={() => jumpToGroup(group.id)}>{group.name}<small>{group.papers.length}</small></button>
        {periods.map(period => {
          const count = group.papers.filter(paper => paper.year >= period.start && paper.year <= period.end).length;
          return <button key={period.start} disabled={!count} className="atlas-glance-count"
            style={{ '--intensity': `${count ? 9 + Math.min(count, 13) * 4 : 0}%` } as CSSProperties}
            aria-label={`${group.name} ${period.label}，定位 ${count} 篇论文`}
            onClick={() => jumpToGroup(group.id, period.start, period.end)}>{count || '—'}</button>;
        })}
      </div>)}
    </section>
    <div className="route-atlas" style={{ '--periods': periods.length } as CSSProperties}>
    <div className="route-atlas-heading"><div><span>RESEARCH LANDSCAPE</span><h4>代表论文时间轴</h4></div><p>横向看研究演进 · 纵向比较方向</p></div>
    <div className="route-atlas-axis"><span>研究方向 <small>{groups.length} 个研究方向</small></span>{periods.map(period => <span key={period.start}>{period.label}<i/></span>)}</div>
    <div className="route-atlas-lanes">
      {groups.map((group, index) => {
        const cells = periods.map(period => group.papers.filter(paper => paper.year >= period.start && paper.year <= period.end));
        const latestPaper = [...group.papers].sort((a, b) => b.year - a.year)[0];
        const selectedPapers = group.papers.filter(paper => selection?.start === undefined || paper.year >= selection.start && paper.year <= selection.end!)
          .sort((a, b) => a.year - b.year || a.shortTitle.localeCompare(b.shortTitle));
        return <div className="route-atlas-group" id={`timeline-${group.id}`} key={group.id} style={{ '--route': group.color } as CSSProperties}><div className={`route-atlas-lane${selection?.groupId === group.id ? ' is-selected' : ''}`} key={group.id} style={{ '--route': group.color } as CSSProperties}>
          <button className="route-atlas-name" aria-expanded={selection?.groupId === group.id} onClick={() => onSelect(selection?.groupId === group.id && selection.start === undefined ? null : { groupId: group.id })}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{group.name}</strong><p>{group.description}</p><small>{group.papers.length} 篇 · {Math.min(...group.papers.map(p => p.year))}–{Math.max(...group.papers.map(p => p.year))}</small></div></button>
          <div className="route-atlas-stations">
            {cells.map((cell, cellIndex) => {
              const period = periods[cellIndex];
              const representative = [...cell].sort((a, b) => Number(b.scope === '核心研究') - Number(a.scope === '核心研究') || b.year - a.year || a.shortTitle.localeCompare(b.shortTitle))[0];
              const active = selection?.groupId === group.id && selection.start === period.start;
              return <div className={`route-atlas-cell${representative ? " has-paper" : ""}`} key={period.start}>
                {representative ? <div className="route-atlas-stop">
                  <span className="route-atlas-dot" aria-hidden="true"/>
                  <span className="route-atlas-period-label">{period.label}</span>
                  <button className="route-atlas-paper" aria-label={`${representative.shortTitle}，${representative.venue} ${representative.year}，查看详情`}
                    title={representative.title} onClick={() => onPaperSelect(representative)}>
                    <strong>{representative.shortTitle}</strong><span className="route-atlas-publication">{representative.venue} · {representative.year}</span>
                  </button>
                  <button className={`route-atlas-node${active ? ' active' : ''}`} aria-expanded={active} aria-controls={active ? 'panorama-papers' : undefined}
                    aria-label={`${group.name} ${period.label}，展开 ${cell.length} 篇论文`}
                    onClick={() => onSelect(active ? null : { groupId: group.id, start: period.start, end: period.end })}>
                    <span className="route-atlas-marker"><b>{cell.length}</b><small>篇论文</small></span><span aria-hidden="true">{active ? '−' : '+'}</span>
                  </button>
                </div> : <span className="route-atlas-blank" aria-label={`${period.label} 暂无收录`}><span className="route-atlas-period-label">{period.label}</span>—</span>}
              </div>;
            })}
          </div>
        </div><p className="route-atlas-mobile-latest">最近收录 <strong>{latestPaper.shortTitle}</strong><span>{latestPaper.venue} · {latestPaper.year}</span></p>{selection?.groupId === group.id && <section className="route-atlas-detail" id="panorama-papers" aria-label="选中阶段的论文">
          <div className="panorama-detail-heading"><div><h4>{group.name} <span>{selection.start === undefined ? '全部年份' : `${selection.start}${selection.end === selection.start ? '' : `–${selection.end}`}`} · {selectedPapers.length} 篇</span></h4><p>{group.description}</p></div><button onClick={() => onSelect(null)} aria-label="收起阶段论文">收起 ×</button></div>
          <div className="panorama-paper-list">{selectedPapers.map(paper => <button className={`overview-paper${paper.scope === '核心研究' ? ' is-core' : ''}`} key={paper.id} data-overview-paper={paper.id} onClick={() => onPaperSelect(paper)}><i aria-hidden="true"/><div><strong>{paper.shortTitle}</strong><span>{paper.venue} · {paper.year}{paper.publicationStatus === 'early_access' ? ' · 在线先行' : ''} · {paper.scope}</span><p>{paper.summary}</p></div></button>)}</div>
        </section>}</div>;
      })}
    </div>
    <div className="route-atlas-note"><span>点论文看详情 · 点篇数展开阶段论文 · 点方向查看全部</span><span>早期按阶段合并，间距不表示实际时长</span></div>
  </div></>;
}
