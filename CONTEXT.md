# 项目上下文

更新：2026-10-08。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，含二维成像、处理、学习及应用；按覆盖矩阵推进，不以数量结束。
- 仅本地预览，不推送、不发布；检查通过后提交。caveman full、中文简洁；代码/文档正常表达。
- 两页以三维视觉布局/样式为共同基准，共用时间轴、卡片、筛选、详情及CSS，后续UI同步。三维13方向与范围不变。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+；npm ci。
- npm run dev -- --port 5173；占用时以实际地址为准，远程需转发，绕过proxy。
- 数据/上下文修改运行 npm run validate；网站修改运行 npm run build；交互需浏览器检查。

## 当前状态

- 总库409篇，311篇已复核分类，98篇暂定分类，164标签（任务76/方法68/应用20）。三维214篇不变；总库 ?collection=hyperspectral。
- 总库标签多选并集、阅读/年份/来源筛选和URL往返恢复；共享原图及SVG/BibTeX导出。classificationReview记录逐篇依据；分类确认不提升原阅读/核验状态；高光谱296、多光谱89、基础24。
- CVPR2013–2022、ICCV2013–2021奇数年、NeurIPS2023五词147命中闭环；非年度全量。
- NeurIPS2019–2023指定五词题名/摘要扫描闭环，非全领域年度完成；T3SC/DAUHST直接HSI，SatMAE/ARFNet多光谱、DiSC基础关系单列。19篇/41个arXiv日期核验；Hyper-Skin330/306与版本差异待查。
- TPAMI视频/湿度2候选待扩展声明。u²-MDN证实扩展uSDN；正式2022、预印本2019–2021分开，归原方法族；原图v5。
- ICML2013–2024主卷扫描闭环，统计/遗留详见coverage.md。
- TGRS1994：3受限候选，年度待查。
- RSE2001/2002登记题名与任务词已扫；受限候选、误差单位、全文/原图和出版社全量待查，详见coverage.md。
- OL2007–2010登记成像及系统/重建词已扫；后者11命中增4重1排4待2。Mueller2007关联2013勘误；Dyson两设计波长非两观测通道。原图受限，非出版社年度全量。
- TCI2015–2019登记41/63/102/75/69DOI，关键词闭环增17排14待4。2019官方四期52项（51研究+1奖公告）逐题名/起始页匹配；另16行政记录及1未列目录索引。51研究项均尝试原来源，34已审17待核验；5医学项仅摘要片段，EPFL仅官方缓存；非年度HSI全量。Monash错标2009按正式2019。Fourier DOI、MSVI真值、正式稿差异待查。
- dev详情上传/替换原图≤10MB，待核验、保留历史；FVMGN用户补图待核验。原图续接清单覆盖409篇、291张图，缺图状态逐篇记录。

## 关键文件与下一步

- src/data/catalog.json：事实、分类、原图；src/library.ts 筛选/排序；HyperspectralLibrary.tsx 总库；App.tsx 三维；classification-audit.json 分类审计。
- research/hyperspectral/：survey.json、sources、coverage.md、迁移快照；discover.py 会议目录、crossref-inventory.py 登记、pmlr-inventory.py 全量摘要、coverage.py 覆盖表。三维旧二维排除规则不继承。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt。
- GRSL2015光谱66命中已审33待33，压缩组待4。WHISPERS2014官方PDF45–56页38条34入2排2待；另CRNN。MLJSR作者四页全文：真实HyMap仅定性、λ人工选择；无框架图，m/n与Fig.2图注问题保留。其他解混、行星原稿/原图及会议/期刊关系待查；Grassmann100%仅二分类。Kernel代码、轨迹SPIE、错配摘要等见coverage.md。正式目录174条；最新进度见toc-progress.json，年度未审完。
