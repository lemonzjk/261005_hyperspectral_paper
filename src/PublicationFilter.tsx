import { useEffect, useRef, useState } from 'react';
import './publication-filter.css';

export interface PublicationOption { name: string; fullName: string; count: number; kind: 'conference' | 'journal' | 'preprint' }
const kinds = [{ id: 'conference', label: '会议' }, { id: 'journal', label: '期刊' }, { id: 'preprint', label: '预印本' }] as const;

export function PublicationFilter({ options, selected, onChange }: {
  options: PublicationOption[]; selected: string[]; onChange: (values: string[]) => void;
}) {
  const root = useRef<HTMLDetailsElement>(null);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const close = (event: PointerEvent) => { if (event.target instanceof Node && !root.current?.contains(event.target) && root.current) root.current.open = false; };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  const toggle = (name: string) => onChange(selected.includes(name) ? selected.filter(value => value !== name) : [...selected, name]);
  return <div className="publication-filter">
    <details ref={root} onToggle={() => { if (!root.current?.open) setSearch(''); }} onKeyDown={event => {
      if (event.key === 'Escape' && root.current?.open) { event.preventDefault(); event.stopPropagation(); root.current.open = false; root.current.querySelector('summary')?.focus(); }
    }}>
      <summary aria-label="选择会议或期刊">{selected.length ? selected.length === 1 ? selected[0] : `出版来源 · 已选 ${selected.length}` : '全部期刊／会议'}<span aria-hidden="true">⌄</span></summary>
      <div className="publication-popover" role="group" aria-label="出版来源多选">
        <header><div><strong>选择会议与期刊</strong><p>可多选；不勾选时显示全部</p></div><button type="button" disabled={!selected.length} onClick={() => onChange([])}>清空选择</button></header>
        <input type="search" aria-label="搜索会议或期刊" placeholder="搜索简称或出版全名…" value={search} onChange={event => setSearch(event.target.value)}/>
        <div className="publication-options">{kinds.map(kind => {
          const all = options.filter(option => option.kind === kind.id);
          const visible = all.filter(option => `${option.name} ${option.fullName}`.toLowerCase().includes(search.trim().toLowerCase()));
          if (!visible.length) return null;
          const complete = visible.every(option => selected.includes(option.name));
          return <fieldset key={kind.id}><legend>{kind.label}<button type="button" onClick={() => onChange(complete ? selected.filter(value => !visible.some(option => option.name === value)) : [...new Set([...selected, ...visible.map(option => option.name)])])}>{complete ? `取消本组${kind.label}` : `全选${kind.label}`}</button></legend>
            {visible.map(option => <label key={option.name} title={option.fullName}><input type="checkbox" checked={selected.includes(option.name)} onChange={() => toggle(option.name)}/><span>{option.name}</span><small>{option.count}</small></label>)}
          </fieldset>;
        })}{!options.some(option => `${option.name} ${option.fullName}`.toLowerCase().includes(search.trim().toLowerCase())) && <p className="publication-no-match">没有匹配的出版来源</p>}</div>
        <footer><span>{selected.length ? `已选择 ${selected.length} 个来源` : '显示全部出版来源'}</span><button type="button" onClick={() => { if (root.current) { root.current.open = false; root.current.querySelector('summary')?.focus(); } }}>完成</button></footer>
      </div>
    </details>
  </div>;
}
