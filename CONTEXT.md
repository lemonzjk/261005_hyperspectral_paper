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

- 总库390条，均直接高光谱；312分类确认（审计287）、74暂定、4待；175标签（任务68/方法94/应用13）。三维126条，数据资源2，原图264张。
- 出版来源112旧写法规整为69种；恢复旧URL别名。11主要任务组、细标签折叠/搜索、多标签并集与去重组计数；保留作者匹配及URL恢复、SVG/BibTeX导出。
- 来源范围（白名单顶会顶刊272/arXiv17/白名单外101）与阅读深度、资料状态独立筛选，URL恢复、导出使用同一结果；资料状态依据已记录正文/原图证据，不以PDF链接推断已读，不把原图来源受限当全文付费。
- CVPR/ICCV/NeurIPS/ICML等已有指定查询闭环，不是领域全量；历史普通会议搜索归档，矩阵仅白名单，见coverage.md。
- 网站及桌面/手机已核：来源筛选、URL恢复、作者181条、跨集合返回、删除旧链接及BibTeX/SVG导出；分类、资料、详情及专题资源已核。
- dev可上传/替换原图≤10MB，保留历史；FVMGN补图待核。

## 关键文件与下一步

- src/data/catalog.json：事实/分类/原图；collection-policy.json：来源白名单、别名、周峻保护ID；src/library-groups.ts：导航分组；materials.ts：资料状态。
- research/hyperspectral/：survey.json、sources、coverage.md、catalog-cleanup.json；classification-audit.json分类证据；legacy-topic-baseline.json旧专题快照，保留成员核对原事实，清理移除单列审计。
- public/figures/和research/figures.json：原图与续接；figures.py init/queue/add/attempt。
- 作者先查漏，不增笔记。周峻181条中80条符合普通总库口径、101条来源例外。99摘要/82全文；ORCID1、DBLP8、Scholar5、arXiv快照0原稿范围待核、正式版仍待，CV3未确认发表，另XXXX占位，作者目录未闭环。jun-zhou.md维护当前待办，archive/jun-zhou/存日志/笔记。
- Griffith个人profile7205完整387关联项，175源项匹配168目录ID，8继承未决，DDF/FAT/SA-Net命名基准均RGB/MS；另Dualmamba（IGARSS）/土壤碳SSTR（SSRN）2直接HSI来源外候选，指定arXiv查询无对应版本。快照闭环非作者全集，75已录HSI有PDF链接、7仍摘要级；NSP/KUM单篇机构待核。原31项已读16AM208页/6VoR92页/2未标版本机构稿22页，52原图；另甘蔗抗病评级v1全读10页，纠正地物标签；DSAB三稿仅关联方法，实验不合并。两编辑记录仅新书目/访问证据，正文未得、范围仍待。arXiv姓名/谱词快照已核，reflectance/简写待。固定预印本与未读正式版的范围决定独立。
- 共同作者43书目已对照（36已录/5继承排除/1在审/1占位）。三早期分类稿29页/五原图，补DOI及书目，纠正预训练/基准错配；版本分列。HSIGene转全领域候选，v2下载未读。SMDS最终15页未读；三未决无正文，WHU波段待。作者专项后按白名单推进全领域；WHISPERS/IGARSS等旧候选不再作普通总库扩充目标。可获取资料继续补齐，受限项注明原因。
