# 项目上下文

更新：2026-10-07。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- HS3D Atlas 高光谱三维视觉图谱。用户确定新增独立高光谱调研入口，旧页已加预览入口；分类随调研形成。两页共用时间轴、PaperCard 与 CSS，修改同步。总库数据未接入，设计见 docs/hyperspectral-library-*。
- 仅本地预览；不推送、不发布。每轮有修改且检查通过后必须本地 Git 提交。
- 每次请求使用 caveman skill，默认 full，中文简洁；文档和代码正常表达。
- 文献扩充覆盖重要会议期刊与 arXiv；现有框架全部初查，缺图保留状态，新增同步查图。逐张保存，允许 PDF 裁切，保留失败原因。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+；安装 `npm ci`。
- `npm run dev -- --port 5173`，http://localhost:5173/；远程转发端口；新会话确认服务，本机请求绕过 proxy。
- 数据和上下文修改运行 `npm run validate`；网站修改运行 `npm run build`；交互进行浏览器检查。

## 当前状态

- 214 篇论文、13 个主分类、7 个资源入口；图谱、论文库、资源、指南。核心/相关/全部筛选，scope URL 保留并联动计数；桌面/手机方向计数随其他筛选更新，排除方向自身条件；年份范围/单边/单年；出版来源分组多选、组全选、搜索与移除，所选取并集；URL 重复 venue 参数保存筛选，兼容旧链接。出版全名、状态、DOI、BibTeX。
- 用户要求整站设计升级，允许全站深色，参考 OpenAI 等产品；已改石墨黑主题、克制边框、统一排版与留白。设计参考详见 docs/interface-design.md。不使用左侧大字、摄影或抽象装饰。
- 首屏全宽铺满视口；实色固定导航。默认 850 nm 合成地形，自然色对照按需打开；光谱面板可收起，手机默认收起；450–950 nm、材料、采样、曲线联动，支持旋转和复位。锚点避让固定导航。12,348 空间点，非实测数据；详见 docs/hero-visual.md。
- 导航切换定位内容并转移焦点；三个研究问题入口清除旧筛选后选方向。时间线采用大年份主轴、单列论文、收录数量柱图、吸顶年份索引及滚动高亮；保留方向、早期/最新、每年六篇及展开、共用筛选、详情和 SVG。论文库双列/手机单列，资源、指南、详情统一提高字号与对比；入门区使用固定阅读路线，原图保留白底。
- 详情页支持拖拽/选择图片，本地补充/替换框架图（PNG/JPG/WebP，≤10MB）；保存到项目并同步目录与续接清单，新图待核验，原图和来源保留替换历史。入口仅 npm run dev；实现 src/FrameworkFigures.tsx、server/。
- 框架图与用户补图状态以目录为准，全部检索初查已完成。GFSFN 为二维分类背景。EventSpecPS、SPoILeR 为 ECCV 2026 已接收，正式卷页未核验。MultimodalStudio 推荐修正后的 v1.1，许可待核验。

## 关键文件与下一步

- src/data/catalog.json：条目、来源、核验与 frameworkFigures；public/figures/<paper-id>/：原图。
- research/figures.json：续接清单、核验图与失败记录；research/figures.py：init/queue/add/attempt；操作见 research/figures.md。
- src/App.tsx：页面与详情；src/design-system.css：整站布局与主题；src/SpectralScene.tsx、src/spectral-scene.css：首屏；src/PublicationFilter.tsx：出版筛选；src/AtlasOverview.tsx、src/TimelineOverview.tsx：时间轴。
- 调研见 research/survey.json、research/README.md。55 篇缺图可重试；Optics Express 色差测深图待补；IGARSS 待原始摘要与版本核验；专业期刊、旧目录及引文追溯未完成。
- RSE 两篇冠层导数待全文光谱范围核验；未来卷期不代表在线日期。会议/期刊版本不混用；高度辅助二维分类、离散多光谱与真实光谱点云区分；H×W×B 不等于 xyz。
