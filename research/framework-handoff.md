# 框架图搜集交接

用户已要求继续搜集现有论文框架图；任务进行中。仅本地保存、检查与 Git 提交，不推送、不发布。

## 目标与操作

为 catalog 全部论文搜集框架、方法流程或系统结构原图，按最新年份优先。允许从原论文及补充 PDF 裁切，也可从出版社、作者网站或仓库取图。每找到一张立即用 `research/figures.py add` 保存。不要重绘、错配其他论文，或把实验结果图当框架图。

先读根目录 `CONTEXT.md` 和 `AGENTS.md`，使用 caveman full 中文简洁沟通。具体维护步骤见 `research/figures.md`。新增数据保留来源、图号、作者归属、核验说明，PDF 裁切保留页码。访问失败标记 needs_access；只有核对完整正文后才可判定 no_framework。未完成检索保持 pending。

## 权威状态

- 172 篇：108 篇 verified、126 张图；41 篇 needs_access；6 篇 no_framework；17 篇 pending。
- 2026–2012 年初查完整。2020 年 4 篇有图；TMDE、Maize 重试失败已记 needs_access，不能据此判定没有图。
- 2019 年 6 篇全部有图；HSPC Generation 含总流程与 NMF 细节两张。
- 2018 年 Material-Aware Stereo、DART Tree Traits、HS-DSM Radiometry 有图；Fourier Multimodal 因出版社验证码、ResearchGate 403 需作者稿。VBRT 的 gr1–gr8 为离散几何/实验结果，未冒充框架，需全文进一步查。
- LiDAR Spatial Unmix 已读 24 页作者预印本，Fig.1–8 为数据或结果，方法是公式和 Algorithm 1–2 伪代码，无独立框架图；该结论仅针对该预印本，正式版与补充材料可复核。
- 2017 年共 7 篇有图：Catadioptric HLF、Snapshot H-LF、qVRI、HySP、SL-RCA、HSI–LiDAR Crosscalibration、FPI Band Registration。HySP 只取 Figure 1a 原理，FPI 只取 Figure 1a 地形位移几何；SL-RCA 是 Figure 1 EMEP 子模块，均明确不是完整流程。交叉标定保存 Figures 2、4。
- 2017 年 EP-OTVCA：机构 PDF 401，作者 Figure 1 已确认但下载 403。LAT：出版社 gr1–gr7 无可核验流程，需全文。UAV Forest Fusion：已查 USGS 记录及出版社多张数据/结果图，gr4 TLS 错误，需全文继续核验。不能把这些判定为全文无图。
- 2016 年 3 篇有图：Color-Mono Stereo Figure 3，Parametric HSI–LiDAR Alignment Figures 2、6，PROCOSINE Figures 1、2。两篇 PDF 裁切已保存页码；PROCOSINE 为物理模型/采集系统，图号来自出版社 grN 资源标识。
- 2016 年 Aquatic HSL：Wiley 403，Lund 机构记录无公开 PDF，同题名 ResearchGate 请求全文；公开 2018 年 EPJ 会议论文为另一篇，不能错配系统图。已记 needs_access。
- 2015 年 9 篇初查完成，8 篇有图、9 张原图：DASC Figure 3 描述子原理；Bayesian MSL Fig. 8 完整流程（arXiv 作者稿 PDF 第 17 页）；SPIM Figure 1 系统；Object HSI–DSM Figure 1 配准流程；UAV HS-DSM Figure 3.4 完整流程（作者学位论文 PDF 第 68 页、印刷页 46，同题名期刊论文收录章节，编号保持该版本）；DART Fig. 6 投影模型；Waveform–HSI Fig. 1 波形合成模块；Pushbroom Calibration Figs. 2、3 系统/几何。局部原理和几何图不声称完整流程；Elsevier 图号由 grN 标识确定，未取得正文图注时已注明。
- ITC-S3VM：DLR 100204 明示不提供全文；出版社 gr1 404、gr2–3 为数据；作者发表列表 PDF 链接仍为 ScienceDirect，ResearchGate 请求全文。已记 needs_access，不能当无框架图。
- 2014 年 6 篇初查完成：4 篇、5 张图。Arboreal MS-LiDAR Fig. 1 系统（Edinburgh 机构 PDF 第 4 页）；Urban Tree Fusion Fig. 2 完整融合分类流程（作者 PDF 第 4 页）；Boreal ITC Fig. 1 完整流程（出版社 gr1）；PRISMS Fig. 1 采集系统（NTU 机构 PDF 第 3 页）和 Fig. 4(a) 辐射几何（第 5 页，仅子图 a、不含校准曲线）。
- DART Forest Simulation：已检查 gr1–gr7，都是点云/采样区、光谱、材料分布、重建和模拟对照；TU Wien 无公开 PDF，UZH 作者发表页及 3D Vegetation Lab 链接仍指向出版社，正文 403。未把项目报告或其他论文图当原图。Multispectral Outcrop：gr1–gr6 为岩样、定标、露头和分类结果，ResearchGate 需请求全文。两篇 needs_access，不能判全文无框架。
- 2013 年两篇有图：Pigment Mixtures Figure 2 完整系统（作者 PDF 第 3 页）；DART Earth–Atmosphere Fig. 1 分层三维模型（出版社 gr1）。DART 搜索命中的 UMD 教学 PDF 返回 404，未编造全文图注。
- 2012 年 5 篇初查完成，4 篇、8 张图：3DIS 作者稿 Figures 1、2（PDF 第 1、3 页，总览和成像子系统）；CAO-2 AToMS Figs. 1、2（作者公开 PDF 第 2、3 页，平台和光谱仪）；EnMAP Figs. 1、2（出版社采集/定位几何）；Southern Alps Figs. 2、3（出版社高光谱和多光谱对照完整流程）。几何/结构图已注明不是完整算法流程。
- Fluorescence Bispectral PS：已核对 NII 作者公开 8 页 CVPR 2012 全文；Fig. 1 是分离示例，Fig. 2–3 是光谱/响应曲线，Fig. 4–7 是重建结果；第 3–5 页方法为模型方程、线性求解和观测条件，无独立系统/流程/方法几何。已记 no_framework，仅针对该作者全文版本。
- 下一步从 2011 年 pending 继续，再向更早年份推进；详细尝试记录在 figures.json。
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

## 2026-10-06：2011–2010 年框架图

累计 112 篇有图、130 张；42 needs_access、7 no_framework、11 pending。2026–2010 年初查完成；下一步从 2009 年继续。

- Color Photometric Stereo for Multicolored Surfaces：作者 ICCV PDF 第 3 页 Figure 2，保存分割假设评估子模块，明确不是完整重建框架；裁切保留所有假设及比较箭头。来源 https://bjornstenger.github.io/papers/anderson_iccv2011.pdf 。
- Virtual HSL：出版社 S0924271611000529 gr1 系统与光路，分体式光谱和测距装置；gr2–3 为曲线，不替代框架。
- Tropical Biomass：取得 https://tropicalstudies.org/carbono/nbina-15042.pdf 的 12 页期刊全文，方法 2.1–2.5、全部 Figure 1–6 已核对，只有研究区/数据/回归/地图结果，无独立框架图。
- Sierra Biomass：UNL PDF 与 ScienceDirect 正文 403。UMD 作者博士论文 https://api.drum.lib.umd.edu/server/api/core/bitstreams/71ff7674-50e1-45e0-96d1-e9f55c38b669/content 可读；第 2 章同名工作 PDF 26–61 页方法及 Fig. 2-1–2-12 为数据/结果图。第 3 章流程图属于其他工作，不使用；期刊版本未全面核验，保留 needs_access。
- Bispectral BRRDF： https://jo.dreggn.org/home/2010_bispectral.pdf 第 3 页 Figure 3，保存完整测量装置；明确不是 PCA 或渲染完整流程。
- AISA–LiDAR Species：出版社 S003442571000218X gr2 为光谱/CHM/CVP 与高度掩膜、40/41/44/41 波段分类输入流程，保存完整图；gr1 研究区、gr3–4 光谱、gr5–6 统计结果不使用。正文 403，图号依据为 gr2，本站概述注明二维分类输入及版本限制。
