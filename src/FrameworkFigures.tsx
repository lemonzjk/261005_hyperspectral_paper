import { useEffect, useRef, useState, type FormEvent, type DragEvent } from 'react';
import type { FrameworkFigure, Paper } from './types';

const containsFiles = (event: DragEvent) => event.dataTransfer.types.includes('Files');

const imagePath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function FigureImage({ paper, figure }: { paper: Paper; figure: FrameworkFigure }) {
  return <>
    <a className="framework-image-link" href={imagePath(figure.path)} target="_blank" rel="noreferrer" aria-label={`${figure.figureLabel}，打开高清原图`}>
      <img src={imagePath(figure.path)} alt={`${paper.shortTitle} ${figure.figureLabel}：${figure.caption}`} width={figure.width} height={figure.height} loading="lazy"/><span>打开高清原图 ↗</span>
    </a>
    <figcaption><strong>{figure.figureLabel}</strong><p>{figure.caption}</p><div>
      <a href={figure.sourceUrl} target="_blank" rel="noreferrer">{figure.verificationStatus === 'pending' ? '用户填写的来源' : '原始来源'}{figure.page ? ` · PDF 第 ${figure.page} 页` : ''} ↗</a>
      <span className={figure.verificationStatus === 'pending' ? 'figure-unverified' : undefined}>{figure.verificationStatus === 'pending' ? `用户上传 · 待核验 · ${figure.uploadedAt}` : `核验 ${figure.verifiedAt}`}</span>
    </div><small>{figure.attribution}</small></figcaption>
  </>;
}

function UploadForm({ paper, replacement, initialFiles, onSaved, onCancel }: {
  paper: Paper; replacement: FrameworkFigure | null; initialFiles?: File[]; onSaved: (paper: Paper) => void; onCancel: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [label, setLabel] = useState(replacement?.figureLabel ?? '补充框架图');
  const [caption, setCaption] = useState('');
  const [source, setSource] = useState(replacement?.sourceUrl ?? paper.paper);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const mounted = useRef(true);
  useEffect(() => { input.current?.focus(); mounted.current = true; return () => { mounted.current = false; }; }, []);
  useEffect(() => {
    if (!file) { setPreview(''); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  const chooseFile = (value: File | undefined) => {
    setError(''); setFile(null);
    if (!value) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(value.type)) { setError('请选择 PNG、JPG 或 WebP 图片。'); return; }
    if (value.size > 10 * 1024 * 1024 || value.size === 0) { setError('图片须大于 0 字节，且不超过 10 MB。'); return; }
    setFile(value);
  };
  const chooseFiles = (files: File[]) => {
    if (files.length !== 1) { setFile(null); setError('每次请拖入一张图片。'); return; }
    chooseFile(files[0]);
  };
  useEffect(() => { if (initialFiles) chooseFiles(initialFiles); }, [initialFiles]);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file || saving) return;
    setSaving(true); setError('');
    try {
      const image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(',')[1]);
        reader.onerror = () => reject(new Error('读取图片失败，请重新选择。'));
        reader.readAsDataURL(file);
      });
      const response = await fetch(`${import.meta.env.BASE_URL}__local/figures`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'X-HS3D-Upload': '1' },
        body: JSON.stringify({ paperId: paper.id, replacePath: replacement?.path ?? null, expectedSha256: replacement?.sha256, image, figureLabel: label, caption: caption.trim() || '用户上传的框架图，图像内容与来源尚待人工核验。', sourceUrl: source }),
      });
      if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('当前服务不支持保存图片，请使用 npm run dev 启动本地编辑服务。');
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || '上传失败，请重试。');
      onSaved(result.paper);
    } catch (reason) {
      if (mounted.current) setError(reason instanceof Error ? reason.message : '上传失败，请检查连接后重试。');
    } finally { if (mounted.current) setSaving(false); }
  };
  return <form className="figure-upload" onSubmit={submit} aria-label={replacement ? '替换框架图' : '补充框架图'} aria-busy={saving}
    onDragOver={event => { if (containsFiles(event)) { event.preventDefault(); event.stopPropagation(); event.dataTransfer.dropEffect = saving ? 'none' : 'copy'; if (!saving) setDragging(true); } }}
    onDragLeave={event => { if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setDragging(false); }}
    onDrop={event => { if (containsFiles(event)) { event.preventDefault(); event.stopPropagation(); setDragging(false); if (!saving) chooseFiles(Array.from(event.dataTransfer.files)); } }}
    data-dragging={dragging}>
    <h4>{replacement ? `替换 ${replacement.figureLabel}` : '补充框架图'}</h4>
    <p>{replacement ? '新图片保留原来的展示位置，旧图和来源存入替换历史。' : '新图片追加到这篇论文的框架图中。'}上传后标记为待核验。</p>
    <fieldset disabled={saving}>
      <label className="figure-file figure-drop-zone"><strong>{dragging ? '松开，预览图片' : '拖入图片，或点击选择'}</strong><input aria-label="选择图片" ref={input} type="file" accept="image/png,image/jpeg,image/webp" onChange={event => { if (event.target.files?.length) chooseFiles(Array.from(event.target.files)); event.target.value = ''; }}/><small>PNG / JPG / WebP · 最大 10 MB · 宽高至少 100 像素</small></label>
      {preview && <div className="figure-upload-preview"><img src={preview} alt="待上传图片预览"/><span>{file?.name}</span></div>}
      <label>图号或名称<input required maxLength={160} value={label} onChange={event => setLabel(event.target.value)} placeholder="例如 Figure 2 · 总体框架"/></label>
      <label>来源链接<input type="url" required maxLength={2000} value={source} onChange={event => setSource(event.target.value)} placeholder="https://…"/><small>填写论文、作者项目页或原图的 HTTPS 链接。</small></label>
      <label>图片说明（选填）<textarea maxLength={3000} rows={3} value={caption} onChange={event => setCaption(event.target.value)} placeholder="简述图像内容；替换时可注明更换原因。"/></label>
    </fieldset>
    {error && <p className="figure-upload-error" role="alert">{error}</p>}
    <div className="figure-upload-actions"><button className="primary-button" disabled={!file || saving} type="submit">{saving ? '正在保存…' : replacement ? '保存替换' : '保存补充图'}</button><button className="secondary-button" type="button" disabled={saving} onClick={onCancel}>取消</button></div>
    <small className="figure-save-note">保存到本地项目，刷新后保留。</small>
  </form>;
}

export function FrameworkFigures({ paper, onUpdated }: { paper: Paper; onUpdated: (paper: Paper) => void }) {
  const [editing, setEditing] = useState<{ replacement: FrameworkFigure | null; initialFiles?: File[] } | null>(null);
  const [message, setMessage] = useState('');
  const [dragging, setDragging] = useState(false);
  const addButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const figures = paper.frameworkFigures ?? [];
  const finish = (updated: Paper) => {
    onUpdated(updated); setEditing(null);
    setMessage('图片已保存到本地项目，当前标记为待核验。');
    requestAnimationFrame(() => addButton.current?.focus({ preventScroll: true }));
  };
  return <section className="paper-frameworks" aria-label="论文框架图" data-dragging={dragging}
    onDragOver={event => { if (import.meta.env.DEV && containsFiles(event)) { event.preventDefault(); event.dataTransfer.dropEffect = editing ? 'none' : 'copy'; if (!editing) setDragging(true); } }}
    onDragLeave={event => { if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setDragging(false); }}
    onDrop={event => {
      if (!import.meta.env.DEV || !containsFiles(event)) return;
      event.preventDefault(); event.stopPropagation(); setDragging(false);
      if (editing) return;
      const target = event.target instanceof Element ? event.target.closest('[data-replace-figure]') : null;
      const replacement = figures.find(figure => figure.path === target?.getAttribute('data-replace-figure')) ?? null;
      trigger.current = addButton.current; setMessage('');
      setEditing({ replacement, initialFiles: Array.from(event.dataTransfer.files) });
    }}>
    <div className="framework-heading"><h3>论文框架图 <span>{figures.length} 张</span></h3>{import.meta.env.DEV && <button ref={addButton} type="button" className="secondary-button" disabled={Boolean(editing)} onClick={event => { trigger.current = event.currentTarget; setMessage(''); setEditing({ replacement: null }); }}>＋ 补充图片</button>}</div>
    {import.meta.env.DEV && !editing && <p className="figure-drop-hint">{dragging ? '松开后预览，再确认保存' : '可直接拖入图片补充；拖到已有框架图上可替换。'}</p>}
    {message && <p className="figure-upload-success" role="status">{message}</p>}
    {editing && <UploadForm key={editing.replacement?.path ?? 'new'} paper={paper} replacement={editing.replacement} initialFiles={editing.initialFiles} onSaved={finish} onCancel={() => { setEditing(null); requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true })); }}/>}
    {figures.length ? figures.map(figure => <figure key={figure.path} data-replace-figure={figure.path}>
      <FigureImage paper={paper} figure={figure}/>
      {import.meta.env.DEV && <div className="figure-edit-actions"><button className="secondary-button" disabled={Boolean(editing)} onClick={event => { trigger.current = event.currentTarget; setMessage(''); setEditing({ replacement: figure }); }}>替换此图<span className="sr-only">：{figure.figureLabel}</span></button></div>}
    </figure>) : <div className="framework-pending"><strong>{paper.frameworkFigureSearch?.status === 'no_framework' ? '所用版本未发现独立框架图' : paper.frameworkFigureSearch?.status === 'needs_access' ? '框架图待人工补充' : '框架图待检索'}</strong><p>{paper.frameworkFigureSearch?.note || '按最新年份优先逐篇收集，核验后将在这里展示。'}</p>{paper.frameworkFigureSearch && <a href={paper.frameworkFigureSearch.sourceUrl} target="_blank" rel="noreferrer">已检查来源 · {paper.frameworkFigureSearch.checkedAt} ↗</a>}</div>}
    {Boolean(paper.frameworkFigureHistory?.length) && <details className="figure-history"><summary>替换历史 · {paper.frameworkFigureHistory!.length} 张原图</summary><p>原图和核验记录完整保留，不计入当前展示数量。</p>{paper.frameworkFigureHistory!.map(item => <figure key={item.replacementPath}><FigureImage paper={paper} figure={item.figure}/><p className="figure-history-date">替换于 {item.replacedAt}</p></figure>)}</details>}
  </section>;
}
