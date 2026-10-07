import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { FrameworkFigures } from './FrameworkFigures';
import { present3d } from './tracks';
import type { Paper, PresentPaper } from './types';

const publicationLabels: Record<string, string> = { published: '正式发表', early_access: '在线先行', preprint: '预印本', accepted: '已接收 · 正式卷页待核验' };
const arrow = <span aria-hidden="true">↗</span>;


export function PaperDialog({ paper, onClose, onUpdated, present = present3d }: { paper: Paper | null; onClose: () => void; onUpdated: (paper: Paper) => void; present?: PresentPaper }) {
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
      <div className="dialog-tags"><span className="tag" style={{ '--track': present(paper).color } as CSSProperties}>{present(paper).name}</span><span className="tag">{paper.representation}</span><span className="tag">{present(paper).scope}</span>{paper.publicationStatus === 'early_access' && <span className="tag">在线先行 · 卷期待补</span>}</div>
      <h2 id="dialog-title">{paper.shortTitle}</h2><p className="dialog-full-title">{paper.title}</p><p className="authors">{paper.authors}</p>
      <div className="dialog-links"><a className="primary-button" href={paper.paper} target="_blank" rel="noreferrer">阅读论文 {arrow}</a>{paper.code && <a className="secondary-button" href={paper.code} target="_blank" rel="noreferrer">作者代码 {arrow}</a>}</div>
      <dl className="publication-facts"><div><dt>出版来源</dt><dd>{paper.publicationName || paper.venue}</dd></div><div><dt>版本年份</dt><dd>{paper.year}{paper.publicationStatus && publicationLabels[paper.publicationStatus] && <span>{publicationLabels[paper.publicationStatus]}</span>}</dd></div>{paper.doi && <div><dt>DOI</dt><dd>{paper.doi}</dd></div>}</dl>
      <p className="dialog-summary">{paper.summary}</p>
      <FrameworkFigures key={paper.id} paper={paper} onUpdated={onUpdated}/>

      <dl className="io-grid"><div><dt>输入 / INPUT</dt><dd>{paper.input}</dd></div><div><dt>输出 / OUTPUT</dt><dd>{paper.output}</dd></div></dl>
      <h3>关键方法</h3><p>{paper.mechanism}</p><div className="tags">{paper.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="reading-note"><h3>阅读关注</h3><p>{paper.readingNote}</p></div>
      {paper.library && <section className="library-evidence"><h3>调研记录</h3><dl className="publication-facts"><div><dt>阅读进度</dt><dd>{{ pending: '待核验', title_only: '仅发现题名', abstract_read: '已核验摘要', full_text_read: '已阅读全文' }[paper.library.readingProgress]}</dd></div><div><dt>分类状态</dt><dd>{{ pending: '待分类', provisional: '暂定分类', confirmed: '已确认分类' }[paper.library.classificationStatus]}</dd></div><div><dt>高光谱关系</dt><dd>{paper.library.relationNote}</dd></div><div><dt>研究问题</dt><dd>{paper.library.researchQuestion}</dd></div><div><dt>数据集</dt><dd>{paper.library.datasets}</dd></div><div><dt>实验设置</dt><dd>{paper.library.experimentSetting}</dd></div><div><dt>主要结论</dt><dd>{paper.library.conclusions}</dd></div><div><dt>局限</dt><dd>{paper.library.limitations}</dd></div></dl>{paper.library.dataLinks.map(url => <p key={url}><a href={url} target="_blank" rel="noreferrer">作者数据入口 ↗</a></p>)}<h3>证据与版本</h3><ul>{paper.library.evidence.map((evidence, index) => <li key={index}><a href={evidence.url} target="_blank" rel="noreferrer">{evidence.level} · {evidence.checkedAt}</a><p>{evidence.supports.join('；')}</p></li>)}</ul><ul>{paper.library.versions.map(version => <li key={version.id}><a href={version.url} target="_blank" rel="noreferrer">{version.type} · {version.year}{version.arxivVersion ? ` · ${version.arxivVersion}` : ''}</a><p>{version.relation}{version.metadataStatus && `；${version.metadataStatus}`}{version.firstSubmittedAt && `；首次提交 ${version.firstSubmittedAt}`}{version.updatedAt && `；更新 ${version.updatedAt}`}</p></li>)}</ul></section>}
      <details className="citation"><summary>BibTeX 引用</summary><pre ref={citation}>{paper.citation}</pre><button className="secondary-button" onClick={copyCitation}>{copied ? '已复制 ✓' : '复制引用'}</button>{copyError && <p role="status">已选中引用，请按 Ctrl/Cmd + C 复制。</p>}</details>
      <div className="dialog-footer">来源：<a href={paper.paper} target="_blank" rel="noreferrer">原论文入口 {arrow}</a><span>条目核验 {paper.verifiedAt}</span></div>
    </>}
  </dialog>;
}

