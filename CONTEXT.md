# 项目上下文

更新：2026-10-08。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，含二维成像、处理、学习及应用；按覆盖矩阵推进，不以数量结束。
- 仅本地预览；不推送、不发布。修改检查通过后必须本地 Git 提交。每次请求 caveman full、中文简洁；代码、文档和提交说明正常表达。
- 两页共用时间轴、卡片、筛选、详情及CSS。三维 13 方向与核心/相关含义保持原义；普通高光谱新增不能进入三维专题。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+；npm ci。
- npm run dev -- --port 5173；占用时以实际地址为准，远程需转发；本机请求绕过 proxy。
- 数据/上下文修改运行 npm run validate；网站修改运行 npm run build；交互需浏览器检查。

## 当前状态

- 总库 295 篇、69 个暂定标签；三维原 214 篇、13 方向、7 资源入口不变。collections 明确成员，迁移快照验证三维事实。总库 ?collection=hyperspectral，旧链接进入三维专题。
- 总库支持多标签、待分类、阅读进度、搜索、年份/来源筛选；URL 保存条件和详情，往返保留位置；共享原图、SVG/BibTeX 导出。任务/方法/应用分维度，旧专题标签仍需逐篇复核。
- CVPR 2013–2022、ICCV 2013/2015/2017/2019/2021、NeurIPS 2023 完成指定五关键词题名扫描，147 命中全部处理（新增60、去重12、排除75）；不代表年度全领域检索完成。
- NeurIPS2019–2021五词：1428/1898/2334题名、5/9/14摘要全部处理，增T3SC1、排27；Fig.1/v1日期核验，附录/DOI/许可待查。
- NeurIPS2022五词2834题名/19摘要闭环：增4、排15；SatMAE/ARFNet多光谱相关、DiSC为HSI应用基础、DAUHST直接HSI，4原图。共19篇/41个arXiv版本日期核验，完整差异待查；Hyper-Skin330/306冲突待查。
- TPAMI视频/湿度共2版本候选待扩展声明。u²-MDN原文已证实扩展uSDN；期刊正式2022，五个预印本2019–2021分别记录；新增文献仍属原方法族，原图明确为arXiv v5。
- ICML2013–2024主卷10951题名/摘要，官方集合核对；五题名词及十一摘要词84候选处理（4新、80排除；卫星RGB候选排除）。结构低秩的盲解混为未来工作；NucTV数据可能不同。代码HSI复现/许可、2017/TPAMI2020归并待查。
- TGRS1994 Crossref登记136题名，六成像词4命中、增补任务词新增3：1森林冠层原摘要入库、2去重、1雷达题名暂排除、3原摘要受限。新增森林应用标签；PDF/原图受限，出版社年度全量未证明。基础解混/降维文献全文待查，HySime/Craig原图受限。
- OL2007登记1141条两页，六词4命中处理；DD/SD-CASSI原图及SPIE前序关联。出版社年度全量与其他词待查。
- dev详情上传/替换原图≤10MB，待核验、保留历史；FVMGN用户补图待核验。原图续接清单覆盖295篇、254张图，缺图状态逐篇记录。

## 关键文件与下一步

- src/data/catalog.json：事实、成员、libraryCategories、library、原图；src/library.ts 总库筛选；HyperspectralLibrary.tsx 独立入口；App.tsx 三维入口。
- research/hyperspectral/：survey.json、sources、coverage.md、迁移快照；discover.py 会议目录、crossref-inventory.py 登记、pmlr-inventory.py 全量摘要、coverage.py 覆盖表。三维旧二维排除规则不继承。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt；详细说明见 README.md 和 research/。
- 下一步扩展遥感/光学年度与任务词、其他会议；复核两TPAMI及NGmeet正式元数据、ASSDL和独立IGARSS候选、全文实验与资源。访问失败留证，继续可用来源。
