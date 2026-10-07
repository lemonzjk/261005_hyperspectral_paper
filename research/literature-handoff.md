# 文献扩充交接（2026-10-07）

任务已恢复，继续扩充高光谱三维视觉文献。先阅读 CONTEXT.md 与 AGENTS.md；仅本地预览、校验与提交，不推送、不发布。

## 当前基线

网站收录 195 篇；139 篇有 167 张框架图，46 篇 needs_access，10 篇 no_framework，0 篇 pending。现有框架全部初查不等于来源已穷尽；新论文同步查图，旧缺图可遇到新公开入口时重试。

## 已完成的新论文

- HS-3D-NeRF（arXiv:2602.16950v1，2026）：四作者、摘要及 16 页全文核验；固定相机拍摄旋转农产品，60 帧、204 波段，多通道 NeRF 与两阶段训练恢复三维几何和光谱。Figure 3 完整流程从 PDF 第 3 页裁切并保存。仅有预印本证据，不能标为正式顶会论文；题名 HS-3D-NeRF 与正文 HSI-SC-NeRF 的命名差异已注明。
- DD-HGS（3DV 2026）：arXiv:2505.21890v3 方法全文与作者项目核验；Crossref 出版社登记确认 DOI 10.1109/3DV69130.2026.00120、四作者、2026-03-20 与 1218–1227。按正式会议年份收录，2025 预印本不另建条目。Figure 2 作者项目页原图已保存；图版本不冒称出版社排版。代码入口仍为 Coming soon，未当成可运行仓库。

两篇原稿哈希与正式登记见 sources/hs3d-nerf-and-ddhgs-fulltext-2026-10-07.json。

## 本轮核验与剩余线索

- Gas Plume NeRF 已按 arXiv:2603.05473v1（2026）收录，四作者、在审声明和全文已核验。DIRSIG 合成 LWIR 场景，三维表示与新视角气体检测；不能外推真实气体浓度层析。Figure 2 为损失权重计算的局部方法示意（PDF 第 7 页），不是完整网络。作者代码 lanl/HSI-Nerfstudio 已核对 README，未安装复现。
- Cascaded Spectral ToF 已按 PhotoniX 2024, 5:37 正式版收录，DOI 10.1186/s43074-024-00152-5。PMC9882592 是 2023 Research Square 预印本，不重复收录。正式全文用 500–650 nm 可调脉冲光源分次照明，恢复空间/波长/ToF；约 6 cm 是采样间隔而非精度。保存 Figure 3(a) 光谱系统（第 7 页）和 Figure 6 级联概念（第 12 页），未将概念图中的所有维度说成实验实现。
- 石翠萍作者公开目录两篇 2025 HSI–LiDAR 融合候选见 survey.json，已有 PDF 文件路径，仍待全文及场所政策核验。
- IGARSS 既有扫描候选、CVF/ECVA 扫描范围及专业期刊缺口见 survey.json 与 README.md；文献覆盖未完成，不能宣称全部收集。

## 操作

逐篇核对原始摘要/全文、作者、版本、正式场所、重复条目与三维任务。H×W×B 不是三维几何；高度辅助二维分类单列。用 research/record.py 立即记录，每条显式填写真实核验日期；工具已改用当天日期，同时更新 catalog 与 survey 日期；有历史核验日期时显式传入。用 figures.py init 同步新论文，逐张 add 保存原图或 attempt 记录真实失败；只在完整全文图审查后判 no_framework。

每轮更新 CONTEXT（最多 2000 字符、60 行），运行 validate；网站代码变更运行 build 与交互检查。完成后本地提交。

本轮两篇全文哈希、正式版本关系与图号见 sources/gas-plume-nerf-and-cascaded-spectral-tof-2026-10-07.json。继续专业期刊、arXiv 与引文追溯；框架初查结束不等于文献搜集全面。

## 最新扩充

- MS-Splatting：正式 Computer Graphics Forum / Eurographics 2026，DOI 10.1111/cgf.70337、e70337，2026-04-25；方法核验 arXiv:2506.03407v2 的 29 页作者稿。RGB 加四个离散波段，标相关研究；依赖联合 SfM，不能把无需预标定解释为无需相机参数。保存第 4 页 Figure 3 全流程；项目页所谓 Pipeline 实际为 Figure 1 展示图，未混用。
- LGDWT-GS：arXiv:2601.17185v2，2026-05-04；四波段植物共享几何、伪 RGB 与 NIR 联合监督，局部及全局小波损失，标相关研究。页脚 2023 为模板残留，不冒称 IEEE 正式出版；作者仓库实际 master 分支可访问，保存第 5 页 Figure 4 多光谱框架。两篇均未运行训练复现。
- 原稿哈希、出版社登记及来源纠错见 sources/ms-splatting-and-lgdwt-fulltext-2026-10-07.json。VMV 2025 比较论文保留场所候选；GaussianHSI 2026 为二维超分已排除。继续优先连续高光谱几何、专业期刊与引文追溯，覆盖仍未完成。

## HMAT 与 HyKey 扩充

- HMAT：TGRS 2025, 63:5503817，DOI 10.1109/TGRS.2025.3533475；作者公开正式排版 17 页 PDF 核验，Figure 1 第 3 页完整网络与算子图例已保存。输入是 HSI 与高度栅格，输出二维类别图，标 fusion/相关研究。原 pending_fulltext 候选已改 included。
- HyKey：发现于 arXiv:2604.17446v1，已核对正式 IJCARS 2026, 21:1061–1069（2026-04-27），DOI 10.1007/s11548-026-03633-z，同文只收录一次；专业场所不冒称 CV 顶刊。16 波段 460–600 nm，空间–光谱特征与单应/极线监督支持真实相对位姿估计，标 registration/核心研究，不声称已输出完整稠密表面。正式 Springer Figures 2、3 原图已保存；仓库名末尾句点已纠正，未运行复现。
- 全文哈希、出版社元数据与版本关系见 sources/hmat-and-hykey-fulltext-2026-10-07.json。仍待 JSTARS 融合候选与更多专业期刊/IGARSS；HyKey 引文 HSSPN（IEEE Access 2022）和 Optics and Lasers in Engineering 光谱 SfM 保留场所/全文候选。BoNeRF-HS 目前 bioRxiv，不自动等同用户允许的 arXiv。

## 光谱全息与偏振数据扩充

- Microcomb HS3D：arXiv:2508.18219v1（2025），15 页全文及补充核验；约 1 THz 梳齿近红外幅度/相位、重聚焦和分层相位展开高度，标 holography/核心研究。页眉 Optica 不是正式发表证据。塑料实验记录 29 s；硬币 0.96 s，1.2×10^6/s 为光谱与空间分辨单元吞吐，不是三维帧率。保存 Figure 1 概念（第 2 页）与补充 Figure 1 两种完整散射系统（第 9 页）。
- Spectro-polarimetric Dataset：CVPR 2024 官方 PDF，311 张 21 波段 450–650 nm 全 Stokes，另有 2022 张 RGB Stokes；两套数据均分析 SfP 法线的波段依赖。作为 capture/相关研究，不声称新三维重建模型或三维真值。保存第 4 页 Figure 3(a) 两种采集系统。原 pending_scope 候选已纳入。
- 全文哈希见 sources/microcomb-and-spectropolar-fulltext-2026-10-07.json。OL 2026 SVSPI 摘要及正式登记已确认，但正文挑战页，保留 pending_fulltext；需要与 MOCI-PHI 平台和方法关系核验，不混用框架。

## IGARSS 候选核验（2026-10-07）

新增 towards-3d-hyperclouds（IGARSS 2024, DOI 10.1109/IGARSS53475.2024.10642828）：机构原始摘要明确 LiDAR/摄影测量三维点云附加高光谱属性；仅摘要核验，不声称独立新架构。会议无资源、机构无全文、IEEE PDF HTTP 418，框架 needs_access。MaxEnt TGRS 正式全文补核验三个激光波长与流程，原 Fig.1 已在库，会议候选留待版本关系核验。LiDAR-guided unmixing 2025 已补正式 DOI 10.1109/IGARSS55030.2025.11243629 与出版社页码 7347–7351，官方稿件入口返回会议注册登录，pending_abstract。Multi-Sensor Multi-Stream 的官方程序属于 WHISPERS 2024，待场所政策与原文核验，不沿用 IGARSS 2025 搜索误导。详细证据见 sources/igarss-hypercloud-and-unmix-review-2026-10-07.json。当前 185 篇全部初查，0 pending；文献调研仍未完成。

## MS-ALS 与 IGARSS LiDAR 候选核验（2026-10-07）

新增 ISPRS JPRS 2026 的国际树种分类基准 msals-tree-benchmark 与配套数据论文 msals-species-data（通过 arXiv v2 发现，已正式发表于 ISPRS Open JPRS；标专业期刊，不冒充 JPRS）。两篇共用 MS-ALS-SPECIES，6,326 个单木段、九树种、每系统三波长，列相关研究。新增第六个数据资源入口；作者与出版社声明公开 Zenodo DOI，本次 API 超时，不声称已下载核验许可。数据论文 Figure 3(a) 标注平台架构已保存；基准 34 页机构正式 PDF 已逐页检查，独立框架未见，记 no_framework，只针对正文版本。基准存在更正稿 PII S0924271626000742，内容 403 待核验，未引用最佳精度数值。2023 两个 IGARSS LiDAR 候选补正式 DOI 和作者，仍缺原始摘要；森林胁迫会议候选关联已收录 RSE 论文，待扩展关系。2025 波形候选的 Crossref 第一搜索结果为另一作者组合的 SSRN 论文，不合并 DOI。证据见 sources/msals-and-igarss-lidar-review-2026-10-07.json。

## CMFNet 与标记辅助三维光谱映射

- CMFNet（TGRS 2025，10.1109/TGRS.2025.3610348）：新增 fusion/相关研究。IEEE 原始摘要和作者 CMFNet.rar 代码确认 DSM/栅格输入、GLFE/CMF 双分支分类；不把 HSI 3D 卷积称为 xyz 卷积。正式全文未取得，未运行代码，不依配置选项推定全部实验。压缩包只有分类结果图，IEEE PDF/猜测图片返回 418，needs_access。证据 sources/cmfnet-author-code-review-2026-10-07.json。
- Fiducial HS3D Mapping（arXiv:2606.14534v1，六页）：新增 pointcloud/核心研究，八作者、原文与完整 Figure 1（PDF 第 2 页）核验。RGB MASt3R-SfM、ArUco 约束、俯视渲染及二维单应/深度查表赋谱；原稿首页 Ital-IA 2026 不冒称 CV 顶会，按允许的 arXiv 版本补充。仅两个离体样本，配准误差在同源重建的标记角点评估，不视为独立表面或临床验证。证据 sources/fiducial-hsi-mapping-review-2026-10-07.json。
- SpecSwin3D 与二维 GaussianHSI 原始摘要明确二维光谱恢复/超分辨，记 excluded_scope。下一步可查医学三维光谱映射引文的真实场所、RSE 辐射传输候选波段范围及余下 TGRS 原始摘要；总体检索仍未完成。

## 鬼成像三维高光谱 LiDAR 与范围核验

- Ghost HS3D LiDAR（arXiv:2604.21742v1）：新增 lidar/核心研究，十作者及 18 页正文核验。真实 ToF 深度加 1100–1250 nm 光谱，Figures 1、2 保存第 4、6 页完整原理/系统；第 1 图注跨页但图本身不跨页。脉冲 GHz 点吞吐、高精度平均时间与光谱 5800 次相关分别记录，不合成 GHz 全谱帧率。96 点二维阵列/交错扫描、无模糊范围及前置透射样品边界保留。补充文件未取得，没有正式期刊版本证据。
- RSE LAI 导数 10.1016/j.rse.2025.114785 的 HAL hal-05655059 API 无 fileMain_s；叶密度导数 10.1016/j.rse.2026.115572 登记未来 2026-11 卷 345、115572，无 published-online。均 pending_fulltext_scope，不能据场所/题名纳入，也不能推断全文无框架。
- CVF ICCV 2025 双相机多光谱去马赛克 excluded_scope；Nature Communications 臭氧层析（2026 卷，2025 在线）原始全文明确二维水平分布，background_scope。证据 sources/ghost-hs3d-lidar-review-2026-10-07.json 与 sources/rtm-and-lidar-scope-review-2026-10-07.json。继续目标场所/引文扫描及原始全文核验，不声明全部覆盖。

## FRGFNet 与 FusDreamer 融合候选

- FRGFNet（TGRS 2025，10.1109/TGRS.2025.3562246）：IEEE 原始摘要、正式元数据五作者核验，FRE 重建嵌入/跨模态注意力；Houston 2013、Augsburg、MUUFL，归 fusion/相关研究。作者主页写 2024 不替代正式卷年。IEEE PDF 418、准确仓库零命中、OpenAlex 无 PDF，框架 needs_access。具体输入通道与实验划分待全文，不称官方全文已读。
- FusDreamer（TGRS 2025，10.1109/TGRS.2025.3554862）：作者公開 14 页正式 IEEE 排版、Crossref、代码 README 核验，HSI 与 LiDAR 为 M×N 栅格。LaMG 潜空间扩散、OK-CP 属性文本/CLIP、MuCO 多任务约束用于少标注分类，归相关研究；“世界模型”不是三维动态场景模拟。完整 Figure 1 位于 PDF 第 3 页，已裁切保存输入、全部模块及图例。代码当前已发布，未运行训练。证据 sources/frgfnet-fusdreamer-review-2026-10-07.json。
- UCAFNet 的二手摘要不是原始方法证据，仍 pending_abstract。继续其他 TGRS 原始摘要和框架、目标场所逐年目录；现有扩充不等于全部论文已收集。

## LiDAR 引导波段选择补充（2026-10-07）

新增 LiDAR-Guided Band Selection（TGRS 2024，10.1109/TGRS.2024.3389651），原始元数据与 15 页作者稿核验。双分支自注意力与 LiDAR query 引导 HSI 波段选择，Houston 2013/Trento/MUUFL 的二维高度辅助分类，归相关研究。PDF 第 4 页完整 Figures 2、3 已保存；作者仓库示意图布局不同，未冒充相同 PDF 图。证据见 sources/lidar-guided-band-selection-review-2026-10-07.json。TMCFN 作者代码已查且无 PDF/图片，正文仍待核验；详见 sources/tmcfn-author-code-review-2026-10-07.json。调研尚未完成。

## 三维多光谱训练策略与 CVF 同词排除（2026-10-07）

新增 Towards Multi-Spectral GS（VMV 2025，arXiv:2509.00989v1，10.2312/vmv.20251237），核验 9 页正式全文与 17 页含补充作者稿；保存正式 PDF 第 1 页 Figure 1 和第 4 页 Figure 3。RGB 加红/绿/红边/NIR，相关三维多光谱补充阅读，VMV 不标目标顶会。与 MS-Splatting 是作者明确区分、共享代码的两篇；本篇是球谐表示与 Separate/Split/Joint 训练策略，不借用神经颜色表示。证据见 sources/towards-multispectral-gs-review-2026-10-07.json。另逐篇核验并排除 CVPR 2014 六篇图谱聚类/图匹配同词候选；原始摘要与决定见 sources/cvpr2014-graph-spectrum-scope-review-2026-10-07.json。CVF 其他候选与专业期刊追溯仍待继续。

## CVPR 原始摘要筛查与热辐射测距（2026-10-07）

逐篇核验 CVPR 2014–2017、2021–2022 的 43 篇待审候选，30 篇排除、12 篇保留背景、1 篇收录；四篇采集/扩频歧义论文另读完整 PDF。证据见 sources/cvpr2014-2017-2021-2022-scope-review-2026-10-07.json。新增 Shape from Thermal Radiation（CVPR 2022，10.1109/CVPR52688.2022.01233），11 页原始全文核验，保存 PDF 第 1 页 Figure 1 及第 7 页完整 Figure 5(a,b)。空气波长相关吸收实现深度/温度/灰体发射率估计，三离散 LWIR 波段，归相关几何研究。需已知空气衰减、灰体与无其他热源反射，滤轮顺序采集，不能称单帧全谱或任意发射率谱。详情证据见 sources/shape-thermal-radiation-review-2026-10-07.json。CVPR 仍有 103 篇待审，ICCV/ECCV 与专业期刊也未完成。

## CVPR 2023 原始摘要筛查（2026-10-07）

逐篇核验余下十篇 CVPR 2023 候选官方摘要：八篇 excluded_scope，MethaneMapper 与宽波段照明设计两篇保留 background_scope；本轮没有新增网站论文。CASSI 的 3D spectral cube 为 H×W×B，B 不是 xyz 深度；Meta-Explore/BASiS 的 spectral 分别是 Fourier/图特征空间。RGB–热红外视频分割仅有时间上下文，不能称三维光谱场景理解。两篇背景的摘要未定义几何任务，结论仅限摘要级证据，后续新全文证据允许复核。完整官方摘要、来源、状态与逐篇理由见 sources/cvpr2023-scope-review-2026-10-07.json。CVPR 待审候选仍有 87 篇；ICCV/ECCV、专业期刊与引文追溯仍未完成。

## CVPR 2024 原始摘要与轴定义核验（2026-10-07）

逐篇复核余下十六篇候选，均 excluded_scope；未新增网站论文。In2SET 的 11 页与 S2MAE 的 10 页官方全文另核对输入定义、方法及实验：其 3D 为两空间维加光谱，不是 xyz。FastMAC 的几何配准是真的，但 spectral 为图信号频率；FINER 与 Batch Normalization 的 spectral bias 是坐标网络频率，不是波长场景。详细摘要、理由、两份原稿哈希与定义线索见 sources/cvpr2024-scope-review-2026-10-07.json。CVPR 尚有 71 篇待审；全文追溯另发现 Simultaneous Depth and Spectral Imaging With a Cross-Modal Stereo System，TCSVT 28(3):812–817（2018），DOI 10.1109/TCSVT.2016.2616374。In2SET 引文写 2016，作者机构记录为正式卷年 2018，版本/全文/框架仍待核验，不据引文年份直接入库。

## CVPR 2025 原始摘要与事件约束核验（2026-10-07）

余下十八篇候选逐篇核验：十五篇 excluded_scope，照明谱估计、自动光谱校准及 Active Hyperspectral Imaging 三篇 background_scope，没有新增网站论文。另查 HyperFree 11 页和 Active Hyperspectral Imaging 13 页官方 PDF：前者主实验五任务及扩展三任务为二维光谱处理，后者 §3.2–3.3 的重建目标是逐像素 S_xy(λ)，未知量为 M 维光谱向量，其几何约束指零光谱向量的正交关系，不是深度/法线恢复；不能因相关工作引用 EventPS/Dispersed Structured Light 就借用这些三维能力。逐篇官方摘要、理由、原稿哈希及方法证据见 sources/cvpr2025-scope-review-2026-10-07.json。CVPR 尚有 53 篇待审；其他场所与引文追溯仍未完成。

## CVPR 2018/2019 与 2026 聚焦核验（2026-10-07）

复核剩余 2018 年五篇、2019 年十二篇及 2026 年七篇：十五篇 excluded_scope，九篇采集/材质/校准背景，无新增网站论文。Spectrum from Defocus 的焦栈用于恢复 H×W×C，物距仅在景深范围测试；MetaSpectra+ 输出 HSI+HDR/偏振而非深度；SG-NLF 的 spectral embedding 是 Laplace–Beltrami 特征函数，不是光学波长。三篇各 11 页官方 PDF 的方法、实验与定义已核对，哈希保存；从引文发现 OL 2025 SMLA 真实多光谱深度系统，登记 pending_fulltext；ECCV 2012 彩色孔径测深登记 background_scope，非高光谱重建。官方摘要、逐篇理由、原稿证据与新引文见 sources/cvpr2018-2019-2026-focused-scope-review-2026-10-07.json。CVPR 既有候选剩余 29 篇（均 2026）；仅关键词命中候选筛查，不能据此宣称整个 CVPR 语义覆盖完毕。其他场所与期刊追溯仍未完成。
