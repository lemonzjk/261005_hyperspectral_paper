# 项目上下文

更新：2026-10-06。上限：2,000 个 Unicode 字符（含空白），60 行；每次项目请求复核，有新事实就更新。

## 目标与约定

- 构建 HS3D Atlas：高光谱三维视觉研究图谱，参考 https://2-mo.github.io/Awesome-Thinking-with-VAD/ 的组织方式，界面与代码独立实现。
- 用户要求先本地预览，不推送、不发布；每轮修改（包括文档与上下文）检查通过后必须本地提交。没有文件变化时不创建空提交。
- 每次请求必须使用 caveman skill，默认 full，中文简洁沟通；文档和代码保持正常表达。
- 新对话先读本文件，再按 AGENTS.md 开展工作。

## 仓库与技术

- 工作目录：`/data1/vad/data1/zjk/261005_hyperspectral_paper`。
- 分支：`main`；远程：`https://github.com/lemonzjk/261005_hyperspectral_paper.git`。
- HTTPS 的 lemonzjk 推送 dry-run 已通过，但用户禁止当前阶段推送。SSH 网络连接失败。
- React 19、TypeScript、Vite 7、原生 CSS、SVG 地图；Node.js 22.12+。
- 已配置 GitHub Pages 工作流，尚未发布；不要擅自启用。

## 当前实现

- 浅色中文研究站，包含研究图谱、论文库、数据资源、阅读指南。
- 图谱支持节点详情、缩放、拖动；论文支持关键词、方向、年份、表示筛选。
- 支持 URL 保存筛选与选中论文、BibTeX 导出、手机适配、键盘访问。
- 5 条线路：采集与标定、几何重建、表示与渲染、材料与逆渲染、理解与应用。
- 4 篇种子论文：HS-NeRF、SpectralNeRF、HyperGS、UnMix-NeRF；2 个数据资源入口。尚未覆盖整个领域，未核验项明确标注。
- 路线仅表示阅读组织，不声明方法继承关系。高光谱 H×W×B 立方体不等同于三维几何。

## 文件与运行

- `src/data/catalog.json`：文献、数据、来源、引用与地图横坐标。
- `src/tracks.ts`：线路配置；`src/App.tsx`：页面与交互；`src/styles.css`：样式。
- `scripts/validate.mjs`：数据与上下文长度检查；`README.md`：完整使用说明。
- 安装 `npm ci`；预览 `npm run dev -- --port 5173`。访问 `http://localhost:5173/`；远程连接需转发端口。新会话先确认服务是否运行。
- 检查 `npm run validate`；构建 `npm run build`；生产预览 `npm run preview`。

## 验证与后续

- 第一版数据检查、TypeScript 和生产构建已通过。
- 浏览器已检查桌面/手机、筛选、空状态、弹窗、URL、缩放、数据页、指南和引用下载；无运行错误。
- 后续按用户反馈修改界面，逐步核验并扩充文献与数据，补充方法比较；目前没有新增实现任务。
- 提交历史以 `git log` 为准；上下文与 AGENTS 修改也需要本地提交。
