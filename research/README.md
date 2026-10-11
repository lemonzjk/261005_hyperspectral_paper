# 三维视觉专题文献调研

2026-10-11整理后，三维专题保留126条论文、2个数据资源。总库及三维专题使用同一份`../src/data/catalog.json`，来源政策见`../src/data/collection-policy.json`。

## 收录范围

三维专题覆盖直接高光谱的空间采集、重建、表示、渲染、光谱体成像、材料分析与理解，也单列HSI与LiDAR/DSM高度辅助的二维分析。仅因使用3D CNN或H×W×波段立方体，不代表真实三维空间重建。

普通论文仅保留项目顶会顶刊白名单或arXiv，纯多光谱和泛关联背景不再收录；周峻老师既有目录按用户要求保留，作者例外由固定ID清单核验。完整白名单、领域覆盖、资料补充规则和当前缺口见[hyperspectral/README.md](hyperspectral/README.md)。

## 数据与证据

- `../src/data/catalog.json`：逐篇论文事实、输入输出、机制、实验和阅读边界；网站唯一事实来源。
- `hyperspectral/catalog-cleanup.json`：本轮移除条目、原因、来源及名称规范化审计；原始条目由Git历史恢复。
- `survey.json`与`sources/`：三维专题早期候选、查询记录和原始证据；属于历史发现记录，旧候选须按现行政策重新筛选，不能直接作为网站目录。
- `hyperspectral/survey.json`与`hyperspectral/coverage.md`：当前总库覆盖、缺口，以及分开的历史查询。
- `hyperspectral/legacy-topic-baseline.json`：整理前的三维成员快照；验证脚本仅允许审计登记的移除和来源别名规范化，核对其余原始事实。
- `figures.json`和`../public/figures/`：仍收录论文的原图队列与资产，保持来源和核验状态。

## 后续调研

作者专项先查漏，再按白名单场所和年份补全直接高光谱目录。已有CVF/ECVA题名关键词扫描仍有旧年份和引文链缺口，光学、图形学、遥感期刊尚未逐年闭环；不能据此宣称领域完整。

免费可取得的原文、PDF、框架图继续获取并整理；仅付费且无公开版本或确实无法取得时允许留白，注明原因。方法与三维关系按实际输入输出核验，会议扩展版和在线/正式卷年份分别记录。

## 脚本与历史日志

`record.py`登记候选与论文，`discover_cvfpapers.py`、`discover_ecva.py`、`retry_cvf.py`记录题名发现；这些脚本不替代逐篇范围判断。Python检索脚本依赖`beautifulsoup4`，元数据采集使用`requests`。修改数据后运行`npm run validate`。

原先逐轮追加的长调研说明已归档至[历史日志](archive/three-dimensional-research-log.md)，其中旧范围、数量和下一步建议仅供追溯；不再追加学习笔记。
