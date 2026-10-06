import { useState, type CSSProperties } from 'react';
import type { PaperGroup } from './map-groups';
import type { Paper } from './types';

interface Period { start: number; end: number; label: string }

/** A fixed, document-scrolling overview. Counts describe the collection, not influence. */
export function AtlasOverview({ groups, periods, onSelect }: {
  groups: PaperGroup[]; periods: Period[]; onSelect: (paper: Paper) => void;
}) {
  const [selection, setSelection] = useState<{ group: string; period?: number } | null>(null);
  return <div className="atlas-sheet" style={{ '--stages': periods.length } as CSSProperties}>
    <div className="atlas-sheet-axis" aria-hidden="true"><span>方向 / 研究内容</span><div>{periods.map(period => <span key={period.start}>{period.label}</span>)}</div><span>最新收录论文</span></div>
    {groups.map((group, index) => {
      const latest = [...group.papers].sort((a, b) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle))[0];
      const selected = selection?.group === group.id;
      const period = selected && selection.period !== undefined ? periods[selection.period] : undefined;
      const visible = group.papers.filter(paper => !period || paper.year >= period.start && paper.year <= period.end)
        .sort((a, b) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle));
      const detailId = `atlas-detail-${group.id}`;
      return <section key={group.id} className={`atlas-sheet-group${selected ? ' selected' : ''}`} style={{ '--route': group.color } as CSSProperties} aria-label={group.name}>
        <div className="atlas-sheet-row">
          <button className="atlas-sheet-direction" aria-expanded={selected && !period} aria-controls={detailId}
            onClick={() => setSelection(selected && !period ? null : { group: group.id })}>
            <span className="atlas-sheet-index">{String(index + 1).padStart(2, '0')}</span><div><strong>{group.name}</strong><p>{group.description}</p></div><small>{group.papers.length}<span>篇</span></small>
          </button>
          <div className="atlas-sheet-time" aria-label={`${group.name}的年代分布`}>
            {periods.map((stage, stageIndex) => {
              const count = group.papers.filter(paper => paper.year >= stage.start && paper.year <= stage.end).length;
              const active = selected && selection.period === stageIndex;
              return <div className={`atlas-sheet-stage${count ? ' occupied' : ''}`} key={stage.start}>
                <span className="atlas-sheet-mobile-year">{stage.start}{stage.start !== stage.end && <><br/>–{stage.end}</>}</span>
                {count ? <button className="atlas-sheet-station" aria-label={`${group.name}，${stage.label}，${count} 篇，展开论文`} aria-expanded={active} aria-controls={detailId}
                  onClick={() => setSelection(active ? null : { group: group.id, period: stageIndex })}><i aria-hidden="true"/><b>{count}</b><span>篇</span></button> : <span className="atlas-sheet-empty" aria-label={`${stage.label} 暂无收录`}>·</span>}
              </div>;
            })}
          </div>
          <button className="atlas-sheet-latest" data-atlas-latest={latest.id} onClick={() => onSelect(latest)} title={latest.title}>
            <strong>{latest.shortTitle}</strong><span>{latest.year} · {latest.venue}<small>{latest.scope}</small></span>
          </button>
        </div>
        {selected && <div className="atlas-sheet-detail" id={detailId}>
          <div className="atlas-sheet-detail-heading"><p><strong>{group.name}</strong> · {period?.label ?? '全部年份'} · {visible.length} 篇</p><button onClick={() => setSelection(null)}>收起 ×</button></div>
          <div className="atlas-sheet-paper-list">{visible.map(paper => <button key={paper.id} data-atlas-paper={paper.id} onClick={() => onSelect(paper)}>
            <span>{paper.year}</span><div><strong>{paper.shortTitle}</strong><small>{paper.venue} · {paper.scope}</small><p>{paper.summary}</p></div>
          </button>)}</div>
        </div>}
      </section>;
    })}
    <div className="atlas-sheet-legend"><span><i/>数字为该方向、该阶段的收录篇数 · 点数字展开论文</span><span>各阶段等宽，间距不表示时长；连线仅辅助阅读，不表示方法继承。</span></div>
  </div>;
}
