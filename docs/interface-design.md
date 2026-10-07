# 研究图谱界面设计

## 设计方向

整站采用石墨黑背景、中性文字和少量低饱和绿色，覆盖首屏、导航、时间轴、论文库、出版筛选、资源页、指南与详情弹窗。用户明确允许整站深色，并要求参考 OpenAI 等产品的设计品质。保留全宽交互场景，不使用左侧大标题、摄影或与研究无关的装饰。

视觉层级主要依靠字号、间距与分隔线。顶部导航取消胶囊外框；品牌使用独立绘制的分层几何符号；时间轴条目取消重复卡片边框；论文库保留便于比较的双列卡片，并展示已有论文框架图。原始科学图片保留白底，不反相、不裁切、不生成替代图。

## 参考与取舍

2026-10-07 查阅以下项目和公开页面。仅借鉴组织方式，本站代码、图标和布局独立实现，没有复制品牌资产或引入对应组件依赖。

- [OpenAI](https://openai.com/)：参考公开首页的主导航、研究栏目和内容层级。浏览器页面停留在加载状态，因此没有把未加载完成的截图当作视觉验证结果。
- [Linear](https://linear.app/)：参考中性深色背景、简短导航和分层的产品界面。采用克制的边界与留白，避免高饱和装饰。
- [Vercel](https://vercel.com/home)：参考排版节奏、清晰的主操作和统一页面网格。
- [Viser](https://github.com/nerfstudio-project/viser)：阅读 README 和 [`examples/02_gui/02_layouts.py`](https://github.com/nerfstudio-project/viser/blob/main/examples/02_gui/02_layouts.py)。将场景与控制面板分开，按任务组织控件；保留同视角对照与明确的复位操作。
- [OpenAlex GUI](https://github.com/ourresearch/openalex-gui)：阅读 [`DiscoverFilters.vue`](https://github.com/ourresearch/openalex-gui/blob/master/src/components/Discover/DiscoverFilters.vue)，参考研究检索中的筛选分组与 URL 状态保存。
- [shadcn/ui](https://github.com/shadcn-ui/ui) 与[仪表盘示例](https://ui.shadcn.com/examples/dashboard)：参考导航、按钮、字段和数据内容的层级及状态一致性，未引入其组件库。
- 年度时间轴沿用此前对 [OpenTimeline](https://github.com/izored/openTimeline) 与 [vis-timeline](https://visjs.github.io/vis-timeline/examples/timeline/) 的调研。没有精确发表月份的数据使用年度分组；方向不表示方法继承，年度间距不表示时长。

## 页面结构与交互

1. 首屏使用居中标题、三维场景和光谱控制面板。桌面默认显示自然色与单波段响应对照；手机默认单场景，并在画布前提供波段快捷按钮。详见 `docs/hero-visual.md`。
2. 收录概况后提供三个问题入口，分别进入几何重建、场景表示与材料理解方向。进入问题主题会清除旧筛选，避免隐藏条件造成空结果。
3. 导航点击后切换对应内容、滚动到内容起点并转移键盘焦点。用户偏好减少动态效果时使用即时滚动。
4. 桌面左侧为方向导航，主区域依次展示搜索、年份、出版来源和表示筛选；小屏统一使用方向下拉。
5. 时间轴保留年份跳转、顺序切换、按年展开、全部展开、SVG 导出及详情；出版来源保留分组多选和 URL 恢复。
6. 论文库、资源、指南和详情沿用同一套深色表面、文字与控件；科学原图始终保留原来的白底。

## 文件

- `src/design-system.css`：整站布局、排版与深色主题。清理本轮重复覆盖的属性，保留既有组件样式兼容性。
- `src/SpectralScene.tsx`、`src/spectral-scene.css`：交互实验、地形表面、采样标记与光谱曲线。
- `src/App.tsx`：品牌、首屏、主题入口、导航定位与论文库原图。
- `src/AtlasOverview.tsx`、`src/TimelineOverview.tsx`、`src/atlas-overview.css`：年度阅读结构。

## 验证

- `npm run validate`：文献来源、图片校验和以及上下文长度。
- `npm run build`：TypeScript 和生产构建。
- Playwright：三种场景模式、自然色对照、预设和键盘波长、材料曲线、表面采样、拖动和复位；导航定位与焦点、主题入口、搜索、空状态、联合筛选和 URL 恢复、详情关闭、资源与指南、SVG 导出。
- 桌面与移动端在 320、390、768、1024、1440、1920 像素宽度下核对溢出及可操作性；通过实际浏览器截图检查首屏、时间轴、论文库和详情。
- axe-core 核对四个内容视图与论文详情的 WCAG A/AA 自动检查。自动检查不等同于完整的人工无障碍审计。

仅提供本地预览，不推送或发布。文献数据与原图来源保持原有记录。
