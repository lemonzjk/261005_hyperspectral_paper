"""Render dated coverage from authoritative survey records, without inferring missing years."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
survey = json.loads((ROOT / 'survey.json').read_text())
lines = ['# 高光谱全领域检索覆盖', '', f"截止日期：{survey['cutoffDate']}。状态：持续调研。", '',
         survey['coverageNote'], '', '## 已执行的场所 × 年份 × 关键词', '',
         '| 场所 | 年份 | 查询与分页 | 题名 / 命中 / 已审 | 覆盖级别 | 剩余缺口 |',
         '| --- | --- | --- | --- | --- | --- |']
for search in survey['searches']:
    keywords = '、'.join(search['keywords'])
    if search.get('titleKeywords') and search.get('abstractKeywords'):
        keywords = f"题名：{'、'.join(search['titleKeywords'])}；摘要：{'、'.join(search['abstractKeywords'])}"
    lines.append(f"| {search['venue']} | {search['year']} | {keywords}；{search['pagination']} | {search['titleCount']} / {search.get('candidateCount', 0)} / {search.get('reviewedCount', 0)} | {search['statusLabel']} | {'；'.join(search['gaps'])} |")
lines += ['', '完整题名目录、摘要快照和逐篇决定见 `sources/` 与 `survey.json`。扫描完指定关键词，不等于所有摘要、主题或引文检索完成。', '',
          '## 待检索矩阵', '', '年度集合为各场所最早可用官方目录至截止日期。下表按场所压缩展示；未出现在上表的每个年份 × 关键词组均为尚未检索，不能推定为零篇。早期目录起止与实际举办年份尚待确认。', '',
          '| 场所 | 来源类型 | 年份范围 | 独立总库状态 |', '| --- | --- | --- | --- |']
for venue in survey['venuePlan']:
    lines.append(f"| {venue['name']} | {venue['kind']} | 最早可用目录至 {survey['cutoffDate'][:4]} | {venue['statusLabel']} |")
lines += ['', '## 已闭环批次', '']
for batch in survey['batches']:
    lines += [f"- {batch['date']} / {batch['id']}：新增 {batch['new']}，更新 {batch['updated']}，去重 {batch['duplicates']}，排除 {batch['excluded']}，待处理 {batch['pending']}。更新与去重可指同一条目，不能相加为新增数量。", f"  阅读边界：{batch['readingBoundary']}"]
lines += ['', '## 未解决缺口', '', *['- ' + gap for gap in survey['gaps']], '']
(ROOT / 'coverage.md').write_text('\n'.join(lines))
print('Updated research/hyperspectral/coverage.md')
