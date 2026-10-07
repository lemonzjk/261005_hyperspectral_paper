# 项目上下文

更新：2026-10-08。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，包括二维成像、处理、学习及应用；持续按覆盖矩阵推进，不以数量结束。
- 仅本地预览；不推送、不发布。修改检查通过后必须本地 Git 提交。每次请求 caveman full、中文简洁；代码、文档和提交说明正常表达。
- 两页共用时间轴、PaperCard、PublicationFilter、PaperDialog 和基础 CSS。三维 13 方向与核心/相关含义保持原义；普通高光谱新增不能进入三维专题。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+；npm ci。
- npm run dev -- --port 5173；占用时以实际地址为准，远程需转发；本机请求绕过 proxy。
- 数据/上下文修改运行 npm run validate；网站修改运行 npm run build；交互需浏览器检查。

## 当前状态

- 总库 247 篇、37 个暂定标签；三维原 214 篇、13 方向、7 资源入口不变。collections 明确成员，迁移快照验证三维事实。总库 ?collection=hyperspectral，旧链接进入三维专题。
- 总库多标签并集、待分类、阅读进度、搜索、年份与来源筛选；URL 保存条件和详情，往返保留位置；共享原图、SVG/BibTeX 导出。任务/方法/应用分维度，旧专题标签仍需逐篇复核。
- 截止 2026-10-08：CVPR 2013/2014/2015/2021/2022、ICCV 2021、NeurIPS 2023 完成指定五关键词题名扫描，85 命中全部处理（新增23、去重8、排除54）；不代表年度全领域检索完成。
- 九个方法共十八个 arXiv 版本日期已核验，全文差异待查；Hyper-Skin 数量330/306冲突待查。CVPR/ICCV 2021 批次详情见独立调研记录。
- CVPR 2015 新增 IRSS、RLPHCS、Bayes HSI SR、双相机视频，核验四 DOI、存三原图，IRSS 未见独立框架；补 DASC 多光谱关系。新增四标签。RGB/热成像行人检测无明确高光谱联系，暂排除。TPAMI 视频后续稿（正式2019、DOI含2018）作者变化/扩展关系待核验，保留1候选，不计新方法。
- TGRS 五个早期年份仅主题/引文核验：VCA、OSP、HySime、MNF、Craig MVT、FCLS；MNF/Craig 为基础关系。FCLS DOI 10.1109/36.911111，存原 UFCLS 伪代码。全部摘要已读，全文待查。
- OL 2007 Crossref 登记1141条两页取回，六成像词4命中处理（3摘要、1题名暂排除）；新增动态变焦、UV FLIM。定向新增 DD/SD-CASSI 并存 Fig.1；SD 的2007 SPIE前序稿关联期刊版。版本DOI参与去重。出版社年度全量未证明；其他年度/关键词仍有缺口。
- 石墨黑主题；首屏850nm合成地形、450–950nm联动，非实测。时间轴每年六篇/展开；桌面双列、手机单列。
- dev详情上传/替换原图≤10MB，待核验、保留历史；FVMGN用户补图待核验。框架续接清单覆盖247篇、206张图，缺图状态逐篇记录。

## 关键文件与下一步

- src/data/catalog.json：事实、成员、libraryCategories、library、原图；src/library.ts 总库筛选；HyperspectralLibrary.tsx 独立入口；App.tsx 三维入口。
- research/hyperspectral/：survey.json、sources、coverage.md、迁移快照；discover.py 官方会议扫描、crossref-inventory.py 分页登记、coverage.py 覆盖表。三维旧二维排除规则不继承。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt；详细说明见 README.md 和 research/。
- 下一步先核验 TPAMI 视频后续稿关系，继续扩展任务词、年份和场所；复核全文实验与代码数据；复核旧专题总库关系。记录访问失败，继续其他来源。
