import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import { ResearchMap } from '../src/ResearchMap';
import { PaperCard } from '../src/PaperCard';
import { PublicationFilter, type PublicationOption } from '../src/PublicationFilter';
import { getTrack } from '../src/tracks';
import rawCatalog from '../src/data/catalog.json';
import type { Paper } from '../src/types';
import '../src/styles.css';
import '../src/atlas-overview.css';
import '../src/design-system.css';
import './hyperspectral-library-prototype.css';

// Existing papers demonstrate presentation only; no general-library classification is persisted.
const papers = (rawCatalog.papers as Paper[]).slice(0, 8);
const pendingIds = new Set(['mps-well-posed', 'neuralmps']);
const topicsFor = (paper: Paper) => pendingIds.has(paper.id) ? [] : [getTrack(paper.track)];
const topics = [...new Map(papers.flatMap(topicsFor).map(topic => [topic.id, topic])).values()];
const years = [...new Set(papers.map(paper => paper.year))].sort((a, b) => b - a);
const publications: PublicationOption[] = [...new Set(papers.map(paper => paper.venue))].map(name => {
  const matches = papers.filter(paper => paper.venue === name);
  return { name, fullName: matches[0].publicationName ?? name, count: matches.length,
    kind: name === 'arXiv' ? 'preprint' : matches.some(paper => paper.citation.startsWith('@article')) ? 'journal' : 'conference' };
});

function Prototype() {
  const [view, setView] = useState<'atlas' | 'papers'>('atlas');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [venues, setVenues] = useState<string[]>([]);
  const [selected, setSelected] = useState<Paper | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (selected) dialog.current?.showModal(); else dialog.current?.close(); }, [selected]);
  const base = papers.filter(paper => (!yearFrom || paper.year >= Number(yearFrom)) && (!yearTo || paper.year <= Number(yearTo)) && (!venues.length || venues.includes(paper.venue)) && query.trim().toLowerCase().split(/\s+/).every(word => `${paper.shortTitle} ${paper.title} ${paper.summary} ${paper.venue}`.toLowerCase().includes(word)));
  const count = (id: string) => base.filter(paper => id === 'pending' ? !topicsFor(paper).length : !id || topicsFor(paper).some(topic => topic.id === id)).length;
  const filtered = base.filter(paper => category === 'pending' ? !topicsFor(paper).length : !category || topicsFor(paper).some(topic => topic.id === category)).sort((a, b) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle));
  const options = [{ id: '', name: '全部论文', color: '#a0bbaa' }, { id: 'pending', name: '待分类', color: '#b4aa8c' }, ...topics];
  const reset = () => { setCategory(''); setQuery(''); setYearFrom(''); setYearTo(''); setVenues([]); };
  return <>
    <header className="site-header"><a className="brand" href="docs/hyperspectral-library-prototype.html"><span>HSI <b>Research</b></span></a><nav className="header-nav" aria-label="高光谱调研导航"><button className={view === 'atlas' ? 'active' : ''} onClick={() => setView('atlas')}>研究图谱</button><button className={view === 'papers' ? 'active' : ''} onClick={() => setView('papers')}>论文库</button><a className="library-link" href="?view=atlas">返回三维视觉专题 ↗</a></nav></header>
    <main className="workspace library-prototype">
      <p className="prototype-note">设计预览 · 复用三维视觉的时间轴、论文卡片与筛选样式。当前 8 篇样例及原专题标签仅用于预览；总库分类随调研形成，待分类为演示状态。</p>
      <div className="section-heading"><div><span className="eyebrow">HYPERSPECTRAL RESEARCH</span><h2>高光谱调研<span>Research collection</span></h2><p className="section-description">已调研论文，持续整理。按分类筛选，沿年份阅读。</p></div><div className="view-toggle" aria-label="论文展示方式"><button className={view === 'atlas' ? 'active' : ''} onClick={() => setView('atlas')}>⌘ 时间轴</button><button className={view === 'papers' ? 'active' : ''} onClick={() => setView('papers')}>☷ 论文卡片</button></div></div>
      <div className={`explorer${view === 'atlas' ? ' timeline-explorer' : ''}`}>
        <aside className="explorer-sidebar"><label className="mobile-track-filter">论文分类<select aria-label="选择论文分类" value={category} onChange={event => setCategory(event.target.value)}>{options.map(option => <option key={option.id} value={option.id}>{option.name}（{count(option.id)}）</option>)}</select></label><div className="sidebar-heading">论文分类<span>持续整理</span></div>{options.map((option, index) => <button key={option.id} className={`track-button ${category === option.id ? 'active' : ''}`} style={{ '--track': option.color } as CSSProperties} onClick={() => setCategory(option.id)}><span className="track-number">{index === 0 ? '⊞' : String(index).padStart(2, '0')}</span><span>{option.name}</span><b>{count(option.id)}</b></button>)}<div className="sidebar-note"><span>分类随调研形成</span><p>先收录，再逐步归类。正式分类可随阅读增加、合并和调整。</p></div></aside>
        <div className="explorer-content"><form className="filter-bar" onSubmit={event => event.preventDefault()}><label className="search-field"><input type="search" aria-label="搜索论文、方法或关键词" placeholder="搜索论文、方法或关键词…" value={query} onChange={event => setQuery(event.target.value)}/></label><div className="year-range" role="group" aria-label="年份范围"><select aria-label="起始年份" value={yearFrom} onChange={event => { setYearFrom(event.target.value); if (yearTo && event.target.value && Number(event.target.value) > Number(yearTo)) setYearTo(event.target.value); }}><option value="">起始不限</option>{years.map(year => <option key={year}>{year}</option>)}</select><span className="year-range-separator">至</span><select aria-label="结束年份" value={yearTo} onChange={event => { setYearTo(event.target.value); if (yearFrom && event.target.value && Number(event.target.value) < Number(yearFrom)) setYearFrom(event.target.value); }}><option value="">结束不限</option>{years.map(year => <option key={year}>{year}</option>)}</select></div><PublicationFilter options={publications} selected={venues} onChange={setVenues}/></form>
          <div className="results-heading"><span aria-live="polite">匹配 <b>{filtered.length}</b> / {papers.length} 篇样例论文</span><button onClick={reset}>清除筛选 ×</button></div>
          {view === 'atlas' ? <ResearchMap papers={filtered} onSelect={setSelected}/> : <div className="paper-grid explorer-paper-grid">{filtered.map(paper => <PaperCard key={paper.id} paper={paper} onSelect={setSelected}/>)}</div>}
          {!filtered.length && <div className="empty-state"><h3>暂时没有匹配的论文</h3><p>试试其他关键词，或清除当前筛选条件。</p><button className="secondary-button" onClick={reset}>查看全部论文</button></div>}
        </div>
      </div>
    </main>
    <dialog className="paper-dialog" ref={dialog} onClose={() => setSelected(null)} aria-labelledby="dialog-title">{selected && <><div className="dialog-top"><span className="eyebrow">PAPER NOTES / {selected.venue} {selected.year}</span><button className="close-button" onClick={() => setSelected(null)} aria-label="关闭论文详情">×</button></div><h2 id="dialog-title">{selected.shortTitle}</h2><p className="dialog-full-title">{selected.title}</p><p className="authors">{selected.authors}</p><div className="dialog-links"><a className="primary-button" href={selected.paper} target="_blank" rel="noreferrer">阅读论文 ↗</a></div><p className="dialog-summary">{selected.summary}</p>{selected.frameworkFigures?.[0] && <img className="prototype-figure" src={selected.frameworkFigures[0].path} alt={`${selected.shortTitle} 论文框架原图`}/>}<dl className="io-grid"><div><dt>输入 / INPUT</dt><dd>{selected.input}</dd></div><div><dt>输出 / OUTPUT</dt><dd>{selected.output}</dd></div></dl><h3>关键方法</h3><p>{selected.mechanism}</p><div className="reading-note"><h3>阅读关注</h3><p>{selected.readingNote}</p></div></>}</dialog>
  </>;
}
createRoot(document.getElementById('root')!).render(<Prototype/>);
