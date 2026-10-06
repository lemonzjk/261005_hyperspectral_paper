import { useState, type CSSProperties } from 'react';
import type { PaperGroup } from './map-groups';
import type { Paper } from './types';

/** Sample the recorded time range without implying influence between papers. */
function representativePapers(papers: Paper[]) {
  const ordered = [...papers].sort((a, b) => a.year - b.year ||
    Number(b.scope === '核心研究') - Number(a.scope === '核心研究') || a.shortTitle.localeCompare(b.shortTitle));
  if (ordered.length <= 3) return ordered;
  const first = ordered[0];
  const last = ordered.at(-1)!;
  const midpoint = (first.year + last.year) / 2;
  const middle = ordered.slice(1, -1).sort((a, b) =>
    Math.abs(a.year - midpoint) - Math.abs(b.year - midpoint) ||
    Number(b.scope === '核心研究') - Number(a.scope === '核心研究') || a.year - b.year || a.shortTitle.localeCompare(b.shortTitle))[0];
  return [first, middle, last];
}

export function DirectionOverview({ groups, onSelect }: {
  groups: PaperGroup[]; onSelect: (paper: Paper) => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  return <div className="direction-board" aria-label="研究方向与论文时间线">
    {groups.map((group, index) => {
      const all = expanded.has(group.id);
      const papers = all ? [...group.papers].sort((a, b) => a.year - b.year || a.shortTitle.localeCompare(b.shortTitle)) : representativePapers(group.papers);
      const years = group.papers.map(paper => paper.year);
      return <section className="direction-card" key={group.id} style={{ '--route': group.color } as CSSProperties} aria-label={group.name}>
        <header><span className="direction-index">{String(index + 1).padStart(2, '0')}</span><span className="direction-count">{group.papers.length} 篇</span></header>
        <h4>{group.name}</h4><p className="direction-description">{group.description}</p>
        <div className="direction-range"><span>{Math.min(...years)}–{Math.max(...years)}</span><span>{all || group.papers.length <= 3 ? '全部收录' : '不同年代的收录示例'}</span></div>
        <ol className="direction-timeline" id={`direction-papers-${group.id}`}>
          {papers.map(paper => <li key={paper.id}><span className="direction-year">{paper.year}</span><button data-direction-paper={paper.id}
            aria-label={`${paper.shortTitle}，${paper.venue} ${paper.year}，${paper.scope}，查看详情`} title={paper.title} onClick={() => onSelect(paper)}>
            <strong>{paper.shortTitle}</strong><span>{paper.venue}<small className={paper.scope === '核心研究' ? 'core' : ''}>{paper.scope}</small></span>
          </button></li>)}
        </ol>
        {group.papers.length > 3 && <button className="direction-expand" aria-expanded={all} aria-controls={`direction-papers-${group.id}`} onClick={() => setExpanded(previous => {
          const next = new Set(previous);
          if (all) next.delete(group.id); else next.add(group.id);
          return next;
        })}>{all ? '收起为年代示例' : `展开全部 ${group.papers.length} 篇`}<span aria-hidden="true">{all ? '−' : '+'}</span></button>}
      </section>;
    })}
  </div>;
}
