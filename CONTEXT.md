# 项目上下文

更新：2026-10-10。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，含二维成像、处理、学习及应用；按覆盖矩阵推进，不以数量结束。
- 仅本地预览，不推送、不发布；检查通过后提交。caveman full、中文简洁；代码/文档正常表达。
- 两页共享时间轴、卡片、筛选、详情及CSS；三维13方向与范围不变。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+。
- npm run dev -- --port 5173；远程需转发。
- 数据/上下文：npm run validate；网站：npm run build；交互：浏览器检查。
- 校验与构建通过；原图队列已恢复年份降序。JS约4.72MB（gzip约0.99MB），有体积警告。

## 当前状态

- 总库757篇，391篇分类确认（审计335篇）、347篇暂定、19篇待分类，303标签（任务99/方法181/应用23）。三维214篇；总库?collection=hyperspectral。
- 作者筛选支持片段补全及URL恢复；搜索/作者筛选的完整姓名须匹配同一作者。总库标签多选并集；两页隐藏零计数侧栏，共享原图及SVG/BibTeX导出。分类逐篇留证；高光谱621、多光谱102、基础34。
- CVPR2013–2022/ICCV2013–2021奇数年主题闭环，非年度全量。
- NeurIPS2019–2023指定五词题名/摘要扫描闭环，非全领域年度完成；T3SC/DAUHST直接HSI，SatMAE/ARFNet多光谱、DiSC基础关系单列。Hyper-Skin330/306与版本差异待查。
- TPAMI视频/湿度2候选待扩展声明。u²-MDN证实扩展uSDN；正式2022、预印本2019–2021分开，归原方法族；原图v5。
- ICML2013–2024主卷扫描闭环；TGRS1994有3受限候选，年度待查；细节见coverage.md。
- RSE2001/2002登记题名与任务词已扫；受限候选、误差单位、全文/原图和出版社全量待查，详见coverage.md。
- OL2007–2010指定词扫描增4重1排4待2，非年度全量；勘误/通道边界及原图缺口见coverage.md。
- TCI2015–2019指定词增17排14待4；2019官方51中34已审17待，非年度全量；5医学仅摘要片段，差异见coverage.md。
- dev详情上传/替换原图≤10MB，待核验、保留历史；FVMGN用户补图待核验。原图续接清单覆盖757篇、334张图。

## 关键文件与下一步

- src/data/catalog.json：事实、分类、原图；src/library.ts 筛选/排序；HyperspectralLibrary.tsx 总库；App.tsx 三维；classification-audit.json 分类审计。
- research/hyperspectral/：survey.json、sources、coverage.md、迁移快照；discover.py 会议目录、crossref-inventory.py 登记、pmlr-inventory.py 全量摘要、coverage.py 覆盖表。三维旧二维排除规则不继承。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt；PDF为Git二进制。
- 作者优先：只调研论文，停止新增学习笔记。周峻188条（高光谱181/关联7，含1摘要），179摘要级/9全文级。ORCID263组、Griffith351/214指定分页完成，非全集。DBLP365为356决定/9待；Scholar209差集189排8重4入8待；CV3未确认发表候选。arXiv精确姓名531全分页：24匹配、32继承决定、4同名排除、471未逐审；光谱词25命中23匹配/2同名。24条补版本（13新增），正式年份/阅读状态保留。量化原稿为普通图像/SIFT，局部暂排；4同名光谱关联稿留全领域候选。身份/扩展关系、CV/DBLP/Scholar和未审arXiv继续核。见jun-zhou.md。
- GRSL2015光谱66已审33待33；WHISPERS2014目录174为165入3排6待。WHISPERS2013目录161已审1–27：25入2待，余134；28–30仅下载未闭环。旧缺口见coverage.md；作者优先后续顺序28起，非年度全量。
