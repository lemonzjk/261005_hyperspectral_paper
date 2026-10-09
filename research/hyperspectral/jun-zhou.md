# 周峻老师高光谱论文专项调研

实际检索截止：2026-10-10。优先处理作者范围，继续保留全领域矩阵；本记录不声称所有论文已经收齐。

## 身份与来源覆盖

目标是 Griffith 的 Jun Zhou（周峻）：ORCID `0000-0001-5822-8233`、DBLP `99/3847-1`、Scholar `6hOOxw0AAAAJ`。不按字符串姓名合并其他同名作者。

| 来源 | 实际方法与分页 | 当前覆盖 | 缺口 |
| --- | --- | --- | --- |
| ORCID公共API | person、works以及269个唯一put-code分三批1–100/101–200/201–269读取；逐项核对返回ID | 263组269条书目拉取完成，无缺失ID；135组题名直接命中、128组无命中；263组均已有范围决定 | 书目完整不等于作者全部成果或光谱范围审查完成；无摘要，外部来源有日期/类型/姓名简写差异 |
| DBLP | 用户所给身份页面与ORCID对应；HTML可读；XML各镜像尝试留证 | 仅身份与局部页面核验 | HTTP200导出其实是HTML验证页，不是XML成功；完整HTML目录尚未扫描 |
| Google Scholar | 用户主页 cstart=0/100/200/300、pagesize=100 | HTTP200，取得387条记录、384个唯一题名（381个题名-年份组合）；原始HTML与解析快照已保存 | 引用元数据、作者归属及 Scholar 独有条目仍需逐篇核；页面列项不等于正式书目全集 |
| 作者ANU旧主页 | publication.html完整旧页面，列项2001–2012，逐篇追踪公开PDF | 本批5篇原稿及DOI核验 | 主页中的Accepted年份、作者顺序及拼写可能与正式版不同；不覆盖当前所有成果 |
| Griffith当前主页 | ORCID提供的个人页 | 仅取得JS页面壳 | 当前完整论文目录尚未取得 |

所有源文件和失败状态在 `sources/jun-zhou-*`；263组逐项题名、外部ID、发现状态见 `sources/jun-zhou-orcid-inventory.json`，逐项决定分年度及早期尾项文件保存。没有关键词的128组不作为自动排除；未来卷期日期必须核在线发表，不将2026年12月卷期自动认作已发生的事件。

## 首批闭环（2009–2011）

新增5，更新既有论文0，匹配既有1，排除0。首批263组中5收录、1关联既有，257待逐篇处理；后续累计状态见下节。数量是来源组，不是独立方法数量；同DOI、同题不同版本及扩展版需继续去重。

五篇分别是2009 OTCBVS/CVPR Workshops高光谱纹理描述、2010 ICIP CCRE配准、2011 TGRS L1/2-NMF、2011 ICCV材料用户颜色配置、2011 IGARSS结构稀疏分类。五篇均阅读原稿摘要，并仅对明确记录的局部页读图或实验；不标为全文阅读。ICIP登记拼写Regisration保留，正常拼写作为审计别名；作者顺序按原稿和精确DOI。2009作者稿10页与正式8页不混用页码。L1/2两份2011年作者稿的摘要差异单列，不借早稿“无偏”表述充当正式定理。

新增2任务标签和4方法标签，边界由本批原稿形成，未调整三维13方向。原图保存纹理作者稿Figure3第7页、颜色稿Figure2第3页；ICIP/IGARSS全页图版扫描仅输入与结果图，无独立框架图。L1/2全文图版仍需进一步逐页复核。

## 继续顺序

当前263组范围决定已闭环：收录128、关联既有10、排除125、待审0；页面135篇。早期尾项（2001–2011及2015重复登记）见 `sources/jun-zhou-early-remainder-decisions.json`，2010多光谱配准已按明确的Landsat多光谱范围排除。该专题仍不等于作者全部成果或任一场所年度系统检索；下一步继续做 DBLP 非关键词差集、Scholar/机构目录差集及已收录条目的摘要/全文核验。

## 2008–2013原稿范围与版本续接

本轮新增3、更新3、去重0、排除2；新增2方法标签，扩展1个已有结构稀疏小波标签定义，保存2张原方法图。累计263组中8收录、1关联既有、2排除、252待处理。页面Jun Zhou共9篇；来源组与独立方法数量不同。

- DICTA2010 L1/2-NMF：原稿7页、正式447–453页；本稿Cuprite250×190/188波段局部已核，同名同作者关联2011期刊方法族，正式扩展声明和完整差异仍待核。
- Springer2011调和描述章节：精确DOI10.1007/978-3-642-11568-4_8、179–199页；公开作者稿Chapter1共24页，与正式章节编号/页码分开。原稿Figure1.1第11页保存；同作者及共享图与2009纹理稿关联，未推定两篇全文相同。自采集玩具/硬币实验单列，不借2009蛾虫/车辆结果。
- TGRS2013结构稀疏小波：正式51(4):2276–2291；仓储2013封面和2012-06-13作者草稿分开。引言明确扩展IGARSS2011，[20]为该四作者会议稿；期刊三作者、lasso/group/sparse group约束、加速近端梯度、非线性线性模型混合与四数据实验独立记录。Figure1在PDF第9页/稿内第8页保存。Indian Pine数据段删20个噪声波段后仍写220，记冲突待正式版，不自行写成200。
- DICTA2008 Stable Distributions：原稿RGB/VisTex与Fourier频率，未找到明确光学高光谱关系，留证排除；精确登记本次429，但公开原稿/ORCID可核书目。ECCV2010 Saliency Learning：普通RGB/MSRA显著目标，亦排除。两者若后续有明确高光谱基础方法关系可重新审查；同作者不足以收录。

三篇新增均为摘要及指定局部页阅读，不标全文；两篇排除同样不宣称阅读全文。原稿、失败记录、范围决定及版本证据见sources/jun-zhou-followup-batch-decisions.json。下一步处理2012直接题名命中，同时核验2010多光谱配准与非题名命中项的明确联系；继续补DBLP/当前机构目录差集。

## 2012来源限定范围筛选

本轮新增2、更新0、去重0、排除4，另2010多光谱配准保留待核；新增分类0、原图0。累计263组：已入10、关联既有1、排6、待246。页面Jun Zhou 11篇，其中2篇只有正式题名核验；数量不代表全部成果或独立方法数。

- ICICEE2012非下采样金字塔/核非锐化异常检测：10.1109/ICICEE.2012.350，1320–1323，五作者姓在前规范显示但保留顺序。ORCID目标身份关联已核，单篇机构待原文。IEEE入口202、原PDF不可得，仅题名入库并待分类。
- SPIE AOMATT2012 Shearlet异常检测：10.1117/12.978636，卷8419、文章号84190I（大写I）。旧作者CV与登记六作者对应，ORCID原条目缺DOI已补。HTTP200实为Incapsula失败HTML；第三方摘要仅供发现，不借HYDICE、RX流程或性能作已核事实。仅题名入库，两稿版本关系未确认。
- ADMA/PAKDD两篇群记录关联：出版社原摘要明确数据库/历史普查范围，排除。SSPR/SPR增量部件模型、ICPR轮廓检测原摘要为普通对象图像，当前无明确高光谱联系，暂排除并保留重审。ICPR官方原稿现404，仅搜索缓存首屏可读；不移用2013期刊实验。
- IGARSS2010多光谱配准：原作者稿为Landsat多光谱，SIFT空间邻域与局部加权映射；真实多光谱联系明确，但与高光谱的基础关系尚无证据，保留待核，不因同作者自动收录。

上述范围只有ORCID2012六组与2010一组；不是作者2012全部成果或任何场所年度完整检索。原摘要/全文/图版、DBLP完整目录差集、当前机构及Scholar分页继续补查。详见sources/jun-zhou-2012-batch-decisions.json。下一步按作者ORCID2013及非题名命中逐篇推进，受限的2012两篇继续追踪公开原稿。

## 2013高光谱原摘要批次

新增6、更新0、去重0、排除0；新增1任务及4方法标签、保存2方法示意图。累计263组已入16、关联既有1、排6、待240；页面Jun Zhou 17篇。ORCID2013有16组：6本批处理、1此前入库，余9组待范围审查，不代表2013作者完整成果或任何场所年度全量。

- ICCV Workshops植物建模：CVF正式6页与Griffith作者稿分开；高光谱分割/SIFT/SfM，受控转台概念验证。CVF BibTeX六月与登记十二月不一致，只用2013；不自动改变三维专题。
- ICIP/IGARSS超图选带：分别四/五作者、AVIRIS与APHI/APHI；公开仓储精确题名和DOI核对后下载ORIGINAL。IGARSS DOI检索0并非无论文，完整题名查询3结果中找到了匹配原稿。第三方IGARSS页面误挂Bai/Guo/Yanyang Wang/Zhang/Zhou近题期刊稿，禁止混用作者、组稀疏法及三数据集；明确扩展关系待核。
- TIP SBE：单幅高光谱/多光谱，shapelet阴影、反射/镜面约束估计与最小二乘照明更新。shapelet不称小波；正式16页与作者稿30页分开。原Figure3（PDF10/稿内9）几何示意保存；SFU脚注RGB数据入口可读，MSRA候选旧地址跳首页，均不冒充高光谱下载。
- ICIP光谱显著：Itti中心—周围模型三种谱替换；局部实验13图选区/人工框，原数据非显著专用。Figure1（仓储PDF3/稿内2）四组波段方法示意保存，不称完整框架。
- DICTA生物炭：机构完整摘要明确土壤/生物炭解混、像元平均丰度、最小二乘/NMF与多项式/RMSE实验；仅摘要，未知样本数/误差/原图不补造。Griffith条目无ORIGINAL，旧PDF404，USC只有JS壳。

5公开原稿仅摘要和指定局部页/图版阅读，未标全文；植物6页、ICIP选带6页含封面、IGARSS选带5页含封面已逐页看图，只有输入/结果图而无独立框架图。两张原图为方法示意，不是生成图。详见sources/jun-zhou-2013-hsi-batch-decisions.json；下一步2013剩余9组、近题期刊版本及DBLP完整差集。

## 2013其余九组范围闭环

本批新增0、更新入库论文0、去重0、排除9；更新1条2012会议排除项的版本证据。分类/原图无变化。累计263组已入16、关联既有1、排15、待231；页面17篇。

九组全部取得公开机构原稿，读取原摘要及指定输入/实验/版本局部，不标阅读全文。3D人脸仅FRGC range通道；局部纹理为灰度AR/FERET；hashing为CIFAR-10；颜色拼接为RGB/lαβ；裂缝为线扫描强度图；SIMD为OpenCV通用基准。三维、多视角、线扫描、通用计算或同作者都不自动证明光学高光谱联系。

GRSL层级分析实际为QuickBird/GeoEye-1 VHR对象分析，HSI只在背景引用[3]多尺度分割；记录这条联系，但它未证明本稿采用该高光谱方法或提出高光谱贡献。IGARSS边缘核融合为上海QuickBird的SIFT/Hue/LSS对象分类。二者当前高光谱关系不足，暂排除，后续有明确使用/基础关系时可重审；不将平台可能具有多光谱通道当成本稿已核高光谱输入。

TIP2013轮廓结构原稿明确“extends from”ICPR2012并以[21]列其六作者、题名和2524–2527页；期刊为五作者。旧2012排除项仅补版本证据，不借期刊ETHZ/INRIA/PASCAL实验充当会议实验。详见sources/jun-zhou-2013-other-scope-decisions.json。

### ORCID来源年份覆盖

下表统计拉取的263组，不是全作者成果或正式场所年度覆盖；年份按ORCID，可能与正式版不同。已审表示有收录/关联/排除决定，摘要/全文核验仍逐篇区分。未来卷期不视为已发生发表。

| ORCID年份 | 来源组 | 收录 | 关联既有 | 排除 | 待审 | 来源范围状态 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| 2001 | 1 | 0 | 0 | 1 | 0 | 早期尾项已按范围决定 |
| 2004 | 1 | 0 | 0 | 1 | 0 | 早期尾项已按范围决定 |
| 2005 | 2 | 0 | 0 | 2 | 0 | 早期尾项已按范围决定 |
| 2006 | 3 | 0 | 0 | 3 | 0 | 早期尾项已按范围决定 |
| 2007 | 3 | 0 | 0 | 3 | 0 | 早期尾项已按范围决定 |
| 2008 | 4 | 0 | 0 | 4 | 0 | 早期尾项已按范围决定 |
| 2009 | 5 | 1 | 0 | 4 | 0 | 早期尾项已按范围决定 |
| 2010 | 8 | 1 | 1 | 6 | 0 | 来源组筛选完成 |
| 2011 | 9 | 3 | 1 | 5 | 0 | 来源组筛选完成 |
| 2012 | 6 | 2 | 0 | 4 | 0 | 已拉取来源组筛选完成 |
| 2013 | 16 | 7 | 0 | 9 | 0 | 已拉取来源组筛选完成 |
| 2014 | 8 | 1 | 0 | 7 | 0 | 已拉取来源组筛选完成 |
| 2015 | 19 | 10 | 2 | 7 | 0 | 来源组范围筛选完成 |
| 2016 | 15 | 7 | 1 | 7 | 0 | 来源组筛选完成 |
| 2017 | 19 | 11 | 2 | 6 | 0 | 来源组筛选完成 |
| 2018 | 31 | 16 | 2 | 13 | 0 | 来源组筛选完成 |
| 2019 | 8 | 7 | 0 | 1 | 0 | 来源组筛选完成 |
| 2020 | 9 | 7 | 0 | 2 | 0 | 来源组筛选完成 |
| 2021 | 8 | 6 | 0 | 2 | 0 | 来源组筛选完成 |
| 2022 | 19 | 16 | 0 | 3 | 0 | 来源组筛选完成 |
| 2023 | 10 | 8 | 0 | 2 | 0 | 来源组筛选完成 |
| 2024 | 21 | 10 | 1 | 10 | 0 | 来源组筛选完成 |
| 2025 | 17 | 8 | 0 | 9 | 0 | 来源组筛选完成 |
| 2026 | 21 | 7 | 0 | 14 | 0 | 来源组筛选完成；5篇摘要核验 |

263组 ORCID 来源组现在均有范围决定；这不是全年作者或期刊/会议系统覆盖完成。下一步处理 DBLP 非关键词目录、旧年无题名命中摘要、近题版本及 Scholar/机构差集。

## 2014来源组与自然色版本批次

新增2、更新入库0、去重0、排除7；补1条旧排除项的引用关系，新增1方法标签、2张原Figure1。累计263组18入、关联既有1、22排、222待，页面19篇。2014八组仅该来源范围闭环1入7排；另2016近题1入。不等于全年作者成果或场所年度全量。

ICPR2014三作者、70–75页、封面加6页；原Figure1在PDF4。HSI/RGB少量像元对应、共同三维颜色嵌入和逆投影。三维是特征维度，不是场景几何；Washington及两个地面场景，不借期刊实验。TGRS2016四作者、54(6):3151–3162，正式2016年6月，DOI含2015不是年份；Accepted Manuscript封面加12页，Figure1在PDF6/稿内5。新增Moffett Field、G03/D04命名、同传感器复用/指定波段/语义相近地点等按本版本记录。原稿未找到明确扩展ICPR2014的声明，按相同概念方法族关联，正式扩展关系及首次online日期待核；不是两个独立方法的数量声明。两篇均只原摘要/指定局部，不标全文，不引用未核表中数值。

其余人口普查、普通hashing、三维人脸及VHR对象检测暂排除；range、图形三维、同作者、卫星可能具有多光谱功能不构成高光谱依据。三项Crossref429，公开原稿/机构元数据支持筛选；失败响应不当成功书目。2013 RGB拼接被2014[16]/2016[29]背景引用，但未见明确继承声明；记录原2013RGB输入与后稿引用措辞不一致，保留基础关系重审，不将原RGB稿标HSI。详情sources/jun-zhou-2014-scope-decisions.json。

下一步2015逐篇、早年非题名命中摘要、正式版本及外部目录差集；Scholar/DBLP限制、原图与全文缺口仍未解决。

## DBLP精确作者差集初筛

通过 DBLP SPARQL `authoredBy` 精确关联 person ID `99/3847-1`，取得364条去重发表记录；DBLP网页及 XML/BibTeX 导出仍返回验证页；SPARQL精确作者查询可用。对题名含 hyperspectral、spectral、LiDAR、multispectral 或 unmixing 的8条差集逐项核对：HSLiNets预印本与正式论文归同一方法族，CRF/材料跟踪两条预印本由目录正式记录覆盖，4条通用SAR/城市LiDAR、编辑和勘误记录排除，新增2条预印本并完成 arXiv 摘要级核验：HSIMamba、《Hyperspectral Images Efficient Spatial and Spectral non-Linear Model with Bidirectional Feature Learning》；另以 CEUR 三页全文确认 STRL@IJCAI 高光谱跟踪报告的作者为目标 Jun Zhou（PDF明示 Griffith 与 ORCID 0000-0001-5822-8233）。

DBLP精确作者、ORCID、Scholar 和 arXiv 记录均保留原始版本，不把预印本当作正式发表；非关键词的356条 DBLP 记录仍需按任务逐项审查。详情见 `sources/jun-zhou-dblp-sparql.json`、`jun-zhou-dblp-screening.json` 和 `jun-zhou-dblp-arxiv-metadata.json`。

## Scholar题名差集初筛

Scholar分页共387条记录；本轮对题名含 hyperspectral、spectral、spectroscopy 或 LiDAR 的178条作初筛。新增41条高光谱/多光谱书目，均以 Scholar 书目核验后入库；其中28条为题名暂定、12条补有摘要级核验（9条 arXiv、3条 ScienceDirect/CVF）；STRL报告另有三页 CEUR 全文核验。132条规范化题名与现有目录重复，5条为专利、勘误、通用LiDAR/光谱或编辑性记录而排除，待审清零。

新增项覆盖计算高光谱成像、目标跟踪、光谱—LiDAR分类、异常检测、解混、去噪、农业/生物医学分类和挑战基准；多光谱SIFT配准单列为 multispectral 关系，不因同作者自动视作高光谱。Scholar题名变体与正式标题按 DOI/题名版本归并，避免重复计数。逐项记录见 `sources/jun-zhou-scholar-screening.json`，原始分页见 `sources/jun-zhou-scholar-pages-0-387.json`；9条 arXiv记录已补原站摘要核验，仍未完成全文；其余新增条目尚未完成摘要和全文核验。

下一步扫描 DBLP 非关键词目录、作者机构页与引用链差集；不把 Scholar 引用数或单一作者串匹配当作作者归属证据。

## 2024–2026高光谱来源组筛选

2024–2026共59组完成范围决定：新增26篇、关联既有1篇、排除33篇。26篇直接高光谱题名已以Crossref正式书目入库；其中 ORCID 2024 已有12篇、ORCID 2025已有8篇直接高光谱记录补摘要级核验；ORCID 2026 的 FedDA-HSI、SPECIAL、HOT综述、STU、频率偏置校准网络也已补公开摘要，其余仍保留题名暂定状态。

- 2024收录高光谱农业、解混、分类、去噪、LiDAR融合和视频跟踪；其中 ORCID 十二篇已补摘要级核验；2025收录去噪、少样本分类、LiDAR融合、视频跟踪、异常检测和医学分类，其中 ORCID 八篇与 Scholar 差集三篇已补摘要级核验；2026收录医疗高光谱、异常/目标跟踪综述、选带、分类和解混。
- 通用视觉、RGB-D、普通遥感、变化检测、红外可见光融合及其他无明确高光谱输入记录排除；2024 LiDAR-Guided Cross-Attention Fusion 已是既有目录条目，按重复登记处理。

逐年决定见 `sources/jun-zhou-2024-decisions.json`、`jun-zhou-2025-decisions.json`、`jun-zhou-2026-decisions.json`；2024摘要补充见 `sources/jun-zhou-2024-abstract-followup.json`、`sources/jun-zhou-2024-abstract-followup-2.json`；2025摘要补充见 `sources/jun-zhou-2025-abstract-followup.json`、`sources/jun-zhou-2025-abstract-followup-2.json`、`sources/jun-zhou-2025-abstract-followup-3.json`；2026摘要补充见 `sources/jun-zhou-2026-abstracts.json`、`sources/jun-zhou-2026-abstracts-2.json`、`sources/jun-zhou-2026-abstracts-3.json`，Crossref响应保存在 `sources/`。下一步补齐其余2022–2026暂定条目摘要，继续Scholar/DBLP目录差集。

## 2023高光谱来源组筛选

新增8篇、排除2篇；2023 ORCID来源组10组完成范围决定。8篇题名直接指向高光谱跟踪、去噪、少样本分类、波段注意力或跨域表示，均以题名和Crossref正式书目入库为暂定状态，等待摘要核验。

- 排除通用零样本学习和人员重识别。题名筛选不替代摘要阅读，不从方法名称外推数据、性能或版本关系。

逐项决定见 `sources/jun-zhou-2023-decisions.json`；Crossref响应和来源访问见 `sources/`。下一步补齐2022–2023暂定条目的摘要，处理ORCID 2024及早年待审组，并继续Scholar/DBLP目录差集。

## 2022高光谱来源组筛选

新增16篇、排除3篇；2022 ORCID来源组19组现已完成范围决定。16篇题名直接指向高光谱分类、融合、域适配、复原、去噪、解混、跟踪、边界检测、选带或农业制图，均先以题名和Crossref正式书目入库为暂定状态，等待摘要核验。

- 排除CNN综述、RGB-D疲劳检测和通用人员重识别。题名筛选不替代摘要阅读，不从方法名称外推数据、性能或版本关系。

逐项决定见 `sources/jun-zhou-2022-decisions.json`；Crossref响应和来源访问见 `sources/`。下一步补齐这16篇摘要与全文边界，处理ORCID 2023及早年待审组，并继续Scholar/DBLP目录差集。

## 2021高光谱来源组筛选

新增6篇、排除2篇；2021 ORCID来源组8组现已闭环。收录Gabor超像素无监督LDA、Plug-and-Play异常检测、医疗高光谱判别张量嵌入、轻量CNN、超像素高光谱—LiDAR决策融合和单目高光谱深度估计。

- 6篇均有机构/出版社摘要、PubMed、OpenAlex或作者来源及正式DOI核验；医疗高光谱论文明确膜性肾病和白细胞识别，深度估计论文明确色差、离焦和材料图传播。
- 立体视差网络和参数高效双线性投影为一般视觉/深度网络，公开摘要未确认高光谱输入，排除。

逐项决定见 `sources/jun-zhou-2021-decisions.json`；来源访问见 `sources/jun-zhou-2021-primary-access.json`，Crossref响应保存在 `sources/`。本批摘要或局部来源核验，不标全文。下一步处理ORCID 2022及早年待审组，并继续Scholar/DBLP目录差集。

## 2020高光谱来源组筛选

新增7篇、排除2篇；2020 ORCID来源组9组现已闭环。收录光谱混合模型展开网络、超像素加权标签传播、自适应图多层NMF、ICV高光谱—LiDAR融合、材料高光谱视频跟踪、GMC稀疏NMF和子空间结构NMF。

- 7篇均以作者稿、出版社/机构摘要、IEEE摘要或DBLP及正式DOI核验；材料跟踪论文同时确认配对高光谱—彩色视频数据集。
- 皮肤病跨域迁移论文明确使用临床皮肤图像，菠萝果实与花朵检测为一般遥感目标检测，均未确认高光谱输入，排除。

逐项决定见 `sources/jun-zhou-2020-decisions.json`；来源访问见 `sources/jun-zhou-2020-primary-access.json`，Crossref响应保存在 `sources/`。本批摘要或局部来源核验，不标全文。下一步处理ORCID 2021及早年待审组，并继续Scholar/DBLP目录差集。

## 2019高光谱来源组筛选

新增7篇、排除1篇；2019 ORCID来源组8组现已闭环。收录波段注意力选带、L0梯度低秩张量复原、Gaussian–Gabor特征、协同表示多尺度超像素融合、杂草多分辨率分类、TV非负张量解混和CNN—CRF深特征分类。

- 7篇均有作者论文、出版社摘要、DBLP或公开索引与正式DOI核验；正式期刊卷期、ORCID登记年份及局部来源分别保留。
-《Multiscale Visual Attention Networks for Object Detection in VHR Remote Sensing Images》公开题名与摘要未确认高光谱输入，按VHR遥感目标检测排除，不因作者身份或遥感泛称收录。

逐项决定见 `sources/jun-zhou-2019-decisions.json`；来源访问见 `sources/jun-zhou-2019-primary-access.json`，Crossref响应保存在 `sources/`。本批摘要或局部来源核验，不标全文。下一步处理ORCID 2020及早年待审组，并继续Scholar/DBLP目录差集。

## 2018高光谱来源组筛选

新增16篇、关联既有2篇、排除13篇；2018 ORCID来源组31组现已闭环。正式期刊年份与ORCID登记年份有差异时按正式记录入库，例如异常检测论文正式出版年为2019；不把版本年份混作新增论文。

- 收录高光谱—LiDAR判别相关融合、非局部非负Tucker去噪、光谱—空间SIFT配准、皮肤镜数据集、坚果品质检测、波段权重网络、异常成分检测、重加权稀疏低秩张量去噪、异构高光谱—LiDAR融合、土壤碳氮同位素估计、材料显著目标检测、高光谱视频跟踪、超像素张量解混、三元组深特征分类和森林凋落物碳官能团估计。
-《An Efficient Method for Boundary Detection from Hyperspectral Imagery》只有Crossref与ACCV目录，保留高光谱关系但分类状态为待定，不补方法、数据或性能。
- 136号记录是已入库ICIP 2017非局部张量去噪的重复登记；137号记录与JSTARS 2018非负Tucker正式记录重复，均不重复计数。通用哈希、子空间检索、单应性、人脸、液滴和产品量化等13组排除。

逐项决定见 `sources/jun-zhou-2018-decisions.json`；来源访问和下载状态见 `sources/jun-zhou-2018-primary-access.json`，Crossref响应及局部PDF保存在 `sources/`。本批摘要、作者稿或短文局部核验，不标全文。下一步处理ORCID 2019及早年待审组，并继续Scholar/DBLP目录差集。

## 2017高光谱来源组筛选

新增11篇、排除6篇；WHISPERS 2015两条为既有版本。2017 ORCID来源组19组现为13篇收录、6篇排除、0篇待审；其中材料边界会议稿仅题名/目录核验，保留待分类状态。

- 收录跨场景字典域适配、矩阵—向量非负张量盲解混、控制采样、解混引导深特征、残差高光谱超分辨率、差分权重选带、结构一致性稀疏编码、非局部张量去噪、区域结构NMF及森林凋落物PLSR。
- Material Based Boundary Detection 仅有Crossref和DICTA目录，确认高光谱对象但未取得摘要，暂不补方法、数据或性能。
- 微流控综述、点云电力塔检测、通用哈希、黑色素瘤图正则NMF、三维人脸曲线匹配无明确高光谱关系，排除。
- 2017两条WHISPERS记录的正式论文已在2015版本审计纳入，不重复计数。

逐项决定见 sources/jun-zhou-2017-decisions.json；Crossref和作者稿访问见 sources/jun-zhou-2017-*-crossref.json、sources/jun-zhou-2017-primary-access.json。下一步处理ORCID 2018及早年待审组，并继续Scholar/DBLP目录差集。

## 2016高光谱来源组筛选

新增7篇、排除7篇；自然色TGRS记录为既有条目。2016 ORCID来源组15组现为8篇收录、7篇排除、0篇待审；总库增7篇，保留作者稿、摘要和正式DOI的阅读边界。

- TGRS部分已知端元NMF：公开作者稿摘要和方法局部确认部分端元先验约束及合成/真实实验；正式卷期由Crossref核验。
- GRSL类间距离波段加权：作者稿确认多类二元SVM逐类波段权重和高光谱分类；正式页码由Crossref核验。
- IGARSS CNN-CRF：作者稿确认超像素、CNN、CRF均值场展开用于高光谱分割；短文只保留初步结论。
- IGARSS一类SVM选带：作者稿确认判别加权波段选择；完整数据集和参数待全文。
- ICIP端元稀疏图NMF：作者稿确认同时学习端元图与NMF解混，并扩展丰度平滑。
- ICIP结构判别NMF：公开摘要确认局部亲和、远距离排斥和稀疏约束；正文未取得，证据级别较低。
- ICIP张量形态学剖面：作者稿确认高阶张量形态学及两个高光谱影像分类实验；DBLP核对作者和页码。
- 3D人脸、点集匹配、通用部件学习、稀疏编码、流形/最大间隔哈希等7组无明确高光谱关系，排除；不因同作者或通用图学习自动收录。

来源与逐项决定见 sources/jun-zhou-2016-decisions.json；Crossref响应和作者稿访问状态见 sources/jun-zhou-2016-*-crossref.json、sources/jun-zhou-2016-primary-access.json。7篇新增均未标全文阅读。下一步处理ORCID 2017及早年待审组，并继续对Scholar/DBLP目录做差集。

## 2015高光谱原摘要与版本批次

新增8、更新2旧会议版本证据、去重1、排除0；新增7方法标签，保存4原图。累计263组26入、关联既有2、22排、213待；页面27篇。该批只审2015来源十九组中的九组。

FG2015 3D LDP的三维为x/y/λ，输出身份特征不是面部几何，原Figure3 PDF4。WACV逐波段SfM和3D注册真正输出几何，但仍只总库；AOTF及自采模型与Stanford纯几何验证分开，9页图版只有输入/结果及文字算法。IGARSS逐类SVM间隔权重选带为Indian Pines/Salinas，原5页图版无独立框架。DICTA双图正式2014-11，源ORCID/封面2015不同；空间/特征图、Urban实测和合成，9页图版无框架。

ICIP MMSNMF原Figure1 PDF3；端元与丰度各自图，不误作空间/特征双图。摘要提真实数据，而已读局部实验为合成，具体实测设置保留待核。登记constrainted与正文constrained拼写不混改。TGRS MTSNMF共享系数/各波段字典，原Figure1 PDF8/稿内7；正式2015-05:2621–2639，公开作者稿36页。ORCID190/192题名差异为同DOI、同三作者/摘要，只入库一次。

DICTA相对深度只机构完整摘要，边缘直方图散焦与邻域谱差生成相对稀疏深度，合并/归一化/光滑；传感器、数据、误差和原图未知。JSTARS五作者原稿终于匹配：初始Semisupervised查询2结果无精确匹配，Semi-supervised变体精确匹配后下载；Figure1 PDF5/稿内4只展示超图构造。原引言[20]/[21]对应两2013会议且指出未考虑空间关系，本稿加入空间和组稀疏，三数据APHI/Indian Pines/Washington。补旧会议关联同方法族，不借期刊数据/作者或假称已核正式扩展声明。八篇均只摘要及记录局部，不标全文，未报未核性能数值。

2015余十组首轮决定

本批新增3、排除7、待审0：新增《A Large Margin Learning Method for Matching Images of Natural Objects with Different Dimensions》书章节、《Automatic Estimation of Soil Biochar Quantity via Hyperspectral Imaging》书章节及《Learning Graph Model for Different Dimensions Image Matching》GbRPR会议论文。三篇均明确以高光谱影像为输入或匹配对象；前两篇保留章节原始DOI与摘要边界，GbRPR条目保留作者稿和正式页码。

《An Incremental Structured Part Model for Object Recognition》《Local and Global Regularized Sparse Coding for Data Representation》及《Object Classification via Feature Fusion Based Marginalized Kernels》分别核到通用目标识别、通用稀疏编码和QuickBird VHR实验，未因 spectral/spatial 字样收录。《Isometric Mapping Hashing》为通用流形哈希；两条Preface/整书记录不是独立论文，均排除。《Automatic estimation...》的2015 ch011与后续2018 ch073是不同书籍、不同DOI，禁止混用摘要、页码和实验事实。

WHISPERS 版本年份差集

Scholar 分页和 DBLP 记录补出两条 ORCID 登记年份为2017、正式 DOI/会议为2015的高光谱论文：《Multiple graph regularized NMF for hyperspectral unmixing》（DOI 10.1109/WHISPERS.2015.8075468）与《On the sampling strategies for evaluation of joint spectral-spatial information based classifiers》（DOI 10.1109/WHISPERS.2015.8075474）。前者由题名、官方技术程序和DBLP确认，摘要/全文待取得，条目保持待分类；后者取得机构作者稿和摘要，已核光谱—空间分类评估问题。两篇不与 ORCID 2017 年份重复计数，版本差异保留在 `sources/jun-zhou-whispers-2015-version-audit.json`。

本批仅摘要或作者稿指定局部核验，未标全文阅读；逐条决定、来源链接及阅读边界见 `sources/jun-zhou-2015-remainder-decisions.json`。ORCID 2015 十九组现已完成来源组筛选（13收录、1同DOI重复、7排除；其中两条 ORCID 2017 年份按 WHISPERS 2015 DOI/正式目录解析）；这不等于作者2015所有成果或任一场所年度全量检索。Scholar分页已取得387条记录；2015两篇 WHISPERS 条目与 ORCID 2017 年份不一致，需按 DOI/正式目录核版本。下一步处理 ORCID 2017 及早年待审组，并补 DBLP 完整目录差集及早年无题名命中。
