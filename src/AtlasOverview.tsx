import { useState, type CSSProperties } from 'react';
import type { PaperGroup } from './map-groups';
import type { Paper } from './types';

interface Period { start: number; end: number; label: string }
const newestFirst = (a: Paper, b: Paper) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle);

/** Stage examples are the latest collected papers, not a ranking or a lineage. */
export function AtlasOverview({ groups, periods, onSelect }: {
  groups: PaperGroup[]; periods: Period[]; onSelect: (paper: Paper) => void;
}) {
  const [selection, setSelection] = useState<{ group: string; period?: number } | null>(null);
  return <div className="atlas-sheet" style={{ '--stages': periods.length } as CSSProperties}>
    <div className="atlas-sheet-axis"><span>研究方向 <small>点击方向查看全部论文</small></span><div>{periods.map(period => <span key={period.start}>{period.label}<small>{groups.reduce((total, group) => total + group.papers.filter(paper => paper.year >= period.start && paper.year <= period.end).length, 0)} 篇收录</small></span>)}</div></div>
    {groups.map((group, index) => {
      const selected = selection?.group === group.id;
      const period = selected && selection.period !== undefined ? periods[selection.period] : undefined;
      const visible = group.papers.filter(paper => !period || paper.year >= period.start && paper.year <= period.end).sort(newestFirst);
      const detailId = `atlas-detail-${group.id}`;
      return <section key={group.id} className={`atlas-sheet-group${selected ? ' selected' : ''}`} style={{ '--route': group.color } as CSSProperties} aria-label={group.name}>
        <div className="atlas-sheet-row">
          <button className="atlas-sheet-direction" aria-expanded={selected && !period} aria-controls={selected ? detailId : undefined}
            onClick={() => setSelection(selected && !period ? null : { group: group.id })}>
            <span className="atlas-sheet-index">{String(index + 1).padStart(2, '0')}</span><div><strong>{group.name}</strong><p>{group.description}</p><small>{group.papers.length} 篇 · {Math.min(...group.papers.map(paper => paper.year))}–{Math.max(...group.papers.map(paper => paper.year))}</small></div>
          </button>
          <div className="atlas-sheet-time" aria-label={`${group.name}的年代分布`}>
            {periods.map((stage, stageIndex) => {
              const papers = group.papers.filter(paper => paper.year >= stage.start && paper.year <= stage.end).sort(newestFirst);
              const active = selected && selection.period === stageIndex;
              return <div className={`atlas-sheet-stage${papers.length ? ' occupied' : ''}`} key={stage.start}>
                <span className="atlas-sheet-mobile-year">{stage.label}</span>
                {papers.length ? <>
                  <div className="atlas-sheet-stage-papers">{papers.slice(0, 2).map(paper => <button className="atlas-sheet-example" key={paper.id} data-atlas-example={paper.id} onClick={() => onSelect(paper)} title={paper.title}>
                    <strong>{paper.shortTitle}</strong><span>{paper.year} · {paper.venue}</span>
                  </button>)}</div>
                  <button className="atlas-sheet-station" aria-label={`${group.name}，${stage.label}，${papers.length} 篇，展开论文`} aria-expanded={active} aria-controls={active ? detailId : undefined}
                    onClick={() => setSelection(active ? null : { group: group.id, period: stageIndex })}><b>{papers.length}</b><span>篇{papers.length > 2 ? ' · 查看全部' : ' · 展开'}</span><i aria-hidden="true">{active ? '−' : '+'}</i></button>
                </> : <span className="atlas-sheet-empty">暂无收录</span>}
              </div>;
            })}
          </div>
        </div>
        {selected && <div className="atlas-sheet-detail" id={detailId}>
          <div className="atlas-sheet-detail-heading"><p><strong>{group.name}</strong> · {period?.label ?? '全部年份'} · {visible.length} 篇</p><button onClick={() => setSelection(null)}>收起 ×</button></div>
          <div className="atlas-sheet-paper-list">{visible.map(paper => <button key={paper.id} data-atlas-paper={paper.id} onClick={() => onSelect(paper)}>
            <span>{paper.year}</span><div><strong>{paper.shortTitle}</strong><small>{paper.venue} · {paper.scope}</small><p>{paper.summary}</p></div>
          </button>)}</div>
        </div>}
      </section>;
    })}
    <div className="atlas-sheet-legend"><span>每阶段直接展示最新收录的至多两篇论文；点标题看详情，点篇数展开全部。</span><span>阶段等宽，不表示时长；排列不表示方法继承或论文排名。</span></div>
  </div>;
}
