# 项目上下文

更新：2026-10-13。

## 目标与约定

- HS3D Atlas三维专题与高光谱总库，覆盖成像、处理、学习及应用；按场所/年份矩阵查漏，不以数量结束。
- 仅本地预览，不推送、不发布；caveman full、中文简洁；检查通过后本地提交。
- 普通总库仅直接高光谱、顶会顶刊白名单或arXiv；纯多光谱/泛关联不收录。周峻既有181条直接高光谱保留，作者例外仅放宽来源；7条多光谱已删除。
- 每篇只找一个可用版本、取一张主要原框架图；只读确认作者/高光谱范围及定位图必要内容，不逐页/逐版读，不深挖实验。无图/不可获取可留白；目录与图待办分开。官方代码只放链接，不检查。
- 两页共享组件。

## 运行与检查

- React19、TypeScript、Vite7；Node22.12+。
- npm run dev -- --port 5173；远程需转发。
- 数据/上下文：npm run validate；网站：npm run build；交互：浏览器检查。
- 原图队列倒序，保留来源及待核状态。

## 当前状态

- 总库401条，均直接高光谱；388分类确认（审计378）、13暂定、0待；182标签（任务71/方法98/应用13）。三维126条，数据资源2，原图339张。
- 出版来源112旧写法规整为69种；恢复旧URL别名。11主要任务组、细标签折叠/搜索、多标签并集与去重组计数；保留作者匹配及URL恢复、SVG/BibTeX导出。
- 来源范围（白名单顶会顶刊280/arXiv20/白名单外101）与阅读深度、资料状态独立筛选，URL恢复、导出使用同一结果；资料状态依据已记录正文/原图证据，不以PDF链接推断已读，不把原图来源受限当全文付费。
- CVPR/ICCV/NeurIPS/ICML等已有指定查询闭环，不是领域全量；历史普通会议搜索归档，矩阵仅白名单，见coverage.md。
- 网站及桌面/手机已核：来源筛选、URL恢复、作者181条、跨集合返回、删除旧链接及BibTeX/SVG导出；分类、资料、详情及专题资源已核。
- dev可上传/替换原图≤10MB，保留历史；FVMGN补图待核。

## 关键文件与下一步

- src/data/catalog.json：事实/分类/原图；collection-policy.json：来源白名单、别名、周峻保护ID；src/library-groups.ts：导航分组；materials.ts：资料状态。
- research/hyperspectral/：survey.json、sources、coverage.md、catalog-cleanup.json；classification-audit.json分类证据；legacy-topic-baseline.json旧专题快照，保留成员核对原事实，清理移除单列审计。
- public/figures/和research/figures.json：原图与续接；figures.py init/queue/add/attempt。
- 作者先查漏，不增笔记。周峻181条中80条符合普通总库口径、101条来源例外。79摘要/102全文；ORCID1、DBLP8、Scholar5、arXiv快照0原稿范围待核，医学综述正式候选仍待；CV3未确认发表，另XXXX占位，作者目录未闭环。jun-zhou.md维护当前待办，archive/jun-zhou/存日志/笔记。
- Griffith profile7205全387关联项，175源项匹配168目录ID、8未决；2直接HSI来源外候选未找到合格版本。原31资料队列已读436页/66图（21AM/6VoR/4未标稿），不代表作者全集。甘蔗/DSAB版本差异、NSP/KUM机构及两编辑范围见jun-zhou.md；arXiv其他姓名/宽词待核。
- 最新：Hong73精选/arXiv75已查，27新HSI题名已录SpectralFormer/EGU-Net，余25待核。Chanussot整名arXiv99/99、Crossref ORCID过滤293/293，唯一Jun命中已有CRF/目标ORCID；此过滤漏CasFormer，不是全集。EGU-Net仅v1首页/第3页一主图，按arXiv入库、TNNLS只书目；CRF不补其他版本。CasFormer主图齐。IF103225普通白名单入库、SSRN五作者去重；Jun身份待，网页182含此1未核，确认专项181。已得图不追全文。UEMM/AdvMIM代表稿排除；OpenAlex839/420差集、834/833差1、HVOT合格版/Phase冲突、编辑/M2、三分割输入待。作者先、历年矩阵后。
