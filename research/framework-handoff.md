# 框架图搜集交接

用户于 2026-10-07 要求暂停，准备交给另一会话。框架图初查已经覆盖全部现有论文，仍有缺图项；后续任务转为扩充高光谱三维视觉文献并同步查图。仅本地保存、检查与 Git 提交，不推送、不发布。

## 目标与操作

为 catalog 全部论文搜集框架、方法流程或系统结构原图，按最新年份优先。允许从原论文及补充 PDF 裁切，也可从出版社、作者网站或仓库取图。每找到一张立即用 `research/figures.py add` 保存。不要重绘、错配其他论文，或把实验结果图当框架图。

先读根目录 `CONTEXT.md` 和 `AGENTS.md`，使用 caveman full 中文简洁沟通。具体维护步骤见 `research/figures.md`。新增数据保留来源、图号、作者归属、核验说明，PDF 裁切保留页码。访问失败标记 needs_access；只有核对完整正文后才可判定 no_framework。未完成检索保持 pending。

## 权威状态

- 当前 189 篇：134 篇 verified、158 张图；45 篇 needs_access；10 篇 no_framework；0 篇 pending。以下早期年度记录为历史核查过程，最新状态以 figures.json 为准。
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
- 全部年份初查已结束；现在优先重试最新年份的 needs_access，详细尝试记录在 figures.json。
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

## 2026-10-06：2009–2008 年及 2007 年彩色光度立体

累计 115 篇有图、133 张；44 needs_access、7 no_framework、6 pending。2026–2008 初查完成，下一步 2007 Linked RTM，再推进 2004–1996。

- CAO Invasive Trees：USDA 14 页同名期刊全文 https://www.fs.usda.gov/psw/publications/hughes/psw_2008_hughes004.pdf ，第 4 页 Figure 2 完整入侵植物检测流程，含三维融合、校正、太阳–冠层光线追踪和 AutoMCU/S，已保存全部连线和输出。
- Forest Fusion 2008：作者 https://rslab.disi.unitn.it/papers/R59-TGARS-Dalponte.pdf ，第 5 页 Figure 2 完整分类系统，包括强度、高程、DEM/DCM 与高光谱预处理、特征选择和分类。
- MSCL RTM Physiology：ScienceDirect S003442570900176X 正文 403；Edinburgh、UZH 作者列表无附件，ResearchGate 仅申请全文。已看 gr1–8，gr3 含强度/深度到截面箭头和脉冲/波形曲线，但缺图注和方法，无法判断是否独立方法框架，不代替框架；保留 needs_access。
- LVIS–AVIRIS Inventory：UNH 573 条目无 Download；期刊正文入口只有摘要及 Purchase PDF。gr1/2/4–8 是研究区、波形指标和清查结果，gr3 404；保留 needs_access，不作全文无框架结论。
- Non-rigid Color PS：作者 Stenger PDF https://bjornstenger.github.io/papers/hernandez_iccv2007.pdf ，第 1 页 Figure 1 采集示意与标定板完整两子图已保存；其他 Figures 2–5 是重建/追踪展示。Carlos Hernandez 链接 web 可读但本地 406，Stenger 副本可下载。
- Linked RTM Canopy（pending）：ScienceDirect PII S0034425706003506；搜索得到同名 11 页 article-in-press https://citeseerx.ist.psu.edu/document?doi=cdb11d543e7064625c5a4861b282ba72f5306f31&repid=rep1&type=pdf ，下载 404；gr1–3_lrg.jpg 404。下一轮先找 UZH/NASA 作者全文与旧图格式，不要用同作者 SVM 林火分类会议论文代替。

## 2026-10-06：早期论文初查完成

118 篇有图、138 张；47 needs_access、7 no_framework、0 pending。所有现有论文均已初查，不等于框架图收集完成。后续优先从最新年份重试缺图，继续找作者/机构全文。

- Linked RTM：旧版 gr1.jpg、gr2.jpg、gr3.jpg 可下载，但为 ZELIG 模拟与反演结果，不用作框架；UZH 列表 PDF 只是文字、没有附件，Citeseer 404/超时。记录 needs_access。
- HYDICE Linear EO：作者 Purdue https://engineering.purdue.edu/~bethel/extmoduse.pdf 12 页原文，第 2 页 Figure 1 共线几何、第 5 页 Figure 4 共面约束已保存。两图标注为几何子模型，未声称完整算法流程。
- SENSOR：出版社 https://ars.els-cdn.com/content/image/1-s2.0-S0924271601000223-gr1.jpg 为完整三模块框架，保留原始 467×326 像素，不插值放大。作者 https://www.daniel-schlaepfer.ch/pdf/2001/ISPRS_2001_sensor.pdf 浏览工具可读 15 页、本地下载受安全策略限制返回 510；框架图源为期刊原图，图号依据 gr1 标识。
- DART 1996：HAL/IRD 作者全文 https://ird.hal.science/ird-00405222v1/file/RSE1996B_Gastellu.pdf 成功下载，27 页含 HAL 封面；PDF 第 7 页 Figure 2 完整迭代计算结构、第 4 页 Figure 1 场景单元矩阵与照明均保存。修正裁切以保留 Iteration 左侧标签，排除残缺图注。
- Raytran：JRC16024 出版页无期刊附件；RAMI 模型页所见 DPR-EC-21872.pdf 是隐私声明，非论文，不能使用。期刊 DOI/IEEE662732 入口要求机器人验证，记录 needs_access。不要拿其他 Raytran 论文或模型网站场景结果当原论文框架。
- FLIGHT：作者官网确认 https://cronfa.swansea.ac.uk/Record/cronfa16791 ，新旧域名均 SSL EOF、浏览工具超时；ResearchGate 作者公开上传页本地 403。未取得原始全文，记录 needs_access。

## 缺图重试与新增检索入口（2026-10-06）

- HoloSpec（LPR 2026）：作者 ResearchGate Figure 1 独立图页已定位，图注确认包含装置、完整四维重建流程与棱镜色散模型。公开下载及原图请求均为 403；HKU ISL 当前论文目录未列出本篇。详见 figures.json 精确图页，不能用 J. Phys. Photonics 的 Snapshot HoloSpec 替代。
- DWF（TGRS 2025）：新增精确 SSRN Delivery PDF 地址，仍为 403 HTML。未取得图像，不提高核验状态。
- Hyper-LIFT（Optica 2021）：UCLA 2023 博士论文 Multi-dimensional Optical Imaging 包含对应章节，但公开 PDF 返回 202 空内容；Europe PMC fullTextXML API 返回 500。论文稿与博士论文图号须分别核对。
- DART forest simulation（RSE 2014）：TU Wien reposiTUm 条目 20.500.12708/156727 可访问并确认 DOI、七位作者、卷页，但没有全文附件。
- Hylite（TGRS 2022）：作者仓库 workflow.png 可取得；已目视检查，README 标为工具箱总体预处理工作流，并非论文 Figure 1 的照明概念模型。未将其计为该论文框架。
- 扩展调研发现 Eradiate（GMD 2026，DOI 10.5194/gmd-19-4289-2026）：出版社全文公开，Mitsuba 3 派生光谱三维辐射传输与真实三维冠层直接相关。已即时记入 survey.json 背景候选及引文入口；GMD 场所尚未列为主收录目标，未无依据称顶刊，也未加入网站主库。大气建模是一维，不可写成完整三维大气。

本次没有获得新增论文框架图：仍为 118 篇、138 张；47 篇缺全文或原图，7 篇已核验全文无独立框架。下一轮避开已重复失败的同一入口，优先核查作者新的机构附件、准确公开图页，或继续核验专业期刊/IGARSS 待选文献。

## IGARSS 2016 全文核验与 LAT 作者入口（2026-10-06）

- 新收录 `fisher-mrf-hsi-lidar`：作者 Hacettepe 官方个人空间提供正式 IGARSS 2016 四页 PDF（2522–2525），已读方法、实验、结论并逐页目视核对 Figure 1–3；仅参数曲线和精度表，没有独立框架。标记 `no_framework` 的范围限定此会议稿；2019 IET 后续版本须另核验。
- LAT（PR 2017）：新增共同作者 KAIST CVLAB 的 J5 出版链接，PDF 指向 Elsevier reader，请求 SSL 失败。2019 arXiv 1901.00927 是博士论文，不能直接用不同题名/扩展深度模型的图当作 PR 期刊图。
- 当前 173 篇：118 篇有 138 张图、47 篇需要全文/原图、8 篇全文无独立框架。尚未完成缺图补齐和全面文献调研。

## 近红外双波段测深与作者新入口（2026-10-06）

当前 174 篇：119 篇有 139 张原图，47 needs_access、8 no_framework、0 pending。用户新要求明确：先补现有框架图，完成后再扩充文献，以后新文献同步查图。公开入口初查结束不等于补图完成。

- 已完成上轮找到的 ECCV 2016 Shape from Water，15 页作者原文与 Crossref 卷页一致；Fig. 5 作者项目透明 PNG 与 PDF 第 10 页（印刷页 644）一致，四子图全部保留。这是双波段水下测深相关研究，系统图不冒称完整算法。
- TPAMI 后续同组水下测深正式卷年为 2021，43(8):2611–2622；2020 是在线先行。出版社 staging 原始 PDF 返回 418 HTML，保持候选，不能借用会议图。
- HoloSpec 新查共同作者 web.ece.hku.hk/~elam/pub.html，只有不同 Snapshot HoloSpec 附件，没有 LPR 原稿。Hyper-LIFT 的 PubMed Fig. 2 图注确认光学系统；PMC 仍需 reCAPTCHA、Europe PMC API 500，未绕过验证，未新增图。
- MGC2N 新查作者团队全部公开 repo，并检查两个未指定论文的代码仓库 README/树；分别是毕业论文代码和点云补全，不足以归属原稿。Single-view NIR-II FMT 通过后续 IJCAI STAR-Net 原文引文确认作者与 TCI 期刊，但未获得原稿附件；STAR-Net 的 spectral 指傅里叶频率，未纳入高光谱主库，图不替代 TCI。
- PhotoniX 2024 串级单像素相机新来源已即时记入 survey.json 候选；待现有缺图补齐后核验全文与场所，不先扩充。

新证据见 sources/water-depth-and-framework-retry-2026-10-06.json。下一步继续现有缺图的其他公开作者/机构入口，优先最新年份；已失败的同一入口没有新证据时不要重复请求。

## Evo 全文补齐与公开作者图复核（2026-10-06）

174 篇：119 篇有 139 张图、46 needs_access、9 no_framework、0 pending。本轮未新增图片；解决一篇原先缺全文的正式版本核验，不等于其余框架补齐。

- Evo 3D-CNN：Finna 官方 syke.10138_576385 新记录提供 Helda bitstream dd54d326-aebc-4340-ab34-8947f69d716f。/bitstreams/.../download 返回 Angular 外壳；公开 /server/api/core/bitstreams/.../content 成功返回文件。传输为 multipart，按 MIME 边界取 file.blob，取得正式十六页 Elsevier PDF；标题、DOI、作者与原条目一致。方法 3.1–3.5、讨论和结论已读，16 页全部渲染目视核对，Figure 1–10 都是数据/结果/解释性图。网络结构只见 PDF 第 6 页 Table 3；没有独立框架图，标 no_framework，结构表不冒充图。
- Fourier Multimodal 2018：作者 Smart Imaging Lab 同篇条目配图可下载，但目视是面具 top/perspective/side views 的三子图重建结果；不计框架，仍需原稿。
- Jie Bai 的 UESTC 官方主页同时确认 HIDEDaSF、DWF、Leaf Incidence 与 RSE 2024 Independence，但均只有 IEEE/Elsevier 链接。Leaf Incidence 2021 为在线年、卷 60 对应 2022，保持网站正式年份。未请求作者、未绕过登录。
- Science China 的 scis 期刊站点按编号探测路径 SSL unexpected EOF/浏览超时，没有实际取得或确认该路径附件；不把推测 URL 当发现的全文。

证据与 PDF 哈希见 sources/evo-fulltext-and-public-author-retry-2026-10-06.json。后续已有明确图号的优先公开作者附件：HIDEDaSF Fig. 4、HoloSpec Fig. 1、Spherical Shell Fig. 2、EP-OTVCA Fig. 1、Hyper-LIFT Fig. 2；没有新入口时不重试同一拒绝页面。继续找其他原始机构存档；Helda 新公共接口可用于合法开放附件。

## Hyper-LIFT 原始系统与成像模型补齐（2026-10-06）

174 篇：120 篇有 141 张原图、45 needs_access、9 no_framework、0 pending。缺图补齐及全面文献调研仍未完成。

- Hyper-LIFT：本轮浏览工具能够取得 PMC 同名作者稿正文及方法 2.A–C，正文直接列出的 NCBI CDN 原始附件下载返回 200 JPEG。逐图目视核对 Fig. 2 完整光学系统与 Fig. 1 单子视场前向模型，均已即时保存到 catalog、figures 清单和 public。Fig. 1 明确标为采集模型，不声称完整数值反演。没有解决或绕过验证码；本地 PMC/PubMed HTML 请求仍未得到正文，原始附件路径由公开正文提供。
- PubMed 关联的 Optica Figshare 16918231 v3 公共 API 提供 52753214 原始补充 PDF，取得全文并核对封面父 DOI；PDF 第 2 页 Fig. S1 只是安装板，未冒充框架。正式补图使用论文 Fig. 1/2，不借补充结果图。
- EP–OTVCA：共同作者旧主页出版条目 27 的 code 链接实际指向 OTVCA_V3，引用不同的 2016 特征提取论文；第一作者公开 GitHub 个人站、OTVCA、OptFus 树中没有本篇原稿或图附件，不能替代 2017 融合论文。已逐条记录，仍需 Fig. 1。

证据、公开链接、原图与补充稿哈希见 sources/hyper-lift-original-images-and-rasti-code-2026-10-06.json。下一轮继续 45 篇缺图的新作者/机构入口，优先最新年份；本轮取得的 CDN 路径只能用于此篇，其他论文必须从其原始正文确认附件，不能猜测归属。

## PROSPECULAR 原始模型框架补齐（2026-10-06）

174 篇：121 篇有 142 张图、44 needs_access、9 no_framework、0 pending。现有缺图和全面文献调研仍未完成。

- 原先只检查过 gr1–gr6，不能据此前几张结果图排除后续框架。本轮作者上传的 corrected proof 全文显示 Section 4.2 明确引用 Fig. 13，图注将其定义为五模型主要特征示意。
- 已下载唯一 PII S003442572300305X 的出版社 gr13_lrg.jpg 并目视核对全图：多角度 BRF、单视角分支、五个模型、黄色反演和蓝色正向模拟箭头及参数输出全部保留。图中附带曲线没有单独冒充框架；保存的是完整模型关系与正反演总览，注明不是具体优化器步骤。
- 作者 GitHub xiaoli980/PROSPECULAR-model 的公开全树只有 MATLAB 模型、参数和数据，没有论文 PDF/原图附件。未取得实际 PDF，不将 corrected-proof 印刷页码冒称 PDF 页序。

来源、核验范围和原图哈希见 sources/prospecular-original-model-overview-2026-10-06.json。下一轮继续 44 篇缺图的新公开入口；对于出版社有图但前几张为结果的论文，先用真实全文定位后续框架图号，再下载核对，不能据图号猜测内容或借其他稿件图。

## ZORA 精确作者稿与植物所存档线索（2026-10-06）

本轮新增可续接的准确机构地址，没有新增图或状态升级。保持 174 篇、121 篇有 142 张图、44 needs_access、9 no_framework。

- MSCL 2009：OpenAlex 当前 locations 新给出 acceptedVersion `https://www.zora.uzh.ch/id/eprint/24285/36/Morsdorf_Nichol_Assessing_Forest_2009.pdf`，并关联迁移后 `https://www.zora.uzh.ch/handle/20.500.14742/45809`。PDF 和两个域名的 handle 实际请求 SSL EOF；浏览工具新 handle 也不可访问。保存确切文件名和版本范围，不把开放标签当作取得全文。
- VBRT：OpenAlex 指向植物所记录 `http://ir.ibcas.ac.cn/handle/2S10CLM1/20149`、`/20568`。实际访问第一个条目为 HTTP 502、HTTPS 浏览不可访问。出版社检索预览显示 View Open Manuscript，但正文请求 403，尚未找到公开稿具体附件。20568 是索引线索，本轮未访问；不要将其记为已请求失败。
- UAV Forest Fusion：OpenAlex 当前只有 DOI 出版条目，没有新增 PDF。检索出现同作者其他题名公开稿，不替代当前 RSE 2017 论文。

本轮实际请求与开放索引字段见 sources/zora-and-ibcas-original-fulltext-leads-2026-10-06.json。下一轮仍有其他未查作者入口，任务不处于全面阻塞；继续最新缺图论文的作者附件。若重试 ZORA 或植物所，仅在新连接证据或实际附件路径出现时进行，不重复空转同一请求。

## 点云重建 Fig. 2 与波形来源范围核查（2026-10-06）

本轮没有新增可保存原图，仍为 121 篇、142 张；44 needs_access、9 no_framework。取得可供下一步精确补图的新图页及地址。

- Robust MPC Generation 2023：作者 Xian Li 独立图页明确为 Fig. 2，方法上下文给出多波段输入、预处理、对应关系计算和三维信息恢复，输出稠密多光谱点云。真实 Download directly 提供 PNG（AS:11431281215534308@1704259235954）；本地直下返回 403 HTML，规范作者图片路径也 403。没有把错误页保存入 public。作者 HITlixian GitHub 仅列不同分类论文 TGRS_GSFF；树 409、README 404，不借其框架。
- MSL Weak Signals 2024：新定位准确 ResearchGate 378615312，页面明确没有公开全文，未发作者请求。
- Range Resolution 2023：arXiv 原始页只列 v1，管理员因当时提交者没有许可授权而移除此版本；没有可取的其他历史版本。不将该路线继续当作有效 PDF，也不据此声称正式 TGRS 论文撤稿。

实际下载地址、响应及版本结论见 sources/pointcloud-fig2-and-waveform-source-audit-2026-10-06.json。下一轮继续其他原始作者/机构入口，已定位 Fig. 2 可供合法作者稿或人工附件对照；未取得原图前不升级状态。


## 公开 DSpace 附件与作者博士论文版本核验（2026-10-06）

仍为 174 篇：121 篇有 142 张图，44 needs_access、9 no_framework。本轮取得新的作者全文证据并补充方法限制，没有把通用原理、设备照片或结果图算作完整框架。

- VI-SLAM Pushbroom 2025：imec item 68b60d13-97d1-4041-bd99-943115ef3c32 的公开 bundles API 返回 200、totalElements=1，只有 LICENSE bundle，bitstream f865a65f-23f4-4bfa-92cf-ea9413196020 是 license.txt；不是隐藏的论文 PDF。RMA 博士论文附件 11823186 返回 403。
- 新找到 Ghent 同作者博士论文公开附件 01K9X88QW351STY5Y4SWTE2NZ0.pdf，实际下载 200、29,219,378 字节、240 页。7.4 章 PDF 188–197（印刷 152–161）明确基于同名 IGARSS 2025 四作者论文，已读完整对应章节并渲染十页核对。Fig. 7.17/7.18 是通用推扫和畸变示意；7.19 设备照片；7.20 场景、7.21 原始数据、7.22 重建结果，未见完整算法图。作者章节不等于正式会议排版，因此保留 needs_access，不标正式论文 no_framework。
- 方法新证据已即时写 catalog：OpenVINS 平面估计、假设目标共面、模型计算外参、按扫描时间插值位姿、射线与平面求交、离线处理。不宣称任意非平面重建或在线部署。保留原 DOI 和正式机构卷页 8592–8596；proceedings.com TOC 的 7626 与机构卷页不一致，未据其修改。
- Aquatic Inelastic HSL 2016：作者组 mbrydegaard.com/about/ 引出 Elin Malmqvist 的 Lund 博士论文。公开 PDF Fauna_to_Flames.pdf 实际下载 200、20,032,774 字节、134 页。PDF 16 列 Paper II，119 是贡献摘要；没有附入原始七页 LPR 论文。PDF 99 Fig. 7.7 是博士论文系统图，未冒充期刊原图。仍需正式或明确同篇作者稿。
- Dimensional Dilemma 2024：冰岛大学另一语言条目和 AI4RS 作者会议列表无公开 PDF；准确 RG 383806681 为 Request full-text。未发送作者请求。

证据、PDF 哈希和版本范围见 sources/imec-bundles-and-author-theses-2026-10-06.json。下一步继续其他缺图论文的新作者/机构附件；现有章节可辅助对照正式原图，不能替换图号或扩大无图结论。任务仍未完成。


## TPAMI 作者目录与 HyLite 精确原图入口（2026-10-06）

仍为 174 篇、121 篇有 142 张图；44 needs_access、9 no_framework。本轮实际检查新作者目录及原始下载地址，没有取得可保存图片。

- Reliability-Aware PA（TPAMI 2023）：共同作者 Art Subpa-asa 的准确站点为 asubpa.github.io/profile/，根站是 404。个人出版页确有期刊同名条目，但没有原稿链接；CVF 链接位于 CVPR 2021 不同版本条目下。公开 GitHub repo 是 asubpa/profile，master 全树成功返回；只有网页、CV、兴趣图片和 pub_img 缩略图，未见 TPAMI 原稿。PA.png 无可靠期刊版本归属，不用它填期刊图。
- HyLite Illumination 2022：OpenAlex 新给出的正式 PDF 为 IEEE /ielx7/36/9633014/09507524.pdf，实际返回 418 HTML。原始 Fig. 1 页面与公开原文图注一致，明确为复杂几何场景的太阳/天空光、遮阴/阴影及斜视照明分量模型。真实 Download directly 的 AS:1053611517812736@1628211969966 PNG 返回 403 HTML，未保存成图。此前工具箱 workflow.png 仍不能替代它。
- HZDR 普通 Cms 页面不执行检索；从公开表单找到实际 !ContMan.Search.Data 查询，200 返回无结果并注明完整检索需要登录；专门 !Publications?pSelTitle=Illumination+Correction 返回 403。没有登录或声称取得机构全文。
- HoloSpec 2026：OpenAlex 200 仅提供 CC-BY DOI 位置，没有 PDF；不将 OA 元数据当成功下载。新找到同组 DH 2026 M4A.4（DOI 10.1364/DH.2026.M4A.4）不同会议论文，未借其图替代 LPR 71516。

本轮实际响应、作者仓库全树及原图地址见 sources/author-profile-and-hylite-original-downloads-2026-10-06.json。下一步继续其余缺图论文的新作者/机构全文路线；没有新附件证据时不重复上述拒绝地址。全部缺图补齐及完整文献调研仍未完成。


## FMach 受限附件、HAL notice 与最新作者入口（2026-10-07）

本轮新增原始附件定位和可排除的元数据入口；没有新增图片。174 篇、121 篇有 142 张图、44 needs_access、9 no_framework。

- ITC-S3VM：FMach 10449/26859 实际本地请求 200，公开页面列出准确 2015 ISPRS Dalponte.pdf、4.13 MB、bitstream e1dbfeaa-d71d-4ac9-e053-1705fe0a1c61，并明确仅授权用户。retrieve 实际跳转登录 HTML，不是 PDF；没有登录或发送索取请求。出版社正文片段明确 Fig. 1 是集成 HSI/ALS 的系统示意，待原稿核对。
- DART Forest 2014：HAL 精确查询命中 hal-04652613v1，submitType_s=notice，无 fileMain_s/files_s；document 实际 404。HAL 不是现成的作者全文入口。Aarhus 仅 DOI；UZH 项目页该文仍指向 ScienceDirect。DGfK 2014 同名会议稿 DOI 10.5167/uzh-98314 与 RSE 不同，不借图。
- Compact DOE 2026：新查 Wenbo Ding 的 SSR 研究页、出版列表，无同名原稿。LiteS2CR、607958 hyperspectral 的 GitHub 仓库搜索 200 零结果；准确 OpenAlex 200 只列 DOI，无 PDF。不能把其他多光谱触觉系统图当本篇图。
- PS2F2L 2026：准确方法名 GitHub 搜索 200 零结果，OpenAlex 只有 DOI，无 PDF；精确题名仍指向 IEEE 摘要。

实际来源与响应见 sources/institutional-notices-and-latest-author-leads-2026-10-07.json。下一步继续其他缺图论文尚未检查的作者/机构附件；FMach 受限文件和 HAL notice 不重复当公开全文。仍有未试入口，全部缺图与全面文献调研尚未完成。


## 双角度多光谱重建正式框架图补齐（2026-10-07）

174 篇：122 篇有 143 张图、43 needs_access、9 no_framework。本轮补到一篇正式原图。

- Dual-angle MS Stereo 2024：Springer 正式记录给出期刊文章号 182305。scis.scichina.com 的 HTTPS 连接失败，但公开 HTTP /en/2024/182305.pdf 实际返回 200 application/pdf、2,672,042 字节、15 页，无需认证。首页题名、四作者、DOI、182305:1–15 与日期均核对一致，是正式期刊排版。
- 已渲染并目视检查 PDF 第 5 页 Figure 2、图注及裁切结果：保留多光谱输入、标定、预处理、框架分解、点云输出以及投影变换/NCC/自适应 SIFT/POS 辅助匹配/稠密匹配/光谱映射六模块。即刻用 figures.py add 保存 framework-reconstruction-flowchart.png。来源链接为 Springer 正式页，实际 HTTP 下载路径明确写核验说明，没有伪称 HTTPS 下载成功。
- Spherical Shell 2025：HIT 共同作者 Gu 主页由脚本动态加载；读取其公开 teacherBody.do（POST id=1163，200、126072 字节）后才核对正文，不据静态空壳判无附件。当前公开正文无准确论文题名、PDF/file/download 链接。准确 OpenAlex 只有 DOI，无 PDF，仍 needs_access。

PDF 哈希、页码、裁切坐标与真实下载协议见 sources/dual-angle-official-framework-and-hit-author-body-2026-10-07.json。下一轮继续其余 43 篇缺图；已知官方文章号可用于合法公开期刊域附件核验，不能因 HTTPS/目录失败就排除 HTTP 公开原稿，也不能把元数据或不同稿件当补图。全面文献调研仍未完成。


## Fourier 官方补充材料与 HoloSpec 精确正文图（2026-10-07）

174 篇、122 篇有 143 张图；43 needs_access、9 no_framework。本轮没有取得可保存的框架原图，但明确两篇的准确正文目标。

- Fourier 2018：官方 Figshare 5919526 的 resource_doi 与原文匹配；Supplement 1 文件 52745228 成功下载，共 3 页。核对六作者、题名及全部正文，目视审查第 2–3 页。S2 仅高频重组局部原理，S5 是设备照片；不能替代三模态系统。S5 图注和出版社提供的 RG 正文都指向主文 Fig. 6。已找到精确 Fig.6 Download directly；真实请求返回 403 HTML。UConn Guoan Zheng 出版目录仅给 Optica 链接，没有同条目作者稿。下一次优先取正文 Fig.6，不再把 S5 照片或张紫邦目录面具结果图当框架。
- HoloSpec 2026 LPR：RG 408522709 的 Wiley 正文与 DOI、四作者一致；精确 Fig.1 含 (a) 实验系统、(b) 双次测量的四维重建流程、(c) 棱镜色散模型。Download directly 的原始 PNG 返回 403 HTML。HKU 当前 ISL publications 正文成功读取，未列准确同篇；旧 optima 根目录只是 2004 新闻，猜测 2607_LPR/LPOR 文件均 404，不能称作者提供过这些附件。2602_JPP.pdf 是不同 Snapshot HoloSpec 论文，不替代 LPR 原图。

精确 URL、补充材料哈希、真实返回状态见 sources/fourier-supplement-and-holospec-exact-original-figures-2026-10-07.json。继续其余缺图论文的作者/机构公开全文入口；两篇保留 needs_access，不以有全文文字或 OA 元数据冒充取得图片。


## Swansea 仓库全文状态与 NAU/SYSU 新入口（2026-10-07）

174 篇、122 篇有 143 张图；43 needs_access、9 no_framework。本轮新核对三篇的机构入口，未取得可保存框架图。最新条目的作者/出版社入口此前多次受限，本轮转查此前尚未读到正文的机构记录；不批量改状态。

- FLIGHT 1996：HTTP Cronfa16791 正常跳转 HTTPS，实际成功 200、65446 字节，题名、作者、DOI 与页码一致。正文明确 Full text not available from this repository，只有 DOI、没有下载附件。此前的 SSL/超时遗留现在可收窄：这个机构记录没有公开全文，不能据此判论文无框架。下一步找作者同篇副本，避免重复在此记录猜 PDF 文件名。
- UAV Forest Fusion 2017：准确 NAU Pure 记录成功 200、56786 字节；Access to Document 只有 DOI，无 PDF 或 /files 附件。USGS 记录本地亦 200、80138 字节，无附件。rse2.44 是另一篇 arid/semi-arid 融合论文，不替代本篇。
- VBRT 2018：准确 Wenkai Li 官方主页为 gp.sysu.edu.cn/node/182，索引列出本篇；实际访问 403，附件情况未知。不要把猜测 geography.sysu.edu.cn 地址或非官方镜像当作者提供的全文。植物所 20568 的 HTTP 实际 502；没有全文。
- NASA NTRS 两次实际查询未给准确原稿：Koetz 联合辐射传输长题名零结果；Anderson 2008 相关词唯一结果是 1992 IGARSS 总会议录，不能因搜索返回一条就当同篇。

真实 URL、返回码、成功机构页面审查哈希见 sources/cronfa-fulltext-absence-and-nau-sysu-framework-routes-2026-10-07.json。继续其他缺图论文新的公开作者/全文入口；不使用其他版本、照片或结果图填补缺口。


## ACFFN 作者公开附件与 NIR-II FMT 作者入口（2026-10-07）

- 石翠萍公开主页准确列 ACFFN（TGRS 2026, 64, 5510412），该条目无原稿链接。主页底层 GitHub main 完整文件树有 59 文件、49 PDF，未截断；附件包含其他融合论文，但没有同篇 ACFFN 文件，不能用其他论文图补缺。完整文件路径保存在 sources/acffn-author-attachments-and-fmt-institutional-check-2026-10-07.json。
- 从上述作者目录顺带发现两篇尚未入库的 2025 融合论文：Hierarchical Multimodal Feature Aggregation-Based Multihead Axial Attention Transformer（TGRS）和 Multilevel Feature Gated Fusion Based Spatial and Frequency Domain Attention Network（JSTARS）。已逐篇记录 survey.json 为 pending_fulltext；公开 PDF 路径可作为后续线索，尚未下载核验，不计新增网站论文。JSTARS 场所政策仍需复核，不能自动宣称顶刊。
- 本轮重新查询 Figshare resource_doi：ACFFN、PS2F2L、Compact DOE 实际 200 空数组；HIDEDaSF、HoloSpec 本次 SSL 失败，不能把本次失败说成空结果。空索引不表示论文没有图。
- Single-view NIR-II FMT 的蔡夫鸿海南大学官方页成功 200，但为 2020 年旧介绍，只列较早代表作，没有 2025 TCI 同篇或 PDF 附件。保留 needs_access。IEEE 本篇正式记录为 document 11137413；同组其他设备或 STAR-Net 不可替代。

本轮没有新原图。网站仍为 174 篇、122 篇有 143 张图；43 needs_access、9 no_framework。下一步使用尚未查过的同篇作者或机构全文入口，不重复猜已证明无附件的记录。


## 文献扩充恢复与同步补图（2026-10-07）

用户允许在现有框架全部初查后扩充文献，包含 arXiv。HS-3D-NeRF 的 v1 Figure 3 完整流程（PDF 第 3 页）与 DD-HGS 的作者版 Figure 2 已保存；两篇正式/预印本状态、版本和原始证据见 literature-handoff.md。累计 176 篇、124 篇有 145 张图；原有 43 needs_access 与 9 no_framework 未批量修改。

补充旧来源核查：NASA Michelle Hofton 官方出版列表中 Sierra Biomass 2011、LVIS–AVIRIS 2008 同篇仅链 DOI，无该条目的 PDF 附件；NTRS 精确 Sierra 题名查询 200、零结果。Seungryong 旧站底层 GitHub 仓库 API 实际 404，未得到文件树，不能外推旧作者网站无附件。详见 sources/nasa-sierra-and-lat-repository-routes-2026-10-07.json。


## 新论文同步补图（2026-10-07）

Gas Plume NeRF（arXiv 2026）保存 Figure 2 权重计算子流程；明确不是完整 NeRF 或气体层析架构。PhotoniX 2024 Cascaded Spectral ToF 保存正式版 Figure 3(a) 光谱采集系统和 Figure 6 级联概念，分别注明不包含完整 ToF 重建流程、并非所有概念维度同时实验实现。全文身份、页码、裁切与哈希已存数据文件。累计 178 篇，126 篇有 148 张图，原有 43 needs_access 与 9 no_framework 不变。

- 2026-10-07 文献扩充同步保存 LGDWT-GS v2 Figure 4（PDF 第 5 页，共享几何多光谱分支）与 MS-Splatting v2 Figure 3（第 4 页，完整流程）。两篇标多光谱相关研究；MS 项目页展示图未冒充训练框架。当前 authoritative 状态已更新为 180 篇 / 128 篇有图 / 150 张。

- 2026-10-07 扩充：HMAT（TGRS 2025）作者正式排版 Figure 1 第 3 页；HyKey（IJCARS 2026）正式 Springer Figures 2、3，分别完整网络与训练。共新增两篇、三张，当前 182 篇 / 130 篇有图 / 153 张，43 needs_access、9 no_framework、0 pending。

- 2026-10-07：Microcomb HS3D Figure 1、Supplementary Figure 1（arXiv v1 第 2、9 页），CVPR 2024 Spectro-polarimetric Dataset Figure 3(a)（第 4 页），共三张原系统/概念图。当前 184 篇 / 132 篇有图 / 156 张，43 needs_access、9 no_framework、0 pending。

## IGARSS 候选核验（2026-10-07）

新增 towards-3d-hyperclouds（IGARSS 2024, DOI 10.1109/IGARSS53475.2024.10642828）：机构原始摘要明确 LiDAR/摄影测量三维点云附加高光谱属性；仅摘要核验，不声称独立新架构。会议无资源、机构无全文、IEEE PDF HTTP 418，框架 needs_access。MaxEnt TGRS 正式全文补核验三个激光波长与流程，原 Fig.1 已在库，会议候选留待版本关系核验。LiDAR-guided unmixing 2025 已补正式 DOI 10.1109/IGARSS55030.2025.11243629 与出版社页码 7347–7351，官方稿件入口返回会议注册登录，pending_abstract。Multi-Sensor Multi-Stream 的官方程序属于 WHISPERS 2024，待场所政策与原文核验，不沿用 IGARSS 2025 搜索误导。详细证据见 sources/igarss-hypercloud-and-unmix-review-2026-10-07.json。当前 185 篇全部初查，0 pending；文献调研仍未完成。

## MS-ALS 与 IGARSS LiDAR 候选核验（2026-10-07）

新增 ISPRS JPRS 2026 的国际树种分类基准 msals-tree-benchmark 与配套数据论文 msals-species-data（通过 arXiv v2 发现，已正式发表于 ISPRS Open JPRS；标专业期刊，不冒充 JPRS）。两篇共用 MS-ALS-SPECIES，6,326 个单木段、九树种、每系统三波长，列相关研究。新增第六个数据资源入口；作者与出版社声明公开 Zenodo DOI，本次 API 超时，不声称已下载核验许可。数据论文 Figure 3(a) 标注平台架构已保存；基准 34 页机构正式 PDF 已逐页检查，独立框架未见，记 no_framework，只针对正文版本。基准存在更正稿 PII S0924271626000742，内容 403 待核验，未引用最佳精度数值。2023 两个 IGARSS LiDAR 候选补正式 DOI 和作者，仍缺原始摘要；森林胁迫会议候选关联已收录 RSE 论文，待扩展关系。2025 波形候选的 Crossref 第一搜索结果为另一作者组合的 SSRN 论文，不合并 DOI。证据见 sources/msals-and-igarss-lidar-review-2026-10-07.json。

## 新增框架核验

Fiducial HS3D Mapping 的 arXiv:2606.14534v1 六页全文已核验，Figure 1 从第 2 页裁切，完整保留双输入、几何重建、渲染、标记与配准查表输出。CMFNet 作者压缩包没有框架/PDF，仅分类图；IEEE 请求返回 418 HTML，needs_access，不能判定 no_framework。新增论文继续同步查图；权威状态仍为 figures.json。
