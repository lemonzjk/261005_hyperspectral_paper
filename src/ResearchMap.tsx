import { useState, type CSSProperties } from 'react';
import { groupPapers, type Grouping } from './map-groups';
import { getTrack } from './tracks';
import type { Paper } from './types';

export function ResearchMap({ papers, onSelect }: { papers: Paper[]; onSelect: (p: Paper) => void }) {
  const [grouping, setGrouping] = useState<Grouping>('track');
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const groups = groupPapers(papers, grouping);
  const toggleGroup = (id: string) => setExpanded(previous => {
    const next = new Set(previous);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
  return <div className="atlas-browser">
    <div className="atlas-toolbar">
      <div className="atlas-grouping" role="group" aria-label="图谱分组方式">
        <button aria-pressed={grouping === 'track'} onClick={() => setGrouping('track')}>按研究方向</button>
        <button aria-pressed={grouping === 'year'} onClick={() => setGrouping('year')}>按发表年份</button>
      </div>
      <button className="atlas-expand-all" aria-pressed={showAll} onClick={() => { setShowAll(!showAll); setExpanded(new Set()); }}>{showAll ? '只看各组最新 3 篇' : '展开全部论文'}</button>
    </div>
    {!!papers.length && <div className="atlas-hint">{showAll ? '已展开全部结果' : '各组优先展示最新 3 篇，可展开查看早期研究'} · 点击卡片阅读方法与来源</div>}
    <div className="atlas-groups" role="group" aria-label="论文研究图谱">
      {groups.map(group => {
        const groupKey = `${grouping}-${group.id}`;
        const isExpanded = showAll || expanded.has(groupKey);
        const visible = isExpanded ? group.papers : group.papers.slice(0, 3);
        return <section className="atlas-lane" key={groupKey} style={{ '--track': group.color } as CSSProperties}>
          <header className="atlas-lane-header">
            <div><h3><span className="atlas-track-dot"/>{group.name}<span className="atlas-count">{group.papers.length} 篇</span></h3><p>{group.description}</p></div>
            {group.papers.length > 3 && !showAll && <button aria-expanded={isExpanded} aria-controls={`lane-${groupKey}`} onClick={() => toggleGroup(groupKey)}>{isExpanded ? '收起' : `查看全部 ${group.papers.length} 篇`}<span aria-hidden="true">{isExpanded ? '−' : '+'}</span></button>}
          </header>
          <div className="atlas-paper-grid" id={`lane-${groupKey}`}>
            {visible.map(paper => <button className="atlas-paper" data-paper="true" key={paper.id}
              aria-label={`${paper.shortTitle}，${paper.venue} ${paper.year}，查看论文详情`} onClick={() => onSelect(paper)}>
              <div className="atlas-paper-meta"><span>{paper.year}</span><span>{paper.venue}</span><span className={paper.scope === '核心研究' ? 'atlas-scope core' : 'atlas-scope'}>{paper.venueTier === 'background' ? '补充' : paper.scope === '核心研究' ? '核心' : '相关'}</span></div>
              <h4>{paper.shortTitle}<span aria-hidden="true">↗</span></h4>
              <p className="atlas-paper-title">{paper.title}</p>
              <div className="atlas-paper-footer"><span>{grouping === 'year' ? getTrack(paper.track).name : paper.representation}</span><span>阅读笔记</span></div>
            </button>)}
          </div>
        </section>;
      })}
    </div>
    {!!papers.length && <p className="atlas-footnote">分组用于组织阅读，不表示论文之间存在直接继承关系。</p>}
  </div>;
}
