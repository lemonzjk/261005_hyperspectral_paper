import { useRef, useState, useLayoutEffect } from 'react';
import { timelineLayout } from './timeline-layout';
import type { Paper } from './types';

export function ResearchMap({ papers, onSelect }: { papers: Paper[]; onSelect: (p: Paper) => void }) {
  const viewport = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const layout = timelineLayout(papers);
  const overview = useRef(true);
  const fit = () => {
    if (!viewport.current) return;
    overview.current = true;
    setZoom(Math.max(.05, Math.min(1, (viewport.current.clientWidth - 24) / layout.width, (viewport.current.clientHeight - 24) / layout.height)));
    viewport.current.scrollTo(0, 0);
  };
  useLayoutEffect(() => {
    fit();
    const observer = new ResizeObserver(() => { if (overview.current) fit(); });
    if (viewport.current) observer.observe(viewport.current);
    return () => observer.disconnect();
  }, [papers]);
  const latest = () => {
    overview.current = false;
    setZoom(1);
    requestAnimationFrame(() => viewport.current?.scrollTo({ left: viewport.current.scrollWidth, top: 0, behavior: 'smooth' }));
  };
  const changeZoom = (factor: number) => {
    overview.current = false;
    const next = Math.max(.05, Math.min(2.5, zoom * factor));
    const element = viewport.current;
    const centerX = element ? (element.scrollLeft + element.clientWidth / 2) / zoom : 0;
    const centerY = element ? (element.scrollTop + element.clientHeight / 2) / zoom : 0;
    setZoom(next);
    requestAnimationFrame(() => element?.scrollTo(centerX * next - element.clientWidth / 2, centerY * next - element.clientHeight / 2));
  };
  const labelSize = Math.min(28, Math.max(14, 7 / zoom));
  const detailSize = Math.min(20, Math.max(10, 5 / zoom));
  const stationLabel = (title: string) => {
    let width = 0;
    let result = '';
    for (const character of title) {
      width += labelSize * (/[^\x00-\x7F]/.test(character) ? 1 : .58);
      if (width > 148) return `${result}…`;
      result += character;
    }
    return result;
  };
  const exportSvg = () => {
    if (!svg.current) return;
    const clone = svg.current.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', String(layout.width)); clone.setAttribute('height', String(layout.height));
    clone.querySelectorAll('text').forEach(text => { text.setAttribute('font-family', 'Arial, Microsoft YaHei, sans-serif'); });
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'hs3d-research-timeline.svg'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <div className="timeline-browser">
    <div className="timeline-toolbar">
      <div><strong>研究时间轴</strong><span>年份横轴 · 方向线路 · 论文站点</span></div>
      <div className="timeline-controls" role="group" aria-label="时间轴视图控制">
        <button aria-label="缩小时间轴" disabled={zoom <= .05} onClick={() => changeZoom(1 / 1.25)}>−</button>
        <button aria-label="恢复原始大小" onClick={() => { overview.current = false; setZoom(1); }}>{Math.round(zoom * 100)}%</button>
        <button aria-label="放大时间轴" disabled={zoom >= 2.5} onClick={() => changeZoom(1.25)}>+</button>
        <button onClick={fit}>完整图谱</button>
        <button onClick={latest}>最新研究</button>
        <button onClick={exportSvg}>导出 SVG</button>
      </div>
    </div>
    <div className="timeline-legend" aria-label="研究线路图例">{layout.lanes.map(lane => <span key={lane.id}><i style={{ background: lane.color }}/>{lane.name}</span>)}</div>
    <div ref={viewport} className={`timeline-viewport${dragging ? ' is-dragging' : ''}`} tabIndex={0} aria-label="论文时间轴，拖动或滚动平移，点击论文站点查看详情"
      onPointerDown={event => {
        if (event.button !== 0 || !viewport.current) return;
        suppressClick.current = false;
        drag.current = { x: event.clientX, y: event.clientY, left: viewport.current.scrollLeft, top: viewport.current.scrollTop, moved: false };
      }}
      onPointerMove={event => {
        const start = drag.current; if (!start || !viewport.current) return;
        if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) {
          start.moved = true; setDragging(true);
          viewport.current.setPointerCapture(event.pointerId);
          viewport.current.scrollLeft = start.left - (event.clientX - start.x);
          viewport.current.scrollTop = start.top - (event.clientY - start.y);
        }
      }}
      onPointerUp={() => { suppressClick.current = drag.current?.moved ?? false; drag.current = null; setDragging(false); }}
      onPointerCancel={() => { drag.current = null; setDragging(false); }}
      onClickCapture={event => { if (suppressClick.current) { event.stopPropagation(); event.preventDefault(); } suppressClick.current = false; }}>
      <svg ref={svg} width={layout.width * zoom} height={layout.height * zoom} viewBox={`0 0 ${layout.width} ${layout.height}`} aria-label={`${papers.length} 篇论文的研究时间轴`}>
        <rect width={layout.width} height={layout.height} fill="#fffdf7"/>
        {layout.columns.map(column => <g key={column.year}>
          <text x={column.x + column.width / 2} y={47} textAnchor="middle" fill="#42605a" fontSize={detailSize + 3} fontWeight="600">{column.year}</text>
          <path d={`M${column.x + 8} 62 H${column.x + column.width - 8}`} stroke="#aebdb4" strokeWidth="1"/>
          <path d={`M${column.x} 76 V${layout.height - 55}`} stroke="#e9eee7" strokeDasharray="3 7"/>
        </g>)}
        <text x="28" y="47" fill="#71857a" fontSize="12">研究线路 / 发表年份</text>
        {layout.lanes.map(lane => <g key={lane.id}>
          <text x="28" y={lane.y - 8} fill={lane.color} fontSize={labelSize} fontWeight="600">{lane.name}</text>
          <text x="28" y={lane.y + 14} fill="#849087" fontSize={detailSize}>{lane.papers.length} 篇论文</text>
          
          {!!lane.stations.length && <path d={lane.route} fill="none" stroke={lane.color} strokeWidth="2.5" strokeLinejoin="round"/>}
          {lane.stations.map(({ paper, x, y }) => <g key={paper.id} data-paper="true" className="timeline-station" role="button" tabIndex={0}
            aria-label={`${paper.shortTitle}，${paper.venue} ${paper.year}，查看论文详情`}
            onClick={() => onSelect(paper)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(paper); } }}>
            <title>{paper.title} · {paper.venue} {paper.year} · {paper.scope}</title>
            <rect x={x - 82} y={y - 51} width="164" height="83" rx="6" fill="transparent"/>
            {paper.scope === '核心研究' ? <circle cx={x} cy={y} r="5" fill="#fffdf7" stroke={lane.color} strokeWidth="2"/> : <rect x={x - 4} y={y - 4} width="8" height="8" rx="1" fill="#fffdf7" stroke={lane.color} strokeWidth="1.5"/>}
            <text x={x} y={y - 38} textAnchor="middle" fill="#29453e" fontSize={labelSize} fontWeight="600">{stationLabel(paper.shortTitle)}</text>
            <text x={x} y={y - 14} textAnchor="middle" fill="#738176" fontSize={detailSize}>{paper.venue} · {paper.year}</text>
          </g>)}
        </g>)}
        <text x="28" y={layout.height - 25} fill="#75847b" fontSize="11">○ 核心研究　□ 相关研究　·　同一线路用于组织阅读，不表示直接继承关系</text>
      </svg>
    </div>
    <div className="timeline-caption"><span>点击站点查看论文 · 拖动 / 滚动平移 · 键盘 Tab 选择站点</span><span>{papers.length} 个论文站点 · 年份已核验，未推定发表月份</span></div>
  </div>;
}
