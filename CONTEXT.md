# 项目上下文

更新：2026-10-06。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- 构建 HS3D Atlas 高光谱三维视觉研究图谱，覆盖 CV、遥感、高光谱、光学重要会议与期刊。
- 仅本地预览；不推送、不发布。每轮修改（含文献、文档、上下文）检查通过后必须本地 Git 提交。
- 每次请求使用 caveman skill，默认 full，中文简洁沟通；文档与代码正常表达。
- 当前 active goal：为全部论文搜集框架图，最新年份优先，每找到一张立即保存；允许从 PDF 裁切。找不到的标记来源与原因，用户后续补找。全量任务尚未完成。

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
- 2026 年 14 篇已初查：8 篇框架图已核验保存（3D-Diff、BH3D、EventSpecPS、GSFF、MOCI、MUSF-GEM、PiV-AHPC、Understory HSL）；5 篇需要全文/原图；FGI-EMIT 正文 Fig.1–8 无独立框架图。IEEE/Wiley 访问问题不等于论文没有框架图。

## 关键文件与续接

- `src/data/catalog.json`：论文、原始来源、核验状态和 frameworkFigures；`public/figures/<paper-id>/`：原图。
- `research/figures.json`：全部论文按年份倒序的续接清单、已核验图、尝试与失败原因；`research/figures.py`：init/queue/add/attempt，即时逐张保存；`research/figures.md`：操作说明。
- `src/App.tsx`、`src/styles.css`：页面与详情；`src/SpectralScene.tsx`、`src/spectral-scene.css`：首屏；`src/TimelineOverview.tsx`、`src/TimelineRoutes.tsx`、`src/ResearchMap.tsx`：图谱。
- 2025 年已核验 14 篇、15 张图；SpectralReconNSS 全文未见独立框架图，6 篇待全文/原图。累计 22 篇、23 张图；2026/2025 初查记录完整，其他 137 篇仍待检索。
- 下一步从 2024 年继续向早年推进，并重试最新年份缺失项；不得把 pending 批量改为已查过。
- 文献调研另见 `research/survey.json`、`research/README.md`：IGARSS 35 候选待核验、专业期刊与引文追溯未完成。H×W×B 不等于三维几何；高度辅助二维分类与真实光谱点云区分。
