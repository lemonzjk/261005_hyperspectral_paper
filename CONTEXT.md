# 项目上下文

更新：2026-10-12。

## 目标与约定

- HS3D Atlas三维专题与高光谱总库，覆盖成像、处理、学习及应用；按场所/年份矩阵查漏，不以数量结束。
- 仅本地预览，不推送、不发布；caveman full、中文简洁；检查通过后本地提交。
- 普通总库仅直接高光谱、顶会顶刊白名单或arXiv；纯多光谱/泛关联不收录。周峻既有181条直接高光谱保留，作者例外仅放宽来源；7条多光谱已删除。
- 免费PDF/正文/框架图须整理；付费无公开版或确实不可获取才留白；目录与资料待办分开。官方代码只记录链接，不下载、审查或复现；疑点依论文记录。
- 两页共享组件；三维13方向。

## 运行与检查

- React19、TypeScript、Vite7；Node22.12+。
- npm run dev -- --port 5173；远程需转发。
- 数据/上下文：npm run validate；网站：npm run build；交互：浏览器检查。
- 原图队列倒序，保留来源及待核状态。

## 当前状态

- 总库390条，均直接高光谱；317分类确认（审计297）、69暂定、4待；177标签（任务67/方法97/应用13）。三维126条，数据资源2，原图286张。
- 出版来源112旧写法规整为69种；恢复旧URL别名。11主要任务组、细标签折叠/搜索、多标签并集与去重组计数；保留作者匹配及URL恢复、SVG/BibTeX导出。
- 来源范围（白名单顶会顶刊272/arXiv17/白名单外101）与阅读深度、资料状态独立筛选，URL恢复、导出使用同一结果；资料状态依据已记录正文/原图证据，不以PDF链接推断已读，不把原图来源受限当全文付费。
- CVPR/ICCV/NeurIPS/ICML等已有指定查询闭环，不是领域全量；历史普通会议搜索归档，矩阵仅白名单，见coverage.md。
- 网站及桌面/手机已核：来源筛选、URL恢复、作者181条、跨集合返回、删除旧链接及BibTeX/SVG导出；分类、资料、详情及专题资源已核。
- dev可上传/替换原图≤10MB，保留历史；FVMGN补图待核。

## 关键文件与下一步

- src/data/catalog.json：事实/分类/原图；collection-policy.json：来源白名单、别名、周峻保护ID；src/library-groups.ts：导航分组；materials.ts：资料状态。
- research/hyperspectral/：survey.json、sources、coverage.md、catalog-cleanup.json；classification-audit.json分类证据；legacy-topic-baseline.json旧专题快照，保留成员核对原事实，清理移除单列审计。
- public/figures/和research/figures.json：原图与续接；figures.py init/queue/add/attempt。
- 作者先查漏，不增笔记。周峻181条中80条符合普通总库口径、101条来源例外。88摘要/93全文；ORCID1、DBLP8、Scholar5、arXiv快照0原稿范围待核、正式版仍待，CV3未确认发表，另XXXX占位，作者目录未闭环。jun-zhou.md维护当前待办，archive/jun-zhou/存日志/笔记。
- Griffith profile7205全387关联项，175源项匹配168目录ID、8未决；2直接HSI来源外候选未找到合格版本。原31资料队列已读436页/66图（21AM/6VoR/4未标稿），不代表作者全集。甘蔗/DSAB版本差异、NSP/KUM机构及两编辑范围见jun-zhou.md；arXiv其他姓名/宽词机制待核。
- 共同作者Xiong43项已对照；Jia新版UNSW438书目中17条Zhou J映射13已录/2暂排/1未决，ORCID212组差集25仅一旧多光谱，不恢复。两太阳能期刊AM选读11/34页；2024两集RGB，2026两集RGB、DualGMS通道未明；2022会议仍待。SS non-Linear v2读17页/两图，HSIMamba v1读11页/两图；合成数据集v1读1页/一图，简称989仅元数据/六摘要暂排；MAC-Net14页/两图全读；ALN关联章节27页/两图，期刊与TV仍摘要；勘误图、HSIGene v2、SMDS最终及其他免费资料待整理，作者后推进领域矩阵。
