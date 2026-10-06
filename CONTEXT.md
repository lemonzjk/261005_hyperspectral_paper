# 项目上下文

更新：2026-10-07。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- 构建 HS3D Atlas 高光谱三维视觉研究图谱，覆盖 CV、遥感、高光谱、光学重要会议与期刊。
- 仅本地预览；不推送、不发布。每轮修改（含文献、文档、上下文）检查通过后必须本地 Git 提交。
- 每次请求使用 caveman skill，默认 full，中文简洁沟通；文档与代码正常表达。
- 先补齐现有论文框架图，再扩充文献；以后新增论文同步查图。最新年份优先，逐张即时保存，允许 PDF 裁切；失败记录来源和原因供人工补找。

## 运行与检查

- 目录：`/data1/vad/data1/zjk/261005_hyperspectral_paper`；远程 GitHub lemonzjk/261005_hyperspectral_paper。
- React 19、TypeScript、Vite 7；Node.js 22.12+。安装 `npm ci`。
- 预览 `npm run dev -- --port 5173`，`http://localhost:5173/`；远程需转发端口；新会话确认服务，本机请求绕过 proxy。
- `npm run validate` 检查数据、框架图校验和与上下文；网站修改运行 `npm run build`，交互变更浏览器检查。

## 当前状态

- 174 篇论文、13 个主分类、5 个资源入口。图谱、论文库、资源、指南；年份范围/单边/单年及出版来源筛选；URL 保存筛选和详情。出版全名、状态、DOI、BibTeX、手机适配。
- 浅色全宽首屏：交互合成高光谱点云，自然色/单波段/几何、450–950 nm、旋转/复位/材料选择；12,348 点，响应为概念示意。用户拒绝左侧大字、深色、摄影和抽象装饰。
- 图谱默认「全景时间轴」：单张方向 × 年代表，删除重复分布总览；桌面紧凑行直接展示全部方向、每阶段最新一篇论文及年份/来源/篇数。点标题看详情，点篇数或方向就地展开论文，再点收起，无页面跳转。手机按方向显示年代节点，无拖拽、缩放、横向或嵌套滚动。保留方向卡片、时间矩阵、全部论文及年度 SVG。阶段等宽不表示时长；篇数只表示收录，示例不是排名或继承关系。
- 框架图详情支持本地图、高清打开、图号、PDF 页码、原始来源及作者归属；未检索、待人工补充、全文未见独立框架图分别展示。

## 关键文件与续接

- `src/data/catalog.json`：论文、原始来源、核验状态和 frameworkFigures；`public/figures/<paper-id>/`：原图。
- `research/figures.json`：全部论文按年份倒序的续接清单、已核验图、尝试与失败原因；`research/figures.py`：init/queue/add/attempt，即时逐张保存；`research/figures.md`：操作说明。
- `src/App.tsx`、`src/styles.css`：页面与详情；`src/SpectralScene.tsx`、`src/spectral-scene.css`：首屏；`src/AtlasOverview.tsx`、`src/DirectionOverview.tsx`、`src/TimelineOverview.tsx`、`src/TimelineRoutes.tsx`、`src/ResearchMap.tsx`：图谱。
- 框架图累计 122 篇、143 张；43 篇需全文/人工补图、9 篇全文无独立框架。Fourier Fig.6、HoloSpec Fig.1 原图受限；已确认 FLIGHT 的 Swansea 仓库无全文、UAV 融合 NAU 记录仅 DOI。开放标签不代表取得原图，不据作者章节判正式论文无框架。
- 交接见 `research/framework-handoff.md`；初查全部年份后，优先从最新年份重试 43 篇缺图，寻找作者/机构副本；不得批量改 pending。几何示意需注明不是完整流程，预印本无图结论注明版本。
- 文献调研另见 `research/survey.json`、`research/README.md`：IGARSS 扫描候选待核验，其中 CGCN 2023 已补 DOI、作者和卷页但缺原始摘要、专业期刊与引文追溯未完成；Eradiate（GMD 2026）留背景，PhotoniX 2024 串级单像素相机留候选。H×W×B 不等于三维几何；高度辅助二维分类与真实光谱点云区分。
