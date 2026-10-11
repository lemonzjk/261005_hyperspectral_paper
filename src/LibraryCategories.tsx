import { useState, type CSSProperties } from 'react';
import { groupedTasks, countGroupPapers } from './library-groups';
import { sortByPaperCount } from './library';
import type { LibraryCategory, Paper } from './types';

export function LibraryCategories({ categories, papers, selected, onChange }: {
  categories: LibraryCategory[]; papers: Paper[]; selected: string[]; onChange: (ids: string[]) => void;
}) {
  const [query, setQuery] = useState('');
  const count = (id: string) => countGroupPapers(papers, [id]);
  const matches = (category: LibraryCategory) => `${category.name} ${category.definition}`.toLowerCase().includes(query.trim().toLowerCase());
  const visible = categories.filter(category => category.status !== 'retired' && count(category.id) > 0 && matches(category));
  const toggle = (id: string) => onChange(selected.includes(id) ? selected.filter(value => value !== id) : [...selected, id]);
  const labels = (items: LibraryCategory[]) => sortByPaperCount(items, count).map(category =>
    <label key={category.id} title={category.definition} className={`track-button ${selected.includes(category.id) ? 'active' : ''}`} style={{ '--track': category.color } as CSSProperties}>
      <input type="checkbox" checked={selected.includes(category.id)} onChange={() => toggle(category.id)}/>
      <span>{category.name}</span><b>{count(category.id)}</b>
    </label>);
  return <div className="library-category-groups">
    <label className="category-search"><span className="sr-only">搜索分类标签</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索任务、方法或应用…"/></label>
    {selected.length > 0 && <div className="selected-categories" aria-label="已选择的分类">{selected.map(id => {
      const category = categories.find(item => item.id === id);
      return category && <button key={id} type="button" onClick={() => toggle(id)} aria-label={`移除分类 ${category.name}`}>{category.name} ×</button>;
    })}</div>}
    <div className="category-dimension-title">研究任务</div>
    {groupedTasks(visible).map(group => {
      const ids = group.categories.map(category => category.id);
      const complete = ids.every(id => selected.includes(id));
      return <details className="category-group" key={group.id} open={Boolean(query.trim())}>
        <summary><span>{group.name}</span><b>{countGroupPapers(papers, ids)}</b>{ids.some(id => selected.includes(id)) && <small>已选</small>}</summary>
        <button className="category-group-toggle" type="button" onClick={() => onChange(complete ? selected.filter(id => !ids.includes(id)) : [...new Set([...selected, ...ids])])}>{complete ? '取消本组' : '全选本组'}</button>
        <fieldset><legend className="sr-only">{group.name}详细任务</legend>{labels(group.categories)}</fieldset>
      </details>;
    })}
    {(['method', 'application'] as const).map(dimension => {
      const items = visible.filter(category => category.dimension === dimension);
      if (!items.length) return null;
      return <details className="category-group" key={dimension} open={Boolean(query.trim())}>
        <summary><span>{dimension === 'method' ? '方法标签' : '应用场景'}</span><small>{items.length}个标签</small></summary>
        <fieldset><legend className="sr-only">{dimension === 'method' ? '方法' : '应用'}</legend>{labels(items)}</fieldset>
      </details>;
    })}
    {!visible.length && <p className="category-empty">没有匹配的分类标签</p>}
  </div>;
}
