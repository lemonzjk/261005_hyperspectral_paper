# 项目上下文

更新：2026-10-07。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- HS3D Atlas 高光谱三维视觉研究图谱，覆盖 CV、遥感、高光谱、光学会议与期刊。
- 仅本地预览；不推送、不发布。每轮有修改且检查通过后必须本地 Git 提交。
- 每次请求使用 caveman skill，默认 full，中文简洁；文档和代码正常表达。
- 文献扩充覆盖重要会议期刊与 arXiv；现有框架全部初查，缺图保留状态，新增同步查图。逐张保存，允许 PDF 裁切，保留失败原因。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+；安装 `npm ci`。
- `npm run dev -- --port 5173`，http://localhost:5173/；远程转发端口；新会话确认服务，本机请求绕过 proxy。
- 数据和上下文修改运行 `npm run validate`；网站修改运行 `npm run build`；交互进行浏览器检查。

## 当前状态

- 214 篇论文、13 个主分类、7 个资源入口；图谱、论文库、资源、指南。年份范围/单边/单年；出版来源分组多选、组全选、搜索与移除，所选取并集；URL 重复 venue 参数保存筛选，兼容旧链接。出版全名、状态、DOI、BibTeX。
- 用户要求整站设计升级，允许全站深色，参考 OpenAI 等产品；已改石墨黑主题、克制边框、统一排版与留白。参考 OpenAI、Linear、Vercel、Viser、OpenAlex GUI、shadcn/ui，详见 docs/interface-design.md。不使用左侧大字、摄影或抽象装饰。
- 首屏交互实验：连续合成地形、自然色/光谱/高度；桌面默认自然色与 850 nm 对照，手机画布前有快捷波段；450–950 nm、预设、材料与采样标记、曲线和响应数值联动，旋转、视角复位、全重置。12,348 空间点，非实测数据；详见 docs/hero-visual.md。
- 导航切换定位内容并转移焦点；三个研究问题入口清除旧筛选后选方向。年度时间轴保留方向、年份跳转、早期/最新、每年六篇及展开、共用筛选、详情和 SVG。论文库双列/手机单列，展示原图；原图保留白底。
- 框架图 148 篇、180 张；55 篇需全文/人工补图，11 篇全文无独立框架；全部初查无 pending。GFSFN 为二维分类背景。EventSpecPS、SPoILeR 为 ECCV 2026 已接收，正式卷页未核验。MultimodalStudio 推荐修正后的 v1.1，许可待核验。

## 关键文件与下一步

- src/data/catalog.json：条目、来源、核验与 frameworkFigures；public/figures/<paper-id>/：原图。
- research/figures.json：续接清单、核验图与失败记录；research/figures.py：init/queue/add/attempt；操作见 research/figures.md。
- src/App.tsx：页面与详情；src/design-system.css：整站布局与主题；src/SpectralScene.tsx、src/spectral-scene.css：首屏；src/PublicationFilter.tsx：出版筛选；src/AtlasOverview.tsx、src/TimelineOverview.tsx：时间轴。
- 调研见 research/survey.json、research/README.md。55 篇缺图可重试；Optics Express 色差测深图待补；IGARSS 待原始摘要与版本核验；专业期刊、旧目录及引文追溯未完成。
- RSE 两篇冠层导数待全文光谱范围核验；未来卷期不代表在线日期。会议/期刊版本不混用；高度辅助二维分类、离散多光谱与真实光谱点云区分；H×W×B 不等于 xyz。
