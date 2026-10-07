import type { CSSProperties } from 'react';
import { present3d } from './tracks';
import type { Paper, PresentPaper } from './types';

export function PaperCard({ paper, onSelect, present = present3d }: { paper: Paper; onSelect: (p: Paper) => void; present?: PresentPaper }) {
  const track = present(paper);
  return <button className="paper-card" onClick={() => onSelect(paper)} style={{ '--track': track.color } as CSSProperties}>
    <div className="card-top"><span className="venue-badge">{paper.venue} {paper.year}{paper.publicationStatus === 'early_access' ? ' · 在线先行' : paper.publicationStatus === 'accepted' ? ' · 已接收' : ''}</span><span className="scope">{paper.venueTier === 'background' ? '补充阅读 · ' : ''}{track.scope}</span></div>
    {paper.frameworkFigures?.[0] && <div className="paper-card-figure"><img src={`${import.meta.env.BASE_URL}${paper.frameworkFigures[0].path}`} alt="" loading="lazy"/><span>{paper.frameworkFigures[0].verificationStatus === 'pending' ? '用户上传 · 待核验' : '论文框架原图'}</span></div>}
    <h3>{paper.shortTitle}<span aria-hidden="true">↗</span></h3><p className="paper-full-title">{paper.title}</p>
    <p className="paper-summary">{paper.summary}</p>
    <div className="paper-card-bottom"><span><i/>{track.name}</span><span>{paper.representation}</span></div>
  </button>;
}

