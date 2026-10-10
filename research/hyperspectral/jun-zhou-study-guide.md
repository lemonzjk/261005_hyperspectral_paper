# 周峻老师高光谱论文学习指南

整理截止：2026-10-10。本文是当前目录的学习入口，不宣称作者全部论文已经收齐。作者身份和检索缺口见 [专项调研](jun-zhou.md)。

## 目录边界

当前作者目录共185条出版/预印本/会议摘要记录：179条直接高光谱，6条多光谱关联（含1条EGU会议摘要）。181条为摘要级核验、4条为全文级核验。数字不是独立方法数；会议、期刊扩展版和预印本分别列出，阅读时对照版本证据。分类确认不等于阅读全文。

网站本地入口：`http://localhost:5173/?collection=hyperspectral&author=Jun%20Zhou`。打开论文详情可查看输入输出、方法、证据、框架原图和 BibTeX。原始事实统一维护在 `src/data/catalog.json`；本文是2026-10-10目录快照。

## 建议阅读路线

先掌握高光谱立方体、光谱响应、线性混合模型、端元和丰度、非负性与丰度和为一约束，以及空间邻域带来的训练测试依赖。以下顺序是学习建议，不代表论文之间都存在已证实的继承关系。

1. **先学评测**：阅读2017控制采样论文，理解光谱—空间特征的训练测试空间重叠。之后读分类论文时，首先检查划分方式，再比较精度。
2. **解混主线**：2011 L1/2-NMF、2017矩阵—向量NTF、2020光谱混合模型网络、2021 NMF-SAE、2022 SNMF-Net、2024扩散解混。比较传统目标函数、优化展开与学习先验分别改变了什么。
3. **分类与选带**：2013结构稀疏小波、2015光谱—空间超图。分清特征选择与传感器波段选择，检查标签参与选带及数据划分是否一致。
4. **去噪主线**：2015多任务稀疏NMF、2024 SSUMamba。比较共享系数先验与状态空间长程依赖；复现时分别核合成噪声和真实噪声协议。
5. **跟踪主线**：2020材料跟踪、2023 SiamBAG。理解材料/丰度、波段分组与空间运动的关系；检查RGB预训练与高光谱测试的边界。
6. **应用与系统**：再按兴趣阅读植物、土壤、生物炭、皮肤镜、坚果、光谱LiDAR及几何论文。核实传感器、采样单位和是否跨样本/场景验证。

## 第一轮精读清单

每篇至少完成：画出输入输出；写出关键目标函数或模块；列出约束/先验；核数据与训练测试划分；对照一个基线和一个消融。以下“学习问题”是阅读提示，答案需要全文核验，不从摘要补造。

### 1. 2017 · On the Sampling Strategy for Evaluation of Spectral-Spatial Methods in Hyperspectral Image Classification

- 原文：[来源](https://arxiv.org/abs/1605.05829)；目录ID：`controlled-sampling-tgrs-2017`。
- 输入：高光谱分类影像、训练/测试像元及采样策略。
- 输出：分类评估协议和偏差比较。
- 已核机制：按同类区域随机种子与八邻域生长生成训练块，减少空间算子引起的训练测试邻域重叠。
- 学习问题：空间重叠如何影响分类比较？随机与控制采样的划分单位分别是什么？
- 阅读边界：arXiv v1第VI节方法、第VII节指定实验局部补读；正式TGRS55(2):862–880，未标全文。
- 待核：边界仍可能重叠；光谱覆盖、波动、小区域配额及正式版差异待核。参见[评测学习笔记](jun-zhou-controlled-sampling-note.md)。

### 2. 2011 · Hyperspectral Unmixing via L1/2 Sparsity-Constrained Nonnegative Matrix Factorization

- 原文：[来源](https://users.cecs.anu.edu.au/~arobkell/papers/tgrs11.pdf)；目录ID：`lhalf-nmf-tgrs-2011`。
- 输入：混合高光谱像元矩阵；端元数量及初始化设置待阅读全文。
- 输出：非负端元光谱及丰度矩阵。
- 已核机制：丰度平方根和促进稀疏；乘法更新与增广常数行的丰度和惩罚分别核验，有限参数不等于严格和为1。
- 学习问题：写出NMF数据拟合项、L1/2稀疏项和丰度约束；比较L1与L1/2的优化难点。
- 阅读边界：已核原稿摘要及指定局部页，未阅读全文。2月2日与4月11日作者稿摘要不同：早稿称 unbiased estimator，晚稿改成 Lq 范数选择；不把早稿表述当正式版定理。正式 TGRS49(11):4282–4297，作者稿日期不替换出版年份。2010 DICTA 同作者近题会议版尚待原文扩展声明核验。
- 待核：2月2日与4月11日作者稿摘要不同：早稿称 unbiased estimator，晚稿改成 Lq 范数选择；不把早稿表述当正式版定理。正式 TGRS49(11):4282–4297，作者稿日期不替换出版年份。2010 DICTA 同作者近题会议版尚待原文扩展声明核验。 专用代码、数据链接与arXiv未由本轮定向搜索核到；未知不表示不存在。 本轮关联核验：同四作者同名L1/2-NMF方法族关联；扩展声明和完整差异未核，不混用实验。

[解混目标与约束学习笔记](jun-zhou-lhalf-nmf-note.md)已核对较晚作者稿II–III节，并提供独立数学演示；不是原算法复现。

### 3. 2017 · Matrix-Vector Nonnegative Tensor Factorization for Blind Unmixing of Hyperspectral Imagery

- 原文：[来源](https://scispace.com/pdf/matrix-vector-nonnegative-tensor-factorization-for-blind-37e123qdbo.pdf)；目录ID：`mv-ntf-blind-unmixing-tgrs-2017`。
- 输入：高光谱数据立方体。
- 输出：端元谱和二维丰度图。
- 已核机制：把每个端元向量与丰度矩阵组成矩阵—向量外积，非负约束下交替优化因子。
- 学习问题：矩阵—向量外积如何保留二维丰度结构？与矩阵展开NMF相比，增加了什么假设？
- 阅读边界：公开摘要/索引摘要和Crossref核验；正式TGRS55(3):1776–1792，未标全文。
- 待核：全文、代码和数据入口待核。

### 4. 2020 · Spectral Mixture Model Inspired Network Architectures for Hyperspectral Unmixing

- 原文：[来源](https://www.peeref.com/zh/works/20998787)；目录ID：`spectral-mixture-network-unmixing-2020`。
- 输入：高光谱混合影像。
- 输出：端元和丰度估计。
- 已核机制：深度展开光谱混合模型及迭代收缩阈值算法，形成两类网络结构。
- 学习问题：逐层对应混合模型与优化迭代；区分学习参数和物理变量。
- 阅读边界：公开摘要与Crossref核验；正式TGRS58(10):7418–7434，未标全文。
- 待核：正式全文、代码和数据协议仍待核验。

### 5. 2021 · NMF-SAE: An Interpretable Sparse Autoencoder for Hyperspectral Unmixing

- 原文：[五页作者公开稿](https://www.xiongfuli.com/cv/paper/ICASSPV12.pdf)；目录ID：`zhou-scholar-nmf-sae-an-interpretable-sparse-autoencode-2021`。
- 输入：高光谱像元矩阵、VCA/FCLS初始化；输出：端元和丰度。
- 已核机制：端元/丰度各自残差更新展开，参数跨层共享，丰度阈值后列归一化，端元ReLU；训练损失为无真值监督的重建误差。
- 已核实验：两层、1000迭代；USGS合成4096像元、Jasper Ridge 100×100×198、四端元；平均SAD较低不表示各类均最优。
- 阅读边界：作者稿五页完整阅读与Figure1/Table1核验；正式DOI/作者匹配，出版社逐字差异和代码复现仍待核。
- 学习问题：严格非负且和为1时L1为何为常数？阈值后归一化与单纯形投影为何不同？学习W₁/W₂后，还能否视为固定步长的传统NMF？参见[全文学习笔记](jun-zhou-nmf-sae-note.md)。

### 6. 2022 · SNMF-Net: Learning a Deep Alternating Neural Network for Hyperspectral Unmixing

- 原文：[16页作者稿](https://www.xiongfuli.com/cv/paper/TGRS-2021.pdf)；目录ID：`zhou-80-hsi-2022`。
- 输入与输出：高光谱像元矩阵、VCA/FCLS初始化，输出端元与丰度。
- 已核机制：逐层参数、端元/丰度交替展开、Lp单次GST近似、各层重建损失、GMC初始化。
- 已核实验：USGS合成与Jasper/Urban/DC Mall；九层、500训练像元；三真实数据平均SAD最低，不表示每类最优。
- 阅读边界：作者稿全文及全部图表已读；正式出版社逐字版本、公式更正及完整复现仍待核。
- 学习问题：式23的激活导数为何不只是指示函数？式37全矩阵与代码对角约束差在哪？参考端元和丰度怎样产生，怎样设计跨场景评测？

[论文与代码核对笔记](jun-zhou-snmf-code-note.md)提供原代码入口、20轮CPU运行边界和独立数学演示；当前实现与论文存在更新顺序、右乘项和约束差异，不能报性能复现成功。

2026年的[材料提示资源笔记](jun-zhou-e2empt-resource-note.md)补充解混到跟踪的后续阅读问题。作者仓库已核完整文件树与三结果ZIP；当前没有说明中列出的训练/测试脚本、配置或权重，不能当作可运行复现。目录仍保留摘要级状态。

### 7. 2024 · Diffusion-Model-Based Hyperspectral Unmixing Using Spectral Prior Distribution

- 原文：[来源](https://research-repository.griffith.edu.au/bitstreams/b5637d87-6134-4ab9-a955-cb8688fd1ccd/download)；目录ID：`zhou-45-hsi-2024`。
- 输入：混合高光谱影像与参考光谱库。
- 输出：端元光谱和像元丰度估计。
- 已核机制：无条件扩散模型学习光谱库先验；线性光谱混合模型提供观测似然；反向扩散从后验连续分布采样端元与丰度。
- 学习问题：光谱库先验与观测似然怎样结合？端元变异、约束和采样成本如何验证？
- 阅读边界：ORCID题名、Crossref正式书目与 Griffith 作者接收稿摘要核验；未阅读全文。
- 待核：作者稿为未完全编辑版本；正式版差异、约束实现、数据许可和代码复现待核验。

### 8. 2013 · Hyperspectral Image Classification Based on Structured Sparse Logistic Regression and Three-Dimensional Wavelet Texture Features

- 原文：[来源](https://research-repository.griffith.edu.au/server/api/core/bitstreams/a8546383-e267-51a0-b096-60bbb047c0f9/content)；目录ID：`structured-sparse-wavelet-tgrs-2013`。
- 输入：高光谱数据立方及标注像元；输入3D是空间×空间×波长，不是三维场景点云。
- 输出：稀疏选择的纹理特征、线性/混合模型和像元类别概率/预测。
- 已核机制：整块3D-DWT多尺度/频率/方向分解；结构稀疏logistic回归按不同L1/L2组约束选特征。原稿引言明确采用加速近端梯度取代会议的块坐标下降，并混合分区线性稀疏分类器。
- 学习问题：3D小波的三维是什么？组稀疏选择和近端优化如何连接分类器？
- 阅读边界：已核原摘要与指定局部页；未阅读全文。三作者期刊扩展IGARSS2011四作者稿：不混用作者列表、优化器和数据。正式TGRS51(4):2276–2291为2013年4月；仓储作者稿2012-06-13、PDF含1页2013封面共32页；首次early-online日期未由本轮原始证据核到。Indian Pine通道数冲突待正式稿。
- 待核：三作者期刊扩展IGARSS2011四作者稿：不混用作者列表、优化器和数据。正式TGRS51(4):2276–2291为2013年4月；仓储作者稿2012-06-13、PDF含1页2013封面共32页；首次early-online日期未由本轮原始证据核到。Indian Pine通道数冲突待正式稿。 专用代码、数据入口和arXiv本轮定向搜索未核到，未知不表示不存在。

### 9. 2015 · Semisupervised Hyperspectral Band Selection Via Spectral–Spatial Hypergraph Model

- 原文：[来源](https://research-repository.griffith.edu.au/server/api/core/bitstreams/187d5a40-2067-5655-b971-e407b5cf10ab/content)；目录ID：`spectral-spatial-hypergraph-jstars-2015`。
- 输入：少量标注及未标注像元、全部波段与空间邻域。
- 输出：选定波段及像元类别。
- 已核机制：超图构造、空间关系/互信息加权、标签传播、相邻波段group-lasso回归选带与SVM；Figure1是超图构造方法图，不是整体网络。
- 学习问题：超边怎样定义？空间关系、标签传播和group-lasso分别影响哪一步？
- 阅读边界：原摘要及指定局部核验；未阅读全文。正式JSTARS8(6):2774–2783，2015年6月，仓储封面+10页Figure1在PDF5/稿内4。原[20]/[21]准确匹配两会议，证明相关方法前后关系；未找到正式“扩展版”声明，保持三出版物实验差异。
- 待核：正式JSTARS8(6):2774–2783，2015年6月，仓储封面+10页Figure1在PDF5/稿内4。原[20]/[21]准确匹配两会议，证明相关方法前后关系；未找到正式“扩展版”声明，保持三出版物实验差异。 原文代码/原始数据专用入口未知，本轮题名定向发现不等于穷尽搜索。

### 10. 2015 · Multitask Sparse Nonnegative Matrix Factorization for Joint Spectral–Spatial Hyperspectral Imagery Denoising

- 原文：[来源](https://research-repository.griffith.edu.au/server/api/core/bitstreams/e48d5963-cfd3-5f03-80d6-25eb1faababb/content)；目录ID：`mtsnmf-denoise-tgrs-2015`。
- 输入：含噪高光谱立方；空间块与波段联合组织，含Poisson/Gaussian等模型设置。
- 输出：恢复的高光谱影像、波段字典及共同稀疏系数。
- 已核机制：多任务稀疏NMF连接波段各自字典与共享系数；原摘要说明VST，局部方法有MU/HALS及加速变体。Figure1为多任务框架，不是解混流程。
- 学习问题：共享系数与各波段字典怎样建模？VST适用什么噪声，怎样验证光谱保真？
- 阅读边界：原摘要及指定局部核验；未阅读全文。ORCID190无DOI题名Multi-task与192精确DOI实际同一机构原稿，按DOI/三作者/摘要关联，新增1论文、去重1组。DOI含2014不代表正式年份，正式2015年5月；首次online日期未知。
- 待核：ORCID190无DOI题名Multi-task与192精确DOI实际同一机构原稿，按DOI/三作者/摘要关联，新增1论文、去重1组。DOI含2014不代表正式年份，正式2015年5月；首次online日期未知。 原文代码/原始数据专用入口未知，本轮题名定向发现不等于穷尽搜索。

### 11. 2024 · SSUMamba: Spatial-Spectral Selective State Space Model for Hyperspectral Image Denoising

- 原文：[来源](https://ieeexplore.ieee.org/document/10643108/)；目录ID：`zhou-56-hsi-2024`。
- 输入：含噪高光谱影像。
- 输出：去噪高光谱影像。
- 已核机制：空间—光谱连续扫描生成六种序列顺序；双向状态空间模型处理长程依赖；相邻扫描间重排保持连续性；3D卷积补充局部建模。
- 学习问题：六种扫描顺序怎样覆盖空间—光谱立方体？双向状态空间与3D卷积如何分工？
- 阅读边界：ORCID题名、Crossref正式书目、IEEE Xplore记录与 arXiv:2405.01726 官方摘要核验；正式版与预印本版本边界保留，未阅读全文。
- 待核：正式版全文、噪声协议、运行速度、数据许可和代码复现待核验。

### 12. 2020 · Material Based Object Tracking in Hyperspectral Videos

- 原文：[来源](https://doi.org/10.1109/TIP.2020.2965302)；目录ID：`material-object-tracking-hsi-tip-2020`。
- 输入：配对高光谱/彩色视频、全标注目标序列。
- 输出：视频目标轨迹。
- 已核机制：用多维梯度光谱—空间直方图和端元丰度表示材料，再嵌入相关滤波器。
- 学习问题：端元丰度和梯度直方图分别提供什么线索？材料变化与运动怎样区分？
- 阅读边界：IEEE摘要与Crossref核验；正式TIP29:3719–3733，未标全文。
- 待核：正式全文、代码和数据协议仍待核验。

### 13. 2023 · SiamBAG: Band Attention Grouping-Based Siamese Object Tracking Network for Hyperspectral Videos

- 原文：[来源](https://www.researchgate.net/publication/371556153_SiamBAG_Band_Attention_Grouping-based_Siamese_Object_Tracking_Network_for_Hyperspectral_Videos)；目录ID：`zhou-67-hsi-2023`。
- 输入：高光谱视频模板/搜索帧及波段分组后的三通道伪彩色图。
- 输出：目标位置、回归框和尺度调整后的跟踪结果。
- 已核机制：波段注意力分组并近似平衡各组权重；分类分支融合各组响应图，回归分支给出初始位置，尺度分支利用模板/检测特征相似度反馈细化。
- 学习问题：注意力怎样分组波段？伪彩色输入如何使用RGB训练数据，分类/回归/尺度分支如何融合？
- 阅读边界：ORCID题名、Crossref正式书目与 ResearchGate 公开摘要核验；未阅读全文。
- 待核：摘要未给出训练数据清单、分组数量、网络细节、数据统计和代码复现状态。

## 当前作者目录完整索引

以下列出当前185条记录，保持正式发表与预印本状态，不将同方法族合并成一篇。点击标题访问目录原始来源；具体证据和版本笔记见网站详情。任务标签仍有暂定分类。

| 年份 | 题名 / 原始来源 | 当前任务 | 出版状态 | 证据级别 |
| --- | --- | --- | --- | --- |
| **直接高光谱** | | | | |
| 2009 | [An affine Invariant hyperspectral texture descriptor based upon heavy-tailed distributions and fourier analysis](https://users.cecs.anu.edu.au/~junzhou/papers/C_OTCBVS_2009.pdf) | 高光谱纹理描述 | 正式发表 | 摘要核验 |
| 2010 | [L1/2 Sparsity Constrained Nonnegative Matrix Factorization for Hyperspectral Unmixing](https://users.cecs.anu.edu.au/~junzhou/papers/C_DICTA_2010.pdf) | 光谱解混 | 正式发表 | 摘要核验 |
| 2010 | [Regisration of hyperspectral and trichromatic images via cross cumulative residual entropy maximisation](https://users.cecs.anu.edu.au/~junzhou/papers/C_ICIP_2010.pdf) | 光学影像配准 | 正式发表 | 摘要核验 |
| 2011 | [Affine Invariant Hyperspectral Image Descriptors Based upon Harmonic Analysis](https://users.cecs.anu.edu.au/~junzhou/papers/BC_2011.pdf) | 高光谱纹理描述 | 正式发表 | 摘要核验 |
| 2011 | [Hyperspectral Unmixing via L1/2 Sparsity-Constrained Nonnegative Matrix Factorization](https://users.cecs.anu.edu.au/~arobkell/papers/tgrs11.pdf) | 光谱解混 | 正式发表 | 摘要核验 |
| 2011 | [Material-specific user colour profiles from imaging spectroscopy data](https://users.cecs.anu.edu.au/~huynh/publications/gu_huynh_robles-kelly_zhou_iccv2011_colour.pdf) | 光谱材料特定颜色编辑 | 正式发表 | 摘要核验 |
| 2011 | [Structured sparse model based feature selection and classification for hyperspectral imagery](https://users.cecs.anu.edu.au/~junzhou/papers/C_IGARSS_2011.pdf) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2012 | [Anomaly Detection Algorithm Based on Nonsubsampled Pyramid Decomposition and Kernel Unsharp Masking for Hyperspectral Image](https://doi.org/10.1109/ICICEE.2012.350) | 待分类 | 正式发表 | 摘要核验 |
| 2012 | [Shearlet transform based anomaly detection for hyperspectral image](https://doi.org/10.1117/12.978636) | 待分类 | 正式发表 | 摘要核验 |
| 2013 | [3D Plant Modelling via Hyperspectral Imaging](https://openaccess.thecvf.com/content_iccv_workshops_2013/W06/papers/Liang_3D_Plant_Modelling_2013_ICCV_paper.pdf) | 深度、法线与表面重建 | 正式发表 | 摘要核验 |
| 2013 | [A hypergraph based semi-supervised band selection method for hyperspectral image classification](https://research-repository.griffith.edu.au/server/api/core/bitstreams/929f464e-22b1-5a2d-8cee-f7965e90dfb1/content) | 光谱波段选择、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2013 | [Efficient Estimation of Reflectance Parameters From Imaging Spectroscopy](https://users.cecs.anu.edu.au/~arobkell/papers/tip13.pdf) | 光谱反射与散射属性建模、光谱照明估计 | 正式发表 | 摘要核验 |
| 2013 | [Hyperspectral Image Classification Based on Structured Sparse Logistic Regression and Three-Dimensional Wavelet Texture Features](https://research-repository.griffith.edu.au/server/api/core/bitstreams/a8546383-e267-51a0-b096-60bbb047c0f9/content) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2013 | [Salient object detection in hyperspectral imagery](https://research-repository.griffith.edu.au/server/api/core/bitstreams/bbe7597d-2d15-5e82-ae7a-2f49137886d0/content) | 高光谱显著目标检测 | 正式发表 | 摘要核验 |
| 2013 | [Semi-supervised hyperspectral band selection via sparse linear regression and hypergraph models](https://research-repository.griffith.edu.au/server/api/core/bitstreams/c207d259-7586-5806-ba30-58e40a8d2a18/content) | 光谱波段选择、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2013 | [Soil Biochar Quantification via Hyperspectral Unmixing](https://doi.org/10.1109/dicta.2013.6691529) | 土壤光谱与属性估计、光谱解混 | 正式发表 | 摘要核验 |
| 2014 | [Dual Graph Regularized NMF for Hyperspectral Unmixing](https://research-repository.griffith.edu.au/server/api/core/bitstreams/d164c3b5-e39c-5455-88a1-54d707c7351d/content) | 光谱解混 | 正式发表 | 摘要核验 |
| 2014 | [Visualization of Hyperspectral Imaging Data Based on Manifold Alignment](https://research-repository.griffith.edu.au/server/api/core/bitstreams/f89aa4c8-9b5e-551f-9aac-52595ca08055/content) | 高光谱彩色可视化 | 正式发表 | 摘要核验 |
| 2015 | [3D local derivative pattern for hyperspectral face recognition](https://research-repository.griffith.edu.au/server/api/core/bitstreams/0f04d56d-65cc-561b-8b43-750db808e005/content) | 光谱身份识别 | 正式发表 | 摘要核验 |
| 2015 | [3D Reconstruction from Hyperspectral Images](https://research-repository.griffith.edu.au/server/api/core/bitstreams/0c018645-866b-5aff-b1bc-ec61a2f9da25/content) | 深度、法线与表面重建 | 正式发表 | 摘要核验 |
| 2015 | [A Large Margin Learning Method for Matching Images of Natural Objects with Different Dimensions](https://doi.org/10.4018/978-1-4666-9435-4.ch015) | 光学影像配准 | 正式发表 | 摘要核验 |
| 2015 | [Automatic Estimation of Soil Biochar Quantity via Hyperspectral Imaging](https://doi.org/10.4018/978-1-4666-9435-4.ch011) | 光谱解混、土壤光谱与属性估计 | 正式发表 | 摘要核验 |
| 2015 | [Band weighting and selection based on hyperplane margin maximization for hyperspectral image classification](https://research-repository.griffith.edu.au/server/api/core/bitstreams/6812cc9f-2faf-5f90-a1e6-182d33317e36/content) | 光谱波段选择、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2015 | [Learning Graph Model for Different Dimensions Image Matching](https://research-repository.griffith.edu.au/server/api/core/items/4d56d279-df0e-54ba-aeff-ff250b97fa0a) | 光学影像配准 | 正式发表 | 摘要核验 |
| 2015 | [Multilayer manifold and sparsity constrainted nonnegative matrix factorization for hyperspectral unmixing](https://research-repository.griffith.edu.au/server/api/core/bitstreams/f978847c-ee14-5977-ab1e-d1b117e4c938/content) | 光谱解混 | 正式发表 | 摘要核验 |
| 2015 | [Multiple Graph Regularized NMF for Hyperspectral Unmixing](https://research-repository.griffith.edu.au/bitstreams/5904103b-b122-5ca2-8188-d64b08809ff0/download) | 待分类 | 正式发表 | 摘要核验 |
| 2015 | [Multitask Sparse Nonnegative Matrix Factorization for Joint Spectral–Spatial Hyperspectral Imagery Denoising](https://research-repository.griffith.edu.au/server/api/core/bitstreams/e48d5963-cfd3-5f03-80d6-25eb1faababb/content) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2015 | [On the Sampling Strategies for Evaluation of Joint Spectral-Spatial Information Based Classifiers](https://research-repository.griffith.edu.au/bitstreams/8054cd22-253b-52f4-9bd4-987453f900b9/download) | 地物与植被图像分类、数据集与评测基准 | 正式发表 | 摘要核验 |
| 2015 | [Relative Depth Estimation from Hyperspectral Data](https://doi.org/10.1109/dicta.2015.7371299) | 深度、法线与表面重建 | 正式发表 | 摘要核验 |
| 2015 | [Semisupervised Hyperspectral Band Selection Via Spectral–Spatial Hypergraph Model](https://research-repository.griffith.edu.au/server/api/core/bitstreams/187d5a40-2067-5655-b971-e407b5cf10ab/content) | 光谱波段选择、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2016 | [A Manifold Alignment Approach for Hyperspectral Image Visualization With Natural Color](https://research-repository.griffith.edu.au/server/api/core/bitstreams/33f7e9d5-0979-55b1-8bab-3dbee6654c89/content) | 高光谱彩色可视化 | 正式发表 | 摘要核验 |
| 2016 | [Band Weighting via Maximizing Interclass Distance for Hyperspectral Image Classification](https://research-repository.griffith.edu.au/server/api/core/bitstreams/dd090b30-603d-5c6c-b792-39e0ba7f9e0c/content) | 光谱波段选择、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2016 | [CRF learning with CNN features for hyperspectral image segmentation](https://research-repository.griffith.edu.au/bitstream/10072/339311/1/AlamPUB1959.pdf) | 光谱图像语义分割、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2016 | [Discriminative weighted band selection via one-class SVM for hyperspectral imagery](https://research-repository.griffith.edu.au/bitstream/10072/339315/1/TangPUB1960.pdf) | 光谱波段选择 | 正式发表 | 摘要核验 |
| 2016 | [Nonnegative matrix factorization with endmember sparse graph learning for hyperspectral unmixing](https://research-repository.griffith.edu.au/server/api/core/bitstreams/4256ac55-5a64-5482-bcaf-fd0d51e00bf0/content) | 光谱解混 | 正式发表 | 摘要核验 |
| 2016 | [Nonnegative-Matrix-Factorization-Based Hyperspectral Unmixing With Partially Known Endmembers](https://research-repository.griffith.edu.au/bitstream/10072/100457/1/TongPUB2302.pdf) | 光谱解混 | 正式发表 | 摘要核验 |
| 2016 | [Structured Discriminative Nonnegative Matrix Factorization for hyperspectral unmixing](https://scispace.com/papers/structured-discriminative-nonnegative-matrix-factorization-218fqxy2s4) | 光谱解混 | 正式发表 | 摘要核验 |
| 2016 | [Tensor morphological profile for hyperspectral image classification](https://research-repository.griffith.edu.au/server/api/core/bitstreams/e60a5fbf-6177-5f91-8743-42a3d910a95c/content) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2017 | [Combining Unmixing and Deep Feature Learning for Hyperspectral Image Classification](https://fahimirfanalam.github.io/publication/combining-unmixing-and-deep-feature-learning-for-hyperspectral-image-classification/) | 光谱解混、光谱表征预训练、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2017 | [Deep Residual Convolutional Neural Network for Hyperspectral Image Super-Resolution](https://research-repository.griffith.edu.au/bitstream/10072/370475/1/WangPUB2842.pdf) | 光谱超分辨率、光谱重建 | 正式发表 | 摘要核验 |
| 2017 | [Dictionary Learning-Based Feature-Level Domain Adaptation for Cross-Scene Hyperspectral Image Classification](https://research-repository.griffith.edu.au/server/api/core/bitstreams/323f9de4-3b11-517d-baad-b32f8378e56c/content) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2017 | [Differential weights-based band selection for hyperspectral image classification](https://research-repository.griffith.edu.au/server/api/core/bitstreams/29236d25-f356-5c07-ba9b-825c8f79e61a/content) | 光谱波段选择、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2017 | [Exploring Structural Consistency in Graph Regularized Joint Spectral-Spatial Sparse Coding for Hyperspectral Image Classification](https://researchportalplus.anu.edu.au/en/publications/exploring-structural-consistency-in-graph-regularized-joint-spect/) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2017 | [Material Based Boundary Detection in Hyperspectral Images](https://doi.org/10.1109/dicta.2017.8227462) | 待分类 | 正式发表 | 摘要核验 |
| 2017 | [Matrix-Vector Nonnegative Tensor Factorization for Blind Unmixing of Hyperspectral Imagery](https://scispace.com/pdf/matrix-vector-nonnegative-tensor-factorization-for-blind-37e123qdbo.pdf) | 光谱解混 | 正式发表 | 摘要核验 |
| 2017 | [Non-local similarity based tensor decomposition for hyperspectral image denoising](https://research-repository.griffith.edu.au/bitstreams/d1b1b412-a488-50f1-b7b8-9b24ae4af0e0/download) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2017 | [On the Sampling Strategy for Evaluation of Spectral-Spatial Methods in Hyperspectral Image Classification](https://arxiv.org/abs/1605.05829) | 数据集与评测基准、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2017 | [Region-Based Structure Preserving Nonnegative Matrix Factorization for Hyperspectral Unmixing](https://research-repository.griffith.edu.au/bitstreams/315a623f-165f-57ea-99e7-0c46cca8baf3/download) | 光谱解混 | 正式发表 | 摘要核验 |
| 2017 | [The potential of hyperspectral images and partial least square regression for predicting total carbon, total nitrogen and their isotope composition in forest litterfall samples](https://era.dpi.qld.gov.au/id/eprint/15791/) | 土壤光谱与属性估计 | 正式发表 | 摘要核验 |
| 2018 | [A Hyperspectral Dermoscopy Dataset for Melanoma Detection](https://github.com/heugyy/HSIDermoscopy) | 数据集与评测基准 | 正式发表 | 摘要核验 |
| 2018 | [A non-destructive determination of peroxide values, total nitrogen and mineral nutrients in an edible tree nut using hyperspectral imaging](https://hero.epa.gov/hero/index.cfm/reference/details/reference_id/6906992) | 土壤光谱与属性估计 | 正式发表 | 摘要核验 |
| 2018 | [An Efficient Method for Boundary Detection from Hyperspectral Imagery](https://doi.org/10.1007/978-3-319-97785-0_40) | 待分类 | 正式发表 | 摘要核验 |
| 2018 | [Band Weighting Network for Hyperspectral Image Classification](https://dblp.org/rec/conf/dicta/WangZ18.html) | 光谱波段选择、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2018 | [Fusion of Hyperspectral and LiDAR Data Using Discriminant Correlation Analysis for Land Cover Classification](https://www.researchgate.net/publication/328786794_Fusion_of_Hyperspectral_and_LiDAR_Data_Using_Discriminant_Correlation_Analysis_for_Land_Cover_Classification) | 高光谱与LiDAR辅助分类、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2018 | [Hyperspectral Imagery Denoising via Reweighed Sparse Low-Rank Nonnegative Tensor Factorization](https://sigport.org/sites/default/files/docs/ICIP2018-2782-poster.pdf) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2018 | [Integration of Heterogeneous Features from Co-registered Hyperspectral and LiDAR Data for Land Cover Classification](https://www.researchgate.net/publication/342582768_Integration_of_Heterogeneous_Features_from_Co-registered_Hyperspectral_and_LiDAR_Data_for_Land_Cover_Classification) | 高光谱与LiDAR辅助分类、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2018 | [Laboratory-based hyperspectral image analysis for predicting soil carbon, nitrogen and their isotopic compositions](https://era.dpi.qld.gov.au/id/eprint/13321/) | 土壤光谱与属性估计 | 正式发表 | 摘要核验 |
| 2018 | [Material based salient object detection from hyperspectral images](https://www.sciencedirect.com/science/article/abs/pii/S0031320317304806) | 高光谱显著目标检测、光谱解混、数据集与评测基准 | 正式发表 | 摘要核验 |
| 2018 | [Nonlocal Similarity Based Nonnegative Tucker Decomposition for Hyperspectral Image Denoising](https://research-repository.griffith.edu.au/bitstream/10072/380453/1/BaiPUB6605.pdf) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2018 | [Object tracking in hyperspectral videos with convolutional features and kernelized correlation filter](https://arxiv.org/abs/1810.11819) | 光谱目标时序跟踪、高光谱视频采集 | 正式发表 | 摘要核验 |
| 2018 | [Spectral-Spatial Scale Invariant Feature Transform for Hyperspectral Images](https://openalex.org/W2751249843) | 光学影像配准、光谱降维与子空间识别 | 正式发表 | 摘要核验 |
| 2018 | [Superpixel-Based Nonnegative Tensor Factorization for Hyperspectral Unmixing](https://monsterzhzh.github.io/pub/fcxiong.pdf) | 光谱解混 | 正式发表 | 摘要核验 |
| 2018 | [Triplet Constrained Deep Feature Extraction for Hyperspectral Image Classification](https://research-repository.griffith.edu.au/bitstreams/bcbcd377-523f-476e-b972-d8d1fc9c4dd2/download) | 地物与植被图像分类、光谱表征预训练、数据集与评测基准 | 正式发表 | 摘要核验 |
| 2018 | [Using laboratory-based hyperspectral imaging method to determine carbon functional group distributions in decomposing forest litterfall](https://era.dpi.qld.gov.au/id/eprint/15792/) | 土壤光谱与属性估计 | 正式发表 | 摘要核验 |
| 2019 | [3-D Gaussian–Gabor Feature Extraction and Selection for Hyperspectral Imagery Classification](https://www.researchgate.net/publication/334404986_3-D_Gaussian-Gabor_Feature_Extraction_and_Selection_for_Hyperspectral_Imagery_Classification) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2019 | [Abundance-Guided Superpixels and Recurrent Neural Network for Hyperspectral Image Classification](https://www.semanticscholar.org/paper/8d25a0ac15cbc76572dd058924c6e53beccdcae3) | 地物与植被图像分类、光谱解混 | 正式发表 | 摘要核验 |
| 2019 | [Attend in Bands: Hyperspectral Band Weighting and Selection for Image Classification](https://research-repository.griffith.edu.au/bitstreams/7ce9629c-5662-46ea-928e-e0c2387276d6/download) | 光谱波段选择、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2019 | [Attention Networks for Band Weighting And Selection In Hyperspectral Remote Sensing Image Classification](https://www.semanticscholar.org/paper/c2ef66e899f5ecc3fd1513b61a92432b8859b3d9) | 光谱波段选择、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2019 | [Automatic Live and Dead Cell Classification via Hyperspectral Imaging](https://www.semanticscholar.org/paper/2c7c7bd73f0f3e5431b50f7f1568f559cfc1d043) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2019 | [Collaborative Representation-Based Multiscale Superpixel Fusion for Hyperspectral Image Classification](https://dblp.org/rec/journals/tgrs/JiaDZXZJ19.html) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2019 | [Conditional Random Field and Deep Feature Learning for Hyperspectral Image Classification](https://lacuna.tiptreesystems.com/work/conditional-random-field-and-deep-feature-learning-for-hyperspectral-image/wrk_5f4ea80870288e68b1e585a56e76307f) | 地物与植被图像分类、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2019 | [Deep Unfolded Iterative Shrinkage-Thresholding Model for Hyperspectral Unmixing](https://www.semanticscholar.org/paper/beba562dc91e9c97ec04ec32acfc2d1d4927a1d6) | 光谱解混 | 正式发表 | 摘要核验 |
| 2019 | [Dynamic Material-Aware Object Tracking in Hyperspectral Videos](https://www.semanticscholar.org/paper/a3391a508148942a921d65eb5846e5801bc3c6e4) | 光谱目标时序跟踪、高光谱视频采集 | 正式发表 | 摘要核验 |
| 2019 | [Hyperspectral anomaly detection based on anomalous component extraction framework](https://research-repository.griffith.edu.au/bitstream/10072/382909/1/Zhou158553.pdf) | 高光谱异常检测 | 正式发表 | 摘要核验 |
| 2019 | [Hyperspectral Image Classification Based on Non-Local Neural Networks](https://www.semanticscholar.org/paper/8c0fbcaa9a9d417266d1470a46a40acd91d4c71b) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2019 | [Hyperspectral Restoration via L0 Gradient Regularized Low-Rank Tensor Factorization](https://www.xiongfuli.com/cv/cv.pdf) | 光谱数据复原、光谱去噪 | 正式发表 | 摘要核验 |
| 2019 | [Hyperspectral Unmixing via Total Variation Regularized Nonnegative Tensor Factorization](https://dblp.org/rec/journals/tgrs/XiongQ0T19.html) | 光谱解混 | 正式发表 | 摘要核验 |
| 2019 | [Knowledge Transfer via Convolution Neural Networks for Multi-Resolution Lawn Weed Classification](https://www.researchgate.net/publication/337794147_Knowledge_Transfer_via_Convolution_Neural_Networks_for_Multi-Resolution_Lawn_Weed_Classification) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2019 | [Multi-Resolution Weed Classification via Convolutional Neural Network and Superpixel Based Local Binary Pattern Using Remote Sensing Images](https://www.mdpi.com/2072-4292/11/14/1692) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2019 | [Texture and Shape Features for Grass Weed Classification Using Hyperspectral Remote Sensing Images](https://unsworks.unsw.edu.au/bitstreams/1df826fe-3c8f-43c1-aeb1-b68fe51568e3/download) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2020 | [Adaptive Graph Regularized Multilayer Nonnegative Matrix Factorization for Hyperspectral Unmixing](https://www.researchgate.net/publication/338761401_Adaptive_Graph_Regularized_Multilayer_Nonnegative_Matrix_Factorization_for_Hyperspectral_Unmixing) | 光谱解混 | 正式发表 | 摘要核验 |
| 2020 | [BAE-Net: A Band Attention Aware Ensemble Network for Hyperspectral Object Tracking](https://resourcecenter.ieee.org/conferences/icip-2020/icip20vid101) | 光谱目标时序跟踪、光谱波段选择 | 正式发表 | 摘要核验 |
| 2020 | [Inverse Coefficient of Variation Feature and Multilevel Fusion Technique for Hyperspectral and LiDAR Data Classification](https://research-repository.griffith.edu.au/bitstream/10072/392021/2/Zhou348500-Accepted.pdf) | 高光谱与LiDAR辅助分类、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2020 | [Material Based Object Tracking in Hyperspectral Videos](https://doi.org/10.1109/TIP.2020.2965302) | 光谱目标时序跟踪、高光谱视频采集、数据集与评测基准 | 正式发表 | 摘要核验 |
| 2020 | [Nonconvex Nonseparable Sparse Nonnegative Matrix Factorization for Hyperspectral Unmixing](https://research-repository.griffith.edu.au/server/api/core/bitstreams/547a5abf-f46e-4945-a521-0743fb51c8c8/content) | 光谱解混 | 正式发表 | 摘要核验 |
| 2020 | [Nonlocal Low-Rank Nonnegative Tensor Factorization for Hyperspectral Unmixing](https://www.semanticscholar.org/paper/84d25a7a9c210f49b2eaab6fd44adfb156f9bcef) | 光谱解混 | 正式发表 | 摘要核验 |
| 2020 | [Spectral Mixture Model Inspired Network Architectures for Hyperspectral Unmixing](https://www.peeref.com/zh/works/20998787) | 光谱解混 | 正式发表 | 摘要核验 |
| 2020 | [Subspace Structure Regularized Nonnegative Matrix Factorization for Hyperspectral Unmixing](https://pure.york.ac.uk/portal/en/publications/subspace-structure-regularized-nonnegative-matrix-factorization-f/) | 光谱解混 | 正式发表 | 摘要核验 |
| 2020 | [Superpixel-Level Weighted Label Propagation for Hyperspectral Image Classification](https://www.researchgate.net/publication/363929741_Superpixel_Correction_Based_Label_Propagation_for_Hyperspectral_Images_Classification) | 地物与植被图像分类、标注样本主动选择 | 正式发表 | 摘要核验 |
| 2021 | [A Lightweight Convolutional Neural Network for Hyperspectral Image Classification](https://scispace.com/papers/a-lightweight-convolutional-neural-network-for-hyperspectral-5ebojmrxv8) | 地物与植被图像分类、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2021 | [Discriminant Tensor-Based Manifold Embedding for Medical Hyperspectral Imagery](https://pubmed.ncbi.nlm.nih.gov/33687854/) | 光谱降维与子空间识别、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2021 | [Early Detection of Sugarcane Smut Disease in Hyperspectral Images](https://research-repository.griffith.edu.au/server/api/core/bitstreams/8a346f31-d65b-403e-a15a-c5b8adc43709/content) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2021 | [Exploring Chromatic Aberration and Defocus Blur for Relative Depth Estimation From Monocular Hyperspectral Image](https://openalex.org/W3155353888) | 深度、法线与表面重建、光学影像配准 | 正式发表 | 摘要核验 |
| 2021 | [Flexible Gabor-Based Superpixel-Level Unsupervised LDA for Hyperspectral Image Classification](https://doi.org/10.1109/TGRS.2020.3048994) | 地物与植被图像分类、光谱降维与子空间识别 | 正式发表 | 摘要核验 |
| 2021 | [Hyperspectral Anomaly Detection via Deep Plug-and-Play Denoising CNN Regularization](https://hub.hku.hk/handle/10722/298375) | 高光谱异常检测、光谱去噪 | 正式发表 | 摘要核验 |
| 2021 | [Learning a Model-Based Deep Hyperspectral Denoiser from a Single Noisy Hyperspectral Image](https://www.semanticscholar.org/paper/8e4b56071619ae155dd5b0669fdee486b3cf76de) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2021 | [Multiple Feature-Based Superpixel-Level Decision Fusion for Hyperspectral and LiDAR Data Classification](https://scispace.com/pdf/multiple-feature-based-superpixel-level-decision-fusion-for-4hnx7icwzy.pdf) | 高光谱与LiDAR辅助分类、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2021 | [NMF-SAE: An Interpretable Sparse Autoencoder for Hyperspectral Unmixing](https://www.xiongfuli.com/cv/paper/ICASSPV12.pdf) | 光谱解混 | 正式发表 | 作者稿全文核验 |
| 2021 | [Spectral and Spatial Residual Attention Network for Joint Hyperspectral and Lidar Data Classification](https://www.semanticscholar.org/paper/5abe231d5c3ffe6ce6bac61a110a0b6229ef31d0) | 高光谱与LiDAR辅助分类、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2021 | [Spectral-Spatial-Temporal Attention Network for Hyperspectral Tracking](https://ieee-whispers.com/wp-content/uploads/2021/03/WHISPERS_2021_paper_55.pdf) | 光谱目标时序跟踪 | 正式发表 | 摘要核验 |
| 2022 | [An Attention-Based Lattice Network for Hyperspectral Image Classification](https://research-repository.griffith.edu.au/server/api/core/bitstreams/0b62a949-0829-43c4-8443-f2445f392006/content) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2022 | [Fusion of Hyperspectral and Multispectral Images Accounting for Localized Inter-Image Changes](https://doi.org/10.1109/TGRS.2021.3124240) | 光谱重建 | 正式发表 | 摘要核验 |
| 2022 | [Gradient Feature-Oriented 3-D Domain Adaptation for Hyperspectral Image Classification](https://ieeexplore.ieee.org/abstract/document/9417011) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2022 | [Hyperspectral Image Restoration With Self-Supervised Learning: A Two-Stage Training Approach](https://www.researchgate.net/publication/357261821_Hyperspectral_Image_Restoration_with_Self-supervised_Learning_A_Two-stage_Training_Approach) | 光谱数据复原 | 正式发表 | 摘要核验 |
| 2022 | [MAC-Net: Model-Aided Nonlocal Neural Network for Hyperspectral Image Denoising](https://scispace.com/papers/mac-net-model-aided-nonlocal-neural-network-for-303mgt34) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2022 | [Material-Guided Siamese Fusion Network for Hyperspectral Object Tracking](https://www.semanticscholar.org/paper/a6346f814a83b8afd0c4cd951fb892925979bf36) | 光谱目标时序跟踪、多模态与跨光谱匹配 | 正式发表 | 摘要核验 |
| 2022 | [Model‐Inspired Deep Neural Networks for Hyperspectral Unmixing](https://colab.ws/articles/10.1002%2F9781119687788.ch13) | 光谱解混 | 正式发表 | 摘要核验 |
| 2022 | [Multitask Sparse Neural Network for Hyperspectral Image Denoising](https://rc.signalprocessingsociety.org/conferences/icassp-2022/spsicassp22vid1814) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2022 | [Nonlocal Spatial–Spectral Neural Network for Hyperspectral Image Denoising](https://www.researchgate.net/publication/365116412_Nonlocal_Spatial-Spectral_Neural_Network_for_Hyperspectral_Image_Denoising) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2022 | [Similarity-Based Hyperspectral Band Selection Using Deep Reinforcement Learning](https://ieeexplore.ieee.org/document/9955115/) | 光谱波段选择、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2022 | [SMDS-Net: Model Guided Spectral-Spatial Network for Hyperspectral Image Denoising](https://arxiv.org/abs/2012.01829) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2022 | [SNMF-Net: Learning a Deep Alternating Neural Network for Hyperspectral Unmixing](https://www.xiongfuli.com/cv/paper/TGRS-2021.pdf) | 光谱解混 | 正式发表 | 作者稿全文核验 |
| 2022 | [Sparsity Constrained Fusion of Hyperspectral and Multispectral Images](https://www.researchgate.net/profile/Meng-Xu-24) | 光谱重建 | 正式发表 | 摘要核验 |
| 2022 | [Spatial-Spectral Convolutional Sparse Neural Network for Hyperspectral Image Denoising](https://eurekamag.com/research/096/040/096040803.php) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2022 | [Spatial–Spectral Weighted and Regularized Tensor Sparse Correlation Filter for Object Tracking in Hyperspectral Videos](https://pure.bit.edu.cn/en/publications/spatial-spectral-weighted-and-regularized-tensor-sparse-correlati) | 光谱目标时序跟踪 | 正式发表 | 摘要核验 |
| 2022 | [Spectral-Spatial Boundary Detection in Hyperspectral Images](https://openalex.org/W4200607031) | 光谱图像语义分割 | 正式发表 | 摘要核验 |
| 2022 | [Stochastic Depth Residual Network for Hyperspectral Image Classification](https://www.researchgate.net/publication/352939984_Stochastic_Depth_Residual_Network_for_Hyperspectral_Image_Classification) | 地物与植被图像分类、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2022 | [Superpixel Spectral–Spatial Feature Fusion Graph Convolution Network for Hyperspectral Image Classification](https://www.researchgate.net/publication/362719292_Superpixel_Spectral-Spatial_Feature_Fusion_Graph_Convolution_Network_for_Hyperspectral_Image_Classification) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2022 | [Transferable Convolutional Neural Network for Weed Mapping With Multisensor Imagery](https://www.researchgate.net/publication/354770864_Transferable_Convolutional_Neural_Network_for_Weed_Mapping_With_Multisensor_Imagery) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2022 | [Unsupervised Hyperspectral Band Selection With Multigraph Integrated Embedding and Robust Self-Contained Regression](https://www.researchgate.net/publication/350106215_Unsupervised_Hyperspectral_Band_Selection_With_Multigraph_Integrated_Embedding_and_Robust_Self-Contained_Regression) | 光谱波段选择、光谱降维与子空间识别 | 正式发表 | 摘要核验 |
| 2022 | [Unsupervised Spatial-Spectral CNN-Based Feature Learning for Hyperspectral Image Classification](https://www.researchgate.net/publication/363095409_Unsupervised_Spatial-Spectral_CNN-Based_Feature_Learning_for_Hyperspectral_Image_Classification) | 地物与植被图像分类、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2023 | [Background-Aware Band Selection for Object Tracking in Hyperspectral Videos](https://www.researchgate.net/publication/374895665_Background-Aware_Band_Selection_for_Object_Tracking_in_Hyperspectral_Videos) | 光谱目标时序跟踪、光谱波段选择 | 正式发表 | 摘要核验 |
| 2023 | [Deep Parameterized Neural Networks for Hyperspectral Image Denoising](https://www.researchgate.net/publication/374100628_Deep_Parameterized_Neural_Networks_for_Hyperspectral_Image_Denoising) | 光谱去噪、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2023 | [High Spectral Spatial Resolution Synthetic HyperSpectral Dataset form multi-source fusion](https://arxiv.org/abs/2309.00005) | 数据集与评测基准、光谱重建、计算光谱成像系统 | 预印本 | 摘要核验 |
| 2023 | [Iterative Refinement Network for Hyperspectral Image Denoising](https://www.semanticscholar.org/paper/e156f53b9b63c777fcd0cab79ca5c15ae0430bd3) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2023 | [Learning a Deep Ensemble Network With Band Importance for Hyperspectral Object Tracking](https://doi.org/10.1109/TIP.2023.3263109) | 光谱目标时序跟踪、光谱波段选择 | 正式发表 | 摘要核验 |
| 2023 | [Multi Modality Siamese Feature Fusion Transformer Tracker for Object Tracking from Hyperspectral Videos](https://www.semanticscholar.org/paper/c1a4a8a5183630b14ef3aef4ffa025c588ac2c9f) | 光谱目标时序跟踪 | 正式发表 | 摘要核验 |
| 2023 | [Multi-Task Attentional U-Net for Hyperspectral Image Denoising](https://www.semanticscholar.org/paper/a4907c6986b8722979435dbfaae11752cd3e964c) | 光谱去噪、光谱图像语义分割 | 正式发表 | 摘要核验 |
| 2023 | [Multitask Sparse Representation Model-Inspired Network for Hyperspectral Image Denoising](https://www.researchgate.net/publication/372841359_Multitask_Sparse_Representation_Model_Inspired_Network_for_Hyperspectral_Image_Denoising) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2023 | [Self-Supervised Spectral–Spatial Graph Prototypical Network for Few-Shot Hyperspectral Image Classification](https://colab.ws/articles/10.1109%2Ftgrs.2023.3297216) | 地物与植被图像分类、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2023 | [SiamBAG: Band Attention Grouping-Based Siamese Object Tracking Network for Hyperspectral Videos](https://www.researchgate.net/publication/371556153_SiamBAG_Band_Attention_Grouping-based_Siamese_Object_Tracking_Network_for_Hyperspectral_Videos) | 光谱目标时序跟踪、光谱波段选择 | 正式发表 | 摘要核验 |
| 2023 | [Spatial–Spectral Split Attention Residual Network for Hyperspectral Image Classification](https://www.researchgate.net/publication/365952167_Spatial-Spectral_Split_Attention_Residual_Network_for_Hyperspectral_Image_Classification) | 地物与植被图像分类、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2023 | [Spectral 3D Computer Vision -- A Review](https://arxiv.org/abs/2302.08054) | 深度、法线与表面重建、光谱点云与表面映射 | 预印本 | 摘要核验 |
| 2023 | [Toward Universal Representation Learning for Multidomain Hyperspectral Image Classification](https://www.researchgate.net/publication/369837851_Towards_Universal_Representation_Learning_for_Multi-domain_Hyperspectral_Image_Classification) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2024 | [A cross-modal feature aggregation and enhancement network for hyperspectral and LiDAR joint classification](https://www.sciencedirect.com/science/article/pii/S0957417424020128) | 高光谱与LiDAR辅助分类、地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2024 | [A New Hyperspectral Unmixing Benchmark for Weak Signal Meat Contamination Detection](https://www.semanticscholar.org/paper/06fc7cecf53517c82a2122e6b50eb9e58ce81bc6) | 数据集与评测基准、光谱解混 | 正式发表 | 摘要核验 |
| 2024 | [CasFormer: Cascaded transformers for fusion-aware computational hyperspectral imaging](https://www.sciencedirect.com/science/article/abs/pii/S1566253524001866) | 计算光谱成像系统 | 正式发表 | 摘要核验 |
| 2024 | [Diffusion-Model-Based Hyperspectral Unmixing Using Spectral Prior Distribution](https://research-repository.griffith.edu.au/bitstreams/b5637d87-6134-4ab9-a955-cb8688fd1ccd/download) | 光谱解混 | 正式发表 | 摘要核验 |
| 2024 | [Early detection of sugarcane smut and mosaic diseases via hyperspectral imaging and spectral-spatial attention deep neural networks](https://www.sciencedirect.com/science/article/pii/S266615432400406X) | 待分类 | 正式发表 | 摘要核验 |
| 2024 | [Few-Shot Hyperspectral Image Classification Using Relational Generative Adversarial Network](https://ieeexplore.ieee.org/document/10741331/) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2024 | [HSIMamba: Hyperpsectral Imaging Efficient Feature Learning with Bidirectional State Space for Classification.](https://arxiv.org/abs/2404.00272) | 地物与植被图像分类、光谱表征预训练 | 预印本 | 摘要核验 |
| 2024 | [HSLiNets: Hyperspectral Image and LiDAR Data Fusion Using Efficient Dual Non-Linear Feature Learning Networks](https://arxiv.org/abs/2412.00302) | 高光谱与LiDAR辅助分类、光谱表征预训练 | 预印本 | 摘要核验 |
| 2024 | [Hy-Tracker: A Novel Framework for Enhancing Efficiency and Accuracy of Object Tracking in Hyperspectral Videos](https://arxiv.org/abs/2311.18199) | 光谱目标时序跟踪 | 正式发表 | 摘要核验 |
| 2024 | [Hyperspectral Image Denoising via Spatial–Spectral Recurrent Transformer](https://arxiv.org/abs/2401.03885) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2024 | [Hyperspectral Images Efficient Spatial and Spectral non-Linear Model with Bidirectional Feature Learning](https://arxiv.org/abs/2412.00283) | 地物与植被图像分类、光谱表征预训练 | 预印本 | 摘要核验 |
| 2024 | [Iterative Low-Rank Network for Hyperspectral Image Denoising](https://www.ablesci.com/scholar/paper?id=3DKONDJMr) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2024 | [LiDAR-Guided Cross-Attention Fusion for Hyperspectral Band Selection and Image Classification](https://doi.org/10.1109/TGRS.2024.3389651) | 高光谱与LiDAR辅助分类、地物与植被图像分类、光谱波段选择 | 正式发表 | 全文核验 |
| 2024 | [Material-Guided Multiview Fusion Network for Hyperspectral Object Tracking](https://ieeexplore.ieee.org/document/10445363/) | 光谱目标时序跟踪 | 正式发表 | 摘要核验 |
| 2024 | [Prototypical Network With Residual Capsule for Few-Shot Hyperspectral Image Classification](https://www.researchgate.net/publication/381789791_Prototypical_Network_with_Residual_Capsule_for_Few-Shot_Hyperspectral_Image_Classification) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2024 | [Spectral–Spatial Large Kernel Attention Network for Hyperspectral Image Classification](https://ieeexplore.ieee.org/document/10422824/) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2024 | [SSUMamba: Spatial-Spectral Selective State Space Model for Hyperspectral Image Denoising](https://ieeexplore.ieee.org/document/10643108/) | 光谱去噪 | 正式发表 | 摘要核验 |
| 2024 | [Unsupervised Band Selection Using Fused HSI and LiDAR Attention Integrating With Autoencoder](https://arxiv.org/abs/2404.05258) | 光谱波段选择、高光谱与LiDAR辅助分类 | 预印本 | 摘要核验 |
| 2025 | [Adversarial Dilated Large-Kernel Attention Networks for Cross-Domain Few-Shot Hyperspectral Image Classification](https://research-repository.griffith.edu.au/bitstreams/e1914e45-7dd5-4415-86ac-3641b36f4afc/download) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2025 | [Determining Mosaic Resilience in Sugarcane Plants using Hyperspectral Images](https://arxiv.org/abs/2501.16700) | 地物与植被图像分类 | 预印本 | 摘要核验 |
| 2025 | [HSLiNets: Evaluating Band Ordering Strategies in Hyperspectral and LiDAR Fusion](https://research-repository.griffith.edu.au/bitstreams/bc1a41ff-1eeb-463f-ae89-9b8947dae94f/download) | 高光谱与LiDAR辅助分类 | 正式发表 | 摘要核验 |
| 2025 | [Language-Enhanced Dual-Level Contrastive Learning Network for Open-Set Hyperspectral Image Classification](https://ieeexplore.ieee.org/document/10916695/) | 地物与植被图像分类、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2025 | [Lidar Guided Unsupervised Hyperspectral Imaging Band Selection for Fusion and Classification](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5182248) | 光谱波段选择、高光谱与LiDAR辅助分类 | 正式发表 | 摘要核验 |
| 2025 | [Multi-domain universal representation learning for hyperspectral object tracking](https://www.sciencedirect.com/science/article/pii/S0031320325000494) | 光谱目标时序跟踪、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2025 | [Multi-scale frequency-guided two-stream network for hyperspectral anomaly detection](https://www.sciencedirect.com/science/article/pii/S1569843225000020) | 高光谱异常检测 | 正式发表 | 摘要核验 |
| 2025 | [Pixel-Wise Shuffling with Collaborative Sparsity for Melanoma Hyperspectral Image Classification](https://openaccess.thecvf.com/content/WACV2025/papers/Ekong_Pixel-Wise_Shuffling_with_Collaborative_Sparsity_for_Melanoma_Hyperspectral_Image_Classification_WACV_2025_paper.pdf) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2025 | [Spatial–Spectral–Temporal Correlation Filter for Hyperspectral Object Tracking](https://ieeexplore.ieee.org/document/10890015) | 光谱目标时序跟踪 | 正式发表 | 摘要核验 |
| 2025 | [Spectral-spatial-temporal Modelling for Hyperspectral Object Tracking.](https://ceur-ws.org/Vol-4102/keynote1.pdf) | 光谱目标时序跟踪、光谱表征预训练 | 正式发表 | 全文核验 |
| 2025 | [Spectral–Spatial Synergy Guided Attention Network for Hyperspectral Image Classification](https://doi.org/10.1109/TGRS.2025.3603397) | 地物与植被图像分类、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2025 | [SSIT: A spatial–spectral interactive transformer for hyperspectral image denoising](https://www.sciencedirect.com/science/article/pii/S2666017225000823) | 光谱去噪、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2025 | [SUIT: Spatial-Spectral Union-Intersection Interaction Network for Hyperspectral Object Tracking](https://ieeexplore.ieee.org/abstract/document/11267013) | 光谱目标时序跟踪 | 正式发表 | 摘要核验 |
| 2025 | [UBSTrack: Unified Band Selection and Multimodel Ensemble for Hyperspectral Object Tracking](https://doi.org/10.1109/TGRS.2025.3571603) | 光谱目标时序跟踪、光谱波段选择 | 正式发表 | 摘要核验 |
| 2026 | [A comprehensive review of recent advancements in hyperspectral object tracking](https://api.crossref.org/works/10.1007/s10462-026-11625-3) | 光谱目标时序跟踪 | 正式发表 | 摘要核验 |
| 2026 | [Adaptive multi-stage fusion of hyperspectral and LiDAR data via selective state space models](https://www.sciencedirect.com/science/article/pii/S1566253525005615) | 高光谱与LiDAR辅助分类 | 正式发表 | 摘要核验 |
| 2026 | [An Information Entropy Feature Preservation-Based Band Selection and Noise Reduction Method for Hyperspectral Image Classification](https://api.crossref.org/works/10.1109/tgrs.2026.3668327) | 光谱波段选择、光谱去噪 | 正式发表 | 摘要核验 |
| 2026 | [Distance Learning-Based Prototypical Network With Multi-Domain Adaptation for Few-Shot Hyperspectral Medical Image Classification](https://api.crossref.org/works/10.1109/jbhi.2026.3651480) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2026 | [End-to-End Unmixing with Material Prompts for Hyperspectral Object Tracking](https://arxiv.org/abs/2605.20569) | 光谱解混、光谱目标时序跟踪、光谱表征预训练 | 预印本 | 摘要核验 |
| 2026 | [FedDA-HSI: Federated Class-Aware Framework for Hyperspectral Image Classification With Diffusion Augmentation](https://api.crossref.org/works/10.1109/tgrs.2026.3660734) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2026 | [Frequency-Aware Bias Calibration Attention Network for Hyperspectral Image Classification](https://api.crossref.org/works/10.1109/tgrs.2026.3733670) | 地物与植被图像分类 | 正式发表 | 摘要核验 |
| 2026 | [HyperSAM: A Promptable Foundation Model for Hyperspectral Remote Sensing](https://arxiv.org/abs/2609.37340) | 光谱表征预训练、光谱图像语义分割、数据集与评测基准 | 预印本 | 摘要核验 |
| 2026 | [HyperVision: A Channel-Adaptive Ground-Based Hyperspectral Vision Pre-trained Backbone](https://arxiv.org/abs/2605.17286) | 光谱表征预训练、光谱图像语义分割、光谱目标时序跟踪 | 预印本 | 摘要核验 |
| 2026 | [Implicit spatial-frequency fusion of hyperspectral and lidar data via kolmogorov-arnold networks](https://arxiv.org/abs/2605.14239) | 高光谱与LiDAR辅助分类、光谱表征预训练 | 预印本 | 摘要核验 |
| 2026 | [Sparse Tensor Attention for Hyperspectral Unmixing](https://api.crossref.org/works/10.1109/tgrs.2026.3734168) | 光谱解混 | 正式发表 | 摘要核验 |
| 2026 | [SPECIAL: Zero-Shot Hyperspectral Image Classification With CLIP](https://api.crossref.org/works/10.1109/tgrs.2026.3705304) | 地物与植被图像分类、光谱表征预训练 | 正式发表 | 摘要核验 |
| 2026 | [WS-Net: Weak-Signal Representation Learning and Gated Abundance Reconstruction for Hyperspectral Unmixing via State-Space and Weak Signal Attention Fusion](https://arxiv.org/abs/2603.09037) | 光谱解混 | 预印本 | 摘要核验 |
| **多光谱关联** | | | | |
| 2010 | [Multi-spectral remote sensing image registration via spatial relationship analysis on sift keypoints](https://research-repository.griffith.edu.au/bitstreams/2d8b3f79-5619-5af6-98c0-a0af4e61f712/download) | 几何标定与影像配准、光学影像配准 | 正式发表 | 摘要核验 |
| 2019 | [Directional variation in surface emissivity inferred from the MYD21 product and its influence on estimated surface upwelling longwave radiation](https://www.sciencedirect.com/science/article/pii/S0034425719301555) | 地表长波辐射估计 | 正式发表 | 摘要核验 |
| 2019 | [Influence of emissivity angular variation on land surface temperature retrieved using the generalized split-window algorithm](https://www.sciencedirect.com/science/article/pii/S0303243419301795) | 温度与发射率分离 | 正式发表 | 摘要核验 |
| 2019 | [Monitoring agricultural drought in Australia using brightness temperature observed by geostationary satellite](https://meetingorganizer.copernicus.org/EGU2019/EGU2019-2831.pdf) | 植被营养与环境胁迫监测 | EGU会议摘要 | 摘要核验 |
| 2020 | [Monitoring agricultural drought in Australia using MTSAT-2 land surface temperature retrievals](https://research.wur.nl/en/publications/monitoring-agricultural-drought-in-australia-using-mtsat-2-land-s/) | 植被营养与环境胁迫监测 | 正式发表 | 摘要核验 |
| 2020 | [On agricultural drought monitoring in Australia using Himawari-8 geostationary thermal infrared observations](https://opus.lib.uts.edu.au/bitstream/10453/149678/2/1-s2.0-S0303243420301434-main.pdf) | 植被营养与环境胁迫监测 | 正式发表 | 摘要核验 |

## 热红外关联论文的阅读边界

新增MYD21论文输出向上长波辐射通量，已有MODIS分裂窗论文输出地表温度；同样研究方向发射率，不代表同一任务。MTSAT-2 TRI与已有Himawari-8干旱论文分别使用不同传感器与时期，不混用波段和实验。MTSAT正式出版为2020年，图11产量单位按[2020勘误](https://doi.org/10.1016/j.rse.2020.111661)使用t/ha。以上均为多光谱关联，详细实验仍待全文。2019 EGU摘要使用Himawari-8 2015–2018数据，单独保留，不自动与期刊合并；[TRI学习笔记](jun-zhou-thermal-tri-note.md)补读期刊指定方法段，解释通道、差分近似和指数方向。

## 复现笔记模板

1. **问题与假设**：输入、输出、传感器与波段、混合模型、已知/未知变量。
2. **方法**：目标函数、约束、每个模块/迭代的输入输出；论文版本与代码版本。
3. **实验**：数据下载来源、训练/验证/测试划分、空间重叠、预处理与随机种子。
4. **比较**：原文基线、相同协议下的指标、消融、失败情况、运行时间与硬件。
5. **证据边界**：摘要已知、全文已核、复现结果和个人猜测分开记录。

## 仍需补齐

DBLP合并目录365条（364条快照加1条专题补充）现有355条范围决定、10条待核。Scholar非关键词209条差集仍有10条待核，当前机构完整作者目录及来源日期差异仍需继续交叉检查。已收录论文的正式全文、原图、代码和逐项实验核验也未全部完成；下一步优先解决频率/光学波段与RGB/IRRG输入不明的记录。
