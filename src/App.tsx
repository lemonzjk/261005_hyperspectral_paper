import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import rawCatalog from './data/catalog.json';
import { getTrack, tracks } from './tracks';
import { ResearchMap } from './ResearchMap';
import type { Dataset, Paper } from './types';

const catalog = rawCatalog as { updatedAt: string; papers: Paper[]; datasets: Dataset[] };
const years = [...new Set(catalog.papers.map(p => String(p.year)))].sort().reverse();
const representations = [...new Set(catalog.papers.map(p => p.representation))];
const repo = 'https://github.com/lemonzjk/261005_hyperspectral_paper';
const views = [{ id: 'atlas', label: '研究图谱' }, { id: 'papers', label: '论文库' }, { id: 'datasets', label: '数据资源' }, { id: 'guide', label: '阅读指南' }] as const;
type View = typeof views[number]['id'];
const params = new URLSearchParams(window.location.search);
const initialView = views.some(v => v.id === params.get('view')) ? params.get('view') as View : 'atlas';
const arrow = <span aria-hidden="true">↗</span>;

function SpectrumArt() {
  return <svg className="spectrum-art" viewBox="0 0 450 250" fill="none" aria-hidden="true">
    <defs><linearGradient id="spectrum"><stop stopColor="#7972b0"/><stop offset=".25" stopColor="#518aba"/><stop offset=".5" stopColor="#329d92"/><stop offset=".75" stopColor="#d4b873"/><stop offset="1" stopColor="#cc7865"/></linearGradient><pattern id="heroGrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="#dce2e3" strokeWidth=".6"/></pattern></defs>
    <rect width="450" height="250" fill="url(#heroGrid)"/>
    {[0,1,2,3,4,5,6,7].map(i => <g key={i} transform={`translate(${i*10} ${-i*5})`}><path d="m90 125 112-63 108 63-112 64Z" fill={['#8279b4','#737eb5','#6592b5','#55a2a1','#78b7a1','#b7c394','#d9c190','#d9a68a'][i]} fillOpacity=".22" stroke={['#8279b4','#737eb5','#6592b5','#55a2a1','#78b7a1','#b7c394','#d9c190','#d9a68a'][i]} strokeWidth="1.2"/></g>)}
    <path d="m90 125 112 64 108-64M202 189v33M90 125v33l112 64 108-63v-34" stroke="#6c8984" strokeWidth="1" strokeDasharray="4 4"/>
    <path d="M307 205h105M312 210v-52" stroke="#c4cece"/><path d="m315 196 8-3 9-16 8 8 9-26 10 14 10 8 9-15 8 10 9 7 13 4" stroke="url(#spectrum)" strokeWidth="2"/>
    <text x="332" y="226" fill="#778986" fontSize="10" fontFamily="monospace">WAVELENGTH λ</text>
    <text x="104" y="236" fill="#778986" fontSize="10" fontFamily="monospace">SPACE × SPECTRUM</text>
    <path d="M353 71h45" stroke="url(#spectrum)" strokeWidth="4"/><text x="354" y="61" fill="#778986" fontSize="10" fontFamily="monospace">λ₁ … λₙ</text>
  </svg>;
}

function PaperCard({ paper, onSelect }: { paper: Paper; onSelect: (p: Paper) => void }) {
  const track = getTrack(paper.track);
  return <button className="paper-card" onClick={() => onSelect(paper)} style={{ '--track': track.color } as CSSProperties}>
    <div className="card-top"><span className="venue-badge">{paper.venue} {paper.year}</span><span className="scope">{paper.venueTier === 'background' ? '补充阅读 · ' : ''}{paper.scope}</span></div>
    <h3>{paper.shortTitle}<span aria-hidden="true">↗</span></h3><p className="paper-full-title">{paper.title}</p>
    <p className="paper-summary">{paper.summary}</p>
    <div className="paper-card-bottom"><span><i/>{track.name}</span><span>{paper.representation}</span></div>
  </button>;
}

function PaperDialog({ paper, onClose }: { paper: Paper | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const citation = useRef<HTMLPreElement>(null);
  useEffect(() => { setCopied(false); setCopyError(false); if (paper) dialog.current?.showModal(); else dialog.current?.close(); }, [paper]);
  const copyCitation = async () => {
    try { await navigator.clipboard.writeText(paper!.citation); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); const selection = window.getSelection(); const range = document.createRange(); if (citation.current) { range.selectNodeContents(citation.current); selection?.removeAllRanges(); selection?.addRange(range); } }
  };
  return <dialog className="paper-dialog" ref={dialog} onClose={onClose} onClick={e => { if (e.target === e.currentTarget) { const rect = e.currentTarget.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) onClose(); } }} aria-labelledby="dialog-title">
    {paper && <><div className="dialog-top"><span className="eyebrow">PAPER NOTES / {paper.venue} {paper.year}</span><button className="close-button" onClick={onClose} aria-label="关闭论文详情">×</button></div>
      <div className="dialog-tags"><span className="tag" style={{ color: getTrack(paper.track).color }}>{getTrack(paper.track).name}</span><span className="tag">{paper.representation}</span><span className="tag">{paper.scope}</span></div>
      <h2 id="dialog-title">{paper.shortTitle}</h2><p className="dialog-full-title">{paper.title}</p><p className="authors">{paper.authors}</p>
      <div className="dialog-links"><a className="primary-button" href={paper.paper} target="_blank" rel="noreferrer">阅读论文 {arrow}</a>{paper.code && <a className="secondary-button" href={paper.code} target="_blank" rel="noreferrer">作者代码 {arrow}</a>}</div>
      <p className="dialog-summary">{paper.summary}</p>
      <dl className="io-grid"><div><dt>输入 / INPUT</dt><dd>{paper.input}</dd></div><div><dt>输出 / OUTPUT</dt><dd>{paper.output}</dd></div></dl>
      <h3>关键方法</h3><p>{paper.mechanism}</p><div className="tags">{paper.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="reading-note"><h3>阅读关注</h3><p>{paper.readingNote}</p></div>
      <details className="citation"><summary>BibTeX 引用</summary><pre ref={citation}>{paper.citation}</pre><button className="secondary-button" onClick={copyCitation}>{copied ? '已复制 ✓' : '复制引用'}</button>{copyError && <p role="status">已选中引用，请按 Ctrl/Cmd + C 复制。</p>}</details>
      <div className="dialog-footer">来源：<a href={paper.paper} target="_blank" rel="noreferrer">原论文入口 {arrow}</a><span>条目核验 {paper.verifiedAt}</span></div>
    </>}
  </dialog>;
}

export default function App() {
  const [view, setView] = useState<View>(initialView);
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [track, setTrack] = useState(tracks.some(t => t.id === params.get('track')) ? params.get('track')! : '');
  const [year, setYear] = useState(years.includes(params.get('year') ?? '') ? params.get('year')! : '');
  const [representation, setRepresentation] = useState(representations.includes(params.get('representation') ?? '') ? params.get('representation')! : '');
  const [selected, setSelected] = useState<Paper | null>(catalog.papers.find(p => p.id === params.get('paper')) ?? null);
  const filtered = useMemo(() => catalog.papers.filter(p => (!track || p.track === track) && (!year || String(p.year) === year) && (!representation || p.representation === representation) && query.toLowerCase().trim().split(/\s+/).every(word => `${p.shortTitle} ${p.title} ${p.authors} ${p.summary} ${p.tags.join(' ')} ${p.venue} ${getTrack(p.track).name}`.toLowerCase().includes(word))).sort((a, b) => b.year - a.year || a.shortTitle.localeCompare(b.shortTitle)), [query, track, year, representation]);
  const hasFilters = Boolean(query || track || year || representation);
  const resetFilters = () => { setQuery(''); setTrack(''); setYear(''); setRepresentation(''); };
  useEffect(() => { const next = new URLSearchParams(); if (view !== 'atlas') next.set('view', view); if (query) next.set('q', query); if (track) next.set('track', track); if (year) next.set('year', year); if (representation) next.set('representation', representation); if (selected) next.set('paper', selected.id); window.history.replaceState(null, '', `${window.location.pathname}${next.size ? '?' + next.toString() : ''}`); }, [view, query, track, year, representation, selected]);
  const downloadBib = () => { const url = URL.createObjectURL(new Blob([catalog.papers.map(p => p.citation).join('\n\n')], { type: 'text/plain;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = 'hyperspectral-3d-references.bib'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); };
  return <>
    <a className="skip-link" href="#main">跳到主要内容</a>
    <header className="site-header"><a className="brand" href={import.meta.env.BASE_URL} aria-label="HS3D Atlas 首页"><span className="brand-mark">H<span>³</span></span><span>HS3D <b>Atlas</b><small>HYPERSPECTRAL 3D VISION</small></span></a>
      <nav className="header-nav" aria-label="主导航">{views.map(v => <button key={v.id} className={view === v.id ? 'active' : ''} aria-current={view === v.id ? 'page' : undefined} onClick={() => setView(v.id)}>{v.label}</button>)}</nav>
      <a className="github-link" href={repo} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.3 11.3 0 0 0-3.57 22c.56.1.77-.24.77-.54v-2.1c-3.15.7-3.82-1.34-3.82-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.44-2.25 1.17-3.04-.12-.28-.51-1.44.11-3 0 0 .95-.3 3.11 1.16a10.8 10.8 0 0 1 5.66 0c2.16-1.46 3.1-1.16 3.1-1.16.63 1.56.24 2.72.12 3 .73.79 1.16 1.8 1.16 3.03 0 4.35-2.64 5.31-5.16 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .8Z"/></svg>GitHub {arrow}</a>
    </header>
    <main id="main">
      <section className="hero"><div className="hero-copy"><span className="eyebrow"><i/> AN OPEN RESEARCH ATLAS</span><h1>高光谱 <span>×</span> 三维视觉</h1><p className="hero-en">Beyond RGB. Into the spectral world.</p><p className="hero-description">从几何到光谱，从场景重建到材料理解。<br/>探索高光谱与三维视觉交汇的研究路线、论文与数据。</p><div className="hero-bottom"><span className="edition">VOL. 01 <span>持续整理中</span></span><span className="last-updated">最近更新 {catalog.updatedAt}</span></div></div><div className="hero-visual"><SpectrumArt/><div className="visual-caption"><span>01 — Geometry</span><span>02 — Spectrum</span><span>03 — Materials</span></div></div></section>
      <div className="workspace">
        <section className="overview-strip" aria-label="收录概况"><div><b>{String(catalog.papers.length).padStart(2, '0')}</b><span>收录论文<small>CURATED PAPERS</small></span></div><div><b>{String(tracks.length).padStart(2, '0')}</b><span>研究方向<small>RESEARCH TRACKS</small></span></div><div><b>{String(catalog.datasets.length).padStart(2, '0')}</b><span>数据资源入口<small>DATA RESOURCES</small></span></div><p><span className="status-dot"/>系统调研 · 持续扩充<br/><small>正式发表优先，原始来源逐篇核验</small></p></section>
        {(view === 'atlas' || view === 'papers') && <>
          <div className="section-heading"><div><span className="eyebrow">{view === 'atlas' ? 'EXPLORE THE CONNECTIONS' : 'THE READING COLLECTION'}</span><h2>{view === 'atlas' ? '研究方向图谱' : '论文库'}<span>{view === 'atlas' ? 'Research atlas' : 'Paper collection'}</span></h2></div><div className="view-toggle" aria-label="论文展示方式"><button className={view === 'atlas' ? 'active' : ''} onClick={() => setView('atlas')}><span aria-hidden="true">⌘</span> 图谱</button><button className={view === 'papers' ? 'active' : ''} onClick={() => setView('papers')}><span aria-hidden="true">☷</span> 列表</button></div></div>
          <div className={`explorer${view === 'atlas' ? ' timeline-explorer' : ''}`}><aside className="explorer-sidebar"><label className="mobile-track-filter">研究方向<select value={track} onChange={e => setTrack(e.target.value)} aria-label="选择研究方向"><option value="">全部方向（{catalog.papers.length} 篇）</option>{tracks.map(t => <option key={t.id} value={t.id}>{t.name}（{catalog.papers.filter(p => p.track === t.id).length}）</option>)}</select></label><div className="sidebar-heading">研究方向<span>{tracks.length} TRACKS</span></div><button className={`track-button ${track === '' ? 'active' : ''}`} onClick={() => setTrack('')}><span className="all-track-icon">⊞</span><span>全部方向</span><b>{catalog.papers.length}</b></button>{tracks.map((t, i) => <button key={t.id} className={`track-button ${track === t.id ? 'active' : ''}`} style={{ '--track': t.color } as CSSProperties} onClick={() => setTrack(t.id)}><span className="track-number">{String(i + 1).padStart(2, '0')}</span><span>{t.name}<small>{t.en}</small></span><b>{catalog.papers.filter(p => p.track === t.id).length}</b></button>)}<div className="sidebar-note"><span>阅读提示</span><p>先选研究方向，再用关键词或年份缩小范围。点击论文卡片查看方法、输入输出与原始来源。</p><button onClick={() => setView('guide')}>了解收录范围 →</button></div></aside>
            <div className="explorer-content"><form className="filter-bar" onSubmit={e => e.preventDefault()}><label className="search-field"><svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5"/></svg><input type="search" aria-label="搜索论文、方法或关键词" placeholder="搜索论文、方法或关键词…" value={query} onChange={e => setQuery(e.target.value)}/></label><label><span className="sr-only">年份</span><select value={year} onChange={e => setYear(e.target.value)}><option value="">全部年份</option>{[...new Set(catalog.papers.map(p => p.year))].sort().reverse().map(y => <option key={y}>{y}</option>)}</select></label><label><span className="sr-only">场景表示</span><select value={representation} onChange={e => setRepresentation(e.target.value)}><option value="">全部表示</option>{[...new Set(catalog.papers.map(p => p.representation))].map(r => <option key={r}>{r}</option>)}</select></label></form>
              <div className="results-heading"><span aria-live="polite">{view === 'atlas' ? '匹配' : '显示'} <b>{filtered.length}</b> / {catalog.papers.length} 篇论文{track && <span> · {getTrack(track as Paper['track']).name}</span>}</span>{hasFilters ? <button onClick={resetFilters}>清除筛选 ×</button> : <span className="results-note">{view === 'atlas' ? '按年份与研究方向浏览时间轴' : '按年份从新到旧'}</span>}</div>
              {view === 'atlas' ? <ResearchMap papers={filtered} onSelect={setSelected}/> : <div className="paper-grid explorer-paper-grid">{filtered.map(p => <PaperCard key={p.id} paper={p} onSelect={setSelected}/>)}</div>}
              {!filtered.length && <div className="empty-state"><span>◎</span><h3>暂时没有匹配的论文</h3><p>{track && !catalog.papers.some(p => p.track === track) ? '这个方向的文献正在整理中，可以先浏览其他研究路线。' : '试试其他关键词，或清除当前筛选条件。'}</p><button className="secondary-button" onClick={resetFilters}>查看全部论文</button></div>}
            </div>
          </div>
          {view === 'atlas' && <section className="featured"><div className="section-heading"><div><span className="eyebrow">START YOUR READING</span><h2>从这些论文开始<span>Selected papers</span></h2></div><button className="text-button" onClick={() => setView('papers')}>浏览论文库 →</button></div><div className="paper-grid">{filtered.slice(0, 4).map(p => <PaperCard key={p.id} paper={p} onSelect={setSelected}/>)}</div></section>}
        </>}
        {view === 'datasets' && <section><div className="section-heading"><div><span className="eyebrow">DATA FOR SPECTRAL SCENES</span><h2>数据与评测资源<span>Dataset resources</span></h2></div></div><p className="section-intro">从论文和作者资源入口了解多视角光谱数据。采集规格、划分与许可按核验进度补充。</p><div className="dataset-grid">{catalog.datasets.map((d, i) => <article className="dataset-card" key={d.id}><div className="card-top"><span className="dataset-index">D / {String(i + 1).padStart(2, '0')}</span><span className="tag">{d.type}</span></div><h3>{d.name}</h3><p className="dataset-subtitle">{d.subtitle}</p><p>{d.description}</p><dl className="dataset-facts">{d.facts.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl><p className="availability"><span className="status-dot amber"/>{d.availability}</p><div className="dataset-bottom"><a href={d.source} target="_blank" rel="noreferrer">查看资源来源 {arrow}</a><button onClick={() => setSelected(catalog.papers.find(p => p.id === d.paperIds[0])!)}>关联论文 →</button></div></article>)}</div><div className="scope-callout"><b>数据资源的收录标准</b><p>优先整理与三维场景、相机位姿或几何信息相关的光谱数据。二维 H × W × B 光谱立方体的第三维是波段，不能直接等同于三维几何数据。</p></div></section>}
        {view === 'guide' && <section><div className="section-heading"><div><span className="eyebrow">A FIELD GUIDE</span><h2>从空间到光谱<span>Reading guide</span></h2></div></div><div className="guide-layout"><article className="guide-card"><span className="eyebrow">01 / SCOPE</span><h3>我们关注什么？</h3><p>如何联合建模场景的三维几何、波长相关外观与材料属性，实现重建、渲染和理解？</p><dl className="scope-list"><div><dt>核心研究</dt><dd>高光谱主动三维成像、光场、全息、光谱 LiDAR、光谱点云、重建、渲染与材料理解。</dd></div><div><dt>相关研究</dt><dd>多光谱三维视觉、光谱渲染、HSI 与深度或 LiDAR 融合；高度辅助二维分类单独归类，与核心研究分别标注。</dd></div><div><dt>基础阅读</dt><dd>二维光谱重建、RGB NeRF／3DGS 与成像基础，后续逐步补充。</dd></div></dl></article><article className="guide-card"><span className="eyebrow">02 / READING PATH</span><h3>一条入门阅读路线</h3><p>以下是编辑建议的阅读顺序，不代表方法之间存在直接继承关系。</p><ol className="reading-path">{['spectralnerf', 'hs-nerf', 'hypergs', 'unmix-nerf'].map((id, i) => { const p = catalog.papers.find(p => p.id === id)!; return <li key={id}><span>{String(i + 1).padStart(2, '0')}</span><button onClick={() => setSelected(p)}>{p.shortTitle}<small>{['理解光谱渲染与 RGB 输出', '进入高光谱三维辐射场', '比较三维高斯与辐射场表示', '连接场景表示与材料解混'][i]}</small></button><span aria-hidden="true">↗</span></li>; })}</ol></article></div><div className="guide-tracks">{tracks.map((t, i) => <article key={t.id} style={{ '--track': t.color } as CSSProperties}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{t.name}</h3><p>{t.description}</p></div><button className="text-button" onClick={() => { setTrack(t.id); setView('papers'); }}>查看论文 →</button></article>)}</div><div className="scope-callout"><b>版本与来源</b><p>网站正在系统整理文献，覆盖计算机视觉、遥感和光学的重要会议与期刊，尚未完成全部检索。年份按条目记录的发表或预印本版本呈现；归类和方法摘要由本站整理，未核验的信息会明确说明。论文原文与作者仓库是事实来源。</p><div className="callout-actions"><button className="secondary-button" onClick={downloadBib}>下载引用库 ↓</button><a className="secondary-button" href={`${repo}/issues/new`} target="_blank" rel="noreferrer">推荐论文或纠错 {arrow}</a></div></div></section>}
        <section className="contribute-banner"><div><span className="eyebrow">GROW THIS ATLAS TOGETHER</span><h2>让研究路线，更清晰一点。</h2><p>发现值得收录的论文、数据集，或者需要修正的信息？</p></div><a className="primary-button" href={`${repo}/issues/new`} target="_blank" rel="noreferrer">推荐论文 / 提交纠错 {arrow}</a></section>
      </div>
    </main>
    <footer className="site-footer"><div><b>HS3D Atlas</b><span>高光谱三维视觉研究图谱</span></div><p>独立整理 · 持续更新 · 尊重原始来源</p><div><button onClick={downloadBib}>BibTeX ↓</button><a href={repo} target="_blank" rel="noreferrer">GitHub {arrow}</a></div></footer>
    <PaperDialog paper={selected} onClose={() => setSelected(null)}/>
  </>;
}
