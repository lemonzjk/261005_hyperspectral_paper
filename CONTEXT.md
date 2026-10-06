# 项目上下文

更新：2026-10-06。限制：2,000 个 Unicode 字符（含空白），60 行；每次项目请求复核维护。

## 目标与约定

- 构建 HS3D Atlas：高光谱三维视觉研究图谱，组织参考 https://2-mo.github.io/Awesome-Thinking-with-VAD/。
- 仅本地预览；不推送、不发布。每轮修改（含文献、文档、上下文）检查通过后必须本地提交；不创建空提交。
- 每次请求必须使用 caveman skill，默认 full，中文简洁沟通；文档和代码正常表达。
- 新对话先读本文件，再按 AGENTS.md 工作。
- 用户要求尽可能全面调研顶会顶刊，每查清一篇就写入维护文件；已建立 active goal，调研未完成。
- 场所不限 CV，也覆盖遥感、高光谱、光学的重要会议与期刊；继续寻找更多子方向。

## 仓库与运行

- 工作目录：`/data1/vad/data1/zjk/261005_hyperspectral_paper`；分支 `main`。
- 远程：`https://github.com/lemonzjk/261005_hyperspectral_paper.git`。当前禁止推送。
- React 19、TypeScript、Vite 7、CSS、SVG；Node.js 22.12+。已有 Pages 工作流，尚未发布。
- 安装 `npm ci`；预览 `npm run dev -- --port 5173`，访问 `http://localhost:5173/`。远程连接需转发端口；新会话确认服务。本机请求需 bypass proxy。
- 检查 `npm run validate`、`npm run build`；交互修改进行浏览器验证。

## 当前状态

- 页面含图谱、论文库、数据资源、阅读指南；支持年份闭区间、单边范围及单年筛选；URL 保存起止年份，兼容旧 year 链接。详情、BibTeX、详细图缩放平移及手机适配。
- 13 个主分类：采集标定、几何重建、场景表示、材料逆渲染、三维理解、主动成像、光场、全息计量、光谱 LiDAR、光谱点云、配准定位、高度辅助融合、三维光谱体成像。
- 172 篇论文，5 个资源入口；新增小麦三维光合性状、Uis 矿物 hypercloud、Hylite 光照校正和 VI-SLAM 推扫重建。IGARSS 2023/2025 共扫 5,849 个题名，35 个新候选待核验。仅 RGB 的 Spectral Tracking 留背景。HoloSpec 在线先行，几何精度待全文。
- 用户要求图谱美观、直观，无需拖动。默认紧凑方向×时间矩阵，桌面 13 个方向约 630px 高；数字节点为阶段篇数，旁边显示代表论文（核心优先、最新年份优先、简称排序）。点节点展开阶段论文，点方向查看全部年份；详情可收起。「全部论文」按时间展示完整列表；圆点核心、方点相关。手机保留篇数矩阵，无横向画布。详细 SVG 可缩放、平移、全屏及导出。早期合并阶段，近三年逐年；列宽不表示时长。
- H×W×B 不等于三维几何；高度辅助二维分类与真实光谱点云分开。路线不声明方法继承关系。

## 文件与后续

- `src/data/catalog.json`：论文、资源、原始来源和核验信息；`src/tracks.ts`：主分类。
- `src/App.tsx`、`src/styles.css`：页面；`src/TimelineOverview.tsx`：总览；`src/ResearchMap.tsx`、`src/timeline-layout.ts`：详细时间轴；`src/map-groups.ts`：方向分组。
- `research/survey.json`：候选与检索记录；`research/discover_igarss.py`：会议目录扫描；`research/sources/`：原始证据快照；`research/record.py`：逐篇即时记录。
- `research/README.md`：范围与缺口；`scripts/validate.mjs`：数据和上下文检查。
- CVF/ECVA 题名扫描不等于全面核验；逐年检索与引文追溯未完成。MIWD/MCNS 已入库；MSL-WSE 待全文；优先核验 IGARSS 新候选和期刊版本关系。JSTARS、Remote Sensing 等专业背景候选单独保留。
- 172 篇数据校验与构建通过；图谱已验证桌面/平板/手机、展开、详情、键盘、筛选及详细图返回，无横向溢出。预览监听 0.0.0.0:5173；远程访问需转发端口，README 有步骤。全面调研未完成。
