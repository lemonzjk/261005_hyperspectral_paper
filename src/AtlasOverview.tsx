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
  { name: '重建与场景表示', hint: '恢复几何、光谱与外观', tracks: ['rendering', 'geometry', 'lightfield', 'materials'] },
  { name: '采集与空间对齐', hint: '获取观测，建立光谱与空间对应', tracks: ['active', 'capture', 'lidar', 'pointcloud', 'registration'] },
  { name: '理解与扩展成像', hint: '场景应用、波场计量与体成像', tracks: ['understanding', 'holography', 'volumetric', 'fusion'] },
];
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
  return <section className="atlas-roadmap" aria-label="研究方向与论文时间轴" style={{ '--stages': periods.length } as CSSProperties}>
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
        return <Fragment key={group.id}>{family && <tr className="atlas-roadmap-family"><th colSpan={periods.length + 1} scope="rowgroup"><strong>{family.name}</strong><span>{family.hint}</span><small>{family.groups.length} 个方向 · {family.groups.reduce((total, item) => total + item.papers.length, 0)} 篇</small></th></tr>}<tr className={`atlas-roadmap-row${selected ? ' selected' : ''}`} style={{ '--route': group.color } as CSSProperties}>
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
  </section>;
}
