# 文献扩充交接（2026-10-07）

用户要求暂停，交给另一会话；当前任务已暂停。先阅读 CONTEXT.md 与 AGENTS.md。仅本地预览与提交，不推送、不发布。

## 当前基线

网站收录 174 篇论文。现有框架图全部初查：122 篇有图、143 张，43 篇 needs_access，9 篇 no_framework，0 篇 pending。缺图不代表没有图，详细原始来源和失败原因见 research/figures.json；历史过程见 research/framework-handoff.md。

用户最新要求：在现有框架图已查的基础上，扩充高光谱三维视觉论文，重点 CV 顶会顶刊、高光谱领域重要会议期刊，也允许 arXiv。不要将“全部初查”解释为缺图来源已穷尽；文献调研尚未完成。

## 本轮发现的待核验线索

以下仅搜索线索，尚未核对全文、作者、当前版本、正式出版及重复收录；本轮未新增 catalog 论文或图片。

- HS-3D-NeRF: 3D Surface and Hyperspectral Reconstruction From Stationary Hyperspectral Images Using Multi-Channel NeRFs：https://arxiv.org/abs/2602.16950 。检索结果提示 2026 年；先核对当前摘要、作者、版本与几何任务，再查框架图。
- Diffusion Denoised Hyperspectral Gaussian Splatting：https://arxiv.org/abs/2505.21890 。检索结果提示 2025 年，其他入口出现题名变化与 3DV 2026 线索；需核对当前 arXiv 版本及正式出版，不把搜索摘要当正式元数据。
- Towards 3D Scene Understanding of Gas：目前仅搜索结果中的二级介绍，尚无原始论文入口；应先找作者或 arXiv，不能直接入库。
- Cascaded compressed-sensing single-pixel camera for high-dimensional optical imaging：survey 已有 PhotoniX 2024 候选（DOI 10.1186/s43074-024-00152-5）。本轮另命中 https://pmc.ncbi.nlm.nih.gov/articles/PMC9882592/ ，搜索结果提示不同年份。需核对题名、作者、DOI、版本关系和实际三维成像任务，避免错配或重复。

## 继续方式

1. 查 catalog 和 survey 避免重复；按原始摘要/全文核对三维几何与光谱联合任务。H×W×B 不等于真实三维；HSI+LiDAR 高度辅助二维分类应区别标注。
2. 核对上述最新论文，再继续专业期刊和引文追溯。CVF、ECVA 的已有关键词扫描范围与 IGARSS 待核验候选见 research/README.md、research/survey.json；不能宣称所有相关论文已搜全。
3. research/record.py 默认日期仍硬编码 2026-10-06；新记录应填写真实核验日期，并检查 catalog.updatedAt。新增论文及时保存原始来源、出版状态、核验状态；随后运行 figures.py init 同步查图队列。
4. 每篇新增论文同步查图；允许 PDF 裁切，保留图号、页码、出处、核验说明。未取到原图记录原因，不借用其他论文图片。
5. 更新 CONTEXT.md（不超过 2,000 字符、60 行）；运行 npm run validate。网站代码修改另运行 npm run build 并检查交互。检查通过后本地 Git 提交。

工作区已有未跟踪文件 research/sources/nasa-sierra-and-lat-repository-routes-2026-10-07.json，本轮未修改或提交；下个会话先审阅其来源和内容。
