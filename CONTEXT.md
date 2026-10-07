# 项目上下文

更新：2026-10-07。上限：2,000 个 Unicode 字符、60 行。

## 目标与约定

- 构建 HS3D Atlas 高光谱三维视觉研究图谱，覆盖 CV、遥感、高光谱、光学重要会议与期刊。
- 仅本地预览；不推送、不发布。每轮修改（含文献、文档、上下文）检查通过后必须本地 Git 提交。
- 每次请求使用 caveman skill，默认 full，中文简洁沟通；文档与代码正常表达。
- 用户已要求继续完成；文献扩充覆盖重要会议期刊与 arXiv；现有框架全部初查，缺图保留状态，新增同步查图。逐张保存，允许 PDF 裁切；保留失败原因。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+。安装 `npm ci`。
- 预览 `npm run dev -- --port 5173`，`http://localhost:5173/`；远程需转发端口；新会话确认服务，本机请求绕过 proxy。
- `npm run validate` 检查数据、框架图校验和与上下文；网站修改运行 `npm run build`，交互变更浏览器检查。

## 当前状态

- 213 篇论文、13 个主分类、7 个资源入口。图谱、论文库、资源、指南；年份范围/单边/单年及出版来源筛选；URL 保存筛选和详情。出版全名、状态、DOI、BibTeX。
- 浅色全宽首屏：交互合成高光谱点云，自然色/单波段/几何、450–950 nm、旋转/复位/材料选择；12,348 点，响应为概念示意。用户拒绝左侧大字、深色、摄影和抽象装饰。
- 图谱默认「领域图与时间轴」：采集、重建、理解三列紧凑方向索引，13 个方向显示任务提示与篇数，点击定位下方方向×年代时间轴。已移除重复年代格、装饰线图及方向总览/时间矩阵切换；仅默认视图与全部论文，保留年度 SVG 导出和共用筛选。标题看详情、篇数就地展开，无需拖拽、缩放、横向或内部滚动；手机纵向浏览。分组不表示继承，阶段等宽不表示时长；篇数仅表示收录分布。
- 框架图详情支持本地图、高清打开、图号、PDF 页码、原始来源及作者归属；未检索、待人工补充、全文未见独立框架图分别展示。

## 关键文件与续接

- `src/data/catalog.json`：论文、原始来源、核验状态和 frameworkFigures；`public/figures/<paper-id>/`：原图。
- `research/figures.json`：全部论文按年份倒序的续接清单、已核验图、尝试与失败原因；`research/figures.py`：init/queue/add/attempt，即时逐张保存；`research/figures.md`：操作说明。
- `src/App.tsx`、`src/styles.css`：页面与详情；`src/SpectralScene.tsx`、`src/spectral-scene.css`：首屏；`src/AtlasOverview.tsx` / `src/atlas-overview.css`、`src/TimelineOverview.tsx`、`src/ResearchMap.tsx`：图谱。
- 框架图累计 148 篇、180 张；54 篇需全文/人工补图、11 篇全文无独立框架。GFSFN 全文核验为二维分类背景，旧缺图来源见研究记录。开放标签不代表取得原图，不据作者章节判正式论文无框架。
- 当前 213 篇框架全部初查，无 pending，54 篇缺图可重试。新增 RSNCC、DSC、HCGFN、内部推扫 SfM/MVS、树木碳密度、EventSpecPS、SPoILeR、MultimodalStudio；EventSpecPS、SPoILeR 为 ECCV 2026 已接收，正式卷页未核验。MultimodalStudio 新增第七个资源，推荐修正后的 v1.1；许可待核验。会议/期刊版本不混用；高度辅助二维分类、离散多光谱与真实高光谱三维区分。
- 调研见 `research/survey.json`、`research/README.md`：IGARSS 待原始摘要与版本核验；专业期刊、旧目录与引文追溯未完成。RSE 两篇冠层导数待全文光谱范围核验；未来卷期不代表在线日期。H×W×B 不等于 xyz；高度辅助二维分类与真实光谱点云区分。
