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
- 远程：`https://github.com/lemonzjk/261005_hyperspectral_paper.git`。HTTPS dry-run 曾通过；当前禁止推送。SSH 网络失败。
- React 19、TypeScript、Vite 7、CSS、SVG；Node.js 22.12+。已有 Pages 工作流，尚未发布。
- 安装 `npm ci`；预览 `npm run dev -- --port 5173`，访问 `http://localhost:5173/`。远程连接需转发端口；新会话确认服务。代理环境下本机请求需 bypass proxy。
- 检查 `npm run validate`、`npm run build`；交互修改进行浏览器验证。

## 当前状态

- 页面包含研究图谱、论文库、数据资源、阅读指南；支持筛选、URL 状态、详情、BibTeX、时间轴缩放平移、手机适配。
- 13 个主分类：采集标定、几何重建、场景表示、材料逆渲染、三维理解、主动成像、光场、全息计量、光谱 LiDAR、光谱点云、配准定位、高度辅助融合、三维光谱体成像。
- 104 篇论文，4 个资源入口；已补光谱点云边缘滤波、邻域选择、域适应、图分类、GSFF、双角度立体、长尾分类及多模态 LiDAR 特征选择。GSFF 与 Photonics Research 2026 DOE 为在线先行；预印本标补充阅读。
- 用户明确要求保留参考网站的时间轴线路图，不能改成卡片。已恢复年份横轴、彩色方向线路、可点击论文站点；同年密集论文拉开间距。支持缩放、完整图谱、最新研究、拖动平移和 SVG 导出；方向下拉筛选；默认 80% 可读视图定位最近年份，完整图谱自适应缩放；支持全屏浏览与 Esc 退出，最新研究切到原始大小；线路采用折线站点样式。
- H×W×B 不等于三维几何；高度辅助二维分类与真实光谱点云分开。路线不声明方法继承关系。

## 文件与后续

- `src/data/catalog.json`：论文、资源、原始来源和核验信息；`src/tracks.ts`：主分类。
- `src/App.tsx`、`src/styles.css`：页面；`src/ResearchMap.tsx`、`src/timeline-layout.ts`：时间轴布局；`src/map-groups.ts`：方向分组。
- `research/survey.json`：候选与检索记录；`research/sources/`：原始证据快照；`research/record.py`：逐篇即时记录。
- `research/README.md`：范围与缺口；`scripts/validate.mjs`：数据和上下文检查。
- CVF 与 ECVA 已完成部分题名关键词扫描，不等于全面核验；其他会议、遥感/光学期刊逐年检索及引文追溯未完成。GSFF 作者 v2 与正式 DOI 四作者已对齐；两套点云为 10 波段影像重建。HyperPointFormer / MKGSL 正式为 JSTARS，保留背景候选。
- 104 篇数据检查、构建与时间轴浏览器验证通过；覆盖桌面/手机、缩放平移、筛选、弹窗、全屏及 SVG 导出。预览监听 0.0.0.0:5173，服务器内返回 200；用户访问仍待确认转发地址，README 已补 VS Code 端口转发步骤。继续核验候选，不将全面调研目标标为完成。
