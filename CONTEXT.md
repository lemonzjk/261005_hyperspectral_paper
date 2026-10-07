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

- 192 篇论文、13 个主分类、6 个资源入口。图谱、论文库、资源、指南；年份范围/单边/单年及出版来源筛选；URL 保存筛选和详情。出版全名、状态、DOI、BibTeX。
- 浅色全宽首屏：交互合成高光谱点云，自然色/单波段/几何、450–950 nm、旋转/复位/材料选择；12,348 点，响应为概念示意。用户拒绝左侧大字、深色、摄影和抽象装饰。
- 图谱默认「领域图与时间轴」：采集、重建、理解三列静态全景，13 个方向直接展示任务提示、输入/目标、总篇数与阶段篇数，主题配色及概念线图区分分组。点击方向跳至下方方向×年代时间轴，标题看详情、篇数就地展开。无需拖拽、缩放、横向或内部滚动；手机纵向排版，每行附年代标签。保留方向总览、时间矩阵、全部论文与年度 SVG；共用筛选。分组不表示方法继承，阶段等宽不表示时长；篇数仅表示收录分布。
- 框架图详情支持本地图、高清打开、图号、PDF 页码、原始来源及作者归属；未检索、待人工补充、全文未见独立框架图分别展示。

## 关键文件与续接

- `src/data/catalog.json`：论文、原始来源、核验状态和 frameworkFigures；`public/figures/<paper-id>/`：原图。
- `research/figures.json`：全部论文按年份倒序的续接清单、已核验图、尝试与失败原因；`research/figures.py`：init/queue/add/attempt，即时逐张保存；`research/figures.md`：操作说明。
- `src/App.tsx`、`src/styles.css`：页面与详情；`src/SpectralScene.tsx`、`src/spectral-scene.css`：首屏；`src/AtlasOverview.tsx` / `src/atlas-overview.css`、`src/DirectionOverview.tsx`、`src/TimelineOverview.tsx`、`src/TimelineRoutes.tsx`、`src/ResearchMap.tsx`：图谱。
- 框架图累计 136 篇、161 张；46 篇需全文/人工补图、10 篇全文无独立框架。JSTARS 融合候选待核验，旧缺图来源详见交接。开放标签不代表取得原图，不据作者章节判正式论文无框架。
- 交接见 `research/literature-handoff.md`、`research/framework-handoff.md`；192 篇全部初查，无 pending；46 篇缺图可重试。新增 FRGFNet 与 FusDreamer（TGRS 2025，相关栅格分类），后者正式全文/代码核验并保存完整 Figure 1，前者缺全文原图。Ghost LiDAR 的 GHz 吞吐不等于全谱帧率；Fiducial Mapping 无独立三维真值；MS-ALS 更正稿待核验。
- 文献调研见 `research/survey.json`、`research/README.md`：IGARSS 候选待原始摘要与版本核验；RSE 两篇冠层导数待全文光谱范围核验，2026 叶密度论文登记未来卷期不代表在线日期。臭氧层析正文仅二维水平分布，保留背景；专业期刊及引文追溯未完成。H×W×B 不等于三维几何；高度辅助二维分类与真实光谱点云区分。
