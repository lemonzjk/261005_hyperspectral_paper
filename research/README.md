# 文献调研

检索截止日期：2026-10-06。网站当前收录 131 篇论文、4 个资源入口；调研仍在进行，不声明已经覆盖全部论文。

## 范围与场所

收录真实三维空间与光谱联合采集、重建、表示、渲染、材料分析和理解。多光谱光度立体属于相关研究；HSI 与 LiDAR/DSM 高度辅助的二维分类单列为相关方向。仅因使用 3D CNN 或 H×W×B 数据立方体的二维光谱处理不属于三维视觉。

目标场所同时覆盖视觉、图形学、遥感与光学。包括 CVPR、ICCV、ECCV、SIGGRAPH、TOG、TPAMI、IJCV、TGRS、IGARSS、ISPRS JPRS、RSE、Optica、Nature Photonics、Nature Communications 等。完整清单与领域期刊政策见 `survey.json`。清单是检索优先级，不是统一的期刊等级认证。预印本与其他专业场所作为补充阅读，不能冒充已正式发表的顶会顶刊论文。

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
