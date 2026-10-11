# 项目上下文

更新：2026-10-11。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，含二维成像、处理、学习及应用；按覆盖矩阵推进，不以数量结束。
- 仅本地预览，不推送、不发布；检查通过后提交。caveman full、中文简洁；代码/文档正常表达。
- 两页共享时间轴、卡片、筛选、详情及CSS；三维13方向与范围不变。
- 调研优先目录完整；免费PDF/框架图要获取并整理信息；付费且无公开版本或确实不可获取才留白。目录与资料待办分别报告，不要求复现。
- 新调研只收直接高光谱，不收纯多光谱关联；直接处理/重建高光谱的融合论文可收录。既有目录仍含旧范围条目。
- 新来源仅CV/高光谱领域顶会顶刊及arXiv，周峻专项同样适用；其他会议期刊不收录，矩阵场所须按新范围筛选。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+。
- npm run dev -- --port 5173；远程需转发。
- 数据/上下文：npm run validate；网站：npm run build；交互：浏览器检查。
- 原图队列按年降序。

## 当前状态

- 总库757篇，404篇分类确认（审计371篇）、335篇暂定、18篇待分类，324标签（任务102/方法199/应用23）。三维214篇；总库?collection=hyperspectral。
- 作者筛选支持片段补全及URL恢复；搜索/作者筛选的完整姓名须匹配同一作者。总库标签多选并集；两页隐藏零计数侧栏，共享原图及SVG/BibTeX导出。分类逐篇留证；高光谱621、多光谱102、基础34。
- CVPR2013–2022/ICCV2013–2021奇数年主题闭环，非年度全量。
- NeurIPS2019–2023指定五词题名/摘要扫描闭环，非全领域年度完成；T3SC/DAUHST直接HSI，SatMAE/ARFNet多光谱、DiSC基础关系单列。Hyper-Skin330/306与版本差异待查。
- TPAMI视频/湿度2候选待扩展声明。u²-MDN证实扩展uSDN；正式2022、预印本2019–2021分开，归原方法族；原图v5。
- ICML2013–2024主卷扫描闭环；TGRS1994有3受限候选，年度待查；细节见coverage.md。
- RSE2001/2002登记题名与任务词已扫；受限候选、单位、全文/原图和出版社全量待查，见coverage.md。
- OL2007–2010指定词扫描增4重1排4待2，非年度全量；勘误/通道边界及原图缺口见coverage.md。
- TCI2015–2019指定词增17排14待4；2019官方51中34已审17待，非年度全量；5医学仅摘要片段，差异见coverage.md。
- dev详情上传/替换原图≤10MB，待核验、保留历史；FVMGN用户补图待核验。原图续接清单覆盖757篇、360张图。

## 关键文件与下一步

- src/data/catalog.json：事实、分类、原图；src/library.ts 筛选/排序；HyperspectralLibrary.tsx 总库；App.tsx 三维；classification-audit.json 分类审计。
- research/hyperspectral/：survey.json、sources、coverage.md、迁移快照；discover.py 会议目录、crossref-inventory.py 登记、pmlr-inventory.py 全量摘要、coverage.py 覆盖表。三维旧二维排除规则不继承。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt；PDF为Git二进制。
- 作者优先，不增笔记。周峻旧范围188条（HSI181/关联7，含1摘要），134摘要/54全文；ORCID1、DBLP10、Scholar9、arXiv8待核有重叠，CV3未确认发表。姓名531均映射/逐审，目录未闭环。jun-zhou.md维护待办；archive/jun-zhou/归档日志/笔记；sources留证，reproduction/可选。
- GRSL2015光谱66已审33待33；WHISPERS2014目录174为165入3排6待。WHISPERS2013目录161已审1–27：25入2待，余134；28–30仅下载未闭环。旧缺口见coverage.md；作者优先后从28起，非年度全量。
