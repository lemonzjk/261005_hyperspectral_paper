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
- 78 篇论文，3 个资源入口；包含 CV、图形学、遥感和光学文献；已扩展光声/化学断层、HySP、光片与多色光场；Photonics Research 2026 DOE 结构光论文为在线先行。预印本标为补充阅读。
- 用户明确要求保留参考网站的时间轴线路图，不能改成卡片。已恢复年份横轴、彩色方向线路、可点击论文站点；同年密集论文拉开间距。支持缩放、完整图谱、最新研究、拖动平移和 SVG 导出；方向下拉筛选；默认自适应展示完整图谱，最新研究切到原始大小；线路采用折线站点样式。
- H×W×B 不等于三维几何；高度辅助二维分类与真实光谱点云分开。路线不声明方法继承关系。

## 文件与后续

- `src/data/catalog.json`：论文、资源、原始来源和核验信息；`src/tracks.ts`：主分类。
- `src/App.tsx`、`src/styles.css`：页面；`src/ResearchMap.tsx`、`src/timeline-layout.ts`：时间轴布局；`src/map-groups.ts`：方向分组。
- `research/survey.json`：候选与检索记录；`research/sources/`：原始证据快照；`research/record.py`：逐篇即时记录。
- `research/README.md`：范围与缺口；`scripts/validate.mjs`：数据和上下文检查。
- CVF 旧目录已补扫；CVPR 2020 已补扫 1466 个题名，5 个命中均排除；ECVA 2018–2024 四届 6166 题名已检索，候选待筛选。其他会议、遥感与光学期刊系统检索与引文追溯未完成。配准方向已补无人机波段配准及近距离多光谱三维配准；IEEE 部分候选暂缺原始摘要。
- 数据检查与构建已通过；时间轴交互覆盖桌面/手机、78 篇站点、缩放平移、筛选、弹窗与 SVG 导出；无运行错误。未穷尽文献，不将目标标为完成。
