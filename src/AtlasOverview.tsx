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
  const distribution = groups.map(group => periods.map(period => group.papers.filter(paper => paper.year >= period.start && paper.year <= period.end).length));
  const largest = Math.max(1, ...distribution.flat());
  const locate = (group: PaperGroup, period?: number) => {
    setSelection({ group: group.id, period });
    const row = document.getElementById(`atlas-row-${group.id}`);
    row?.querySelector<HTMLButtonElement>('.atlas-sheet-direction')?.focus({ preventScroll: true });
    row?.scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  return <div className="atlas-reading-map" style={{ '--stages': periods.length } as CSSProperties}>
    <section className="atlas-landscape" aria-labelledby="atlas-landscape-title">
      <header><div><span className="overview-kicker">THE FIELD AT A GLANCE</span><h4 id="atlas-landscape-title">领域分布，一眼看全</h4></div><p>颜色越深，收录越多 · 点击定位论文</p></header>
      <table className="atlas-distribution">
        <caption className="sr-only">各研究方向在不同年代的论文收录数量；阶段等宽，不表示时长。</caption>
        <thead><tr><th scope="col">研究方向</th>{periods.map(period => <th scope="col" key={period.start}>{period.label}</th>)}<th scope="col" className="atlas-distribution-total">合计</th></tr></thead>
        <tbody>{groups.map((group, index) => <tr key={group.id} style={{ '--route': group.color } as CSSProperties}>
          <th scope="row"><button onClick={() => locate(group)} aria-controls={`atlas-row-${group.id}`}><i aria-hidden="true"/><span>{group.name}</span></button></th>
          {periods.map((period, periodIndex) => {
            const count = distribution[index][periodIndex];
            return <td key={period.start}>{count ? <button className="atlas-distribution-cell" style={{ '--strength': `${12 + count / largest * 62}%` } as CSSProperties} onClick={() => locate(group, periodIndex)} aria-controls={`atlas-row-${group.id}`} aria-label={`${group.name}，${period.label}，${count} 篇，定位论文`}>{count}<span className="atlas-distribution-bar" style={{ width: `${count / largest * 100}%` }} aria-hidden="true"/></button> : <span className="atlas-distribution-empty" aria-label="暂无收录">—</span>}</td>;
          })}
          <td className="atlas-distribution-total">{group.papers.length}</td>
        </tr>)}</tbody>
      </table>
      <footer><span>仅表示当前收录分布；阶段等宽，不表示时长。</span><span>下方时间轴直接阅读论文 ↓</span></footer>
    </section>
    <div className="atlas-reading-heading"><h4>论文时间轴</h4><p>按方向看研究内容，按年代读论文</p></div>
    <div className="atlas-sheet">
    <div className="atlas-sheet-axis"><span>研究方向 <small>点击方向查看全部论文</small></span><div>{periods.map(period => <span key={period.start}>{period.label}<small>{groups.reduce((total, group) => total + group.papers.filter(paper => paper.year >= period.start && paper.year <= period.end).length, 0)} 篇收录</small></span>)}</div></div>
    {groups.map((group, index) => {
      const selected = selection?.group === group.id;
      const period = selected && selection.period !== undefined ? periods[selection.period] : undefined;
      const visible = group.papers.filter(paper => !period || paper.year >= period.start && paper.year <= period.end).sort(newestFirst);
      const detailId = `atlas-detail-${group.id}`;
      return <section key={group.id} id={`atlas-row-${group.id}`} className={`atlas-sheet-group${selected ? ' selected' : ''}`} style={{ '--route': group.color } as CSSProperties} aria-label={group.name}>
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
                </> : <span className="atlas-sheet-empty" aria-label="暂无收录">—</span>}
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
    </div>
  </div>;
}
