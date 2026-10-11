import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { collectionHref, useCollectionNavigation } from './collection-navigation';
import { PaperDialog } from './PaperDialog';
import { SpectralScene } from './SpectralScene';
import rawCatalog from './data/catalog.json';
import { getTrack, tracks } from './tracks';
import { ResearchMap } from './ResearchMap';
import { PaperCard } from './PaperCard';
import { AuthorFilter } from './AuthorFilter';
import { createAuthorMatcher, createPaperQueryMatcher } from './authors';
import { PublicationFilter, type PublicationOption } from './PublicationFilter';
import { canonicalVenue } from './publications';
import type { Dataset, Paper } from './types';

const initialCatalog = rawCatalog as { updatedAt: string; papers: Paper[]; datasets: Dataset[] };
const topicCatalog = { ...initialCatalog, papers: initialCatalog.papers.filter(paper => paper.collections.includes('hs3d')) };
const paperYears = topicCatalog.papers.map(p => p.year);
const years = Array.from({ length: Math.max(...paperYears) - Math.min(...paperYears) + 1 }, (_, i) => String(Math.max(...paperYears) - i));
const venues = [...new Set(topicCatalog.papers.map(p => p.venue))].sort((a, b) => a.localeCompare(b));
const publicationOptions: PublicationOption[] = venues.map(name => {
  const papers = topicCatalog.papers.filter(paper => paper.venue === name);
  return { name, fullName: papers.find(paper => paper.publicationName)?.publicationName ?? name, count: papers.length,
    kind: name === 'arXiv' ? 'preprint' : papers.some(paper => paper.citation.startsWith('@article')) ? 'journal' : 'conference' };
});
const representations = [...new Set(topicCatalog.papers.map(p => p.representation))];
const repo = 'https://github.com/lemonzjk/261005_hyperspectral_paper';
const views = [{ id: 'atlas', label: '研究图谱' }, { id: 'papers', label: '论文库' }, { id: 'datasets', label: '数据资源' }, { id: 'guide', label: '阅读指南' }] as const;
type View = typeof views[number]['id'];
const scopeOptions = [{ id: '', label: '全部研究', value: '' }, { id: 'core', label: '核心研究', value: '核心研究' }, { id: 'related', label: '相关研究', value: '相关研究' }] as const;
type ResearchScope = typeof scopeOptions[number]['id'];
const params = new URLSearchParams(window.location.search);
const initialView = views.some(v => v.id === params.get('view')) ? params.get('view') as View : 'atlas';
const readYear = (key: string) => years.includes(params.get(key) ?? '') ? params.get(key)! : '';
const legacyYear = readYear('year');
const initialYears = { start: readYear('yearFrom') || legacyYear, end: readYear('yearTo') || legacyYear };
if (initialYears.start && initialYears.end && Number(initialYears.start) > Number(initialYears.end)) {
  [initialYears.start, initialYears.end] = [initialYears.end, initialYears.start];
}
const arrow = <span aria-hidden="true">↗</span>;




export default function App() {
  useCollectionNavigation('hs3d');
  const [catalog, setCatalog] = useState(topicCatalog);
  const [view, setView] = useState<View>(initialView);
  const [scope, setScope] = useState<ResearchScope>(scopeOptions.find(option => option.id === params.get('scope'))?.id ?? '');
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [author, setAuthor] = useState(params.get('author') ?? '');
  const [track, setTrack] = useState(tracks.some(t => t.id === params.get('track')) ? params.get('track')! : '');
  const [yearRange, setYearRange] = useState(initialYears);
  const { start: yearFrom, end: yearTo } = yearRange;
  const changeYear = (bound: 'start' | 'end', value: string) => setYearRange(current => {
    const next = { ...current, [bound]: value };
    if (next.start && next.end && Number(next.start) > Number(next.end)) {
      next[bound === 'start' ? 'end' : 'start'] = value;
    }
    return next;
  });
  const [selectedVenues, setSelectedVenues] = useState<string[]>([...new Set(params.getAll('venue').map(canonicalVenue).filter(value => venues.includes(value)))]);
  const changeVenues = (values: string[]) => setSelectedVenues([...new Set(values)].sort((a, b) => a.localeCompare(b)));
  const [representation, setRepresentation] = useState(representations.includes(params.get('representation') ?? '') ? params.get('representation')! : '');
  const [selected, setSelected] = useState<Paper | null>(catalog.papers.find(p => p.id === params.get('paper')) ?? null);
  useEffect(() => {
    setCatalog(topicCatalog);
    setSelected(current => current ? topicCatalog.papers.find(paper => paper.id === current.id) ?? null : null);
  }, [rawCatalog]);
  const authorMatches = useMemo(() => createAuthorMatcher(author, initialCatalog.papers), [author]);
  const queryMatches = useMemo(() => createPaperQueryMatcher(query, initialCatalog.papers), [query]);
  const matchingOtherFilters = useMemo(() => catalog.papers.filter(p => authorMatches(p.authors) && (!yearFrom || p.year >= Number(yearFrom)) && (!yearTo || p.year <= Number(yearTo)) && (!selectedVenues.length || selectedVenues.includes(p.venue)) && (!representation || p.representation === representation) && queryMatches(p.authors, `${p.shortTitle} ${p.title} ${p.authors} ${p.summary} ${p.tags.join(' ')} ${p.venue} ${getTrack(p.track).name}`)).sort((a, b) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle)), [catalog, queryMatches, authorMatches, yearFrom, yearTo, selectedVenues, representation]);
  const matchingPapers = useMemo(() => matchingOtherFilters.filter(paper => !track || paper.track === track), [matchingOtherFilters, track]);
  const scopeValue = scopeOptions.find(option => option.id === scope)!.value;
  // Direction counts include every active filter except the direction itself.
  const directionPapers = useMemo(() => matchingOtherFilters.filter(paper => !scopeValue || paper.scope === scopeValue), [matchingOtherFilters, scopeValue]);
  const directionCounts = useMemo(() => new Map(tracks.map(t => [t.id, directionPapers.filter(paper => paper.track === t.id).length])), [directionPapers]);
  const visibleTracks = tracks.filter(direction => (directionCounts.get(direction.id) ?? 0) > 0);
  const filtered = useMemo(() => matchingPapers.filter(paper => !scopeValue || paper.scope === scopeValue), [matchingPapers, scopeValue]);
  const hasFilters = Boolean(scope || query || author || track || yearFrom || yearTo || selectedVenues.length || representation);
  const resetFilters = () => { setScope(''); setQuery(''); setAuthor(''); setTrack(''); setYearRange({ start: '', end: '' }); setRepresentation(''); setSelectedVenues([]); };
  useEffect(() => { const next = new URLSearchParams(); if (view !== 'atlas') next.set('view', view); if (scope) next.set('scope', scope); if (query) next.set('q', query); if (author) next.set('author', author); if (track) next.set('track', track); if (yearFrom) next.set('yearFrom', yearFrom); if (yearTo) next.set('yearTo', yearTo); selectedVenues.forEach(value => next.append('venue', value)); if (representation) next.set('representation', representation); if (selected) next.set('paper', selected.id); window.history.replaceState(null, '', `${window.location.pathname}${next.size ? '?' + next.toString() : ''}`); }, [view, scope, query, author, track, yearFrom, yearTo, selectedVenues, representation, selected]);
  const navigate = (next: View) => {
    setView(next);
    requestAnimationFrame(() => {
      const content = document.getElementById('research-content');
      content?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      content?.focus({ preventScroll: true });
    });
  };
  const openTopic = (id: string) => { resetFilters(); setTrack(id); navigate('atlas'); };
  const downloadBib = () => { const url = URL.createObjectURL(new Blob([catalog.papers.map(p => p.citation).join('\n\n')], { type: 'text/plain;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = 'hyperspectral-3d-references.bib'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); };
  return <>
    <a className="skip-link" href="#main">跳到主要内容</a>
    <header className="site-header"><a className="brand" href={import.meta.env.BASE_URL} aria-label="HS3D Atlas 首页"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m16 3 12 7-12 7L4 10 16 3Z" stroke="currentColor" strokeWidth="1.3"/><path d="m4 16 12 7 12-7M4 22l12 7 12-7" stroke="currentColor" strokeWidth="1.3"/></svg></span><span>HS3D <b>Atlas</b><small>HYPERSPECTRAL 3D VISION</small></span></a>
      <nav className="header-nav" aria-label="主导航">{views.map(v => <button key={v.id} className={view === v.id ? 'active' : ''} aria-current={view === v.id ? 'page' : undefined} onClick={() => navigate(v.id)}>{v.label}</button>)}<a className="library-link" href={collectionHref('hyperspectral')}>高光谱调研 ↗</a></nav>
      <a className="github-link" aria-label="GitHub 仓库" href={repo} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.3 11.3 0 0 0-3.57 22c.56.1.77-.24.77-.54v-2.1c-3.15.7-3.82-1.34-3.82-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.44-2.25 1.17-3.04-.12-.28-.51-1.44.11-3 0 0 .95-.3 3.11 1.16a10.8 10.8 0 0 1 5.66 0c2.16-1.46 3.1-1.16 3.1-1.16.63 1.56.24 2.72.12 3 .73.79 1.16 1.8 1.16 3.03 0 4.35-2.64 5.31-5.16 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .8Z"/></svg><span className="github-label">GitHub {arrow}</span></a>
    </header>
    <main id="main">
      <section className="atlas-landing" aria-labelledby="atlas-title">
        <h1 id="atlas-title" className="sr-only">高光谱三维视觉交互实验</h1>
        <SpectralScene/>
        <div className="landing-footer"><div><button className="secondary-button" onClick={() => navigate('guide')}>阅读指南</button><button className="primary-button" onClick={() => navigate('atlas')}>探索研究图谱 <span aria-hidden="true">↓</span></button></div></div>
      </section>
      <div className="workspace" id="research">
        <section className="overview-strip" aria-label="收录概况"><div><b>{String(catalog.papers.length).padStart(2, '0')}</b><span>收录论文<small>CURATED PAPERS</small></span></div><div><b>{String(tracks.length).padStart(2, '0')}</b><span>研究方向<small>RESEARCH TRACKS</small></span></div><div><b>{String(catalog.datasets.length).padStart(2, '0')}</b><span>数据资源入口<small>DATA RESOURCES</small></span></div><p><span className="status-dot"/>系统调研 · 持续扩充<br/><small>正式发表优先，原始来源逐篇核验</small></p></section>
        <div id="research-content" tabIndex={-1} className="research-content">
        {(view === 'atlas' || view === 'papers') && <>
          <div className="topic-shortcuts" aria-label="研究主题快捷入口"><span>选择一个问题，开始探索<small>FIND YOUR RESEARCH PATH</small></span>{[{ id: 'geometry', label: '如何重建几何？', hint: '深度估计 · 多视角重建' }, { id: 'rendering', label: '如何表示光谱场景？', hint: '辐射场 · 三维高斯' }, { id: 'materials', label: '如何理解材料？', hint: '光谱解混 · 逆渲染' }].map(item => <button key={item.id} aria-pressed={track === item.id} onClick={() => openTopic(item.id)}><span className="topic-copy">{item.label}<small>{item.hint}</small></span><span aria-hidden="true">↗</span></button>)}</div>
          <div className="section-heading"><div><span className="eyebrow">{view === 'atlas' ? 'EXPLORE THE RESEARCH' : 'THE READING COLLECTION'}</span><h2>{view === 'atlas' ? '年度研究时间线' : '论文库'}<span>{view === 'atlas' ? 'Research chronicle' : 'Paper collection'}</span></h2><p className="section-description">先选研究方向，再沿年份阅读。每篇论文都可查看方法、原始来源与核验状态。</p></div><div className="view-toggle" aria-label="论文展示方式"><button className={view === 'atlas' ? 'active' : ''} onClick={() => setView('atlas')}><span aria-hidden="true">⌘</span> 时间轴</button><button className={view === 'papers' ? 'active' : ''} onClick={() => navigate('papers')}><span aria-hidden="true">☷</span> 论文卡片</button></div></div>
          <div className={`explorer${view === 'atlas' ? ' timeline-explorer' : ''}`}><aside className="explorer-sidebar"><label className="mobile-track-filter">研究方向<select value={track} onChange={e => setTrack(e.target.value)} aria-label="选择研究方向"><option value="">全部方向（{directionPapers.length} 篇）</option>{track && !visibleTracks.some(direction => direction.id === track) && <option value={track} hidden>{getTrack(track as Paper['track']).name}（当前无匹配）</option>}{visibleTracks.map(t => <option key={t.id} value={t.id}>{t.name}（{directionCounts.get(t.id) ?? 0}）</option>)}</select></label><div className="sidebar-heading">研究方向<span>{visibleTracks.length} / {tracks.length} TRACKS</span></div><button className={`track-button ${track === '' ? 'active' : ''}`} onClick={() => setTrack('')}><span className="all-track-icon">⊞</span><span>全部方向</span><b>{directionPapers.length}</b></button>{visibleTracks.map(t => <button key={t.id} className={`track-button ${track === t.id ? 'active' : ''}`} style={{ '--track': t.color } as CSSProperties} onClick={() => setTrack(t.id)}><span className="track-number">{String(tracks.indexOf(t) + 1).padStart(2, '0')}</span><span>{t.name}<small>{t.en}</small></span><b>{directionCounts.get(t.id) ?? 0}</b></button>)}<div className="sidebar-note"><span>阅读提示</span><p>方向数量随其他筛选条件更新。先选研究方向，再用关键词或年份缩小范围。点击论文卡片查看方法、输入输出与原始来源。</p><button onClick={() => navigate('guide')}>了解收录范围 →</button></div></aside>
            <div className="explorer-content"><form className="filter-bar" onSubmit={e => e.preventDefault()}>
              <fieldset className="scope-filter"><legend>研究范围</legend><div>{scopeOptions.map(option => <label key={option.id}><input type="radio" name="research-scope" value={option.id} checked={scope === option.id} onChange={() => setScope(option.id)}/><span>{option.label}<b>{option.value ? matchingPapers.filter(paper => paper.scope === option.value).length : matchingPapers.length}</b></span></label>)}</div><p>按现有收录标注筛选，数量随其他条件变化。</p></fieldset>
              <label className="search-field"><svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5"/></svg><input type="search" aria-label="搜索论文、方法或关键词" placeholder="搜索论文、方法或关键词…" value={query} onChange={e => setQuery(e.target.value)}/></label><div className="year-range" role="group" aria-label="年份范围"><label><span className="sr-only">起始年份</span><select aria-label="起始年份" value={yearFrom} onChange={e => changeYear('start', e.target.value)}><option value="">起始不限</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></label><span className="year-range-separator">至</span><label><span className="sr-only">结束年份</span><select aria-label="结束年份" value={yearTo} onChange={e => changeYear('end', e.target.value)}><option value="">结束不限</option>{years.map(y => <option key={y} value={y}>{y}</option>)}</select></label></div><AuthorFilter papers={catalog.papers} value={author} onChange={setAuthor}/><PublicationFilter options={publicationOptions} selected={selectedVenues} onChange={changeVenues}/><label><span className="sr-only">场景表示</span><select value={representation} onChange={e => setRepresentation(e.target.value)}><option value="">全部表示</option>{[...new Set(catalog.papers.map(p => p.representation))].map(r => <option key={r}>{r}</option>)}</select></label>{selectedVenues.length > 0 && <div className="selected-publications" aria-label="已选择的出版来源">{selectedVenues.map(value => <button key={value} type="button" aria-label={`移除 ${value} 筛选`} onClick={() => changeVenues(selectedVenues.filter(item => item !== value))}>{value}<span aria-hidden="true">×</span></button>)}</div>}</form>
              <div className="results-heading"><span aria-live="polite">{view === 'atlas' ? '匹配' : '显示'} <b>{filtered.length}</b> / {catalog.papers.length} 篇论文{selectedVenues.length > 0 && <span> · {selectedVenues.length === 1 ? selectedVenues[0] : `${selectedVenues.length} 个出版来源`}</span>}{(yearFrom || yearTo) && <span> · {yearFrom && yearTo ? yearFrom === yearTo ? `${yearFrom} 年` : `${yearFrom}–${yearTo} 年` : yearFrom ? `${yearFrom} 年起` : `截至 ${yearTo} 年`}</span>}{track && <span> · {getTrack(track as Paper['track']).name}</span>}{scopeValue && <span> · {scopeValue}</span>}</span>{hasFilters ? <button onClick={resetFilters}>清除筛选 ×</button> : <span className="results-note">{view === 'atlas' ? '按年份与研究方向浏览时间轴' : '按年份从新到旧'}</span>}</div>
              {view === 'atlas' ? <ResearchMap papers={filtered} onSelect={setSelected}/> : <div className="paper-grid explorer-paper-grid">{filtered.map(p => <PaperCard key={p.id} paper={p} onSelect={setSelected}/>)}</div>}
              {!filtered.length && <div className="empty-state"><span>◎</span><h3>暂时没有匹配的论文</h3><p>{track && !catalog.papers.some(p => p.track === track) ? '这个方向的文献正在整理中，可以先浏览其他研究路线。' : '试试其他关键词，或清除当前筛选条件。'}</p><button className="secondary-button" onClick={resetFilters}>查看全部论文</button></div>}
            </div>
          </div>
          {view === 'atlas' && !hasFilters && <section className="featured"><div className="section-heading"><div><span className="eyebrow">START YOUR READING</span><h2>入门阅读路线<span>Selected papers</span></h2></div><button className="text-button" onClick={() => navigate('papers')}>浏览论文库 →</button></div><div className="paper-grid">{['hs-nerf', 'hypergs', 'unmix-nerf'].map(id => catalog.papers.find(p => p.id === id)!).map(p => <PaperCard key={p.id} paper={p} onSelect={setSelected}/>)}</div></section>}
        </>}
        {view === 'datasets' && <section><div className="section-heading"><div><span className="eyebrow">DATA FOR SPECTRAL SCENES</span><h2>数据与评测资源<span>Dataset resources</span></h2></div></div><p className="section-intro">从论文和作者资源入口了解多视角光谱数据。采集规格、划分与许可按核验进度补充。</p><div className="dataset-grid">{catalog.datasets.map((d, i) => <article className="dataset-card" key={d.id}><div className="card-top"><span className="dataset-index">D / {String(i + 1).padStart(2, '0')}</span><span className="tag">{d.type}</span></div><h3>{d.name}</h3><p className="dataset-subtitle">{d.subtitle}</p><p>{d.description}</p><dl className="dataset-facts">{d.facts.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl><p className="availability"><span className="status-dot amber"/>{d.availability}</p><div className="dataset-bottom"><a href={d.source} target="_blank" rel="noreferrer">查看资源来源 {arrow}</a><button onClick={() => setSelected(catalog.papers.find(p => p.id === d.paperIds[0])!)}>关联论文 →</button></div></article>)}</div><div className="scope-callout"><b>数据资源的收录标准</b><p>优先整理与三维场景、相机位姿或几何信息相关的光谱数据。二维 H × W × B 光谱立方体的第三维是波段，不能直接等同于三维几何数据。</p></div></section>}
        {view === 'guide' && <section><div className="section-heading"><div><span className="eyebrow">A FIELD GUIDE</span><h2>从空间到光谱<span>Reading guide</span></h2></div></div><div className="guide-layout"><article className="guide-card"><span className="eyebrow">01 / SCOPE</span><h3>我们关注什么？</h3><p>如何联合建模场景的三维几何、波长相关外观与材料属性，实现重建、渲染和理解？</p><dl className="scope-list"><div><dt>核心研究</dt><dd>高光谱主动三维成像、光场、全息、光谱 LiDAR、光谱点云、重建、渲染与材料理解。</dd></div><div><dt>相关研究</dt><dd>高光谱与深度或 LiDAR 融合；高度辅助二维分类单独归类，与核心研究分别标注。</dd></div><div><dt>基础阅读</dt><dd>高光谱成像、光谱重建与材料解混，按任务组织阅读。</dd></div></dl></article><article className="guide-card"><span className="eyebrow">02 / READING PATH</span><h3>一条入门阅读路线</h3><p>以下是编辑建议的阅读顺序，不代表方法之间存在直接继承关系。</p><ol className="reading-path">{['hs-nerf', 'hypergs', 'unmix-nerf'].map((id, i) => { const p = catalog.papers.find(p => p.id === id)!; return <li key={id}><span>{String(i + 1).padStart(2, '0')}</span><button onClick={() => setSelected(p)}>{p.shortTitle}<small>{['进入高光谱三维辐射场', '比较三维高斯与辐射场表示', '连接场景表示与材料解混'][i]}</small></button><span aria-hidden="true">↗</span></li>; })}</ol></article></div><div className="guide-tracks">{tracks.map((t, i) => <article key={t.id} style={{ '--track': t.color } as CSSProperties}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{t.name}</h3><p>{t.description}</p></div><button className="text-button" onClick={() => { resetFilters(); setTrack(t.id); navigate('papers'); }}>查看论文 →</button></article>)}</div><div className="scope-callout"><b>版本与来源</b><p>网站正在系统整理文献，覆盖计算机视觉、遥感和光学的重要会议与期刊，尚未完成全部检索。年份按条目记录的发表或预印本版本呈现；归类和方法摘要由本站整理，未核验的信息会明确说明。论文原文与作者仓库是事实来源。</p><div className="callout-actions"><button className="secondary-button" onClick={downloadBib}>下载引用库 ↓</button><a className="secondary-button" href={`${repo}/issues/new`} target="_blank" rel="noreferrer">推荐论文或纠错 {arrow}</a></div></div></section>}
        </div>
        <section className="contribute-banner"><div><span className="eyebrow">GROW THIS ATLAS TOGETHER</span><h2>让研究路线，更清晰一点。</h2><p>发现值得收录的论文、数据集，或者需要修正的信息？</p></div><a className="primary-button" href={`${repo}/issues/new`} target="_blank" rel="noreferrer">推荐论文 / 提交纠错 {arrow}</a></section>
      </div>
    </main>
    <footer className="site-footer"><div><b>HS3D Atlas</b><span>高光谱三维视觉研究图谱</span></div><p>独立整理 · 持续更新 · 尊重原始来源</p><div><button onClick={downloadBib}>BibTeX ↓</button><a href={repo} target="_blank" rel="noreferrer">GitHub {arrow}</a></div></footer>
    <PaperDialog paper={selected} onClose={() => setSelected(null)} onUpdated={paper => { setCatalog(current => ({ ...current, papers: current.papers.map(item => item.id === paper.id ? paper : item) })); setSelected(current => current?.id === paper.id ? paper : current); }}/>
  </>;
}
