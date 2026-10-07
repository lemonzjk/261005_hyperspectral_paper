# 项目上下文

更新：2026-10-08。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，包含二维成像、处理、学习及应用；持续调研，按覆盖矩阵推进，不以数量结束。
- 仅本地预览；不推送、不发布。有修改且检查通过后必须本地 Git 提交。每次请求使用 caveman full，中文简洁；代码与文档正常表达。
- 两页共用时间轴、PaperCard、PublicationFilter、PaperDialog 和基础 CSS。三维的 13 个方向与核心/相关含义保持原义；普通高光谱新增不能进入三维专题。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+；npm ci。
- npm run dev -- --port 5173；端口占用时以终端实际地址为准，远程需转发；本机请求绕过 proxy。
- 数据/上下文修改运行 npm run validate；网站修改运行 npm run build；交互需浏览器检查。

## 当前状态

- 总库 222 篇；三维专题仍为原 214 篇、13 方向、7 个资源入口。collections 明确成员，迁移快照验证三维成员与出版事实。正式总库地址 ?collection=hyperspectral，旧链接进入三维专题。
- 总库多标签并集、待分类、阅读进度、搜索、年份范围、出版来源多选；URL 保存筛选和详情，往返保存各自条件与阅读位置；共享时间轴、原图详情、SVG/BibTeX 导出。分类按摘要形成，任务/方法/应用分维度；当前 9 个暂定标签，旧专题总库分类待逐篇复核。
- 截止 2026-10-08：总库 CVPR 2022 官方 2,074 题名扫描，指定五关键词 18 命中全部摘要审查；新增 6、复核/去重 3、排除 9。新增均为摘要核验，各存官方 PDF 方法原图；全文实验、DOI、arXiv 逐版信息待核验。CVPR 2013/2014 另扫 1,011 题名、审 12 命中，新增 2、排除 10；新增各存原方法图。四篇方法的九个 arXiv 版本日期已核验，全文差异待查。其他范围保留缺口。
- 石墨黑主题；首屏 850 nm 合成地形，450–950 nm、采样/曲线/旋转联动，非实测数据。时间轴大年份、收录柱图、吸顶索引、每年六篇/展开；论文库桌面双列、手机单列。
- dev 详情支持上传/替换原图，≤10MB，新图待核验，替换保留历史；FVMGN 用户补图待核验。全部框架检索与缺图状态以目录和续接清单为准。

## 关键文件与下一步

- src/data/catalog.json：事实、成员、libraryCategories、library 与原图；src/library.ts：总库筛选和展示信息；src/HyperspectralLibrary.tsx：独立入口。
- research/hyperspectral/：独立 survey.json、sources、coverage.md、legacy-topic-baseline.json；discover.py 单场所年度扫描，coverage.py 生成截至日期覆盖表。三维调研仍在 research/survey.json，二维排除不继承到总库。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt；详见 research/figures.md。
- src/App.tsx 三维专题；PaperDialog/PaperCard/ResearchMap/TimelineOverview/AtlasOverview 共用；design-system.css 共用主题；SpectralScene 首屏。
- 下一步：扩展任务词、早期工作及其他年度/场所；arXiv 版本日期、正式发表与方法族关联；旧 214 篇总库关系/标签逐篇复核。保留不可访问原因，继续其他来源。
