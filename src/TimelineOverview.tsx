import { useState } from 'react';
import { AtlasOverview } from './AtlasOverview';
import type { Paper } from './types';

export function TimelineOverview({ papers, onSelect, onDetail }: {
  papers: Paper[]; onSelect: (paper: Paper) => void; onDetail: () => void;
}) {
  const [ascending, setAscending] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const years = papers.map(paper => paper.year);
  return <div className="timeline-overview annual-overview">
    <header className="annual-toolbar"><div><span className="annual-kicker">THE RESEARCH CHRONICLE</span><h3>按年浏览</h3><p>{papers.length > 0 ? `${Math.min(...years)}—${Math.max(...years)} · ${papers.length} 篇论文，沿年份探索研究进展` : '调整筛选条件，探索研究进展'}</p></div>
      <div className="annual-actions"><button onClick={() => setAscending(current => !current)} aria-label="切换时间顺序">{ascending ? '早期优先 ↑' : '最新优先 ↓'}</button><button aria-pressed={showAll} onClick={() => setShowAll(current => !current)}>{showAll ? '收起年度列表' : '展开全部论文'}</button><button onClick={onDetail} aria-label="导出完整 SVG">导出 SVG ↗</button></div>
    </header>
    {papers.length > 0 && <AtlasOverview papers={papers} ascending={ascending} showAll={showAll} onSelect={onSelect}/>}
  </div>;
}
