import { useId, useMemo } from 'react';
import { splitAuthors } from './authors';
import type { Paper } from './types';

export function AuthorFilter({ papers, value, onChange }: { papers: Paper[]; value: string; onChange: (value: string) => void }) {
  const listId = useId();
  const names = useMemo(() => [...new Set(papers.flatMap(paper => splitAuthors(paper.authors)))].sort((a, b) => a.localeCompare(b)), [papers]);
  return <label className="search-field author-field">
    <span className="author-field-label">作者</span>
    <input type="text" aria-label="按作者筛选" placeholder="输入姓名或选择作者…" list={listId} value={value} onChange={event => onChange(event.target.value)}/>
    <datalist id={listId}>{names.map(name => <option key={name} value={name}/>)}</datalist>
  </label>;
}
