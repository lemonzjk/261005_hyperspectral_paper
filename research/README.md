# 文献调研

检索截止日期：2026-10-07。网站当前收录 192 篇论文、6 个资源入口；调研仍在进行，不声明已经覆盖全部论文。

## 范围与场所

收录真实三维空间与光谱联合采集、重建、表示、渲染、材料分析和理解。多光谱光度立体属于相关研究；HSI 与 LiDAR/DSM 高度辅助的二维分类单列为相关方向。仅因使用 3D CNN 或 H×W×B 数据立方体的二维光谱处理不属于三维视觉。

目标场所同时覆盖视觉、图形学、遥感与光学。包括 CVPR、ICCV、ECCV、SIGGRAPH、TOG、TPAMI、IJCV、TGRS、IGARSS、ISPRS JPRS、RSE、TCI、Laser & Photonics Reviews、Optica、Nature Photonics、Nature Communications 等。完整清单与领域期刊政策见 `survey.json`。清单是检索优先级，不是统一的期刊等级认证。预印本与其他专业场所作为补充阅读，不能冒充已正式发表的顶会顶刊论文。

## 数据与证据

- `../src/data/catalog.json`：网站使用的逐篇论文笔记和数据资源入口。输入、输出、机制及阅读边界与原始来源并存。
- `survey.json`：候选、核验状态、查询记录与检索缺口。`pending_scope` 只代表关键词命中，`pending_abstract` 代表需要核验，不会自动进入网站。
- `sources/`：CVF 官方目录扫描清单、出版社存入 Crossref 的元数据快照及作者公开资料。Crossref 元数据用于核对题名、作者、年份和 DOI，不能替代方法核验。
- `record.py`：从标准输入接收 JSON 对象或数组；每篇分别写入论文库与调研记录，避免只留在对话中。运行：`python research/record.py < entries.json`。
- `discover_cvfpapers.py`：扫描官方 CVF 目录并记录关键词候选；需要逐篇阅读摘要筛选。失败页面在清单内保留，不计为已检索。

## 当前缺口

CVF 已扫描大部分 CVPR 2013–2026、ICCV 2013–2025 目录；旧目录通过按日页面补扫，CVPR 2020 的 1,466 个题名已补齐，5 个关键词命中均经官方摘要核验排除。ECVA 官方 2018、2020、2022、2024 四届共 6,166 个题名已完成关键词扫描；此前 ECCV 目录与 2026 需继续补查。大量标题中的 spectral 指图拉普拉斯谱、频域或其他概念，尚待筛除。SIGGRAPH、遥感和光学期刊目前以主题检索为主，尚未完成逐年检索、引文追溯与全部候选核验。跨模态配准已补无人机波段配准与近距离多光谱三维配准，定位方向仍待扩展。IEEE 部分页面拒绝访问，相关候选保留待原始摘要核验状态。

网站的 13 个方向是便于阅读的主分类，存在交叉，不代表领域只有这些方向。会议与期刊扩展版本分别标注，不能把它们当作独立方法重复统计。

`discover_ecva.py` 记录 ECVA 官方目录候选；`retry_cvf.py` 通过旧版按日页面补扫失败年份。两者仅登记发现，不自动收录。Python 检索脚本依赖 `beautifulsoup4`，元数据采集另使用 `requests`。

已核验片上偏振高光谱传感器的真实表面法线与高度恢复（Nature Communications 2026），以及三维光谱单分子定位（Optica 2024，相关研究）。补充 TGRS 稀疏低秩融合、ISPRS JPRS 全波形体素融合与 Information Fusion 对抗/层级注意力融合，均按高度辅助分类标注；不能据此声称真实三维重建文献已穷尽。

进一步补充三维辐射传输反演（DRTM、3D-Diff）、高光谱 DSM 的角度辐射理论及近邻目标高光谱 LiDAR 波形分解。PRISMS、三波长露头扫描、傅里叶彩色三维成像和零空间光谱反演按输入/输出差异标为相关研究。隧道扫描候选当前只核验到作者预印本，稿内 TGRS 投稿编号不能证明已正式发表于该刊。

新增三维光谱体成像方向：CVPR 2021 与 TPAMI 2023 光声恢复工作明确使用 x、y、z、波长四维数据；期刊扩展不计为独立方法。补充 CVPR 2012 荧光光度立体、2015 DASC、2018 材料感知 RGB–NIR 立体、2021 事件双光谱水下形状，以及 ICCV 2025 直接/间接光传输分离。后者仅提供与距离相关的周期图，不声称度量深度恢复。联合图的谱对应论文排除；固定视角荧光再照明留作背景引文。

已补 TOG 双光谱荧光 BRRDF、Nature Communications 三维温度感知、BS-IDT、qVRI、RSPT，以及 Light: Science & Applications FBS-IDT。三维光谱体包含空间深度层与逐体素光谱；不同于二维 H×W×B。13 个 CVF 候选逐篇阅读原始摘要，9 个图谱/频域或非光谱题名排除，4 个二维光谱材料/引导去噪工作留背景；证据见 `sources/cvf-3d-scope-review-2026-10-06.json`。Nature Methods HySP 及 Optica 多色光场已核验收录；ACS Photonics、Chemical & Biomedical Imaging 等保留领域候选，不能仅凭出版社或题名标顶刊。

进一步补充 HySP（Nature Methods 2017）、高光谱光片（Nature Communications 2015）、HR-FLFM（Optica 2021，多色相关研究）、八通道多光谱体成像（Nature Photonics 2025，相关研究）及 Photonics Research 2026 DOE–结构光联合成像。HySP 原始补充表 3 直接证明 xyzλt 五维；Photonics Research 论文为接受后 Early Posting，卷期未知，作者姓名保留官方元数据原样。Nature Methods 作为三维光谱显微方法的重要目标期刊纳入检索，不能据此扩大到所有二维生物光谱图像。

本轮沿光谱点云引文链补入 9 篇：Brell 2016 几何配准、2017 辐射交叉标定，Shen 2020 冠层垂直性状，TGRS 2022 超体素本征点云与 DSM 辅助本征分解，2023 阴影恢复及归一化超体素分割，RSE 2024 HPProj，以及 ISPRS JPRS 2025 GrowSP-ForMS。DSM 辅助二维本征输出、Titan 三波段超体素与 GrowSP-ForMS 三波段叶木分离标为相关研究；高光谱点云融合与物理标定按实际输入输出记录。正式卷年份与在线年份分开核验。相关候选的后续核验见下文。

新增 FGI-EMIT（ISPRS JPRS 2026）、AACB（RSE 2024）、GCNAS、球壳遮挡检测、S4DR-Net、五波段图像点云重建（TGRS）以及 PiV-AHPC（Science China Information Sciences 2026）。球壳原文确认 Houston 每点 48 波段，归入核心三维理解；三波段 LiDAR 与五波段影像工作标相关研究。FGI-EMIT 数据元数据确认 CC BY-NC-SA 4.0，19 个样地固定为 13 训练 / 6 测试；验证样地按作者建议从训练集选取。

补充三次 Crossref 题名主题检索，每次仅前 100 条相关性结果，按目标场所与光谱三维题名筛选新增 5 个待核验候选；清单见 `sources/pointcloud-crossref-topic-scan-2026-10-06.json`，不代表完整期刊检索。GSFF 已核验作者 v2 全文及正式 DOI，四作者版本对应，两个影像重建点云均为 10 波段；以 2026 TGRS 在线先行版本收录。CVF Spectral Informed Mamba 原摘要明确为图拉普拉斯谱，排除；SG-NLF 的 spectral prior 是否为波长信息尚未证明，继续待范围核验。Science China Information Sciences 纳入信息科学重要期刊检索，场所清单不是统一等级认证。

沿点云引文补充 9 篇：HIDEDaSF 边缘滤波、MaxEnt 邻域选择、PS-UDA 跨场景迁移、MGC2N、GSFF、非对称双角度多光谱立体、EMPC 长尾分类、MGSVM FS 多模态 LiDAR 特征选择、优化 CNN 的 LiDAR 栅格分类。后者明确将三维点云转为二维图像，归高度辅助融合；MGSVM FS 的 28 通道含距离、反射率和偏振，材料实验规模为 30 件 / 4 类，不外推野外性能。HyperPointFormer 和 MKGSL 正式发表于 JSTARS，DSGCN 专业工作发表于 Remote Sensing，保留专业背景候选，不误标 TGRS。

新增 SCSQ-Net（TGRS 2024，弱监督多光谱点云）、TMDE（TGRS 2020，张量判别分类）与 DWF（TGRS 2025，全波形高光谱时延校正/分解）。TMDE 在线年 2019 与正式卷年 2020 分开；DWF 正式六作者与早期五作者稿分开，Wang Li 和 Li Wang 不合并。MIWD 原始摘要和正式元数据现已核验并收录；叶片入射角校正 DOI 已确认，按 2022 年正式卷期收录。

沿全波形 LiDAR 与光谱解混引文链新增 7 篇：MIWD（TGRS 2022）、MCNS（ISPRS JPRS 2024）、四波长树木参数反演（TGRS 2014）、LiDAR 引导空间正则解混（TGRS 2018）、IISU（TIP 2020）、MSL-WSE（TGRS 2024）、MUSF-GEM（Information Fusion 2026）。四波长和多光谱弱回波标相关研究；DSM 辅助二维丰度恢复与真正三维点云材料理解区分。MCNS 依赖光谱相近的邻域单回波，验证含 LESS 与地面实测，未称机载验证。MSL-WSE 目前仅核验原始摘要，具体实现待全文。作者原稿、数据及代码入口保留在条目来源中。

Palmer 扫描标定、BGE-ICMER、真彩三维 LiDAR、混合几何辐射校正、SPAD 三维反演及水下真彩点云校正保存为专业背景候选。BGE-ICMER 为 Remote Sensing 2026，当前依据 LESS 仿真并依赖地面参考；不误标为 TGRS 或野外实测成果。下一步继续补早期仪器与波形工作的原始全文、IGARSS 版本对应关系、各目标期刊逐年扫描。

补充早期 DART、森林辐射传输与 TSP 多光谱 LiDAR 解混，并沿渲染引文链核验 LESS（2019）、DART-Lux（2022）、混合大气顶模型（2021）、完整蒙特卡洛大气扩展（2024）、可微 DART（2024）及森林单树库数字孪生（2023）。后者作者接收稿确认 TLS 显式森林与 32 波段 UAV 影像比较，标核心；四波段大气案例和仅导数传播工作标相关。不得把可微前向模型写成已验证的参数反演，或把渲染引擎写成几何重建。证据见 `sources/rtm-foundations-review-2026-10-06.json`。后续继续查早期主动高光谱系统、森林光谱反演和各目标场所逐年目录。

进一步核验 FLIGHT（TGRS 1996，高分辨率光谱实测比较）、Raytran（TGRS 1998，通用光传播相关阅读）、DART–DLAmaize（RSE 2025，机载高光谱作物性状反演）、单树邻近约束反演（RSE 2025，多光谱相关阅读）及 AHSL 森林胁迫（RSE 2023，仿真点云）。林下土壤 HSL 为既有条目，复核后补充 SOC/全氮回归限制，不重复新增。证据见 `sources/vegetation-3d-spectral-review-2026-10-06.json`。Miraglio 的 Remote Sensing 2020 稀疏林反演作为专业背景保留，已发现生化验证数据勘误，后续使用须以更正版本为准。下一步继续早期森林反演与树冠融合引文、目标场所逐年扫描。

沿森林融合引文补充八篇 RSE/ISPRS JPRS 相关阅读：AISA–LiDAR 树种分布（2010）、LVIS–AVIRIS 清查（2008）、热带生物量比较（2011）、南阿尔卑斯分类（2012）、北方树冠划分（2014）、ITC-S3VM（2015）、Evo 3D-CNN（2021）与 WST-Ncut（2022）。Evo 的 3D 卷积维度为 H×W×波段，LiDAR CHM 用于检测/匹配；不称三维空间 CNN。热带生物量实验中融合没有超过两高度变量模型，保留这一结果及采集时段限制。WST-Ncut 为树冠结构/光谱/纹理融合，逐点算法范围待全文。证据见 `sources/forest-fusion-citation-review-2026-10-06.json`。后续查 Sierra Nevada 融合、生态方法期刊树木碳制图、各目标场所逐年目录；新增相关研究不代表核心几何方向已穷尽。

核验跨光谱立体与摄影测量，新增 RGB-MS Matching（CVPR 2022）、F-cycleGAN Stereo（AAAI 2019）、LAT（PR 2017）、HVLL HDSM（ISPRS JPRS 2019）、对象 HSI–DSM 配准（2015）与近景推扫几何标定（2015）。前两项多光谱/跨光谱工作、LAT 与二维轮廓配准标相关；HVLL 和直接面向三维光谱映射的高光谱标定标核心，标定应用前景与实际验证区分。HVLL 连续树冠偏差较大、阴影地面/冠隙更优的权衡保留。RGB-MS 数据资源新增，机构仓库许可 CC BY-NC 4.0，不声称已下载完整数据。

VISAPP 2024 双相机融合已解决场所待核验；ISPRS Archives、JOSA A、JSTARS 全景立体与 Optics and Lasers in Engineering 2026 直接三维重建保留专业背景，正式卷年与在线年分开。DSC 作者全文确认免训练手工描述子及通用对应评测，先留范围背景。证据见 `sources/stereo-photogrammetry-review-2026-10-06.json`。下一步继续核心几何引文与目标期刊逐年扫描，补完整算法核验；当前清单仍非全面覆盖。

沿三维光谱几何与光学体成像补充 7 篇：SENSOR（ISPRS JPRS 2001）、PROSPECULAR（RSE 2023）、HYDICE 直线定向（ISPRS JPRS 2004）、单视角 NIR-II FMT（TCI 2025）、EnMAP 几何仿真（ISPRS JPRS 2012）、水体非弹性高光谱 LiDAR（Laser & Photonics Reviews 2016）及 HoloSpec（2026 在线先行）。叶片 BRDF、推扫定向和波段配准标相关；真实距离、空间体分布及全息四维恢复按具体输出标核心。SENSOR 以 DEM 地形为主，不冒充任意三维体渲染；NIR-II FMT 仅仿真与体模验证；HoloSpec 需要两幅快照，430 个计算通道不等于独立谱线分辨数，谱峰间距的 Crossref 公式缺失未猜填。TCI 与 Laser & Photonics Reviews 纳入计算成像/光子学重要期刊定向检索，场所清单仍不是统一等级认证。

同时记录 6 篇范围或专业背景：折射率与吸收 SPOT（Physical Review Applied）、中子高光谱断层、Journal of Physics: Photonics 单快照 HoloSpec、Nature Communications 光谱波前与 Optics Express HS-ODT；另排除一篇仅 x、y、波长维度的 CTIS。PRA 折射率工作保留 2023-04-18 方程勘误；光谱波前工作在线 2025、正式卷 2026，波前不自动等于 xyz 物体重建。单快照颗粒分类与 LPR 双快照重建分开，不能混用作者、曝光次数或 F1/几何指标。证据见 `sources/geometry-spectral-tomography-review-2026-10-06.json`。后续继续完整算法、光学断层与几何标定引文及目标期刊逐年检索；清单尚非全面覆盖。

本轮补入 9 篇：Nature Photonics 多光谱反射矩阵、Nature Communications 双色 Alpha-LFM 和体反射矩阵；TOG 半透明材料光谱参数测量与五波段颜料复现；RSE Sierra 生物量/胁迫、CAO-2 AToMS、CAO–AVIRIS 入侵树种和银杏三维黄酮指数。CAO-2 属于真实三维结构与成像光谱的联合采集，1064 nm 双激光本身不是高光谱 LiDAR；银杏点云性状仍受被动光谱冠层表面观测限制。显微结构恢复没有逐体素材料光谱时标相关研究；均匀材料参数空间的“3D”不等于 xyz 几何。

证据与正式元数据保存在 `sources/spectral-material-ecosystem-review-2026-10-06.json`。TOG 2017 Spectral Tracking 原文明确所有实验仅 RGB，留体渲染背景；TOG 2013 Material Dictionaries 的三个 RGB 激光波长反演也留背景。CGF 2020 材料光学采集综述提供颜色/波长分类和引文链，CAO 2007 原始系统发表于 Journal of Applied Remote Sensing，ISRSE 2011 模型参数研究为会议稿，均单列背景，不误标 RSE/ISPRS JPRS。下一步核验 RSE 2024 小麦三维光合性状，继续查目标场所逐年目录及相关引文链。

本轮新增小麦三维光合性状（RSE 2024，多光谱相关）、Uis 锂矿露头 hypercloud（RSE 2022）、Hylite 三维露头光照校正（TGRS 2022）及视觉惯性 SLAM 辅助高光谱推扫重建（IGARSS 2025）。Uis 全文明确使用 SIFT/PnP/RANSAC 将光谱反投影至摄影测量点云，实验室 LWIR 不可写成野外 LWIR。Hylite 正式期刊全文经公开镜像与作者代码文档核验，IEEE 直接 PDF 请求失败。SLAM 原始机构摘要证明实际使用三维几何和轨迹，但手持验证不等于完成无人机战场测试。证据见 `sources/outcrop-plant-slam-review-2026-10-06.json`。

`discover_igarss.py` 新增官方接收目录题名扫描：2023 年 2,859 个、2025 年 2,990 个题名，分别得到 17、20 个关键词命中；其中 2 个已入库，其余 35 个先记待范围核验。完整题名与来源哈希见 `sources/igarss-title-scan-2026-10-06.json`。接收目录不等于最终正式发表证明，关键词漏检与误检仍需逐篇阅读解决，其他年份未覆盖。运行：`python research/discover_igarss.py 2023 2025`；依赖 requests 与 beautifulsoup4。

已区分 IJRS 2013 近距离地质流程、Frontiers 2021 DHPC、Remote Sensing 2013 DART 小波反演和 ISPRS Archives 2016 综述的真实场所；它们不因被顶刊引用就算顶刊。ISPRS JPRS 2026 ITCMNet 仅用 RGB，排除；分层 SIF 与 SCOPE 2.0 工作暂留范围背景。OSTI 检索到的 PDF 是引用目标 SIF 论文的另一项研究，记录检索错配，不用于提升核验等级。下一步优先读新增 IGARSS 光谱点云、波形和几何候选，核对其 DOI、原始摘要及与期刊版本的关系。

本轮核验并逐篇补入 IGARSS 2016 的 Semantic Segmentation of Hyperspectral Images with the Fusion of LiDAR Data（Aytaylan、Yuksel）。作者公开四页正式会议全文与 Crossref 卷页、DOI 交叉确认；Fisher Vector 强度/高程 unary 和三维邻域 pairwise 服务于二维分类，归入相关研究。论文明确 pairwise 修改未带来显著额外提升，不能将整体增益全部归给三维距离。四页全部图表已目视检查，没有独立框架图；不能用 2019 IET 后续版本图替代。核验与原始 PDF 校验和见 `sources/semantic-hsi-lidar-review-2026-10-06.json`。

IGARSS 2023 的 Coupled Graph Convolution Network for Cross-Scene Multispectral Point Cloud Classification 已补齐正式 DOI 10.1109/IGARSS52108.2023.10281816、四作者与 6258–6261 页，官方详情仅题名和报告信息，Crossref 无摘要。继续待原始摘要核验，不因二级索引摘要或接收目录直接收录。IGARSS 2025 Hypermesh 官方作者列表与 SPIE 同题论文不同，暂不合并两个场所或复用 SPIE DOI。

补入已在上轮发现、已完成全文核验的 ECCV 2016 Shape from Water，并同步保存作者 Fig. 5 系统原图。两个近红外波段用于真实水下深度，标相关，不称高光谱采集；TPAMI 后续版 2020 在线先行与 2021 正式卷年分开，期刊候选图仍待取得。新增 PhotoniX 串级单像素光谱/飞行时间候选只记录、不展开；IJCAI STAR-Net 已读正式全文，其 spectral 指傅里叶频率，排除主库。用户要求现有补图优先，完成后继续扩充，每篇新增论文同时找框架图。证据见 `sources/water-depth-and-framework-retry-2026-10-06.json`。

核验 IGARSS 2024 Towards 3D Hyperspectral Imaging 的会议程序、作者机构原始摘要与出版社 Crossref，补入真实三维 hyperclouds 路线；核验等级仅为机构摘要，未推断具体网络或独立方法创新。全文入口受限，框架记 needs_access。IGARSS 2025 LiDAR-guided fast multimodal unmixing 已核对正式 DOI 和 7347–7351 页，官方全文入口实际需要会议注册登录，继续待摘要。MaxEnt TGRS 条目已有图，补核验正式全文及三波长输入；会议候选不重复新增，待版本关系核验。新发现 Multi-Sensor Multi-Stream 论文的真实场所为 WHISPERS 2024，而非 IGARSS 2025；专业场所与原始摘要仍待核验。证据见 sources/igarss-hypercloud-and-unmix-review-2026-10-07.json。

## MS-ALS 与 IGARSS LiDAR 候选核验（2026-10-07）

新增 ISPRS JPRS 2026 的国际树种分类基准 msals-tree-benchmark 与配套数据论文 msals-species-data（通过 arXiv v2 发现，已正式发表于 ISPRS Open JPRS；标专业期刊，不冒充 JPRS）。两篇共用 MS-ALS-SPECIES，6,326 个单木段、九树种、每系统三波长，列相关研究。新增第六个数据资源入口；作者与出版社声明公开 Zenodo DOI，本次 API 超时，不声称已下载核验许可。数据论文 Figure 3(a) 标注平台架构已保存；基准 34 页机构正式 PDF 已逐页检查，独立框架未见，记 no_framework，只针对正文版本。基准存在更正稿 PII S0924271626000742，内容 403 待核验，未引用最佳精度数值。2023 两个 IGARSS LiDAR 候选补正式 DOI 和作者，仍缺原始摘要；森林胁迫会议候选关联已收录 RSE 论文，待扩展关系。2025 波形候选的 Crossref 第一搜索结果为另一作者组合的 SSRN 论文，不合并 DOI。证据见 sources/msals-and-igarss-lidar-review-2026-10-07.json。

补充 CMFNet（TGRS 2025）和 Fiducial HS3D Mapping（arXiv 2026）。CMFNet 的 IEEE 原始摘要及作者公开代码确认多尺度、GLFE、CMF 融合；读取 DSM/栅格，3D 卷积沿波段与二维邻域，归相关研究。作者压缩包没有框架或论文 PDF，出版社返回 HTTP 418，保留 needs_access。没有把多个其他领域同名 CMFNet 的图拿来替代。

Fiducial HS3D Mapping 六页全文明确 RGB SfM、标记约束、正交渲染与二维单应/xyz 查表，输出真实三维光谱表面点云，归核心研究。保存 PDF 第 2 页完整 Figure 1。原稿首页注明 Ital-IA 2026 全国会议，按用户允许的 arXiv 版本补充，不称顶会；两个离体组织、同源重建真值和俯视投影限制保留。证据见 `sources/cmfnet-author-code-review-2026-10-07.json`、`sources/fiducial-hsi-mapping-review-2026-10-07.json`。SpecSwin3D 和二维 GaussianHSI 经原始摘要核验排除，不能因 3D/高斯题名进入三维几何清单。后续仍需原始全文核验的 TGRS 融合、RSE 三维辐射传输候选及目标场所目录补扫；清单尚未全面覆盖。

新增 Ghost HS3D LiDAR（arXiv:2604.21742v1）：18 页正文验证真实 ToF 深度与 1100–1250 nm 光谱，保存完整原理/系统 Figures 1、2（PDF 第 4、6 页）。60.5 MHz / 1.8 GHz 为约 30 点/线脉冲吞吐，6044 次平均测距实际 10 kHz，材料光谱展示用 5800 次随机实现；不能宣称 GHz 独立全谱三维帧率。0.02 mm 为最强回波 Allan 偏差，不是全部点绝对误差；实验为近距离字母目标及前置化学透射样品。补充材料提及但未取得，现有证据仅 arXiv 原稿。

引文追溯核验 Nature Communications 臭氧层析正文，明确演示二维水平气体分布，保留背景而非三维体成像主条目；CVF 的双相机多光谱去马赛克按原始摘要排除。RSE 两篇冠层导数已补正式元数据：2025 LAI 论文 HAL API 无全文附件，2026 叶密度论文登记未来 11 月卷期但没有在线日期；光谱波段/实验仍待全文，不强行收录。证据见 `sources/ghost-hs3d-lidar-review-2026-10-07.json` 与 `sources/rtm-and-lidar-scope-review-2026-10-07.json`。目标目录与原始全文缺口仍未全部解决。

新增 FRGFNet 与 FusDreamer 两篇 TGRS 2025 高度辅助分类论文。FRGFNet 核验 IEEE 原始摘要、五作者与正式 DOI；作者主页误标 2024，收录以正式卷 63、2025 为准，全文和原图请求受限。FusDreamer 取得作者公开 14 页正式排版 PDF 及当前已发布代码，保存第 3 页完整 Figure 1；世界模型在此为潜空间生成与多模态分类，不冒称三维几何或时序场景恢复。人为设计的类别/属性文本提示、CLIP、少标注实验边界保留，不称零标注开放类别识别。证据见 `sources/frgfnet-fusdreamer-review-2026-10-07.json`。UCAFNet 仍缺原始摘要/全文核验，不据二手摘要自动纳入；余下 TGRS 候选、专业期刊与目录检索继续。

2026-10-07：全部既有 CVPR 关键词命中候选已有逐篇决定，新增 SpectralMoE 深度先验辅助二维光谱分割及原始框架；当前网站 196 篇。原始摘要及歧义论文的全文证据保存在 sources/*scope-review*.json，审查汇总见 survey.coverage.cvprCandidateReview。该进度不等于所有 CVPR 论文的语义覆盖；ICCV/ECCV 候选、期刊与引文追溯仍未完成。
