# 项目上下文

更新：2026-10-06。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- 构建 HS3D Atlas 高光谱三维视觉研究图谱，覆盖 CV、遥感、高光谱、光学重要会议与期刊。
- 仅本地预览；不推送、不发布。每轮修改（含文献、文档、上下文）检查通过后必须本地 Git 提交。
- 每次请求使用 caveman skill，默认 full，中文简洁沟通；文档与代码正常表达。
- 当前任务（已收到继续指令）：为全部论文搜集框架图，最新年份优先，每找到一张立即保存；允许从 PDF 裁切。找不到的标记来源与原因，用户后续补找。全量任务尚未完成。

## 运行与检查

- 目录：`/data1/vad/data1/zjk/261005_hyperspectral_paper`；远程 GitHub lemonzjk/261005_hyperspectral_paper。
- React 19、TypeScript、Vite 7；Node.js 22.12+。安装 `npm ci`。
- 预览 `npm run dev -- --port 5173`，`http://localhost:5173/`；远程需转发端口；新会话确认服务，本机请求绕过 proxy。
- `npm run validate` 检查数据、框架图校验和与上下文；网站修改运行 `npm run build`，交互变更浏览器检查。

## 当前状态

- 172 篇论文、13 个主分类、5 个资源入口。图谱、论文库、资源、指南；年份范围/单边/单年及出版来源筛选；URL 保存筛选和详情。出版全名、状态、DOI、BibTeX、手机适配。
- 浅色全宽首屏：交互合成高光谱点云，自然色/单波段/几何、450–950 nm、旋转/复位/材料选择；12,348 点，响应为概念示意。用户拒绝左侧大字、深色、摄影和抽象装饰。
- 默认横向研究路线图：年份横轴、方向线路、代表论文站点；点击展开、+N、出版信息。另有方向矩阵、全部论文与详细 SVG 缩放/平移/全屏/导出；分阶段间距不表示时长，不声明继承关系。
- 框架图详情支持本地图、高清打开、图号、PDF 页码、原始来源及作者归属；未检索、待人工补充、全文未见独立框架图分别展示。
- 2026 年初查：8 篇有图、5 篇需全文/原图；FGI-EMIT 正文 Fig.1–8 无独立框架图。IEEE/Wiley 访问问题不等于没有框架图。

## 关键文件与续接

- `src/data/catalog.json`：论文、原始来源、核验状态和 frameworkFigures；`public/figures/<paper-id>/`：原图。
- `research/figures.json`：全部论文按年份倒序的续接清单、已核验图、尝试与失败原因；`research/figures.py`：init/queue/add/attempt，即时逐张保存；`research/figures.md`：操作说明。
- `src/App.tsx`、`src/styles.css`：页面与详情；`src/SpectralScene.tsx`、`src/spectral-scene.css`：首屏；`src/TimelineOverview.tsx`、`src/TimelineRoutes.tsx`、`src/ResearchMap.tsx`：图谱。
- 框架图累计 82 篇、91 张；34 篇需全文/人工补图、5 篇已取得全文无独立框架图、51 篇待检索。2026–2018 初查完整，2019 年 6 篇全有图；2020 年 TMDE、Maize 需全文。2018 年 3 篇有图，Fourier、VBRT 需全文；LiDAR Spatial Unmix 作者预印本 Fig.1–8 无框架图，出版版可复核。2017 年已保存 Catadioptric HLF、Snapshot H-LF（含光学系统与数据流），余 8 篇待查。
- 交接见 `research/framework-handoff.md`；从 2017 年未检索项继续，再向更早年份推进、重试新年缺图；不得批量改 pending。几何示意需注明不是完整流程，预印本无图结论注明版本。
- 文献调研另见 `research/survey.json`、`research/README.md`：IGARSS 35 候选待核验、专业期刊与引文追溯未完成。H×W×B 不等于三维几何；高度辅助二维分类与真实光谱点云区分。
