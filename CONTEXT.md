# 项目上下文

更新：2026-10-08。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，含二维成像、处理、学习及应用；按覆盖矩阵推进，不以数量结束。
- 仅本地预览；不推送、不发布。修改检查通过后必须本地 Git 提交。每次请求 caveman full、中文简洁；代码、文档和提交说明正常表达。
- 两页共用时间轴、PaperCard、PublicationFilter、PaperDialog 和基础 CSS。三维 13 方向与核心/相关含义保持原义；普通高光谱新增不能进入三维专题。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+；npm ci。
- npm run dev -- --port 5173；占用时以实际地址为准，远程需转发；本机请求绕过 proxy。
- 数据/上下文修改运行 npm run validate；网站修改运行 npm run build；交互需浏览器检查。

## 当前状态

- 总库 282 篇、61 个暂定标签；三维原 214 篇、13 方向、7 资源入口不变。collections 明确成员，迁移快照验证三维事实。总库 ?collection=hyperspectral，旧链接进入三维专题。
- 总库多标签并集、待分类、阅读进度、搜索、年份与来源筛选；URL 保存条件和详情，往返保留位置；共享原图、SVG/BibTeX 导出。任务/方法/应用分维度，旧专题标签仍需逐篇复核。
- 截止 2026-10-08：CVPR 2013–2019/2021/2022、ICCV 2013/2015/2017/2019/2021、NeurIPS 2023 完成指定五关键词题名扫描，142 命中全部处理（新增57、去重12、排除73）；不代表年度全领域检索完成。
- 十三份文献共二十九个 arXiv 版本日期已核验，全文差异待查；Hyper-Skin 数量330/306冲突待查。各批次详情见调研记录。
- TPAMI视频/湿度共2版本候选待扩展声明。u²-MDN原文已证实扩展uSDN；期刊正式2022，五个预印本2019–2021分别记录；新增文献仍属原方法族，原图明确为arXiv v5。
- CVPR2019三日1294题名、十二命中闭环：新增8篇、8DOI/原图、五标签，排除4；粉末/皮肤/色散模糊先标关联多光谱。NGmeet截断摘要已用原文补查，作者代码无明确许可。NGmeet期刊候选题名/年份/关系待核验。ASSDL期刊关系待查；IGARSS2014已撤销CSU前序关联，留独立候选。
- TGRS基础工作VCA、OSP、HySime、MNF、Craig、FCLS仅定向摘要核验；MNF/Craig标基础关系，全部全文待查。FCLS存原UFCLS算法，HySime/Craig原图受限。
- OL2007 Crossref登记1141条完整两页，六词4命中处理（3摘要、1题名暂排除）；新增动态变焦/UV FLIM，定向新增DD/SD-CASSI原图与SPIE前序版本关联。出版社年度全量未证明；其他年度/关键词仍有缺口。
- 石墨黑主题；450–950nm合成地形联动，非实测。时间轴按年展开；桌面双列、手机单列。
- dev详情上传/替换原图≤10MB，待核验、保留历史；FVMGN用户补图待核验。原图续接清单覆盖282篇、241张图，缺图状态逐篇记录。

## 关键文件与下一步

- src/data/catalog.json：事实、成员、libraryCategories、library、原图；src/library.ts 总库筛选；HyperspectralLibrary.tsx 独立入口；App.tsx 三维入口。
- research/hyperspectral/：survey.json、sources、coverage.md、迁移快照；discover.py 官方会议扫描、crossref-inventory.py 分页登记、coverage.py 覆盖表。三维旧二维排除规则不继承。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt；详细说明见 README.md 和 research/。
- 下一步补CVPR2020及任务词，扩展遥感和光学场所；复核三TPAMI、ASSDL期刊和独立IGARSS候选、全文实验与资源。访问失败留证，继续可用来源。
