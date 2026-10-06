import { Fragment, useState, type CSSProperties } from 'react';
import type { PaperGroup } from './map-groups';
import type { Paper } from './types';

interface Period { start: number; end: number; label: string }
const newestFirst = (a: Paper, b: Paper) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle);

/** A single reading surface exposes directions, time, examples, and collection counts. */
export function AtlasOverview({ groups, periods, onSelect }: {
  groups: PaperGroup[]; periods: Period[]; onSelect: (paper: Paper) => void;
}) {
  const [selection, setSelection] = useState<{ group: string; period?: number } | null>(null);
  const toggle = (group: string, period?: number) => setSelection(current =>
    current?.group === group && current.period === period ? null : { group, period });
  return <section className="atlas-roadmap" aria-label="研究方向与论文时间轴" style={{ '--stages': periods.length } as CSSProperties}>
    <div className="atlas-roadmap-guide"><span><i aria-hidden="true"/>方向 × 年代</span><p>点论文读详情 · 点篇数展开同阶段论文</p><span className="atlas-roadmap-time">早期积累 <span aria-hidden="true">⟶</span> 最新研究</span></div>
    <table className="atlas-roadmap-table">
      <caption className="sr-only">各方向每阶段最新收录的一篇论文及收录篇数。阶段等宽，不表示时长；示例不是排名或方法继承关系。</caption>
      <thead><tr><th scope="col">研究方向 <small>{groups.length} 个方向</small></th>{periods.map(period => <th scope="col" key={period.start}>{period.label}</th>)}</tr></thead>
      <tbody>{groups.map((group, index) => {
        const selected = selection?.group === group.id;
        const period = selected && selection.period !== undefined ? periods[selection.period] : undefined;
        const visible = group.papers.filter(paper => !period || paper.year >= period.start && paper.year <= period.end).sort(newestFirst);
        const detailId = `atlas-detail-${group.id}`;
        return <Fragment key={group.id}><tr className={`atlas-roadmap-row${selected ? ' selected' : ''}`} style={{ '--route': group.color } as CSSProperties}>
          <th scope="row"><button className="atlas-roadmap-direction" title={group.description} aria-expanded={selected && !period} aria-controls={selected ? detailId : undefined} onClick={() => toggle(group.id)}>
            <span className="atlas-roadmap-index">{String(index + 1).padStart(2, '0')}</span><span><strong>{group.name}</strong><small>{group.papers.length} 篇 · {Math.min(...group.papers.map(paper => paper.year))}–{Math.max(...group.papers.map(paper => paper.year))}</small></span><span className="atlas-roadmap-chevron" aria-hidden="true">{selected && !period ? '−' : '+'}</span>
          </button></th>
          {periods.map((stage, stageIndex) => {
            const papers = group.papers.filter(paper => paper.year >= stage.start && paper.year <= stage.end).sort(newestFirst);
            const example = papers[0];
            const active = selected && selection.period === stageIndex;
            return <td className={`atlas-roadmap-stage${example ? ' occupied' : ''}`} key={stage.start}>
              <span className="atlas-roadmap-mobile-year">{stage.label}</span>
              {example ? <div className="atlas-roadmap-node"><i aria-hidden="true"/><button className="atlas-roadmap-paper" data-atlas-example={example.id} onClick={() => onSelect(example)} title={example.title}>
                <strong>{example.shortTitle}</strong><small>{example.year} · {example.venue}</small>
              </button><button className="atlas-roadmap-count" aria-label={`${group.name}，${stage.label}，${papers.length} 篇，${active ? '收起' : '展开'}论文`} aria-expanded={active} aria-controls={selected ? detailId : undefined} onClick={() => toggle(group.id, stageIndex)}>{papers.length} 篇 <span aria-hidden="true">{active ? '−' : '+'}</span></button></div> : <span className="atlas-roadmap-empty">暂无收录</span>}

            </td>;
          })}
        </tr>
        {selected && <tr className="atlas-roadmap-detail-row" style={{ '--route': group.color } as CSSProperties}><td colSpan={periods.length + 1}>
              <section className="atlas-roadmap-detail" id={detailId} aria-label={`${group.name}展开论文`}>
                <header><div><h4>{group.name} <span>{period?.label ?? '全部年份'} · {visible.length} 篇</span></h4><p>{group.description}</p></div><button onClick={() => setSelection(null)} aria-label="收起论文">收起 ×</button></header>
                <div className="atlas-sheet-paper-list">{visible.map(paper => <button key={paper.id} data-atlas-paper={paper.id} onClick={() => onSelect(paper)}><span>{paper.year}</span><div><strong>{paper.shortTitle}</strong><small>{paper.venue} · {paper.scope}</small><p>{paper.summary}</p></div></button>)}</div>
              </section>
        </td></tr>}
        </Fragment>;
      })}</tbody>
    </table>
    <footer className="atlas-roadmap-footer"><span>每阶段显示最新收录的一篇；篇数包含该阶段全部收录。</span><span>阶段等宽，不表示时长；排列不表示排名或继承关系。</span></footer>
  </section>;
}
