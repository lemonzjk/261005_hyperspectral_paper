# 项目上下文

更新：2026-10-08。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，含二维成像、处理、学习及应用；按覆盖矩阵推进，不以数量结束。
- 仅本地预览，不推送、不发布；检查通过后本地提交。每次请求 caveman full、中文简洁；代码与文档正常表达。
- 两页以三维视觉布局/样式为共同基准，共用时间轴、卡片、筛选、详情及CSS，后续UI同步。三维13方向与范围不变。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+；npm ci。
- npm run dev -- --port 5173；占用时以实际地址为准，远程需转发，绕过proxy。
- 数据/上下文修改运行 npm run validate；网站修改运行 npm run build；交互需浏览器检查。

## 当前状态

- HyperspectralDemo：总库无边框满屏原理交互、可收起控件；模拟数据，与三维页共用 spectral-response.ts。

- 总库323篇，原311篇已复核归类，新增12篇暂定分类，原205篇待分类清零；119标签（任务61/方法42/应用16）。任务按筛选后篇数降序，同数保留原序。三维214篇不变；总库 ?collection=hyperspectral。
- 总库标签多选并集、阅读/年份/来源筛选和URL往返恢复；共享原图及SVG/BibTeX导出。classificationReview记录逐篇依据；分类确认不提升原阅读/核验状态；高光谱221、多光谱81、基础21。
- CVPR2013–2022、ICCV2013/2015/2017/2019/2021、NeurIPS2023指定五词147题名命中闭环：增60、重12、排75；非年度全领域完成。
- NeurIPS2019–2023指定五词题名/摘要扫描闭环，非全领域年度完成；T3SC/DAUHST直接HSI，SatMAE/ARFNet多光谱、DiSC基础关系单列。19篇/41个arXiv日期核验；Hyper-Skin330/306与版本差异待查。
- TPAMI视频/湿度2版本候选待扩展声明。u²-MDN原文证实扩展uSDN；正式2022，预印本2019–2021分别记录，归原方法族；原图arXiv v5。
- ICML2013–2024主卷10951题名/摘要、84命中增4排80。结构低秩盲解混仅未来应用；NucTV比较、复现/许可及后续稿待查。
- TGRS1994登记扫描仍有3受限候选，出版社全量待查。
- RSE2001/2002登记题名与任务词已扫；受限候选、误差单位、全文/原图和出版社全量待查，详见coverage.md。
- OL2007–2010登记题名六成像词及16系统/重建词已扫；后者4899题名11命中增4重1排4待2。Mueller2007按HSI基础收录并关联2013勘误；Dyson两设计波长不是两观测通道。原图受限，非出版社年度全量。
- TCI2015登记41DOI（含目录/说明），两词组并集4增3排1。HUT-AMP/空间RCA/RBLU存3原图，6预印本日期核验；非全文，正式/预印本不混用，RBLU日期差异待查。
- dev详情上传/替换原图≤10MB，待核验、保留历史；FVMGN用户补图待核验。原图续接清单覆盖323篇、261张图，缺图状态逐篇记录。

## 关键文件与下一步

- src/data/catalog.json：事实、分类、原图；src/library.ts 筛选/排序；HyperspectralLibrary.tsx 总库；App.tsx 三维；classification-audit.json 分类审计。
- research/hyperspectral/：survey.json、sources、coverage.md、迁移快照；discover.py 会议目录、crossref-inventory.py 登记、pmlr-inventory.py 全量摘要、coverage.py 覆盖表。三维旧二维排除规则不继承。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt；详细说明见 README.md 和 research/。
- 下一步补OL卷期目录与受限关系候选，推进其他场所的年度目录；补受限候选、TPAMI/NGmeet/IGARSS全文及版本。访问失败留证。
