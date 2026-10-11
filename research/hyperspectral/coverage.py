"""Render active coverage separately from evidence gathered under the old scope."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
survey = json.loads((ROOT / 'survey.json').read_text())
HEADER = ['| 场所 | 年份 | 查询与分页 | 题名 / 命中 / 已审 | 覆盖级别 | 剩余缺口 |',
          '| --- | --- | --- | --- | --- | --- |']


def search_rows(searches):
    rows = []
    for search in searches:
        keywords = '、'.join(search['keywords'])
        if search.get('titleKeywords') and search.get('abstractKeywords'):
            keywords = f"题名：{'、'.join(search['titleKeywords'])}；摘要：{'、'.join(search['abstractKeywords'])}"
        rows.append(f"| {search['venue']} | {search['year']} | {keywords}；{search['pagination']} | {search.get('titleCount', '未单列')} / {search.get('candidateCount', '未单列')} / {search.get('reviewedCount', '未单列')} | {search['statusLabel']} | {'；'.join(search['gaps'])} |")
    return rows


active = [s for s in survey['searches'] if s.get('collectionScope') == 'active']
historical = [s for s in survey['searches'] if s.get('collectionScope') == 'historical']
lines = ['# 高光谱检索覆盖', '', f"查询快照截止：{survey['cutoffDate']}；范围更新：{survey['updatedAt']}。状态：持续调研。", '',
         survey['coverageNote'], '', '当前来源白名单与作者例外见 [收录政策](../../src/data/collection-policy.json)，逐项清理决定见 [清理审计](catalog-cleanup.json)。', '',
         '## 当前范围内的实际检索', '', *HEADER, *search_rows(active), '',
         '完成指定查询不等于所有摘要、任务或引用链完成；候选原始证据与逐项决定见 `sources/` 和 `survey.json`。', '',
         '## 当前待检索矩阵', '', '年度范围为各场所最早可用官方目录至快照截止日期。未列出的年份或关键词单元视为未检索，不推定为零篇。', '',
         '| 来源 | 类型 | 年份范围 | 状态 |', '| --- | --- | --- | --- |']
for venue in survey['venuePlan']:
    lines.append(f"| {venue['name']} | {venue['kind']} | 最早可用目录至 {survey['cutoffDate'][:4]} | {venue['statusLabel']} |")
lines += ['', '## 当前缺口', '', *['- ' + gap for gap in survey['gaps']], '',
          '## 历史证据', '', '<details>', '<summary>旧范围搜索与场所（不作普通总库后续目标）</summary>', '',
          *HEADER, *search_rows(historical), '', '旧场所：' + '、'.join(v['name'] for v in survey.get('historicalVenuePlan', [])), '', '</details>', '',
          '<details>', '<summary>历史批次记录（数量与待核项属于当时状态）</summary>', '']
for batch in survey['batches']:
    lines += [f"- {batch['date']} / {batch['id']}：新增 {batch['new']}，更新 {batch['updated']}，去重 {batch['duplicates']}，排除 {batch['excluded']}，待处理 {batch['pending']}。更新与去重可能重叠，不能相加为新增。", f"  阅读边界：{batch['readingBoundary']}"]
lines += ['', '</details>', '', '旧缺口原文保留在 `survey.json` 的 `historicalGaps`，不覆盖当前来源政策与待办。', '']
(ROOT / 'coverage.md').write_text('\n'.join(lines))
print(f'Updated coverage.md: {len(active)} active queries; {len(historical)} historical queries.')
