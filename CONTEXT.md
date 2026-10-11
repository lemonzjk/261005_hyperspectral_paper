# 项目上下文

更新：2026-10-11。

## 目标与约定

- HS3D Atlas三维专题与高光谱总库，覆盖成像、处理、学习及应用；按场所/年份矩阵查漏，不以数量结束。
- 仅本地预览，不推送、不发布；caveman full、中文简洁；检查通过后本地提交。
- 普通总库仅直接高光谱、顶会顶刊白名单或arXiv；纯多光谱/泛关联不收录。周峻既有181条直接高光谱保留，作者例外仅放宽来源；7条多光谱已删除。
- 免费PDF/正文/框架图须获取并整理；付费且无公开版本或确实不可获取才留白；目录与资料待办分开，不要求性能复现。
- 两页共享展示组件；三维仍13方向，成员已按新范围清理。

## 运行与检查

- React19、TypeScript、Vite7；Node22.12+。
- npm run dev -- --port 5173；远程需转发。
- 数据/上下文：npm run validate；网站：npm run build；交互：浏览器检查。
- 原图队列按年降序，来源和待核状态保留。

## 当前状态

- 总库390条，全部直接高光谱；299分类确认（审计266）、87暂定、4待；164标签（任务66/方法85/应用13）。三维126条，数据资源2，原图221张。
- 清理移除367条/152图/160空标签；catalog-cleanup.json保留审计，旧事实由Git追溯，来源证据与archive/归档保留。
- 出版来源112种旧写法规范为69种；旧URL别名自动恢复。11主要任务组、细标签折叠/搜索、多标签并集与去重组计数；作者姓名匹配、URL恢复及SVG/BibTeX导出保留。
- 来源范围（白名单顶会顶刊272/arXiv17/白名单外101）与阅读深度、资料状态独立筛选，URL恢复、导出使用同一结果；资料状态依据已记录正文/原图证据，不以PDF链接推断已读，不把原图来源受限当全文付费。
- CVPR/ICCV/NeurIPS/ICML等已有指定查询闭环，不是领域全量；历史普通会议搜索归档，当前矩阵仅白名单，见coverage.md。
- 最近网站改动validate、build及桌面/手机浏览器检查通过：来源筛选/交集/清除、URL恢复、作者181条、跨集合返回、删除条目旧链接和BibTeX/SVG导出；此前分类、资料、详情及专题资源检查通过。
- dev可上传/替换原图≤10MB，保留历史；FVMGN补图待核。

## 关键文件与下一步

- src/data/catalog.json：事实/分类/原图；collection-policy.json：来源白名单、别名、周峻保护ID；src/library-groups.ts：导航分组；materials.ts：资料状态。
- research/hyperspectral/：survey.json、sources、coverage.md、catalog-cleanup.json；classification-audit.json分类证据；legacy-topic-baseline.json旧专题快照，保留成员核对原事实，清理移除单列审计。
- public/figures/和research/figures.json：原图与续接；figures.py init/queue/add/attempt。
- 作者先查漏，不增笔记。周峻181条中80条符合普通总库口径、101条来源例外。120摘要/61全文；ORCID1、DBLP10、Scholar8、arXiv3医学原稿待核有重叠，CV3未确认发表，作者目录未闭环。jun-zhou.md维护当前待办，archive/jun-zhou/存日志/笔记。
- Griffith个人profile7205完整387关联项，175源项匹配168目录ID，11继承未决；另Dualmamba（IGARSS）/土壤碳SSTR（SSRN）2直接HSI来源外候选，指定arXiv查询无对应版本。快照闭环非作者全集，75已录HSI有PDF链接、27仍摘要级；NSP/KUM补机构原摘要、单篇机构待核。SUIT/医学/FedDA/ADLKAN四AM69页全读、9原图，公式/协议疑点保留。倒序姓名531与旧快照全同；四单词并集与扩展词1891全同，reflectance宽匹配机制未明；5新简写摘要范围外，作者简写无有效集合。四固定原稿45页全读、UltraVR21/70页选读范围外，正式版独立核，不增库内全文数。CV3/HSLiNets关系待。
- 作者专项后按白名单推进全领域；WHISPERS/IGARSS等旧候选不再作普通总库扩充目标。可获取资料继续补齐，受限项注明原因。
