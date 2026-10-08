import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import rawCatalog from './data/catalog.json';
import survey from '../research/hyperspectral/survey.json';
import { HyperspectralDemo } from './HyperspectralDemo';
import { PaperCard } from './PaperCard';
import { PaperDialog } from './PaperDialog';
import { ResearchMap } from './ResearchMap';
import { PublicationFilter, type PublicationOption } from './PublicationFilter';
import { filterLibrary, libraryPresentation, readLibraryFilters, sortByPaperCount, type LibraryFilters } from './library';
import { collectionHref, useCollectionNavigation } from './collection-navigation';
import type { LibraryCategory, Paper } from './types';

const initialPapers = (rawCatalog.papers as Paper[]).filter(paper => paper.collections.includes('hyperspectral'));
const categories = rawCatalog.libraryCategories as LibraryCategory[];
const present = libraryPresentation(categories);
const emptyFilters: LibraryFilters = { query: '', yearFrom: '', yearTo: '', venues: [], categoryIds: [], pending: false, reading: '' };
const readingLabels = { pending: '待核验', title_only: '仅发现题名', abstract_read: '已核验摘要', full_text_read: '已阅读全文' };

export default function HyperspectralLibrary() {
  useCollectionNavigation('hyperspectral');
  const [papers, setPapers] = useState(initialPapers);
  const [filters, setFilters] = useState(() => readLibraryFilters(window.location.search, categories, initialPapers));
  const [view, setView] = useState(window.location.search.includes('view=papers') ? 'papers' : 'atlas');
  const [selected, setSelected] = useState<Paper | null>(() => initialPapers.find(paper => paper.id === new URLSearchParams(window.location.search).get('paper')) ?? null);
  const patch = (values: Partial<LibraryFilters>) => setFilters(current => ({ ...current, ...values }));
  const toggleCategory = (id: string) => patch({ pending: false, categoryIds: filters.categoryIds.includes(id) ? filters.categoryIds.filter(value => value !== id) : [...filters.categoryIds, id] });
  const changeYear = (bound: 'yearFrom' | 'yearTo', value: string) => {
    const next = { ...filters, [bound]: value };
    if (next.yearFrom && next.yearTo && Number(next.yearFrom) > Number(next.yearTo)) next[bound === 'yearFrom' ? 'yearTo' : 'yearFrom'] = value;
    setFilters(next);
  };
  const base = useMemo(() => filterLibrary(papers, filters, categories, true), [papers, filters]);
  const filtered = useMemo(() => filterLibrary(papers, filters, categories), [papers, filters]);
  const pendingCount = base.filter(paper => !paper.library?.categoryIds.length).length;
  const count = (id: string) => base.filter(paper => paper.library?.categoryIds.includes(id)).length;
  const categoriesForDimension = (dimension: LibraryCategory['dimension']) => {
    const labels = categories.filter(category => category.dimension === dimension && category.status !== 'retired');
    return dimension === 'task' ? sortByPaperCount(labels, count) : labels;
  };
  const years = Array.from({ length: Math.max(...papers.map(paper => paper.year)) - Math.min(...papers.map(paper => paper.year)) + 1 }, (_, index) => String(Math.max(...papers.map(paper => paper.year)) - index));
  const publications: PublicationOption[] = [...new Set(papers.map(paper => paper.venue))].sort().map(name => {
    const matches = papers.filter(paper => paper.venue === name);
    return { name, fullName: matches.find(paper => paper.publicationName)?.publicationName ?? name, count: matches.length,
      kind: name === 'arXiv' ? 'preprint' : matches.some(paper => paper.citation.toLowerCase().startsWith('@article')) ? 'journal' : 'conference' };
  });
  const reset = () => setFilters(emptyFilters);
  const hasFilters = Boolean(filters.query || filters.yearFrom || filters.yearTo || filters.venues.length || filters.pending || filters.categoryIds.length || filters.reading);
  useEffect(() => {
    const params = new URLSearchParams({ collection: 'hyperspectral' });
    if (view !== 'atlas') params.set('view', view);
    if (filters.query) params.set('q', filters.query);
    if (filters.yearFrom) params.set('yearFrom', filters.yearFrom);
    if (filters.yearTo) params.set('yearTo', filters.yearTo);
    if (filters.reading) params.set('reading', filters.reading);
    if (filters.pending) params.set('classification', 'pending');
    filters.categoryIds.forEach(id => params.append('category', id));
    filters.venues.forEach(venue => params.append('venue', venue));
    if (selected) params.set('paper', selected.id);
    window.history.replaceState(null, '', `${window.location.pathname}?${params}`);
  }, [filters, view, selected]);
  const downloadBib = () => {
    const url = URL.createObjectURL(new Blob([filtered.map(paper => paper.citation).join('\n\n')], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'hyperspectral-references.bib'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <>
    <a className="skip-link" href="#main">跳到主要内容</a>
    <header className="site-header"><a className="brand" href="?collection=hyperspectral"><span>HSI <b>Research</b></span></a><nav className="header-nav" aria-label="高光谱调研导航"><button className={view === 'atlas' ? 'active' : ''} aria-current={view === 'atlas' ? 'page' : undefined} onClick={() => setView('atlas')}>研究图谱</button><button className={view === 'papers' ? 'active' : ''} aria-current={view === 'papers' ? 'page' : undefined} onClick={() => setView('papers')}>论文库</button><a className="library-link" href={collectionHref('hs3d')}>返回三维视觉专题 ↗</a></nav></header>
    <main id="main" className="workspace hyperspectral-library"><HyperspectralDemo/><div className="section-heading"><div><span className="eyebrow">HYPERSPECTRAL RESEARCH</span><h2>高光谱调研<span>Research collection</span></h2><p className="section-description">已调研论文，持续整理。覆盖成像、处理、学习与应用。</p></div><div className="view-toggle" aria-label="论文展示方式"><button className={view === 'atlas' ? 'active' : ''} onClick={() => setView('atlas')}>时间轴</button><button className={view === 'papers' ? 'active' : ''} onClick={() => setView('papers')}>论文卡片</button></div></div>
      <p className="section-intro">当前收录 {papers.length} 篇条目。分类随摘要与全文阅读形成；全部数量指本站收录。现有条目已逐篇复核分类；阅读与来源核验进度单独记录。</p>
      <details className="library-coverage"><summary>检索覆盖与缺口 · 截止 {survey.cutoffDate}</summary><p>{survey.coverageNote}</p><div className="coverage-table"><table><thead><tr><th>场所 / 年份</th><th>方式与范围</th><th>状态与缺口</th></tr></thead><tbody>{survey.searches.map(search => <tr key={search.id}><td>{search.venue} · {search.year}</td><td>{search.method}<br/>{search.titleCount} 个题名 · {search.keywords.join(' / ')}<br/>{search.pagination}</td><td>{search.statusLabel}<br/>{search.gaps.join('；')}</td></tr>)}{survey.venuePlan.map(venue => <tr key={venue.id}><td>{venue.name} · 早期目录至 {survey.cutoffDate.slice(0, 4)}</td><td>{venue.kind} · {venue.plannedMethod}</td><td>{venue.statusLabel}</td></tr>)}</tbody></table></div></details>
      <div className={`explorer${view === 'atlas' ? ' timeline-explorer' : ''}`}><aside className="explorer-sidebar">
        <div className="sidebar-heading">论文分类<span>{categories.length} 个标签</span></div><button className={`track-button ${!filters.pending && !filters.categoryIds.length ? 'active' : ''}`} onClick={() => patch({ pending: false, categoryIds: [] })}><span>全部论文</span><b>{base.length}</b></button><button className={`track-button ${filters.pending ? 'active' : ''}`} onClick={() => patch({ pending: true, categoryIds: [] })}><span>待分类</span><b>{pendingCount}</b></button>
        <div className="library-category-groups">{(['task', 'method', 'application'] as const).filter(dimension => categories.some(category => category.dimension === dimension)).map(dimension => <fieldset key={dimension}><legend>{{ task: '研究任务', method: '方法', application: '应用场景' }[dimension]}</legend>{categoriesForDimension(dimension).map(category => <label key={category.id} title={category.definition} className={`track-button ${filters.categoryIds.includes(category.id) ? 'active' : ''}`} style={{ '--track': category.color } as CSSProperties}><input type="checkbox" checked={filters.categoryIds.includes(category.id)} onChange={() => toggleCategory(category.id)}/><span>{category.name}<small>{category.status === 'provisional' ? '暂定' : '已确认'}</small></span><b>{count(category.id)}</b></label>)}</fieldset>)}</div>
        <div className="sidebar-note"><span>分类随调研形成</span><p>多标签选择取并集；计数随其他筛选变化。一篇多标签论文在结果中只出现一次。</p></div>
      </aside><div className="explorer-content"><form className="filter-bar" onSubmit={event => event.preventDefault()}><label className="search-field"><input type="search" aria-label="搜索论文、方法或关键词" placeholder="搜索题名、作者、DOI 或关键词…" value={filters.query} onChange={event => patch({ query: event.target.value })}/></label><div className="year-range" role="group" aria-label="年份范围"><select aria-label="起始年份" value={filters.yearFrom} onChange={event => changeYear('yearFrom', event.target.value)}><option value="">起始不限</option>{years.map(year => <option key={year}>{year}</option>)}</select><span className="year-range-separator">至</span><select aria-label="结束年份" value={filters.yearTo} onChange={event => changeYear('yearTo', event.target.value)}><option value="">结束不限</option>{years.map(year => <option key={year}>{year}</option>)}</select></div><PublicationFilter options={publications} selected={filters.venues} onChange={venues => patch({ venues })}/><select aria-label="阅读进度" value={filters.reading} onChange={event => patch({ reading: event.target.value })}><option value="">全部阅读进度</option>{Object.entries(readingLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>{filters.venues.length > 0 && <div className="selected-publications" aria-label="已选择的出版来源">{filters.venues.map(venue => <button key={venue} type="button" aria-label={`移除 ${venue} 筛选`} onClick={() => patch({ venues: filters.venues.filter(value => value !== venue) })}>{venue} ×</button>)}</div>}</form>
        <div className="results-heading"><span aria-live="polite">匹配 <b>{filtered.length}</b> / {papers.length} 篇论文</span>{hasFilters && <button onClick={reset}>清除筛选 ×</button>}<button onClick={downloadBib}>BibTeX ↓</button></div>
        {view === 'atlas' ? <ResearchMap papers={filtered} onSelect={setSelected} present={present} filename="hyperspectral-research-timeline.svg"/> : <div className="paper-grid explorer-paper-grid">{filtered.map(paper => <PaperCard key={paper.id} paper={paper} onSelect={setSelected} present={present}/>)}</div>}
        {!filtered.length && <div className="empty-state"><h3>{!papers.length ? '尚未收录论文' : filters.pending && !pendingCount ? '当前筛选范围内论文均已分类' : '暂时没有匹配的论文'}</h3><button className="secondary-button" onClick={reset}>查看全部论文</button></div>}
      </div></div>
    </main><PaperDialog paper={selected} present={present} onClose={() => setSelected(null)} onUpdated={paper => { setPapers(current => current.map(item => item.id === paper.id ? paper : item)); setSelected(paper); }}/>
  </>;
}
