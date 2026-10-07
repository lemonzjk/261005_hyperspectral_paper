# 项目上下文

更新：2026-10-07。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- 构建 HS3D Atlas 高光谱三维视觉研究图谱，覆盖 CV、遥感、高光谱、光学重要会议与期刊。
- 仅本地预览；不推送、不发布。每轮修改（含文献、文档、上下文）检查通过后必须本地 Git 提交。
- 每次请求使用 caveman skill，默认 full，中文简洁沟通；文档与代码正常表达。
- 已恢复文献扩充，覆盖 CV/高光谱重要会议期刊与 arXiv；现有框架全部初查，缺图保留状态，新增论文同步查图。逐张保存，允许 PDF 裁切；失败保留原因。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+。安装 `npm ci`。
- 预览 `npm run dev -- --port 5173`，`http://localhost:5173/`；远程需转发端口；新会话确认服务，本机请求绕过 proxy。
- `npm run validate` 检查数据、框架图校验和与上下文；网站修改运行 `npm run build`，交互变更浏览器检查。

## 当前状态

- 184 篇论文、13 个主分类、5 个资源入口。图谱、论文库、资源、指南；年份范围/单边/单年及出版来源筛选；URL 保存筛选和详情。出版全名、状态、DOI、BibTeX。
- 浅色全宽首屏：交互合成高光谱点云，自然色/单波段/几何、450–950 nm、旋转/复位/材料选择；12,348 点，响应为概念示意。用户拒绝左侧大字、深色、摄影和抽象装饰。
- 图谱默认「领域图与时间轴」：静态分支图直接展示三组主题、13 个方向、任务提示与篇数，点击方向跳至对应时间轴。下方保留方向×年代时间轴，加大行距与文字；核心圆点、相关方点，各阶段显示一篇示例，标题看详情、篇数就地展开。无需拖拽、缩放、横向或内部滚动；手机纵向排版。保留方向总览、时间矩阵、全部论文与年度 SVG；共用筛选。分支为主题分类，连线不表示方法继承，阶段等宽不表示时长。
- 框架图详情支持本地图、高清打开、图号、PDF 页码、原始来源及作者归属；未检索、待人工补充、全文未见独立框架图分别展示。

## 关键文件与续接

- `src/data/catalog.json`：论文、原始来源、核验状态和 frameworkFigures；`public/figures/<paper-id>/`：原图。
- `research/figures.json`：全部论文按年份倒序的续接清单、已核验图、尝试与失败原因；`research/figures.py`：init/queue/add/attempt，即时逐张保存；`research/figures.md`：操作说明。
- `src/App.tsx`、`src/styles.css`：页面与详情；`src/SpectralScene.tsx`、`src/spectral-scene.css`：首屏；`src/AtlasOverview.tsx`、`src/DirectionOverview.tsx`、`src/TimelineOverview.tsx`、`src/TimelineRoutes.tsx`、`src/ResearchMap.tsx`：图谱。
- 框架图累计 132 篇、156 张；43 篇需全文/人工补图、9 篇全文无独立框架。Fourier Fig.6、HoloSpec Fig.1 原图受限；ACFFN 作者目录无同篇附件；JSTARS 融合候选待核验。开放标签不代表取得原图，不据作者章节判正式论文无框架。
- 交接见 `research/literature-handoff.md`、`research/framework-handoff.md`；184 篇全部初查，无 pending；43 篇缺图仍可重试。新增微梳三维全息（arXiv 2025）与 CVPR 2024 光谱偏振数据，三张系统图已保存。几何示意注明不是完整流程，无图结论注明版本。
- 文献调研另见 `research/survey.json`、`research/README.md`：IGARSS 扫描候选待核验，其中 CGCN 2023 已补 DOI、作者和卷页但缺原始摘要、专业期刊与引文追溯未完成；Eradiate（GMD 2026）留背景，PhotoniX 2024 串级单像素相机已按正式版收录。H×W×B 不等于三维几何；高度辅助二维分类与真实光谱点云区分。
