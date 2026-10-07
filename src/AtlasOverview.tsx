import { Fragment, useState, type CSSProperties } from 'react';
import type { PaperGroup } from './map-groups';
import type { Paper } from './types';

interface Period { start: number; end: number; label: string }
const directionHints: Record<string, string> = {
  rendering: '表示场景 · 合成新视角', active: '主动照明 · 同时获取光谱与深度',
  lightfield: '多视角观测 · 立体深度', geometry: '从观测恢复三维几何',
  materials: '反射率 · 材料属性 · 光谱解混', pointcloud: '给真实点云赋予光谱属性',
  lidar: '多波长测距 · 光谱辐射校正', registration: '跨传感器匹配 · 对齐 · 定位',
  capture: '采集设备 · 几何与辐射标定', understanding: '识别 · 分割 · 三维场景应用',
  holography: '多波长相位 · 波场与轮廓', volumetric: '三维体空间与波长联合成像',
  fusion: '高度辅助分类 · 区别于三维重建',
};
const families = [
  { id: 'acquire', name: '采集与空间对齐', hint: '获取观测，建立光谱与空间对应', input: '相机 / 激光 / 多传感器', output: '光谱与三维观测', tracks: ['capture', 'active', 'lidar', 'pointcloud', 'registration'] },
  { id: 'reconstruct', name: '重建与场景表示', hint: '恢复几何、光谱与外观', input: '多视角 / 多波段观测', output: '几何、材质与场景', tracks: ['geometry', 'rendering', 'lightfield', 'materials'] },
  { id: 'understand', name: '理解与扩展成像', hint: '场景应用、波场计量与体成像', input: '光谱与空间信息', output: '识别、计量与体成像', tracks: ['understanding', 'holography', 'volumetric', 'fusion'] },
];

/** Small conceptual drawings distinguish the three themes without a draggable canvas. */
function FamilyIllustration({ family }: { family: string }) {
  return <svg className="atlas-family-illustration" viewBox="0 0 100 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    {family === 'acquire' ? <>
      <rect x="8" y="20" width="26" height="31" rx="5"/><circle cx="21" cy="35" r="7"/><path d="M15 20v-5h12v5M37 29l34-16M37 35h34M37 41l34 16" strokeDasharray="3 4"/>
      <path d="m73 22 15-8v36l-15 8z" fill="currentColor" fillOpacity=".12"/><path d="m80 18 15-8v36l-15 8z" fill="currentColor" fillOpacity=".08"/>
      <path d="M75 30v14M82 26v14M89 22v14"/>
    </> : family === 'reconstruct' ? <>
      <path d="m50 9 31 17v30L50 68 19 51V23Z" fill="currentColor" fillOpacity=".05"/><path d="m19 23 31 17 31-14M50 40v28M50 9v31"/>
      <path d="m29 29 12-14 20 19 10-2M29 29l7 23 25-18 10 22M36 52l14 9 21-5"/>
      {[[29,29],[41,15],[61,34],[71,32],[36,52],[50,61],[71,56]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="currentColor" stroke="none"/>)}
    </> : <>
      <path d="m12 46 37-21 39 20-37 21Z" fill="currentColor" fillOpacity=".08"/><path d="m12 46 37-21 2 41M49 25l39 20-37 21"/>
      <path d="m25 38 12-7 13 7-13 7Zm0 0v15l12 7V45m13-7v15l-13 7" fill="currentColor" fillOpacity=".15"/>
      <path d="m58 31 12-7 12 7-12 7Zm0 0v15l12 7V38m12-7v15l-12 7" fill="currentColor" fillOpacity=".3"/>
      <path d="m33 18 4-4 4 4M64 14l4-4 4 4"/>
    </>}
  </svg>;
}
const venueLabels: Record<string, string> = {
  'Nature Communications': 'Nat. Commun.', 'Nature Photonics': 'Nat. Photonics',
  'Nature Methods': 'Nat. Methods', 'Light: Science & Applications': 'Light Sci. Appl.',
  'Laser & Photonics Reviews': 'Laser Photon. Rev.', 'Science China Information Sciences': 'Sci. China Inf. Sci.',
};
const newestFirst = (a: Paper, b: Paper) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle);

/** A single reading surface exposes directions, time, examples, and collection counts. */
export function AtlasOverview({ groups, periods, onSelect }: {
  groups: PaperGroup[]; periods: Period[]; onSelect: (paper: Paper) => void;
}) {
  const [selection, setSelection] = useState<{ group: string; period?: number } | null>(null);
  const toggle = (group: string, period?: number) => setSelection(current =>
    current?.group === group && current.period === period ? null : { group, period });
  const sections = families.map(family => ({ ...family, groups: family.tracks.flatMap(id => groups.filter(group => group.id === id)) })).filter(family => family.groups.length);
  const ordered = sections.flatMap(family => family.groups);
  return <div className="atlas-reading-surface">
    <section className="atlas-taxonomy" aria-label="高光谱三维视觉方向图">
      <header><div><span>FIELD OVERVIEW · 领域全景</span><h4>高光谱三维视觉，研究什么？</h4><p>看方向、看任务、看年代分布。点击方向，阅读下方论文时间轴。</p></div><small>主题分组<br/>不表示方法继承</small></header>
      <div className="atlas-taxonomy-branches" style={{ '--families': sections.length } as CSSProperties}>
        {sections.map(family => <section className={`atlas-taxonomy-family family-${family.id}`} key={family.id}>
          <header><FamilyIllustration family={family.id}/><div><span className="atlas-family-stage">{family.id === 'acquire' ? '获取观测' : family.id === 'reconstruct' ? '恢复场景' : '分析与测量'}</span><h5>{family.name}</h5><p>{family.groups.length} 个方向 · {family.groups.reduce((total, group) => total + group.papers.length, 0)} 篇</p></div></header>
          <div className="atlas-family-task"><span>输入 <b>{family.input}</b></span><span>目标 <b>{family.output}</b></span></div>
          <div className="atlas-distribution-label"><span>收录年代 / 篇数</span><div style={{ '--stages': periods.length } as CSSProperties}>{periods.map(period => <span key={period.start}>{period.label}</span>)}</div></div>
          <div className="atlas-taxonomy-tracks">{family.groups.map(group => <a key={group.id} href={`#atlas-track-${group.id}`} style={{ '--route': group.color, '--stages': periods.length } as CSSProperties}>
            <span><strong>{group.name}</strong><small>{group.papers.length} <em>篇</em></small></span><p>{directionHints[group.id] ?? group.description}</p>
            <div className="atlas-track-distribution" aria-label={`${group.name}的年代分布`}>{periods.map(period => {
              const count = group.papers.filter(paper => paper.year >= period.start && paper.year <= period.end).length;
              return <span key={period.start} className={count ? 'has-papers' : ''} aria-label={`${period.label}：${count} 篇`}><b>{count || '—'}</b><span className="atlas-distribution-mobile-year">{period.label}</span></span>;
            })}</div>
          </a>)}</div>
        </section>)}
      </div>
      <footer><span>年代格显示当前收录数量；空格表示暂无收录。</span><span>高度辅助二维分类属于相关方向，区别于真实三维几何任务。</span></footer>
    </section>
    <div className="atlas-timeline-heading"><div><span>研究进展</span><h4>沿时间，读每个方向</h4></div><p>每阶段一篇示例 · 点击篇数查看其余论文</p></div>
    <section className="atlas-roadmap" aria-label="研究方向与论文时间轴" style={{ '--stages': periods.length } as CSSProperties}>
    <div className="atlas-roadmap-guide"><span>纵向看方向，横向看时间</span><p>论文标题可直接点击 · 篇数展开完整列表</p><div className="atlas-roadmap-scope-key"><span><i className="core"/>核心研究</span><span><i/>相关研究</span></div></div>
    <table className="atlas-roadmap-table">
      <caption className="sr-only">各方向每阶段最新收录的一篇论文及收录篇数。阶段等宽，不表示时长；示例不是排名或方法继承关系。</caption>
      <thead><tr><th scope="col">研究方向 <small>{groups.length} 个方向</small></th>{periods.map(period => <th scope="col" key={period.start}>{period.label}<small>{period.start === periods.at(-1)?.start ? '最新收录' : period.start === period.end ? '年度研究' : '阶段积累'}</small></th>)}</tr></thead>
      <tbody>{ordered.map((group, index) => {
        const family = sections.find(section => section.groups[0].id === group.id);
        const selected = selection?.group === group.id;
        const period = selected && selection.period !== undefined ? periods[selection.period] : undefined;
        const visible = group.papers.filter(paper => !period || paper.year >= period.start && paper.year <= period.end).sort(newestFirst);
        const detailId = `atlas-detail-${group.id}`;
        return <Fragment key={group.id}>{family && <tr className="atlas-roadmap-family"><th colSpan={periods.length + 1} scope="rowgroup"><strong>{family.name}</strong><span>{family.hint}</span><small>{family.groups.length} 个方向 · {family.groups.reduce((total, item) => total + item.papers.length, 0)} 篇</small></th></tr>}<tr id={`atlas-track-${group.id}`} className={`atlas-roadmap-row${selected ? ' selected' : ''}`} style={{ '--route': group.color } as CSSProperties}>
          <th scope="row"><button className="atlas-roadmap-direction" title={`${group.description} 点击展开全部 ${group.papers.length} 篇论文。`} aria-expanded={selected && !period} aria-controls={selected ? detailId : undefined} onClick={() => toggle(group.id)}>
            <span className="atlas-roadmap-index">{String(index + 1).padStart(2, '0')}</span><span><strong>{group.name}</strong><small>{directionHints[group.id] ?? group.description}</small></span><span className="atlas-roadmap-chevron" aria-hidden="true">{group.papers.length}<small>篇</small></span>
          </button></th>
          {periods.map((stage, stageIndex) => {
            const papers = group.papers.filter(paper => paper.year >= stage.start && paper.year <= stage.end).sort(newestFirst);
            const example = papers[0];
            const active = selected && selection.period === stageIndex;
            return <td className={`atlas-roadmap-stage${example ? ' occupied' : ''}`} key={stage.start}>
              <span className="atlas-roadmap-mobile-year">{stage.label}</span>
              {example ? <div className={`atlas-roadmap-node${example.scope === '核心研究' ? ' is-core' : ''}`}><i aria-hidden="true"/><button className="atlas-roadmap-paper" data-atlas-example={example.id} onClick={() => onSelect(example)} title={`${example.title} · ${example.scope}`}>
                <strong>{example.shortTitle}</strong><small title={example.venue}>{example.year} · {venueLabels[example.venue] ?? example.venue}</small>
              </button><button className="atlas-roadmap-count" aria-label={`${group.name}，${stage.label}，${papers.length} 篇，${active ? '收起' : '展开'}论文`} aria-expanded={active} aria-controls={selected ? detailId : undefined} onClick={() => toggle(group.id, stageIndex)}>{papers.length} 篇 <span aria-hidden="true">{active ? '−' : '+'}</span></button></div> : <span className="atlas-roadmap-empty">—</span>}

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
  </section></div>;
}
