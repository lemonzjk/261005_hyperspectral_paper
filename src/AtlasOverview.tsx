import { useState } from 'react';
import { getTrack } from './tracks';
import type { Paper } from './types';

/** Annual groups share the document scroll and preserve every filtered paper. */
export function AtlasOverview({ papers, ascending, showAll, onSelect }: {
  papers: Paper[]; ascending: boolean; showAll: boolean; onSelect: (paper: Paper) => void;
}) {
  const [expanded, setExpanded] = useState<number[]>([]);
  const years = [...new Set(papers.map(paper => paper.year))].sort((a, b) => ascending ? a - b : b - a);
  return <div className="annual-atlas">
    <nav className="annual-navigation" aria-label="跳转到发表年份">
      <span>年份索引</span><div>{years.map(year => <a key={year} href={`#research-year-${year}`}>{year}</a>)}</div>
    </nav>
    <div className="annual-sections" aria-label="论文年度时间轴">
      {years.map(year => {
        const collection = papers.filter(paper => paper.year === year);
        const open = showAll || expanded.includes(year);
        const visible = open ? collection : collection.slice(0, 6);
        return <section className="annual-section" id={`research-year-${year}`} key={year} aria-label={`${year} 年，${collection.length} 篇论文`}>
          <header className="annual-year"><span className="annual-dot" aria-hidden="true"/><h4>{year}</h4><span>{collection.length} 篇论文</span>{year === Math.max(...years) && <small>最新年份</small>}</header>
          <div className="annual-content">
            <div className="annual-papers">{visible.map(paper => {
              const figure = paper.frameworkFigures?.[0];
              return <button className="annual-paper" key={paper.id} data-timeline-paper={paper.id} onClick={() => onSelect(paper)} aria-label={`${paper.shortTitle}，${paper.venue} ${paper.year}，查看详情`}>
                <div className="annual-paper-meta"><span>{paper.venue}</span>{paper.publicationStatus === 'accepted' && <small>已接收</small>}{paper.publicationStatus === 'preprint' && <small>预印本</small>}<span className={`annual-scope${paper.scope === '核心研究' ? ' core' : ''}`}>{paper.scope === '核心研究' ? '核心' : '相关'}</span></div>
                <div className="annual-paper-body"><div><h5>{paper.shortTitle}<span aria-hidden="true">↗</span></h5><p>{paper.summary}</p></div>{figure && <img src={`${import.meta.env.BASE_URL}${figure.path.replace(/^\//, '')}`} alt="" loading="lazy"/>}</div>
                <footer><span>{getTrack(paper.track).name}</span><span>{figure ? '框架原图' : '方法详情'} <span aria-hidden="true">↗</span></span></footer>
              </button>;
            })}</div>
            {!showAll && collection.length > 6 && <button className="annual-expand" aria-expanded={open} onClick={() => setExpanded(current => open ? current.filter(value => value !== year) : [...current, year])}>{open ? '收起本年论文' : `展开其余 ${collection.length - 6} 篇论文`} <span aria-hidden="true">{open ? '−' : '+'}</span></button>}
          </div>
        </section>;
      })}
    </div>
    <p className="annual-note">按收录版本年份排列，年度间距不表示时长。方向归类用于阅读，不表示方法继承。</p>
  </div>;
}
