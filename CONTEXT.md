# 项目上下文

更新：2026-10-06。限制：2,000 个 Unicode 字符（含空白），60 行；每次项目请求复核维护。

## 目标与约定

- 构建 HS3D Atlas：高光谱三维视觉研究图谱，组织参考 https://2-mo.github.io/Awesome-Thinking-with-VAD/。
- 仅本地预览；不推送、不发布。每轮修改（含文献、文档、上下文）检查通过后必须本地提交；不创建空提交。
- 每次请求必须使用 caveman skill，默认 full，中文简洁沟通；文档和代码正常表达。
- 全面调研顶会顶刊，每核验一篇立即记录；已有 active goal，尚未完成。
- 调研覆盖 CV、遥感、高光谱、光学重要会议与期刊。

## 仓库与运行

- 工作目录：`/data1/vad/data1/zjk/261005_hyperspectral_paper`。
- 远程：`https://github.com/lemonzjk/261005_hyperspectral_paper.git`。
- React 19、TypeScript、Vite 7、CSS、SVG；Node.js 22.12+。
- 安装 `npm ci`；预览 `npm run dev -- --port 5173`，访问 `http://localhost:5173/`。远程连接需转发端口；新会话确认服务。本机请求需 bypass proxy。
- 检查 `npm run validate`、`npm run build`；交互修改进行浏览器验证。

## 当前状态

- 页面含图谱、论文库、数据资源、阅读指南；支持年份范围、单边及单年筛选；URL 保存起止年份，兼容旧 year 链接。详情、BibTeX、详细图缩放平移及手机适配。
- 13 个主分类，覆盖采集标定、重建表示、材料、三维理解、主动成像、光场、全息、光谱 LiDAR／点云、配准、高度融合、体成像。
- 172 篇论文，5 个资源入口。IGARSS 2023/2025 扫描 5,849 个题名，35 个候选待核验；HoloSpec 在线先行，几何精度待全文。
- 首屏为浅色全宽交互点云；用户要求场景独占首屏，拒绝左侧大字、深色、摄影与抽象装饰。`src/SpectralScene.tsx` 支持自然色、单波段响应、几何视图；450–950 nm 滑块联动点云和材料曲线，可旋转、复位、选材料。12,348 个合成点，响应为概念示意。场景内保留小标题，研究入口移至下方；统计栏、导航卡片保留。样式与说明：`src/spectral-scene.css`、`docs/hero-visual.md`。出版来源支持筛选与 URL 保存，详情显示出版全名、状态和 DOI。
- 默认横向研究路线图：年份横轴、方向彩色线路、代表论文站点，显示出版来源和年份；+N 表示其他论文。点击站点在当前线路下展开阶段论文，点击方向展开全部年份；可收起。代表论文核心优先、最新年份优先、简称排序。另有方向矩阵、全部论文及详细 SVG（缩放、平移、全屏、导出）。早期分阶段、近三年逐年，间距不表示时长。手机站点展开出版信息，无横向拖动。
- H×W×B 不等于三维几何；高度辅助二维分类与真实光谱点云分开。路线不声明方法继承关系。

## 文件与后续

- `src/data/catalog.json`：论文、资源、原始来源和核验信息；`src/tracks.ts`：主分类。
- `src/App.tsx`、`src/styles.css`：页面；`src/TimelineOverview.tsx`：总览；`src/ResearchMap.tsx`、`src/timeline-layout.ts`：详细时间轴；`src/map-groups.ts`：方向分组。
- `research/survey.json`：候选与检索记录；`research/discover_igarss.py`：会议目录扫描；`research/sources/`：原始证据快照；`research/record.py`：逐篇即时记录。
- `research/README.md`：范围与缺口；`scripts/validate.mjs`：数据和上下文检查。
- CVF/ECVA 题名扫描不等于全面核验；逐年检索与引文追溯未完成。MIWD/MCNS 已入库；MSL-WSE 待全文；优先核验 IGARSS 新候选和期刊版本关系。JSTARS、Remote Sensing 等专业背景候选单独保留。
- 校验、构建与桌面/平板/手机交互检查通过；本地预览 0.0.0.0:5173，远程需转发端口。调研未完成。
