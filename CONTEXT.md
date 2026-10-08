# 项目上下文

更新：2026-10-08。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，含二维成像、处理、学习及应用；按覆盖矩阵推进，不以数量结束。
- 仅本地预览，不推送、不发布；检查通过后本地提交。每次请求 caveman full、中文简洁；代码与文档正常表达。
- 两页以三维视觉布局/样式为共同基准，共用时间轴、卡片、筛选、详情及CSS，后续UI同步；本轮不改补充模块或样式。三维13方向与范围不变。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+；npm ci。
- npm run dev -- --port 5173；占用时以实际地址为准，远程需转发，绕过proxy。
- 数据/上下文修改运行 npm run validate；网站修改运行 npm run build；交互需浏览器检查。

## 当前状态

- 总库311篇均已复核归类，原205篇待分类清零；114标签（任务58/方法40/应用16）。任务按筛选后篇数降序，同数保留原序。三维214篇不变；总库 ?collection=hyperspectral。
- 总库标签多选并集、阅读/年份/来源筛选和URL往返恢复；共享原图及SVG/BibTeX导出。classificationReview记录逐篇依据；分类确认不提升原阅读/核验状态；高光谱211、多光谱80、基础20。
- CVPR2013–2022、ICCV2013/2015/2017/2019/2021、NeurIPS2023指定五词147题名命中闭环：增60、重12、排75；非年度全领域完成。
- NeurIPS2019–2023指定五词题名/摘要扫描闭环，非全领域年度完成；T3SC/DAUHST直接HSI，SatMAE/ARFNet多光谱、DiSC基础关系单列。19篇/41个arXiv日期核验；Hyper-Skin330/306与版本差异待查。
- TPAMI视频/湿度2版本候选待扩展声明。u²-MDN原文证实扩展uSDN；正式2022，预印本2019–2021分别记录，归原方法族；原图arXiv v5。
- ICML2013–2024主卷10951题名/摘要、84命中增4排80。结构低秩盲解混仅未来应用；NucTV比较、复现/许可及后续稿待查。
- TGRS1994登记136题名、7命中：增1重2排1受限3；出版社全量及全文/原图待查。
- RSE2001登记133题名：六成像词6命中5收录1排除；九任务词11命中1增1重7排2待核验（METEOSAT/Hu）。DAIS六热子通道标多光谱相关，摘要误差单位冲突待查；全文/原图及出版社全量待查。
- RSE2002登记189题名：六词13命中7收录4排2待核验；九任务词5命中1收录2排2待核验。玉米胁迫原摘要、TCARI/OSAVI正式PDF核验；原首图为结果曲线。4候选受限，出版社年度全量/全文实验仍未证明。
- OL2008登记1032题名两页六词4命中：增HS-FTS光学厚度、内源双光子2篇，排1待核验1；新增1任务标签。双光子密集激发与宽带发射分记；原图/全文受限，BWG7版本关系待查；非年度全量完成。
- dev详情上传/替换原图≤10MB，待核验、保留历史；FVMGN用户补图待核验。原图续接清单覆盖311篇、258张图，缺图状态逐篇记录。

## 关键文件与下一步

- src/data/catalog.json：事实、分类、原图；src/library.ts 筛选/排序；HyperspectralLibrary.tsx 总库；App.tsx 三维；classification-audit.json 分类审计。
- research/hyperspectral/：survey.json、sources、coverage.md、迁移快照；discover.py 会议目录、crossref-inventory.py 登记、pmlr-inventory.py 全量摘要、coverage.py 覆盖表。三维旧二维排除规则不继承。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt；详细说明见 README.md 和 research/。
- 下一步补RSE2001/2002受限候选、遥感/光学年度与任务词；复核两TPAMI及NGmeet正式元数据、IGARSS候选、全文实验与资源。访问失败留证，继续可用来源。
