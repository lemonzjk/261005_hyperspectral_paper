# 项目上下文

更新：2026-10-11。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，含二维成像、处理、学习及应用；按覆盖矩阵推进，不以数量结束。
- 仅本地预览，不推送、不发布；检查通过后提交。caveman full、中文简洁；代码/文档正常表达。
- 两页共享时间轴、卡片、筛选、详情及CSS；三维13方向与范围不变。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+。
- npm run dev -- --port 5173；远程需转发。
- 数据/上下文：npm run validate；网站：npm run build；交互：浏览器检查。
- 原图队列按年降序。

## 当前状态

- 总库757篇，401篇分类确认（审计352篇）、337篇暂定、19篇待分类，313标签（任务102/方法188/应用23）。三维214篇；总库?collection=hyperspectral。
- 作者筛选支持片段补全及URL恢复；搜索/作者筛选的完整姓名须匹配同一作者。总库标签多选并集；两页隐藏零计数侧栏，共享原图及SVG/BibTeX导出。分类逐篇留证；高光谱621、多光谱102、基础34。
- CVPR2013–2022/ICCV2013–2021奇数年主题闭环，非年度全量。
- NeurIPS2019–2023指定五词题名/摘要扫描闭环，非全领域年度完成；T3SC/DAUHST直接HSI，SatMAE/ARFNet多光谱、DiSC基础关系单列。Hyper-Skin330/306与版本差异待查。
- TPAMI视频/湿度2候选待扩展声明。u²-MDN证实扩展uSDN；正式2022、预印本2019–2021分开，归原方法族；原图v5。
- ICML2013–2024主卷扫描闭环；TGRS1994有3受限候选，年度待查；细节见coverage.md。
- RSE2001/2002登记题名与任务词已扫；受限候选、单位、全文/原图和出版社全量待查，见coverage.md。
- OL2007–2010指定词扫描增4重1排4待2，非年度全量；勘误/通道边界及原图缺口见coverage.md。
- TCI2015–2019指定词增17排14待4；2019官方51中34已审17待，非年度全量；5医学仅摘要片段，差异见coverage.md。
- dev详情上传/替换原图≤10MB，待核验、保留历史；FVMGN用户补图待核验。原图续接清单覆盖757篇、351张图。

## 关键文件与下一步

- src/data/catalog.json：事实、分类、原图；src/library.ts 筛选/排序；HyperspectralLibrary.tsx 总库；App.tsx 三维；classification-audit.json 分类审计。
- research/hyperspectral/：survey.json、sources、coverage.md、迁移快照；discover.py 会议目录、crossref-inventory.py 登记、pmlr-inventory.py 全量摘要、coverage.py 覆盖表。三维旧二维排除规则不继承。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt；PDF为Git二进制。
- 作者优先：调研论文，不增笔记。周峻188条（HSI181/关联7，含1摘要），157摘要级/31全文级。ORCID263组1待；DBLP365待10；Scholar209待9；CV3未确认发表。arXiv姓名531全分页（含异常）：24匹配、32继承、6同名、447摘要暂排、7局部暂排、7姓名不精确、8范围/身份待、0未审；471逐审非全文全量。TEAMS/Mamba输入/版本待。全文分版；Hy v1为BABS/Kalman、正式摘要HAS-BS/GRU，14页待。UEMM正式版/像素/版本、VITask APTOS/代码及六遥感输入待；OA/200非全文。BABS/SiamBAG/BAE/DMT正文待；Attend旧链为学位论文。早期几何/配准/颜色/纹理及选带稿全文，正式待。见jun-zhou.md。
- GRSL2015光谱66已审33待33；WHISPERS2014目录174为165入3排6待。WHISPERS2013目录161已审1–27：25入2待，余134；28–30仅下载未闭环。旧缺口见coverage.md；作者优先后从28起，非年度全量。
