import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { getTrack } from './tracks';
import type { Paper } from './types';

/** Annual groups share document scrolling and preserve every filtered paper. */
export function AtlasOverview({ papers, ascending, showAll, onSelect }: {
  papers: Paper[]; ascending: boolean; showAll: boolean; onSelect: (paper: Paper) => void;
}) {
  const [expanded, setExpanded] = useState<number[]>([]);
  const years = [...new Set(papers.map(paper => paper.year))].sort((a, b) => ascending ? a - b : b - a);
  const [activeYear, setActiveYear] = useState(years[0]);
  const sections = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const collections = years.map(year => ({ year, papers: papers.filter(paper => paper.year === year) }));
  const largest = Math.max(...collections.map(collection => collection.papers.length));
  const yearKey = years.join(',');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const groups = [...(sections.current?.querySelectorAll<HTMLElement>('.annual-section') ?? [])];
        const threshold = (navigation.current?.getBoundingClientRect().height ?? 60) + 88;
        const current = groups.find(group => group.getBoundingClientRect().bottom > threshold);
        if (current) setActiveYear(Number(current.dataset.year));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [yearKey]);

  useEffect(() => {
    const nav = navigation.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    const list = link?.parentElement;
    if (link && list) list.scrollLeft = link.offsetLeft - list.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2;
  }, [activeYear]);

  const jumpToYear = (year: number) => {
    setActiveYear(year);
    const section = document.getElementById(`research-year-${year}`);
    section?.scrollIntoView({ block: 'start', behavior: 'instant' });
    section?.focus({ preventScroll: true });
  };

  return <div className="annual-atlas">
    <div className="year-distribution">
      <div className="distribution-heading"><span>收录年份分布</span><span>柱高表示收录篇数 · 点击跳转</span></div>
      <div className="distribution-bars" aria-label="按年收录数量">{[...collections].sort((a, b) => a.year - b.year).map(collection =>
        <button key={collection.year} onClick={() => jumpToYear(collection.year)} aria-label={`${collection.year} 年，${collection.papers.length} 篇，跳转到该年`}>
          <span className="distribution-count">{collection.papers.length}</span>
          <span className="distribution-bar" style={{ '--bar-height': `${Math.max(4, collection.papers.length / largest * 64)}px` } as CSSProperties}/>
          <span className="distribution-year">{collection.year}</span>
        </button>
      )}</div>
      <p>仅反映本站收录情况，不代表领域发表总量。</p>
    </div>
    <nav ref={navigation} className="annual-navigation" aria-label="跳转到发表年份">
      <span>年份</span><div>{years.map(year => <a key={year} href={`#research-year-${year}`} aria-current={activeYear === year ? 'location' : undefined} onClick={event => { event.preventDefault(); jumpToYear(year); }}>{year}</a>)}</div>
    </nav>
    <div ref={sections} className="annual-sections" aria-label="论文年度时间轴">
      {collections.map(({ year, papers: collection }) => {
        const open = showAll || expanded.includes(year);
        const visible = open ? collection : collection.slice(0, 6);
        return <section className="annual-section" id={`research-year-${year}`} data-year={year} tabIndex={-1} key={year} aria-label={`${year} 年，${collection.length} 篇论文`}>
          <header className="annual-year"><span className="annual-dot" aria-hidden="true"/><h4>{year}</h4><span>{collection.length} 篇论文</span>{year === Math.max(...years) && <small>最新收录年份</small>}</header>
          <div className="annual-content">
            <div className="annual-papers">{visible.map((paper, index) => {
              const figure = paper.frameworkFigures?.[0];
              const track = getTrack(paper.track);
              return <button className="annual-paper" key={paper.id} data-timeline-paper={paper.id} style={{ '--track': track.color } as CSSProperties} onClick={() => onSelect(paper)} aria-label={`${paper.shortTitle}，${paper.venue} ${paper.year}，查看详情`}>
                <div className="annual-paper-meta"><span>{paper.venue}</span><span className="annual-paper-number">{String(index + 1).padStart(2, '0')}</span>{paper.publicationStatus === 'accepted' && <small>已接收</small>}{paper.publicationStatus === 'preprint' && <small>预印本</small>}{paper.publicationStatus === 'early_access' && <small>在线先行</small>}<span className={`annual-scope${paper.scope === '核心研究' ? ' core' : ''}`}>{paper.scope}</span></div>
                <div className="annual-paper-body"><div><h5>{paper.shortTitle}<span aria-hidden="true">↗</span></h5><p>{paper.summary}</p></div>{figure && <img src={`${import.meta.env.BASE_URL}${figure.path.replace(/^\//, '')}`} alt="" loading="lazy"/>}</div>
                <footer><span className="annual-track"><i/>{track.name}</span><span>查看{figure ? figure.verificationStatus === 'pending' ? '上传图（待核验）' : '方法与原图' : '方法详情'} <span aria-hidden="true">↗</span></span></footer>
              </button>;
            })}</div>
            {!showAll && collection.length > 6 && <button className="annual-expand" aria-expanded={open} onClick={() => setExpanded(current => open ? current.filter(value => value !== year) : [...current, year])}>{open ? '收起本年论文' : `已展示 6 / ${collection.length} 篇 · 展开其余 ${collection.length - 6} 篇`} <span aria-hidden="true">{open ? '−' : '+'}</span></button>}
          </div>
        </section>;
      })}
    </div>
    <p className="annual-note">按收录版本年份排列，年度间距不表示时长。方向归类用于阅读，不表示方法继承。</p>
  </div>;
}
