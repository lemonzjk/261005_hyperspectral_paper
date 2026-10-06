# 框架图搜集交接

用户已要求继续搜集现有论文框架图；任务进行中。仅本地保存、检查与 Git 提交，不推送、不发布。

## 目标与操作

为 catalog 全部论文搜集框架、方法流程或系统结构原图，按最新年份优先。允许从原论文及补充 PDF 裁切，也可从出版社、作者网站或仓库取图。每找到一张立即用 `research/figures.py add` 保存。不要重绘、错配其他论文，或把实验结果图当框架图。

先读根目录 `CONTEXT.md` 和 `AGENTS.md`，使用 caveman full 中文简洁沟通。具体维护步骤见 `research/figures.md`。新增数据保留来源、图号、作者归属、核验说明，PDF 裁切保留页码。访问失败标记 needs_access；只有核对完整正文后才可判定 no_framework。未完成检索保持 pending。

## 权威状态

- 172 篇：82 篇 verified、91 张图；34 篇 needs_access；5 篇 no_framework；51 篇 pending。
- 2026–2018 年初查完整。2020 年 4 篇有图；TMDE、Maize 重试失败已记 needs_access，不能据此判定没有图。
- 2019 年 6 篇全部有图；HSPC Generation 含总流程与 NMF 细节两张。
- 2018 年 Material-Aware Stereo、DART Tree Traits、HS-DSM Radiometry 有图；Fourier Multimodal 因出版社验证码、ResearchGate 403 需作者稿。VBRT 的 gr1–gr8 为离散几何/实验结果，未冒充框架，需全文进一步查。
- LiDAR Spatial Unmix 已读 24 页作者预印本，Fig.1–8 为数据或结果，方法是公式和 Algorithm 1–2 伪代码，无独立框架图；该结论仅针对该预印本，正式版与补充材料可复核。
- 2017 年新增 Catadioptric HLF Figure 2，以及 Snapshot H-LF Figures 1、2；下一步继续该年剩余 8 篇，再向 2016 年及更早推进。
- 随后重试最新年份缺图项；全部来源与失败原因以 `research/figures.json` 为准。任务未完成。

## 文件与工具

- `src/data/catalog.json`、`research/figures.json`：已逐张同步，框架图在 `public/figures/<paper-id>/`。
- 续接可运行 `python research/figures.py queue --year 2020`。queue 会包含缺图状态，区分 pending 和已查缺图。
- `python research/figures.py add /tmp/record.json` 即时保存；`attempt` 保存入口、原因和状态；详见操作文档。
- PDF 处理：pdftotext、pdftoppm、Pillow；没有 fitz。不要把截图联系表当原图保存。
- 本机临时工作 `/tmp/framework-figures/`，有下载 PDF、文本、裁切候选及记录；这些不是跨机器持久资源。重新下载使用清单内稳定来源。
- `/tmp/framework-figures/save-crop.py`、`save-gr.py` 为当前机器辅助脚本；永久逻辑在 `research/figures.py`。
- 原出版社 Elsevier 图可尝试 `https://ars.els-cdn.com/content/image/1-s2.0-<PII>-gr<N>_lrg.jpg`；先核对 PII 和图像内容，未读正文时在说明中标注图号来自资源标识，不编造页码。
- Nature 原图通常可将 HTML img 的 `/lw685/` 替换 `/full/`，核对 FigN 正文图注。
- CVF 官方 PDF 常可直接下载。ResearchGate 下载链接有时出现重复 `/publication/` 路径，须核对实际入口；403 不等于无图。

## 验证与提交

本地预览端口 5173；本机请求绕过 proxy。数据和上下文修改运行 `npm run validate`，网站构建 `npm run build`，详情新增图进行桌面和手机检查。每轮检查通过后创建本地 Git 提交。

Playwright 在 `/tmp/hs3d-browser-check/`，脚本按年份检查全部框架图、原图尺寸、链接、关闭与 320/390/1440 px 溢出。Chromium 为 `/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`。临时目录失效时自行恢复验证，不依赖本文件证明检查已通过。
