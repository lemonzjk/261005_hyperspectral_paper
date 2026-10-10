# 周峻老师高光谱论文专项调研

作者目录快照截止：2026-10-10；原稿与资源续核：2026-10-11。优先处理作者范围，继续保留全领域矩阵；本记录不声称所有论文已经收齐。

## 身份与来源覆盖

目标是 Griffith 的 Jun Zhou（周峻）：ORCID `0000-0001-5822-8233`、DBLP `99/3847-1`、Scholar `6hOOxw0AAAAJ`。不按字符串姓名合并其他同名作者。

| 来源 | 实际方法与分页 | 当前覆盖 | 缺口 |
| --- | --- | --- | --- |
| ORCID公共API | person、works以及269个唯一put-code分三批1–100/101–200/201–269读取；逐项核对返回ID | 263组269条书目拉取完成，无缺失ID；135组题名直接命中、128组无命中；当前262组有范围决定、UEMM重开1组待核 | 书目完整不等于作者全部成果或光谱范围审查完成；无摘要，外部来源有日期/类型/姓名简写差异 |
| DBLP | SPARQL精确authoredBy关联目标person ID；364条快照另加1条身份核验的STRL专题补充 | 合并365条：355条已决定，10条待核 | 网页/XML仍受验证页限制；快照不等于作者全部成果；10条的模态、正式版本及部分身份仍待核 |
| Google Scholar | 用户主页 cstart=0/100/200/300、pagesize=100 | HTTP200，取得387条记录、384个唯一题名（381个题名-年份组合）；原始HTML与解析快照已保存 | 引用元数据、作者归属及 Scholar 独有条目仍需逐篇核；页面列项不等于正式书目全集 |
| 作者ANU旧主页 | publication.html完整旧页面，列项2001–2012，逐篇追踪公开PDF | 本批5篇原稿及DOI核验 | 主页中的Accepted年份、作者顺序及拼写可能与正式版不同；不覆盖当前所有成果 |
| Griffith当前主页与机构仓库 | 个人页为JS壳；仓库REST两组查询完整分页 | 宽查询351条、作者字段214条，去重351；逐项交叉表已保存 | 指定查询完整不等于个人全部成果完整；包含指导关系、引用和同名作者 |
| arXiv带引号姓名查询 | 官方Atom `au:"Jun_Zhou"`，start=0/200/400 | 531条唯一且均有映射/逐审（含8待核）；24目录匹配、32继承、6同名；累计471逐审为447摘要暂排、7局部暂排、7姓名不精确、8待核及2新增同名，余0未审 | Mamba精确DOI与独立ORCID履历支持同名区分；521整名/10异常不证明目标身份，姓名变体、输入和全文未完整覆盖 |

所有源文件和失败状态在 `sources/jun-zhou-*`；263组逐项题名、外部ID、发现状态见 `sources/jun-zhou-orcid-inventory.json`，逐项决定分年度及早期尾项文件保存。没有关键词的128组不作为自动排除；未来卷期日期必须核在线发表，不将2026年12月卷期自动认作已发生的事件。

## 当前目录与剩余范围核验

用户要求继续完成论文调研，不需要新增学习笔记。当前重点是来源查漏、作者身份、光谱输入、正式书目与版本关系；全文、代码及性能复现的阅读状态另行记录，不以笔记数量衡量目录完成。

当前作者目录188条：直接高光谱181条、多光谱关联7条（含1会议摘要）；179条摘要级、9条全文级。出版版、预印本及会议摘要分别留证，不能当作188个独立方法。[既有索引](jun-zhou-study-guide.md#当前作者目录完整索引)仅同步目录。

本轮补入EAAHNet：出版社作者登记、原文首页均确认Jun Zhou属于Griffith；保留DBLP同名0011分配差异，避免错误排除。原文IV-A明确Potsdam红/绿/近红外输入，归多光谱关联；Vaihingen写RGB，实际数据版本和实现仍待核。ComicLib正式节目确认Griffith身份，漫画草图任务按范围暂排，未标全文核验。

共同作者熊凤超本次中英文CV发现Biomedical综述与Low-rank跟踪两条在审候选；搜索索引另有Prototype网络旧候选，当前两份PDF均未列。三条单独待核，不纳入已发表目录。CV中的Sparse Tensor Attention仍写Major Revision，目录已保留正式DOI，不重复新增；作者组网页有重复DOI，禁止不经核对照录。

DBLP365条现355决定、10待核；Scholar非关键词209差集现188暂排、8匹配目录、4新增、9待核。UEMM旧题名排除已重开，并同步ORCID、DBLP、Scholar与Griffith交叉表。新共同作者候选与这些来源可能重叠，不能把待核数直接相加。当前机构完整目录尚未取得，仍不能宣布全部调研完成。证据与访问边界见 `sources/jun-zhou-author-corpus-followup-2026-10-10.json`。

本轮为剩余78条DBLP记录取得原始摘要或Griffith机构摘要，并对指定arXiv正文和两份作者/正式PDF局部补读。续核后68条按当前证据暂排除；10条仍待核。图矩阵的spectral clustering、Fourier高/低频、CNN feature channels、音频频谱和描述子的multi-channel都不自动等于光学高光谱。皮肤镜与昆虫照片论文也不借同作者其他高光谱数据集收录。AcfNet arXiv1909.03751的v1正文含Griffith Jun Zhou，而v2当前摘要作者列表无Jun Zhou，保留版本作者差异，不把它简单认作错误作者。

待核10条包括纪念/编辑性记录2条及遥感、机器人等输入或范围待核8条；以逐条清单为准，不凭题名缺关键词作排除。优先FDNet（spectral bands含义）、DDFNet/GPINet/SAPNet（实际RGB/IRRG输入）、红树林和太阳能板卫星/航拍数据，再处理其余正文与身份。CangLing-KnowFlow和ChangeQuery按已读正文局部暂排除；分别保留完整任务清单和光学输入通道重审。

证据见 `sources/jun-zhou-dblp-remaining-primary-abstracts-2026-10-10.json`、`jun-zhou-dblp-remaining-repository-2026-10-10.json`、`jun-zhou-dblp-remaining-scope-decisions-2026-10-10.json`。主筛选表包含所有365条及明确pending状态；来源差集、当前机构目录与已收录论文正式全文、实验和代码尚未全部闭环。

新增非关键词Scholar差集审计209条：189条暂排除，8条匹配目录，新增4条多光谱关联（含1会议摘要），8条仍待原始书目、输入或身份核验；另178条关键词筛选表保留。该交叉表不把题名匹配当身份核验，也不自动排除近题变体。详见 `sources/jun-zhou-scholar-nonkeyword-screening-2026-10-10.json`。

两篇新增分别是2019 MYD21方向发射率与向上长波辐射、2020 MTSAT-2温度上升指数TRI干旱监测。它们与已有MODIS分裂窗LST及Himawari亮温论文的DOI、任务和数据不同；不混用波段或实验。MTSAT正式年份2020，勘误 DOI `10.1016/j.rse.2020.111661` 修正图11小麦产量单位为t/ha。M2-Net、2022稳健2DSVD与CrowdMLP按原稿实验暂排除；CrowdMLP预印本机构不列Griffith，同名身份及正式版差异另留记录。源证据见 `sources/jun-zhou-thermal-scholar-followup-2026-10-10.json` 与逐项DBLP清单。

本轮8条Scholar待核补原始证据后暂排除：微流控荧光强度、支票分割硕士论文、地图修订博士论文、IB零样本学习、DPSC题名变体、作者裂缝通讯及两篇考拉检测。考拉“两流”为原始视频与光流，不是可见/近红外联合光谱；夜间照明和PIR运动触发也不自动构成高光谱输入。裂缝作者通讯缓存可见，PDF直接下载403；不标正式会议全文。源表 `sources/jun-zhou-scholar-scope-followup-2026-10-10.json` 保留局部阅读与版本边界。控制采样v1方法与指定实验已补读，学习问题及限制见[评测笔记](jun-zhou-controlled-sampling-note.md)，目录仍保持摘要级阅读状态。

续核多视图社论（两条Scholar年份/作者变体）、Displays3D社论、点云解释、CNN概念解释、F3/P3题名变体、LVLM少样本与DirectSAM：共8条Scholar暂排除、2条DBLP待核关闭。多视图社论首次在线2023、卷期2025且曾更正作者简介；不按年份拆方法。DirectSAM原稿明确RGB三通道；LVLM训练遥感详细输入仍可重审。Crossref本轮24查询中12成功、12限流429，失败不等于不存在。证据见 `sources/jun-zhou-scholar-editorial-version-followup-2026-10-10.json`。L1/2-NMF目标与增广丰度和约束已补局部方法，学习笔记与数学演示见 [解混笔记](jun-zhou-lhalf-nmf-note.md)。

## 首批闭环（2009–2011）

新增5，更新既有论文0，匹配既有1，排除0。首批263组中5收录、1关联既有，257待逐篇处理；后续累计状态见下节。数量是来源组，不是独立方法数量；同DOI、同题不同版本及扩展版需继续去重。

五篇分别是2009 OTCBVS/CVPR Workshops高光谱纹理描述、2010 ICIP CCRE配准、2011 TGRS L1/2-NMF、2011 ICCV材料用户颜色配置、2011 IGARSS结构稀疏分类。五篇均阅读原稿摘要，并仅对明确记录的局部页读图或实验；不标为全文阅读。ICIP登记拼写Regisration保留，正常拼写作为审计别名；作者顺序按原稿和精确DOI。2009作者稿10页与正式8页不混用页码。L1/2两份2011年作者稿的摘要差异单列，不借早稿“无偏”表述充当正式定理。

新增2任务标签和4方法标签，边界由本批原稿形成，未调整三维13方向。原图保存纹理作者稿Figure3第7页、颜色稿Figure2第3页；ICIP/IGARSS全页图版扫描仅输入与结果图，无独立框架图。L1/2全文图版仍需进一步逐页复核。

## 继续顺序

ORCID263组当前128收录、10关联既有、124暂排、1重开待核；作者目录188条。Griffith351条当前154匹配目录、162继承决定、7继承待核，其余状态见交叉表；指定查询不是个人全集。arXiv531全分页，全部已有映射/逐审记录（含8范围/身份待），累计471新增原摘要/局部逐审，原未审归零；带引号查询含非精确姓名/分词异常。DBLP10、Scholar9与共同作者CV3待核有重叠，不累加为论文数量。继续UEMM正式版与发布数据、医学光学输入、遥感输入、作者版本、arXiv八待核及姓名变体，再转全领域场所矩阵；2010Landsat配准既有决定保留。

## 2008–2013原稿范围与版本续接

本轮新增3、更新3、去重0、排除2；新增2方法标签，扩展1个已有结构稀疏小波标签定义，保存2张原方法图。累计263组中8收录、1关联既有、2排除、252待处理。页面Jun Zhou共9篇；来源组与独立方法数量不同。

- DICTA2010 L1/2-NMF：原稿7页、正式447–453页；本稿Cuprite250×190/188波段局部已核，同名同作者关联2011期刊方法族，正式扩展声明和完整差异仍待核。
- Springer2011调和描述章节：精确DOI10.1007/978-3-642-11568-4_8、179–199页；公开作者稿Chapter1共24页，与正式章节编号/页码分开。原稿Figure1.1第11页保存；同作者及共享图与2009纹理稿关联，未推定两篇全文相同。自采集玩具/硬币实验单列，不借2009蛾虫/车辆结果。
- TGRS2013结构稀疏小波：正式51(4):2276–2291；仓储2013封面和2012-06-13作者草稿分开。引言明确扩展IGARSS2011，[20]为该四作者会议稿；期刊三作者、lasso/group/sparse group约束、加速近端梯度、非线性线性模型混合与四数据实验独立记录。Figure1在PDF第9页/稿内第8页保存。Indian Pine数据段删20个噪声波段后仍写220，记冲突待正式版，不自行写成200。
- DICTA2008 Stable Distributions：原稿RGB/VisTex与Fourier频率，未找到明确光学高光谱关系，留证排除；精确登记本次429，但公开原稿/ORCID可核书目。ECCV2010 Saliency Learning：普通RGB/MSRA显著目标，亦排除。两者若后续有明确高光谱基础方法关系可重新审查；同作者不足以收录。

三篇新增均为摘要及指定局部页阅读，不标全文；两篇排除同样不宣称阅读全文。原稿、失败记录、范围决定及版本证据见sources/jun-zhou-followup-batch-decisions.json。下一步处理2012直接题名命中，同时核验2010多光谱配准与非题名命中项的明确联系；继续补DBLP/当前机构目录差集。

## 2012来源限定范围筛选

本轮新增0、更新3、去重0、排除4，另2010多光谱配准保留待核；新增分类0、原图0。累计263组：已入10、关联既有1、排6、待246。页面Jun Zhou 11篇，其中2012两篇已补摘要级公开证据；数量不代表全部成果或独立方法数。

- ICICEE2012非下采样金字塔/核非锐化异常检测：10.1109/ICICEE.2012.350，1320–1323。OpenAlex公开摘要索引补出NSPD多尺度子带、核非锐化掩蔽、RX及真实/合成数据比较；仅摘要级，全文、数据集和分类待核。
- SPIE AOMATT2012 Shearlet异常检测：10.1117/12.978636，卷8419、文章号84190I（大写I）。OpenAlex公开摘要索引补出多尺度方向性Shearlet、四阶偏微分方程、核RX、HYDICE及相对原RX结论；仅摘要级，SPIE全文和版本关系待核。
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
| 2025 | 17 | 8 | 0 | 8 | 1 | UEMM输入/版本重开待核 |
| 2026 | 21 | 7 | 0 | 14 | 0 | 来源组筛选完成；5篇摘要核验 |

263组ORCID均已处理过；现UEMM重开1组待核、262组有当前范围决定。这不是全年作者或期刊/会议系统覆盖完成。下一步处理 DBLP 非关键词目录、旧年无题名命中摘要、近题版本及 Scholar/机构差集。

## 2014来源组与自然色版本批次

新增2、更新入库0、去重0、排除7；补1条旧排除项的引用关系，新增1方法标签、2张原Figure1。累计263组18入、关联既有1、22排、222待，页面19篇。2014八组仅该来源范围闭环1入7排；另2016近题1入。不等于全年作者成果或场所年度全量。

ICPR2014三作者、70–75页、封面加6页；原Figure1在PDF4。HSI/RGB少量像元对应、共同三维颜色嵌入和逆投影。三维是特征维度，不是场景几何；Washington及两个地面场景，不借期刊实验。TGRS2016四作者、54(6):3151–3162，正式2016年6月，DOI含2015不是年份；Accepted Manuscript封面加12页，Figure1在PDF6/稿内5。新增Moffett Field、G03/D04命名、同传感器复用/指定波段/语义相近地点等按本版本记录。原稿未找到明确扩展ICPR2014的声明，按相同概念方法族关联，正式扩展关系及首次online日期待核；不是两个独立方法的数量声明。两篇均只原摘要/指定局部，不标全文，不引用未核表中数值。

其余人口普查、普通hashing、三维人脸及VHR对象检测暂排除；range、图形三维、同作者、卫星可能具有多光谱功能不构成高光谱依据。三项Crossref429，公开原稿/机构元数据支持筛选；失败响应不当成功书目。2013 RGB拼接被2014[16]/2016[29]背景引用，但未见明确继承声明；记录原2013RGB输入与后稿引用措辞不一致，保留基础关系重审，不将原RGB稿标HSI。详情sources/jun-zhou-2014-scope-decisions.json。

下一步2015逐篇、早年非题名命中摘要、正式版本及外部目录差集；Scholar/DBLP限制、原图与全文缺口仍未解决。

## DBLP精确作者差集初筛

通过 DBLP SPARQL `authoredBy` 精确关联 person ID `99/3847-1`，取得364条去重发表记录；DBLP网页及 XML/BibTeX 导出仍返回验证页；SPARQL精确作者查询可用。对题名含 hyperspectral、spectral、LiDAR、multispectral 或 unmixing 的8条差集逐项核对：HSLiNets预印本与正式论文归同一方法族，CRF/材料跟踪两条预印本由目录正式记录覆盖，4条通用SAR/城市LiDAR、编辑和勘误记录排除，新增2条预印本并完成 arXiv 摘要级核验：HSIMamba、《Hyperspectral Images Efficient Spatial and Spectral non-Linear Model with Bidirectional Feature Learning》；另以 CEUR 三页全文确认 STRL@IJCAI 高光谱跟踪报告的作者为目标 Jun Zhou（PDF明示 Griffith 与 ORCID 0000-0001-5822-8233）。本轮再补审两条非题名关键词的专题记录：WHISPERS 2019 杂草分类完成公开摘要级核验并入库；IGARSS 2010 多光谱配准与目录既有条目去重，并以 Griffith 作者稿和公开摘要补强证据。

DBLP精确作者、ORCID、Scholar 和 arXiv 记录均保留原始版本，不把预印本当作正式发表；截至本轮，364条原始快照与1条快照外STRL补充合并365条：收录6、关联既有165、暂排除179、待核15，共350条已有范围决定。此前“287已决定、余77”的余量少算1条，因为287中包含快照外STRL补充；原始快照实际为286已决定、78未审。本轮逐项审查这78条，新增63条暂排除、15条保留待核。详情见 `sources/jun-zhou-dblp-sparql.json`、`jun-zhou-dblp-screening.json` 和 `jun-zhou-dblp-arxiv-metadata.json`。

## Scholar题名差集初筛

Scholar分页共387条记录；本轮对题名含 hyperspectral、spectral、spectroscopy 或 LiDAR 的178条作初筛。新增41条高光谱/多光谱书目，均以 Scholar 书目核验后入库；41条均已补公开摘要或项目说明级核验（9条 arXiv、3条 ScienceDirect/CVF、5条2022公开摘要、5条2021公开摘要、2条2020公开摘要、7条2019公开摘要、5条2010/2023/2024公开摘要、2条2024公开摘要、1条2025公开摘要、1条2026公开摘要、1条HOT2024官方CFP）；STRL报告另有三页 CEUR 全文核验。132条规范化题名与现有目录重复，5条为专利、勘误、通用LiDAR/光谱或编辑性记录而排除，待审清零。

新增项覆盖计算高光谱成像、目标跟踪、光谱—LiDAR分类、异常检测、解混、去噪、农业/生物医学分类和挑战基准；多光谱SIFT配准单列为 multispectral 关系，不因同作者自动视作高光谱。Scholar题名变体与正式标题按 DOI/题名版本归并，避免重复计数。逐项记录见 `sources/jun-zhou-scholar-screening.json`，2019摘要补充见 `sources/jun-zhou-scholar-2019-abstract-followup.json`、`sources/jun-zhou-scholar-2019-abstract-followup-2.json`，原始分页见 `sources/jun-zhou-scholar-pages-0-387.json`；9条 arXiv记录、4条2022公开摘要、3条2021公开摘要、1条2020公开摘要及7条2019公开摘要、4条2020–2022公开摘要、5条2010/2023/2024公开摘要、4条2024–2026公开摘要和1条HOT2024官方CFP已补来源核验，仍未完成全文；其余新增条目已完成摘要级状态核验；正式全文、版本差异和资源仍待逐篇核验。

下一步扫描 DBLP 非关键词目录、作者机构页与引用链差集；不把 Scholar 引用数或单一作者串匹配当作作者归属证据。

截至2026-10-10，目录中含 Jun Zhou 的高光谱/多光谱记录共185条（含1会议摘要）：178条为 `abstract_read` / `abstract_verified`，7条为 `full_text_read` / `full_text_verified`，无作者专项 `pending`。该状态只证明目录内的阅读证据，不替代Scholar、DBLP和ORCID来源全集及非关键词差集的逐项审查。

## 2024–2026高光谱来源组筛选

2024–2026共59组完成范围决定：新增26篇、关联既有1篇、排除33篇。26篇直接高光谱题名已以Crossref正式书目入库；其中 2024 年高光谱关系记录有14篇摘要级核验（ORCID直接记录10篇，另4篇来自既有来源），ORCID 2025已有8篇直接高光谱记录补摘要级核验；ORCID 2026 的 FedDA-HSI、SPECIAL、HOT综述、STU、频率偏置校准网络，以及两篇医学少样本/信息熵选带论文均已补公开摘要；其余仍保留题名暂定状态。

- 2024收录高光谱农业、解混、分类、去噪、LiDAR融合和视频跟踪；其中 ORCID 直接记录10篇、既有来源4篇已补摘要级核验；2025收录去噪、少样本分类、LiDAR融合、视频跟踪、异常检测和医学分类，其中 ORCID 八篇与 Scholar 差集三篇已补摘要级核验；2026收录医疗高光谱、异常/目标跟踪综述、选带、分类和解混。
- 通用视觉、RGB-D、普通遥感、变化检测、红外可见光融合及其他无明确高光谱输入记录排除；2024 LiDAR-Guided Cross-Attention Fusion 已是既有目录条目，按重复登记处理。
- LiDAR-Guided Cross-Attention Fusion 已核对既有15页 arXiv 作者稿、方法页和框架图，目录阅读状态现为全文级；正式IEEE版差异与独立复现仍待核。

逐年决定见 `sources/jun-zhou-2024-decisions.json`、`jun-zhou-2025-decisions.json`、`jun-zhou-2026-decisions.json`；2024摘要补充见 `sources/jun-zhou-2024-abstract-followup.json`、`sources/jun-zhou-2024-abstract-followup-2.json`、`sources/jun-zhou-2024-abstract-followup-3.json`；2025摘要补充见 `sources/jun-zhou-2025-abstract-followup.json`、`sources/jun-zhou-2025-abstract-followup-2.json`、`sources/jun-zhou-2025-abstract-followup-3.json`；2026摘要补充见 `sources/jun-zhou-2026-abstracts.json`、`sources/jun-zhou-2026-abstracts-2.json`、`sources/jun-zhou-2026-abstracts-3.json`、`sources/jun-zhou-2026-title-followup.json`，Crossref响应保存在 `sources/`。下一步补齐正式全文与版本差异，继续Scholar/DBLP目录差集；当前目录中的作者高光谱/多光谱记录已无待读项。

## 2023高光谱来源组筛选

新增8篇、排除2篇；2023 ORCID来源组10组完成范围决定。8篇题名直接指向高光谱跟踪、去噪、少样本分类、波段注意力或跨域表示，均已取得公开摘要级方法证据并更新目录；正式版本、全文、代码和完整实验仍待核验。

- 排除通用零样本学习和人员重识别。题名筛选不替代摘要阅读，不从方法名称外推数据、性能或版本关系。

逐项决定见 `sources/jun-zhou-2023-decisions.json`；摘要补充见 `sources/jun-zhou-2023-abstract-followup.json`，Crossref响应和来源访问见 `sources/`。下一步补齐2022及更早暂定条目的摘要，处理早年待审组，并继续Scholar/DBLP目录差集。

## 2022高光谱来源组筛选

新增16篇、排除3篇；2022 ORCID来源组19组现已完成范围决定。16篇题名直接指向高光谱分类、融合、域适配、复原、去噪、解混、跟踪、边界检测、选带或农业制图，其中 ALN、GSFus、GF-3DDA、两阶段自监督恢复、MAC-Net、NSSNN、SMDS-Net、SNMF-Net、TSCFW、光谱—空间边界检测、SDRN、S3FGCN、跨传感器杂草制图、MGRSR 和 UMsDFL 已取得摘要级方法证据；16条均已取得摘要级方法证据，正式版本、全文、代码和完整实验待核验。

- 排除CNN综述、RGB-D疲劳检测和通用人员重识别。题名筛选不替代摘要阅读，不从方法名称外推数据、性能或版本关系。

逐项决定见 `sources/jun-zhou-2022-decisions.json`；摘要补充见 `sources/jun-zhou-2022-abstract-followup.json`、`sources/jun-zhou-2022-abstract-followup-2.json`、`sources/jun-zhou-2022-abstract-followup-3.json`、`sources/jun-zhou-2022-abstract-followup-4.json`、`sources/jun-zhou-2022-abstract-followup-5.json`，Crossref响应和来源访问见 `sources/`。下一步核验2022正式版本与全文边界，处理早年待审组，并继续Scholar/DBLP目录差集。

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

## WHISPERS尾部摘要补充

WHISPERS 2013–2014剩余14篇题名级高光谱记录已通过OpenAlex公开摘要索引补读，覆盖分类、解混、检测、成像光谱仪与环境应用；均不等同正式全文，分类保留待审。详见 `sources/jun-zhou-whispers-tail-abstract-followup.json`。

## 早期摘要补充

2012两篇异常检测及2017材料边界检测已通过OpenAlex二级摘要索引补读；2018边界检测再由Griffith机构摘要补读，均不等同正式全文。详见 `sources/jun-zhou-early-abstract-followup.json` 与 `sources/jun-zhou-2018-boundary-abstract-followup.json`。

## 2018高光谱来源组筛选

新增16篇、关联既有2篇、排除13篇；2018 ORCID来源组31组现已闭环。正式期刊年份与ORCID登记年份有差异时按正式记录入库，例如异常检测论文正式出版年为2019；不把版本年份混作新增论文。

- 收录高光谱—LiDAR判别相关融合、非局部非负Tucker去噪、光谱—空间SIFT配准、皮肤镜数据集、坚果品质检测、波段权重网络、异常成分检测、重加权稀疏低秩张量去噪、异构高光谱—LiDAR融合、土壤碳氮同位素估计、材料显著目标检测、高光谱视频跟踪、超像素张量解混、三元组深特征分类和森林凋落物碳官能团估计。
-《An Efficient Method for Boundary Detection from Hyperspectral Imagery》已由Griffith Research Repository OAI机构摘要补读：稀疏光谱—空间亲和、谱聚类、形态学腐蚀与三种替代方法比较均有摘要依据；正式Springer全文和分类仍待核。
- 136号记录是已入库ICIP 2017非局部张量去噪的重复登记；137号记录与JSTARS 2018非负Tucker正式记录重复，均不重复计数。通用哈希、子空间检索、单应性、人脸、液滴和产品量化等13组排除。

逐项决定见 `sources/jun-zhou-2018-decisions.json`；来源访问和下载状态见 `sources/jun-zhou-2018-primary-access.json`，Crossref响应及局部PDF保存在 `sources/`。本批摘要、作者稿或短文局部核验，不标全文。下一步处理ORCID 2019及早年待审组，并继续Scholar/DBLP目录差集。

## 2017高光谱来源组筛选

新增11篇、排除6篇；WHISPERS 2015两条为既有版本。2017 ORCID来源组19组现为13篇收录、6篇排除、0篇待审；其中材料边界会议稿仅题名/目录核验，保留待分类状态。

- 收录跨场景字典域适配、矩阵—向量非负张量盲解混、控制采样、解混引导深特征、残差高光谱超分辨率、差分权重选带、结构一致性稀疏编码、非局部张量去噪、区域结构NMF及森林凋落物PLSR。
- Material Based Boundary Detection 的OpenAlex公开摘要索引补出联合光谱—空间特征、PDF共现、亲和矩阵和谱聚类边界；仅摘要级，分类仍待定，IEEE全文和数据细节待核。
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

Scholar 分页和 DBLP 记录补出两条 ORCID 登记年份为2017、正式 DOI/会议为2015的高光谱论文：《Multiple graph regularized NMF for hyperspectral unmixing》（DOI 10.1109/WHISPERS.2015.8075468）与《On the sampling strategies for evaluation of joint spectral-spatial information based classifiers》（DOI 10.1109/WHISPERS.2015.8075474）。前者已取得 Griffith 作者仓储接受稿摘要，核实多尺度多图正则化 NMF 机制；后者取得机构作者稿和摘要，已核光谱—空间分类评估问题。两篇不与 ORCID 2017 年份重复计数，版本差异保留在 `sources/jun-zhou-whispers-2015-version-audit.json`；Multiple Graph 摘要补充见 `sources/jun-zhou-2015-multiple-graph-abstract-followup.json`。

本批仅摘要或作者稿指定局部核验，未标全文阅读；本批阅读边界见 `sources/jun-zhou-2015-remainder-decisions.json`；三篇早期摘要补充见 `sources/jun-zhou-early-abstract-followup.json`。ORCID 2015 十九组现已完成来源组筛选（13收录、1同DOI重复、7排除；其中两条 ORCID 2017 年份按 WHISPERS 2015 DOI/正式目录解析）；这不等于作者2015所有成果或任一场所年度全量检索。Scholar分页已取得387条记录；2015两篇 WHISPERS 条目与 ORCID 2017 年份不一致，需按 DOI/正式目录核版本。下一步处理 ORCID 2017 及早年待审组，并补 DBLP 完整目录差集及早年无题名命中。

## EGU摘要与热红外方法补核

本批新增1条EGU2019-2831一页会议摘要：五作者、Himawari-8、2015–2018；不是MTSAT-2，也不自动并入八作者、2015–2019的2020期刊稿。当前作者目录185条（179直接HSI、6多光谱关联，含1会议摘要），183摘要级、2全文级。原摘要与期刊版本关系保留待核。

Nutrients 2025儿童生长研究的原始摘要明确GBD横断面疾病负担数据，无光谱输入，范围暂排除；PubMed列Jun Zhou为Griffith信息技术学院，不能凭健康题名断言同名误入。Scholar差集现184暂排、8重、3入、14待。源证据见 `sources/jun-zhou-egu-health-scope-followup-2026-10-10.json`；原稿下载状态及SHA256见 `sources/jun-zhou-thermal-health-access-2026-10-10.json`。健康PDF403不表示论文不存在，Transformer编辑稿签名PDF403仍待核。

Griffith Himawari原件封面为正式VoR，已下载并补读2.2及3.1.1节，核实AHI14/15、11.2/12.4 μm、差分近似与TRI方向。未标全文；学习假设和独立算例见[TRI学习笔记](jun-zhou-thermal-tri-note.md)。

## 普通图像候选与NMF-SAE全文

新增3条Scholar差集范围排除：MMAsia 2021整本论文集、2025 MBPRFW小样本分类、2024宫颈细胞预印本。前者由Crossref的proceedings类型与ISBN确认，不作为独立论文；MBPRFW由Springer数据可用性与Griffith作者机构确认，使用Mini-ImageNet/CIFAR-FS/FC-100/CUB；宫颈原始v1局部确认TCT扫描图像与文本诊断知识，不自动把多模态当多光谱。现在Scholar209差集187暂排/8重/3入/11待。近题2024 MBPRFW会议版不自动合并；匿名ICLR2026解释性稿PDF403，不据同题名确认作者或正式接收，仍待核。证据见 `sources/jun-zhou-generic-scholar-scope-followup-2026-10-10.json`。

NMF-SAE取得五页作者公开稿，完整阅读方法、实验、结论和参考文献；确认共享参数端元/丰度双分支、VCA/FCLS初始化、重建训练及USGS/Jasper设置。Figure1保存为原图，当前330张。目录阅读状态更新为作者稿全文，当前作者185记录为182摘要级/3全文级；未逐字比较出版社版、未复现。新增[学习笔记](jun-zhou-nmf-sae-note.md)区分L1常数、阈值后归一化与精确约束近端，保留零列、标准差百分号和随机重复未明等问题；平均SAD改善不称各类最优。访问SHA256及完整阅读覆盖见 `sources/jun-zhou-nmf-sae-full-reading-2026-10-10.json`。

## DASFAA题名修复与SNMF代码核验

Scholar将DASFAA2019原稿顶部会议信息误作题名。共同作者目录第122项、原稿首屏八作者/Griffith机构和真实题名确认《Efficient Local Search for Minimum Dominating Sets in Large Graphs》，DOI10.1007/978-3-030-18579-4_13；与已排除DBLP原项匹配。原稿输入普通图与Network Repository大图，不把它误认整本会议或光谱论文。原始Scholar题名保留，差集现188暂排/8重/3入/10待；DBLP决定数不变。证据见 `sources/jun-zhou-dasfaa-title-repair-2026-10-10.json`。

共同作者Xiong的Selected Publications读取24条含Jun Zhou记录，保存为来源核对入口，不称作者全集。SNMF取得16页作者稿及公开ZIP（65个有效文件），保存原代码与归档哈希/文件清单。指定方法段和代码对照、20轮CPU短运行及原结果打印失败均已记录；原训练checkpoint前向输出有限，但不是论文性能复现。阅读状态保留摘要级，完整全文、全部实验与版本差异仍待。详见[SNMF代码笔记](jun-zhou-snmf-code-note.md)及 `sources/jun-zhou-snmf-smoke-2026-10-10.json`。

NMF-SAE作者页HTML注释另有未具体说明的final version错误提示；它不是正式勘误，不能据此定位或修正数学错误。五页作者稿全文状态不变，正式出版社版本和勘误仍待核；线索见同批访问记录。


## SNMF作者稿完整阅读与公式复核

通读16页作者稿全部正文、图表、参考文献及作者简介，Figure1已保存。目录现为185条：181摘要级、4作者/公开稿全文级；不等于全部论文通读或全部正式版本核验。三真实场景均值SAD最低不表示每类最好；参考端元为选出的可能纯像元、丰度由CVX拟合。式29复合激活导数和式37全矩阵单位约束经原页及独立数学例子核查，记录与代码/推导的差异，不自动替作者修正。DC Mall表述与Figure15图注冲突保留。详情见[全文与代码笔记](jun-zhou-snmf-code-note.md)、`sources/jun-zhou-snmf-full-reading-2026-10-10.json`；默认500轮、重复实验、正式版本及跨场景验证仍待。原图总量331张。


## 待核输入与E2E-MPT公开资源续查

IEEE已补SA-Net 2024原摘要，确认跨注意力语义映射、Transformer几何对齐、HTCD/MRCDD。光学通道仍待正文，不直接按数据名称定RGB或多光谱。出版社明确2026 SA-Net++扩展IGARSS2024，但六名作者及CRediT均无Jun Zhou，不能沿用会议作者列表，也不借其协议关闭2024范围待核。FDNet/DDFNet机构仅LICENSE，GPINet/SAPNet仅130字节SWORD提交XML，均未取得论文PDF。杂草制图Scholar详情429，短题名和Awan/Farooq作者差异仍待核；HTTP失败不说明论文不存在。DBLP/Scholar各10条待核保持不变。证据见 `sources/jun-zhou-pending-resource-followup-2026-10-10.json`。

E2E-MPT原摘要链接的公开仓库已固定提交并核完整树、三ZIP目录和结果样例。ZIP分别为35/87/117个文本结果，不是原始视频；当前没有README训练/测试脚本、配置或权重，不能称可运行代码。原框架及MIT许可保存，累计332张原图；该论文仍摘要级。详情见[资源学习笔记](jun-zhou-e2empt-resource-note.md)与 `sources/jun-zhou-e2empt-resource-audit-2026-10-10.json`。目录185条和全文4条不变；后续继续原稿、输入、全集与实现核验。

### L1/2-NMF作者稿通读与数学核验

2011-04-11作者稿26页已通读，原页式26、实现说明、Figure1–18与TableI–III核验。真实表平均SAD为0.1637/0.1766/0.1114，逐材料并非全胜；合成图像z²×z²、真实波段移除和K设定保存。独立标量有限差分验证一般q导数及非凸反例，保留打印公式、停止准则和复杂度疑点，不当正式勘误或性能复现。作者目录185条现180摘要级/5全文级；DBLP/Scholar各10待核不变。正式版、早稿和会议版完整对照仍待核。学习内容见 `jun-zhou-lhalf-nmf-note.md`，证据见 `sources/jun-zhou-lhalf-full-reading-2026-10-10.json`。

### DICTA2010通读与机器人范围决定

DICTA2010七页作者稿全文及两版对照完成：会议定义带外层平方而更新式对应平方根和；合成超过θ像元只混两个材料，2011较晚稿改为全部材料等比例，Cuprite表值也不同。独立正域有限差分已核，不作为正式勘误或实际代码事实。185作者记录现179摘要级/6全文级。

2004机器人项通过原会议指南WM2.5的镜像转录，核到河海大学四作者、两轮运动模型/反馈控制/扰动观测器仿真；按任务范围暂排除，同名身份仍未确认。非IEEE原站正文或全文阅读。DBLP365现356决定/9待（185暂排、165重、6入）；Scholar209差集10待不变。证据见 `sources/jun-zhou-robot-program-scope-2026-10-10.json` 和 `sources/jun-zhou-dicta-lhalf-full-reading-2026-10-10.json`。

### 周峻结构稀疏会议全文与期刊局部对照

IGARSS2011四页作者稿已通读，15组小波特征、数据、随机划分和表1全部24值留证。Group LASSO仅在KSC两设置最高；KSC5%的小波SVM反例保留。打印组平方和与损失置零检查不同于引用方法，实际代码未知。2013期刊作者稿仅局部：式13明确带平方根，每类训练规则、表V指标/加粗疑点及表VII测试耗时另列，不升级全文。185作者记录现178摘要级/7全文级；总库754、三维214、332图，DBLP9与Scholar10待核不变。学习见[jun-zhou-structured-sparse-classification-note.md](jun-zhou-structured-sparse-classification-note.md)；完整期刊、正式版差异和性能复现仍待。

## Griffith机构仓库完整分页与新差集（2026-10-10）

使用公开REST接口分别检索`"Zhou, Jun"`（4页351条）与`dc.contributor.author:"Zhou, Jun"`（3页214条）。逐页核返回总数、UUID唯一性及页码；后者为前者子集，去重351条。保留原始记录与分页证据于 `sources/jun-zhou-griffith-inventory-2026-10-10.json`。这是指定仓库查询集合，不是已经证明完整的个人作者成果全集。

交叉表351条逐项留证：154匹配现有目录、163匹配既有来源决定、2关联勘误、1独立数据登记、19非作者命中、2新增论文、3机构摘要范围排除、6沿用待核及1新待核。既有决定映射不叫作重新阅读全文；非作者命中包含学生论文指导关系及全文引用。新待核是无摘要的半监督乘积量化书目，不凭题名自动排除。见 `sources/jun-zhou-griffith-crosswalk-2026-10-10.json`。

新增ASSCT2023甘蔗病害论文和2025樱桃果蝇论文，正式正文均已通读；PDF本地留存、哈希记录，两张框架原图已核。甘蔗为150波段470–900nm、3245幅，DSAB嵌入ResNet34；花叶病摘要2周/8周可见与结果段8周/常规16–20周可见不同。架构段引用Figure4，实际图注Figure1，保存原图号差异。相邻采集时段6:2:2划分没有说明按植物身份隔离，不外推独立田间效果。

樱桃研究实际用150波段HSI选出730nm，再以单波段NIR训练BBHFC；LED峰728.8nm、FWHM约36nm，不描述成理想谱线或高光谱输入检测网络。表4测试556图/175果，表5人工比较另为555果；表4果实敏感度1与表5的0.77不混用。首次在线2025-06-09，Crossref卷期2025-12。数据按请求提供，未下载或复现。输入范围、统计和限制均写入目录。

2018字典适配勘误10.1109/TGRS.2018.2789418修正原Fig14三类混淆矩阵应3×3而非7×7，关联原2017条目，不新增方法；勘误图版未取得。独立甘蔗数据登记10.25904/1912/4757描述黑穗病/花叶病两子集、4TB、需申请，关联2023会议和2024期刊条目，但逐文件对应未核，不算一篇新论文。

Scholar短题名weed mapping仍待核：机构与正式DOI长题名作者为Adnan Farooq，而Scholar缓存写A.Awan。详情本次429；长题名候选与目录2022条目同DOI，不能凭相似题名关闭短题名身份/版本疑点。DBLP9、Scholar8及CV3待核均未擅自清零。新增植物病害任务标签按实际输出维护；未新增学习笔记。


## arXiv作者全分页、版本补齐与量化检索范围核验（2026-10-10）

官方Atom带引号姓名查询`au:"Jun_Zhou"`取得200/200/131条，三页总数均531，arXiv ID唯一531；原始XML、每页SHA256和全部题名/摘要/作者/日期保存在 `sources/jun-zhou-arxiv-author-inventory-2026-10-10.json`。查询含同名作者，未覆盖姓名简写或变体，不称目标作者全集。

该批结束时，逐项交叉表包含24条现有目录匹配、32条既有DBLP/Scholar范围决定映射、4条原稿或正式稿机构核验的同名记录、471条未逐篇审查。指定光谱词扫描25命中为23目录匹配和2同名；另一个目录匹配是《Spectral 3D Computer Vision -- A Review》，靠arXiv ID命中。无关键词不自动排除。映射沿用证据，不表示本轮重新读完56篇或核所有版本作者。见 `sources/jun-zhou-arxiv-author-crosswalk-2026-10-10.json`。

24条目录补当前官方版本元数据，共13个新增版本记录，原v1及正式版保留；初次提交用API `published`，当前版本更新时间用`updated`。v2及以后不以首次提交时间冒充版本提交时间；当前版本年份按其更新时间记录，主条正式年份不变。ILRNet预印本2509.00356首次提交2025-08-30、正式TGRS 2024，同DOI精确关联，原稿首页确认Griffith。HSLiNets 2503.21072补2025-03-27版本，Atom作者分词和v1 PDF首页有姓名粘连/逗号异常，不覆盖已核正式作者。LiDAR-Guided 2404.03883补v2及正式DOI两记录；API的Final Files Received不当正式发表日期。CRF v2题名Segmentation与正式Classification、材料跟踪v5的Benchmark and Algorithms副标题分别保留。原阅读及分类状态保持：作者仍188条，179摘要级/9全文级。见 `sources/jun-zhou-arxiv-version-update-2026-10-10.json`。

HSLiNets公开GitHub元数据、README和完整文件树取得成功，存在Trento/Houston2013两个模型notebook；目录补代码入口，但未下载数据或运行训练。2503.21072与2412.00302均叫HSLiNets，题名、作者和摘要基准不同，不按简称合并，也不据此宣称独立方法；正式扩展关系继续核。

3DLST 2405.15826与DTA-Former 2405.15827的v1原稿首页将Jun Zhou标为香港理工大学护理学院，v2省略机构；DCTNet 2306.08073正式稿首页亦确认该机构。三者实际MS-LiDAR为XYZ及1550/1064/532nm三个通道，仍属全领域多光谱候选。DCTNet预印本七作者含Dilong Li、正式稿六作者不含；预印本有Toronto-3D、正式摘要/实验只列ShapeNet和MS-LiDAR，版本实验不混用。3DLST正式作者顺序与预印本不同；Crossref发现2026勘误10.1016/j.jag.2026.105262，正文未取得，不猜修正内容。农业挑战2206.11920首页Jun Zhou为平安银行，§2.1为RGB+NIR四通道。四条均从目标作者目录排除，另留 `sources/jun-zhou-other-author-field-queue-2026-10-10.json`，作者专项后再做全领域入库审查。仅指定局部阅读，未标全文。

机构新待核乘积量化论文已取得7页PDF（封面加正式210–215页），首页确认Griffith Jun Zhou。渲染读PDF2/5/6页的摘要、§4.1和Table1、§4.2，实验为MNIST、CIFAR-10、ImageNet和SIFT-1M，输入是普通图像向量/特征或SIFT描述子；未见明确光学高光谱输入或基础关系，按现证据暂排，未来明确联系可重审。正文字体映射乱码，不将pdftotext输出充作正文；摘要three datasets与正文four差异保留。Griffith交叉表的新pending已关闭为`excluded_selected_full_text`，6条继承待核仍保留。证据见 `sources/jun-zhou-quantization-scope-2026-10-10.json`。

该批无新增论文、标签或原图，当时DBLP9、Scholar8、CV3及arXiv471未审项未清零；全领域场所年度矩阵和作者正式全文/实验/代码仍未完成。


## arXiv首批50条摘要逐审与遥感仓库核验（来源核验2026-10-10，整理2026-10-11）

从原471条未审队列按快照顺序读取前50条完整官方摘要，逐条留存任务、数据及范围理由：47条按现有摘要证据暂排，1条姓名字段不匹配，2条原稿局部补读后仍待核。暂排仅说明当前未取得明确光学高光谱/多光谱关系，不声称已核全部作者身份、全文或正式版本；后续明确联系可重审。50条均未提升为全文阅读。当前交叉表531条为24目录匹配、32既有决定、4既有同名决定、47摘要暂排、1整名不匹配、2待核、421未审，仍未完成作者全部成果调查。逐条证据见 `sources/jun-zhou-arxiv-abstract-batch1-2026-10-10.json`。

本次校正查询名称：`au:"Jun_Zhou"`是带引号姓名查询，返回记录并非都含独立的“Jun Zhou”作者字段。531条中521条有规范化独立整名字段，10条为Kaijun Zhou、Jian Jun Zhou、J. Zhou或原字段粘连；原姓名字段不改写。521条不证明Griffith身份，10条也不能整体排除。本批rMuscle（2609.19104v1）明确列Kaijun Zhou等四人，记为整名不匹配，不扩张为全局个人身份结论。原始字段与10条清单保存在作者inventory的 `queryAuthorNameAudit`。

RADC（2610.06932v1）仅补读首页、§3.1及实验/实现段（PDF1/3/4页）。首页Jun Zhou上标机构为清华大学深圳国际研究生院；实验含EuroSAT等十个分类基准与ImageNet分布外基准，采用冻结CLIP-RN50/ViT-B/16，实际EuroSAT输入通道未明。不能以EuroSAT可提供13波段推定本稿使用多光谱。TEAMS（2608.17421v1）仅补读首页、Table1/§4.1（PDF1/12/13页）：Jun Zhou机构为中山大学智能工程学院，数据含MRI、CT及PanNuke显微图像，显微输入光学通道未明。两篇均保留范围/身份待核，机构不同本身不证明是不同个人；ORCID/个人成果链、实际通道、正式接收和代码仍待核。四张原稿指定页渲染留作来源证据，不计入334张目录原图；完整PDF未归档，保留来源URL、完整PDF哈希及字节数，不称全文已读。

GitHub公开搜索、同一账户公开仓库列表以及三份完整递归树/README均已保存。DDFNet4RSI、EAAHNet、FDFormer4RSI本次文件树均仅README，承诺以后发布代码；没有可核验的模型、配置、权重或训练脚本。DDFNet README自称对应完整论文题名，但仓库所有者与原作者的关联尚未由论文链接或机构资料确认；不添加已核代码入口，也不据相邻论文推定RGB/IRRG输入。EAAHNet目录仅补资源可用性证据，原阅读/分类状态不变。FDFormer完整题名是新的README线索，作者、年份、DOI和通道未知，不与FDNet或Frequency Adaptive Transformer合并，不纳入已发表目录。见 `sources/jun-zhou-remote-segmentation-placeholder-audit-2026-10-10.json`。

本批无新增论文、标签或目录原图，更新既有EAAHNet资源记录1条。总库757、三维214、标签303、原图334；周峻188条（181直接HSI/7关联，179摘要级/9全文级）。DBLP9、Scholar8、CV3待核不变；继续核两条新待核、421条未审arXiv、作者身份与实际输入，再推进全领域顶会、顶刊和arXiv矩阵。


## arXiv第二批100条原摘要与八份原稿局部核验（2026-10-11）

沿第一批后的421条未审队列读取前100条官方Atom原摘要：91条按摘要证据暂排，2条按指定数据段暂排，1条整名字段不匹配，6条补原稿局部后仍待核。摘要内容取自2026-10-10固定快照，八份固定版本PDF本轮直接从arxiv.org取得HTTP200；完整PDF没有归档，保存访问元数据、完整哈希、八份指定页原文提取和两张原页渲染。KAG-Thinker（2506.17728v3）API摘要末尾自带省略号，仅按可得文本暂排，不声称补齐完整尾段。SyncLoop当前题名与摘要自称C2-Evo的差异、粘连作者字段均保留，不按简称合并方法或把粘连字段作为错作者自动排除。2604.24447v1官方作者列Kaijun Zhou等六人，记整名不匹配，非全局个人身份证明。

两条局部暂排：EH-Benchmark（2507.22929v1）第12页Table2全部13数据行列CFP、OCT和Text，任务为彩色眼底/OCT视觉问答及幻觉定位；MaskedCLIP（2507.17239v1）第6页§3明确彩色眼底预训练与下游任务。当前未取得密集光谱输入或明确光谱基础方法关系，暂排可因后续明确联系重审。二者首页Jun Zhou机构为A*STAR IHPC，机构差异本身不作为个人身份排除证据；只补机构及数据段，不提升为全文阅读，不转录未核性能或复现结论。

六条范围/身份待核逐项如下；均不根据机构差异认定为不同个人：

| 原稿固定版本 | 已核指定PDF页与内容 | 仍待 |
| --- | --- | --- |
| UltraVR 2606.05576v1 | 1/5/16页：Jun Zhou为香港理工大学；PANDA、DOTA1.5、TCGA-BRCA H&E及MVTec LOCO AD四场景 | 实际遥感/病理通道、目标身份、正式版本 |
| 医学影像FM综述 2510.16973v1 | 1/34页：Emory机构；Table1首段多模态概览 | 全综述光学模态与引用范围、目标身份；表1局部不是全集 |
| EVLF-FM 2509.24231v1 | 1/2/20/21页：A*STAR IHPC；MedMNIST等与图文/grounding数据段 | 全部11模态实际光学输入、目标身份 |
| Mamba Snake 2507.12760v2 | 1/6/7/12页：清华深圳；MRI、CT与PanNuke显微数据 | PanNuke实际通道、目标身份及v1/v2差异；不自动与TEAMS合并 |
| MerMED-FM 2507.00185v1 | 1/15/16页：A*STAR IHPC；CT/CXR/US/CFP/OCT/病理/皮肤镜七模态 | 病理/皮肤等实际通道、目标身份 |
| AdvMIM 2506.20563v1 | 1/6/7页：A*STAR IHPC；ACDC MRI、Synapse CT、ISIC皮肤镜 | ISIC本稿输入通道/实现、目标身份 |

本批91条摘要暂排分别有任务、数据及阅读边界，不凭题名无关键词关闭范围；光学高光谱之外的Fourier谱分析、声学、材料声子/电子输运、普通RGB三维重建、电影生成、医疗文字、代码/推荐/LLM训练等按当前明确联系区分。完整理由见 `sources/jun-zhou-arxiv-abstract-batch2-2026-10-11.json`，不把摘要暂排当作全部身份或全文审查完成。

当前531交叉表为24目录匹配、32继承决定、4既有同名决定、138摘要暂排、2局部暂排、2整名不符、8范围/身份待、321未审。作者目录仍188条（179摘要级/9全文级），总库757/三维214/标签303/原图334不变；DBLP9、Scholar8、CV3仍保留。继续八条待核及321未审项，再接全领域顶会、顶刊及arXiv矩阵；未新增学习笔记。


## arXiv第三批100条与UEMM范围重开（2026-10-11）

按第二批后321条未审队列原序，逐项阅读前100条官方API原摘要：96条按摘要范围暂排、2条按原稿输入局部暂排、2条仍待核。摘要缺少明确光谱联系是当前范围决定，不等于全部作者身份或全文已经核验；源题名、作者顺序及版本保留。证据见 [第三批逐项记录](sources/jun-zhou-arxiv-abstract-batch3-2026-10-11.json)。

四份固定版本原稿只读机构及指定输入/数据段，不标全文：

- RETFound比较稿2501.12016v1区分自然图像/彩色眼底照片/OCT预训练与本研究眼底照片下游检测。当前未证实光学高光谱关系，局部暂排；不把预训练OCT移作当前联合光谱实验。
- VITask2410.06456v1列12个MedMNIST2D、九模态及70分类标签。病理、皮肤镜、眼底的实际数据版本和输入通道待核；标签数不是波段数。首页A*STAR IHPC机构差异不单独构成同名身份排除。
- State-Air2405.15465v3首页确认Griffith目标作者；§IV自采DJI Mini2航片与IMU飞行状态，§V-A明确AU-AIR的RGB+IMU、SynDrone的RGB/depth/radar。按局部暂排，补强既有ORCID/DBLP/Scholar/Griffith对应版本；正式TGRS全文未核。保留当前题名“Ojbect”与较早Scale-Invariant题名，不靠错字或简称拆方法。
- UEMM-Air2406.06230v3首页和论文链接的作者仓库个人页支持Griffith周峻身份。图2列RGB、法向、分割、深度、IMU、文字六模态；§III-B开头另写infrared，细项却说明depth。这条不是身份排除，而是输入/版本待核。

UEMM作者仓库链接AirNavigation采集程序和Hugging Face数据。完整采集仓库树160项、未截断；选读的当前utils/fly.py先设置车辆分割ID，再调用AirSim Infrared并保存三通道uint8图。文件内容的Git blob与所存树一致，但未核采集时提交或模拟器改动。[AirSim官方接口说明](https://microsoft.github.io/AirSim/image_apis/#infrared)将该输出解释为对象ID到灰度的映射；不能据接口名宣称真实红外/多光谱。源码当前相机尺寸与原稿1920×1080也不同，不能当论文当时配置。

正式ACM七页原文、实际发布数据包及采集时AirSim版本仍未核。因此重开旧题名排除，并同步全部当前来源决定及survey候选；历史已提交批次不改成曾阅读全文。Hugging Face仅根目录响应与README，不称递归数据目录完整；README元数据apache-2.0与正文/作者仓库CC-BY-NC4.0不一致，保留原文，不统一改写。详情见 [UEMM重开审计](sources/jun-zhou-uemmair-scope-reopening-2026-10-11.json)。

第三批结束时，531交叉表：24目录匹配、32继承、4既有同名、234摘要暂排、4局部暂排、2整名不符、10范围/身份待、221未审；250条新增逐审累计，不把映射当新阅读。ORCID263组为128入/10重/124排/1待，DBLP365为355决定/10待，Scholar209为188排/8重/4入/9待；UEMM在这些待核集合中重叠。目录757、作者188、三维214、标签303及原图334不变。继续作者来源与输入/正式版本缺口，尚未完成全部作者或全领域调研。

## UEMM发布标注与VITask通道续核（2026-10-11）

本轮不新增目录或范围排除；两条既有待核取得更明确的输入证据，继续保留pending。证据见 [输入续核审计](sources/jun-zhou-uemmair-vitask-input-followup-2026-10-11.json)。

UEMM-Air正式ACM PDF本次返回403/HTML，未取得原文。Griffith的UEMM、FDNet、DDFNet、GPINet和SAPNet公开bundle清单均完整返回一页，但只有LICENSE或SWORD，无ORIGINAL；不把这类文件当全文，也不将访问受限当范围排除。作者仓库Supplementary.md与上轮树的Git blob一致，采集段只列RGB、深度、分割、法向及IMU；Related Works列Drone-Vehicle/HIT-UAV/RTDOD，不把其他数据集的红外任务移作本稿实际实验输入。

Hugging Face固定修订`590d7a7a93454f7a558141684a8931b87977c420`递归树共15项（4目录、11文件），文件集合与info端点siblings一致、无下一页。该修订未列像素文件；多模态图像另链接Baidu，尚未取得。实际目录`Referring Segmentation`含空格，首次错误路径404与纠正后200分别留证。

完整下载Object_Detection/test.zip并核对LFS SHA256：9,699个成员中1个目录、9,698个XML，全部XML的folder均为SceneImage、size均登记1920×1080×3，解析无错误。这个三通道值是标注元数据，不是打开图像后的像素核验。保存自动schema统计与三份原始XML样例；不执行文件、不标已读全部标注/发布数据。正式版、Baidu图像以及采集时AirSim实现仍待，UEMM目标作者身份保持已获原稿/个人页支持。

VITask原稿第8/10页数据与外部验证、第15/16页附录继续选读。MedMNIST官方定义的12个2D数据集为4个RGB三通道（Path/Derma/Retina/Blood）、8个单通道灰度；TissueMNIST原始32×32×7中的7是切片，标准数据取最大投影为单通道，不能当7光谱波段。本次只核标准定义及论文声明的数据集关系，没有下载本实验数组或运行训练。

IDRiD官方数据说明确认彩色眼底；MESSIDOR官方说明3CCD彩色成像、每颜色平面8bit。VITask原稿APTOS条目却使用Decencière2014引文，具体来源/版本仍需核对；所查APTOS2019官方比赛页虽200但只有JS标题壳，不当数据说明。论文链接的baiyang4/VITask完整树当前仅README，写接收后公开代码，尚无实际转换/训练实现；不将论文“代码可用”措辞当已取得实现。整体仍pending，机构差异亦不单独证明另一同名作者。

该输入续核结束时，作者目录188、总库757及范围计数保持第三批状态。后续未审数量以最新批次及交叉表为准；作者专项与全领域任务尚未完成。


## 2026-10-11：arXiv第四批100条与椭偏稿身份/版本核验

按第三批后的221条未审队列原序，逐项读取前100条官方API可得摘要：97条按摘要范围暂排、2条按原稿输入局部暂排、1条经交叉来源区分同名作者。摘要来自2026-10-10固定快照，三份固定版本PDF本轮HTTP200取得。R2-Net/DELE（2306.08817）的源摘要末尾自带省略号，未补齐尾段；2301.02763仅有一个粘连作者字段，原样保留，不自动拆成独立Jun Zhou字段或证明目标身份。逐项理由与阅读边界见 [第四批记录](sources/jun-zhou-arxiv-abstract-batch4-2026-10-11.json)。

农业遥操作稿2308.07231v3的首页Jun Zhou列南京农业大学工学院；局部第6–8页为无人机1080p/30fps视频、OpenMVG/LoFTR与MVS建图，第16–17页为机器人D455的RGB/深度里程计与VR控制。未把D455描述移作无人机视频的已核波段表，也不因三维、农业或机构差异认定光谱关系/同名身份。DDSC 2306.11592v1首页列西南大学，第3页§3.1为Yale B、ORL、Umist与COIL20人脸/物体图像，§3.2通道为卷积特征；矩阵spectral clustering不作为光学光谱。这两条按已读局部暂排，可以由明确高光谱基础关系重审；未执行论文代码。

椭偏稿2210.14440v2的原API及abs仍列《Direct observation of two-dimensional small polarons at correlated oxide interface》与17作者，原作者字段含不完整Milošević；固定v2 PDF首页为《Detection of two-dimensional small polarons at oxide interfaces by optical spectroscopy》与18作者，新增Muhammad A. Naradipa，并列M. V. Milošević。正式DOI 10.1063/5.0141814的登记也使用后者题名/18作者；精确ID与DOI连接来源族，但不覆盖原快照题名/作者。第3页的photon-in photon-out椭偏测量报告光谱分辨率0.02 eV，不能据此声称采样步长、波段数或成像立方体；完整输入方法及明确高光谱关系留全领域核验。

正式登记将Jun Zhou关联ORCID 0000-0002-5505-7616；该ORCID同时列精确arXiv DOI、正式稿及IMRE任职，与PDF首页机构相符。目标ORCID 0000-0001-5822-8233则关联Griffith个人页。交叉证据支持作者专项按同名排除，范围候选继续保留；不把机构不同单独当作身份证明，也不推广到其他A*STAR同名论文。出版社ORCID字段标记authenticated-orcid=false，证据强度与独立ORCID精确记录分开说明。身份与来源版本详见 [交叉核验](sources/jun-zhou-arxiv-batch4-ellipsometry-identity-version-2026-10-11.json)。

正式PDF直接访问403，未阅读正式全文。出版社说明DOI 10.1063/5.0173910登记明确correction关联原正式DOI，但说明正文未取得，具体修正未知；不推断作者增补或结果变化。Crossref正式published为2023-07-27、ORCID Crossref来源记录为2023-09-01、arXiv当前版本日期为2023-07-07，分别保留，不把当前预印本版本日期当正式发表日期。

第四批结束时，531交叉表：24目录匹配、32继承、5同名（4既有/1本批）、331摘要暂排、6局部暂排、2整名不符、10范围/身份待、121未审。累计350新增逐审，加60既有映射/身份记录共410有记录，包含待核，不称410已闭环。ORCID1重开、DBLP10、Scholar9及CV3待核集合仍有重叠。总库757、作者188、三维214、标签303及原图334不变；继续作者剩余输入/正式版本与121未审项，再推进全领域场所矩阵。


## 2026-10-11：arXiv尾批121条与六遥感来源续核

第四批余下的121条按固定快照原序逐项读取官方API可得摘要与作者字段，116条按摘要范围暂排、5条为Jian Jun Zhou或带句点变体的姓名查询不精确。前者分别记录任务及范围理由，不因graph、Fourier、band、thermal、3D等词自动排除，也不把通用算法潜在可迁移性当已证实高光谱基础贡献。J. Zhou简写的通信纠错码按摘要范围暂排，未据简写确认或排除目标个人。MSX红外颜色/8.28μm图像两条保留原光学观测信息，姓名查询决定不等于全领域光学范围决定。详见 [第五批逐项记录](sources/jun-zhou-arxiv-abstract-batch5-2026-10-11.json)。

第五批结束时531交叉表为24目录匹配、32继承、5同名（4既有/1新增）、447摘要暂排、6局部暂排、7姓名不精确、10范围/身份待、0未审。累计471新增逐审加60既有映射/身份记录，531条全部有记录；其中十pending继续，不称531全部闭环、全部目标身份已核或全文全量。带引号查询本身含非精确/粘连/简写作者，521独立规范化整名与10异常原字段统计仍不证明目标身份；姓名变体及其他来源差集未完整覆盖。

本轮优先追查FDNet、DDFNet、GPINet、SAPNet、红树林IGARSS2024及太阳能板IGARSS2022六条遥感pending。公开机构bundles六响应均单页完整，其9个bundle的bitstreams也各单页完整，共9文件：6许可/提交txt（228/229字节）及3份130字节SWORD提交XML元数据；未取得论文PDF。未读取许可文件内容，不从公共清单推断隐藏/受限文件或其他机构版本不存在。OpenAlex对其中五条标green OA且has-fulltext，但现公共文件清单未支持实际正文可得，二级发现标签不作全文证据。

DDFNet出版社XML虽然HTTP200，仅含精确DOI、题名、期刊、卷期日期与openaccess=0的coredata，没有摘要/正文段。ScienceDirect为403错误页；SAPNet IEEE页面202空响应、SAPNet/红树林PDF418；Crossref六查询三200三429，不把限流作不存在。SAPNet与红树林的出版社作者登记明确Griffith Jun Zhou，支持目标归属，仍不能确认实际实验波段。两共同作者ORCID person无主页链接，占位仓库所有者profile无姓名/主页/单位，仍未确认所有者关联；本轮没有重抓仓库树或跑代码。

六组arXiv题名线索查询返回FD频率解耦22条（20/2两页完整）、SAP词形相关1条光场SA-Net及其余零条，均没有这些目标论文精确题名/作者命中。相关简称不按名称合并；查询未命中不证明没有预印本。Google为跳转壳、DuckDuckGo为验证页，未采用作论文正文。六条实际光学输入均保留pending，并将新证据链接到DBLP、Scholar与Griffith当前记录；六条既有pending同时补入此前未索引它们的survey候选队列，不计新发表发现，来源范围计数不变。详见 [遥感原始访问与公开文件清单](sources/jun-zhou-remote-primary-access-followup5-2026-10-11.json)。

总库757、作者188及179摘要级/9全文级、三维214、标签303、原图334不变。第五批结束时arXiv十条范围/身份pending与ORCID1重开、DBLP10/Scholar9/CV3存在重叠；当前余量见下节，作者全集调研尚未完成。


## 医学待核的作者与正式登记续接（2026-10-11）

七条既有arXiv待核补书目、身份和输入来源；仅Mamba Snake改变作者专项决定。精确正式DOI 10.1145/3746027.3755148的七作者与快照逐项一致，Jun关联ORCID 0000-0002-4722-2183；独立ORCID公开履历列2015–2019中山大学本科、2020–2025博士与清华深圳研究院博士后。目标ORCID关联Griffith，目标ANU旧主页列2006年阿尔伯塔大学博士论文。交叉证据支持同名区分，不仅凭机构；保留Crossref authenticated-orcid=false及履历自报边界，六组公开ORCID作品没有该篇精确条目，不声称有独立作品列表确认。v1前两页与既有v2首页都列清华深圳国际研究生院，正式登记列中山大学，机构名称差异原样保留。正式ACM页403，未读正式全文；PanNuke输入和明确高光谱基础关系留全领域待核，不把本篇身份决定推广TEAMS/RADC。

AdvMIM的MICCAI章节10.1007/978-3-032-05325-1_6题名与四作者匹配；出版社First Online为2025-09-20，2026为印刷/版权年份。出版社及论文均链接zlheui/AdvMIM，固定提交1652af815c875ef268e92e91a8f01db1150d8c1c的递归树111项未截断，三份选读源文件Git blob吻合。README及当前输入代码是FLARE25 CT/MRI/PET单通道切片，不替代论文ISIC皮肤镜实验；实际ISIC通道与Jun稳定个人身份仍待。PDF入口200返回订阅HTML预览，不作正式PDF或全文阅读。

MerMED正式登记10.1016/j.landig.2026.101007为35作者，原稿25作者；仅去除姓名句点后24姓名相符，原Linh Le Dinh未列，新增11姓名，作者顺序也变化。标点归一只用于书目字段比较，不证明个人身份；原快照不覆盖。Europe PMC该DOI索引PMID42509078列Jun为IHPC，无其ORCID或PMC全文，仅作发现/书目辅助。TEAMS登记10.1016/j.media.2026.104277与九作者逐项相符；医学综述候选10.1016/j.media.2026.104293将题尾Meta-Analysis改为quantitative analysis并新增Keyur Shah（7至8作者），明确版本关系仍待。后两登记印刷卷期2027-01，created在2026年；在线发表日期未核，不用未来卷期或登记时间证明已经出版。综述出版社XML200仅coredata，TEAMS/MerMED入口429，没有新正式正文。

EVLF-FM、VITask题名查询各五条无目标匹配，不证明没有正式版，不因相近题名或FM简称合并。医学正式登记续核结束时，七条中余六保持pending；当时531交叉表为24匹配、32继承、6同名、447摘要暂排、6局部暂排、7姓名不精确、9范围/身份待、0未审。累计471原队列逐审不变（其中2新增同名），不计为新论文或正式全文阅读；原五批快照保留历史决定。另补24目录匹配、32继承及4旧同名共60条survey映射索引，不计新阅读或决定；该搜索现531条全部索引，明细见 [映射索引](sources/jun-zhou-arxiv-survey-mapping-index-2026-10-11.json)。coverage当前作者arXiv矩阵同步531记录/9待核，旧210记录行已更新。目录757、作者188、三维214、303标签及334图均不变。继续九条输入/身份/版本、其他来源重叠缺口及姓名变体；作者专项与全领域覆盖都未完成。证据见 [医学来源续核与身份审计](sources/jun-zhou-medical-identity-publication-followup6-2026-10-11.json)。


## PanNuke原数组、TEAMS范围与会议扩展续核（2026-10-11）

TEAMS v1第3页明确说明推进其ACMMM 2025 Mamba Snake工作，第21页对应七作者、完整题名和7825–7834页，与正式DOI 10.1145/3746027.3755148相符。因此会议扩展关系有原稿声明支持，不仅按Mamba简称合并；这不把会议稿的Jun ORCID自动移作本篇独立身份标识，也不证明未来卷期正式全文与预印本一致。指定第1/3/5/12/13/21页只做机构、方法/输入及引用局部阅读。

官方PanNuke数据页同时链接2019论文和2020扩展稿、三折ZIP及复现实验的三种划分。固定各ZIP的ETag，通过36个精确HTTP206范围读完整中央目录、9个NPY头及各96字节数据样本，总传输31,765字节；没有下载整个ZIP/数组或验证完整成员CRC。原始字节与哈希保存，结果如下。

| 官方折 | images.npy形状 | masks.npy形状 | types.npy形状/类型 |
| --- | --- | --- | --- |
| 1 | 2656×256×256×3 | 2656×256×256×6 | 2656，Unicode U13 |
| 2 | 2523×256×256×3 | 2523×256×256×6 | 2523，Unicode U13 |
| 3 | 2722×256×256×3 | 2722×256×256×6 | 2722，Unicode U13 |

图像合计7901张，image/mask为float64；U13是字符串宽度，首个完整组织值为Breast，不是13波段。原稿所链作者评估仓库固定提交c00014d766ca1be142b81bea19d9ef4315cde65a，完整5项树及README/run/utils的Git blob吻合；代码二值评估取前五层、逐类循环5次，README解释为核类别，不把六层mask当光学通道。作者相关HoVer-Net README说明RGB图像与实例/类别标签分开，并列PanNuke权重；这是源数据格式的辅助证据，不能当TEAMS实际loader或论文数组哈希。当前HoVer-Net dataset.py中的其他数据集RGB loader没有被转用于证明PanNuke实现。

TEAMS Table1及§4.1列MRI/CT四个数据集与PanNuke，并按二维图像/轮廓分割进行实验。结合其唯一光学数据的官方三通道结构与作者RGB格式说明，本篇按已读输入局部暂排高光谱范围（excluded_selected_scope）；明确高光谱输入或基础贡献可重开。范围决定不等于完成Jun身份或阅读全文，正式版/首次在线日期仍待。

Mamba Snake的作者专项同名决定维持。v2第6页§4.1和第12页Table6/附录PanNuke段也列MRI/CT与该显微数据，按当前证据全领域范围局部暂排，原全领域输入pending更新；其明示只使用2655张子集，与官方第一折2656和全三折7901分别保留，不能推断仅删了一张或宣称实际实验数组已核验。正式版、子集选择和代码/数据复现仍待；明确光谱关系可重开。六条同名中其余五条继续保留全领域候选。

RADC原稿仍未写EuroSAT的实际RGB/多光谱版本；冻结标准CLIP不能代替实际源输入核验。精确题名及简称发现查询没有取得原稿或稳定作者资料确认的实现，宽查首100未完整分页，未命中也不证明没有代码，保持pending。当前531交叉表为24匹配/32继承/6同名/447摘要暂排/7局部暂排/7姓名不精确/8范围身份待/0未审；471原队列逐审不变，旧批次快照不改。757总库、188作者及179摘要/9全文、214三维、303标签、334原图均不变。继续八条待核、六遥感/其他来源重叠缺口、姓名变体及已入库相关论文原文，作者专项与全领域覆盖尚未完成。证据见 [原数组与输入范围审计](sources/jun-zhou-pannuke-radc-teams-input-followup7-2026-10-11.json)。


## HyperSAM固定v1全文与方法原图（2026-10-11）

既有HyperSAM记录通读官方v1全部17页（公式1–21、表I–VII及56条引用），核原稿Jun Griffith单位与八作者；所有页面缩略图和图注已检查，数据构造Fig4、架构Fig7和主表/消融/成本表放大核对。保存完整原PDF、页面文本、两张300dpi方法裁图及来源哈希，不增加论文数。此处全文状态只指固定预印本阅读，不代表引用文献全部查完、GRSM最终版或实验复现。arXiv作者备注“GRSM接收”与稿件页眉分别保留；Crossref本次前五题名结果未定位目标，未命中不证明无正式版，目录仍以预印本记录。

训练源为SpaceNet2四城配准RGB/8波段WorldView3影像，10592训练/3527验证patch，使用772对匹配USGS Version7材料，通过共享丰度和照明合成224通道。没有实测HSI训练立方体；SAM3伪掩码来自可见图像，不能当真实材料边界。800合成/800真实谱PCA和独立归一化谱包络仅为定性合理性证据，不能代替配对辐射重建核验。Fig4原文字“TV on HSI/RGB consistency”与Eq4的丰度/照明TV、八波段投影不完全一致，保存差异，不改原图。固定SAM3 RGB/提示/基础解码分支，训练HSI侧ViT、零残差注入和3专家MoE；两谱窗128–224、至少32重叠并插值224，置信加权BCE/Dice与KL/路由均衡独立记录。

HC每类1支持像素，共享50配置池，主表按第15页声明是“最好测试结果”，不是50次均值。HAD/HCD无目标标签，但有自动格点提示；HTD使用统一目标谱/支持提示及场景阈值；HOSD GM13/17每类50标签构造原型，不称无标签零样本。主表HC OA为69.37/89.12%，BayArea/River略低FC-SD，Beach1 ODP低于SpectralEarth/HyperSIGMA/DOFA，Cri低于TSTTD；Airport消融完整模型也非每项最高。DF/ODP保持原量纲，ODP大于1不强制改百分数。

成本TableVII另报HyperSAM OA66.91%、21.11±1.98秒、0.624±0.223Wh、0.2964±0.1059gCO2e，基于RTX4090三次冷启动、0.5秒采样GPU整板功率，含加载/下游训练或推理，不含上游预训练及CPU/生命周期成本；按475g/kWh、PUE1.0重算0.624Wh得0.2964g。表注称同一配置重放，正文说每次从池选一个支持配置，实际seed未给，保留不确定性；不混入主表最好OA69.37或称最省能模型。

全文重审归类为表征预训练、光谱重建、地物分类、异常/变化/目标检测、Transformer及海上监测。移除原暂定数据集基准标签：训练语料构造不等于已发布语料/独立基准；泛语义分割标签改为实际下游任务。类别定义及其他论文不改，标签总数仍303。上游SAM3当前main含SAM3.1，不代替论文声明的2025年11月原checkpoint；原权重哈希未核，HF原模型README401，上游SAM License不能代替HyperSAM专用实现许可。SpaceNet官方页列AOI/AWS与CC BY-SA4.0；USGS原出版页连接Version7数据发布，772精确选谱、保留patch、合成数据许可和专用代码仍待。

当前总库757、作者188（178摘要/10全文级），三维214；分类392确认（审计336）、346暂定、19待，原图336张。arXiv531交叉表决定及八待核未变，新增是已入库相关论文的全文调研，不是作者全集/全领域完成。下一步继续其他已入库论文原文、八待核与重叠来源/姓名变体。证据见 [HyperSAM固定v1全文审计](sources/jun-zhou-hypersam-v1-full-reading-2026-10-11.json)。

## HyperVision固定v3全文、正式接收与实现续核（2026-10-11）

既有2605.17286v3通读20页，公式1–6、表1–7、全部图注和参考条目已读，保存原PDF、逐页全文文本及完整Figure3/4方法裁图。引用作品不等于逐篇已读，v1/v2正文尚未对照。首页Jun Zhou列Griffith信息与通信技术学院，补强既有作者关联，不向其他同名作者推广。BMVC2026官方接收名单有精确题名、编号329；论文链接作者仓库也声明接收。主目录更新为BMVC/accepted，并保留原arXiv DOI、链接及预印本BibTeX，新增接收版本关联而不增加论文。官方名单没有作者表、最终PDF、DOI/页码或出版日期，不能称正式出版全文已核。

Table1列26个数据集的31个子集，共14,959张，15–420波段、377–1700nm；与固定README的31行数量核对，加和一致。HOT2024每100帧抽1。预训练清单包含HSIDrive752、City1330和HSSOD60，与下游数据集名称及全量计数重合；没有图像级manifest或训练/测试隔离说明。保留这一协议缺口，不认定测试图像必然参与，也不宣称已隔离。HOT2024/2023名称年份不同不能证明序列或帧不重叠，真实数组和各源许可仍待。

骨干沿用每10nm波长字典，key/cube动态卷积相加后ViT编码。SAM2分别生成RGB/伪彩结构及光谱序列记忆掩码，HyperFree提供材料掩码，全局NMS/OR融合，再用prompt分割训练；OR后子掩码分解、非整除三通道序列、τ和λdis具体值未给。蒸馏段明确冻结原SAM教师和DINO式token交叉熵，不混称SAM2或DINOv3教师。无人工标签预训练与下游监督训练任务头分开，冻结骨干不等于零样本/零标签。

主表HSIDrive Accµ/AccM/F1M/JM为97.44/89.67/90.70/83.51%，City为93.41/66.05/67.87/57.04%；HOT2023的16序列AUC0.571、DP0.785；HSSOD MAE0.049、AUC0.959与HyperFree并列。16.3%宏精度提升是相对RU-Net的比例，差值12.58个百分点；跟踪2.1%相对SENSE，非相对HyperFree。Base加蒸馏四指标全降，Large仅伪标签的宏指标低于原HyperFree；Table6的HyperFree*是冻结基线而非材料伪掩码单源预训练，未作完整二源组合消融。Table7的B/L/H为69.61/140.43/221.40ms、2904/3370/3770MiB，慢于所列CNN；较少可训练参数不等于推理加速。约40小时/变体、硬件/测时细节与单张t-SNE的外推意义分别留边界。

作者仓库固定提交`5fa12f5b904cd4abfbeee4d920de79bf8860591b`完整树76项，11个选取原文件下载并核Git blob；只读README、builder、匹配/reader入口与部分pipeline/编码器关键段，非全仓逐行审计。当前匹配取距离≤10nm的首个输入，不是最近邻；训练40索引可重复，test_mode只处理匹配锚点，不保证全部物理波段。C<20的is_mu分支名称不改变15通道实测HSI的范围。builder的eval()不冻结参数；全树未见独立预训练入口、下游训练配置或图像split，有通用训练pipeline，不说完全没有训练代码。

当前HyperBlood默认清洗128至113波段，有明确删噪声/损坏行说明，不当无解释错误。DeepHS-NIR声明bands249而波长252、VIS/VISCOR声明249而波长224，UM-OS及HyKoVIS也与论文名义数不同；只是静态配置/版本缺口，不推断论文数组或未经执行的失败。HF固定修订`21aecfa4461e9019c285095c3accdf689c226735`两页78项完整树列B/L/H三权重，大小及LFS OID仅来源声明，未下载/哈希/加载。GitHub license=null、树无LICENSE，main README许可段在注释中；README_hf YAML/HF模型卡明确apache-2.0，不自动代替上游或26个源数据许可。

本轮保存22份成功原始响应与4份派生来源审计，原文件字节/哈希保留。全文重审补既有显著目标检测和Transformer标签，不增加类别或论文。当前总库757、周峻188（177摘要级/11全文级）、三维214；分类393确认（审计337）、345暂定、19待，303标签及338张原图。arXiv531来源决定及八待核不变，原mapping索引与本轮全文续核分开。作者专项和全领域任务均未完成；继续已入库论文原文、八待核、姓名变体及跨来源差集。证据见 [HyperVision全文与发布审计](sources/jun-zhou-hypervision-v3-full-reading-2026-10-11.json)。

## 皮肤镜数据2018与WACV2025分类全文交叉核验（2026-10-11）

既有《Pixel-Wise Shuffling with Collaborative Sparsity for Melanoma Hyperspectral Image Classification》通读CVF官方WACV2025开放稿10页（6485–6494），公式1–6、两表、全部图注/36引用条目，以及官方两页补充A–D、两表及曲线；保存原PDF、全文页文本和完整Figure1/2原方法裁图。所引《A Hyperspectral Dermoscopy Dataset for Melanoma Detection》也取得并通读出版社正式9页（268–276）、Eq1、Table1及四图/23引用条目。引用作品未逐篇核验，方法未运行。2018补精确DOI10.1007/978-3-030-01201-4_29、完整书名及出版社/Crossref一致的2018-10-02首次在线日期，关联旧记录不新增论文。2025读CVF官方开放接收稿及补充，IEEE最终PDF未另逐字比较。

2025主稿§3.1写338图，类数85 melanoma、185 dysplastic nevi、78 other却合348；2018总330一致，但Introduction为85/175/70、Collection为80/180/70。保留四种原始说法及各自位置，没有实际图像manifest来选择、更正或证明数据增补。2018是活检前皮肤镜成像、病理报告标签及手工bbox，不是体外组织切片HSI；16波段465–630nm、Ximea/RaspberryPi/10× LED dermatoscope，raw1024×2048的4×4 mosaic解码256×512×16，同页又称band约512×272，尺寸差异待实际数组。暗扣除/白归一后乘16×16相机谱校正矩阵；相机up to170 cubes/s不当实际临床视频采样率。病理/伦理陈述为作者报告，不称独立核过诊断或伦理材料。

2018实际基线是训练bbox网格取谱构建稀疏dictionary，sparse codes/maxpool后多类SVM；630/546/465nm三带RGB用LBP/SVM，另比size，不把学位论文或related-work深度网络移作本稿实验。每类随机60图训练、余下测试，五次重复报mean/STD，没有患者独立划分说明。三类HSI sparse-code SE69.33±19.82%、SP72.95±1.74%；RGB LBP55.44±3.99/46.09±10.91%。加size三类77.33±14.61/73.61±1.00，但二类SE84→80下降、SP72.10→80.70上升，不说全面改进。原结论明确纯光谱不足以可靠检测。

2025用给定谱库F求解重建+φL0丰度，文字提非负/和为1、非局部协同和谱角预条件；公式未显式写物理约束或L2,1/TV/low-rank，谱库来源、阈值、求解器也未给，不套用引用方法。B的文字行像元解释与F/H矩阵乘法要求的方向不同，具体转置待实现。丰度先验、ViT迁移、learnable queries和余弦重权self/cross attention结合，光谱顺序/空间编码及shuffle/interpolate、local contrastive loss/类别权重产生三类病变预测；temporal不是患者时间序列，bbox不证明该方法做预测框定位。EndMember1/5/7/9原丰度图没有物质真值映射，不当melanin/hemoglobin浓度准确性证明。

2025正文20/30/50%训练/验证/测试，训练才做增强；又写20% of training data，消融10/30/40%的基数及验证测试调整不明。Adam lr5e-4、作者称exponential weight decay0.05、最多300epoch、单RTX4070；batch/seed/重复次数/患者划分未给。主表OA73.34%、AA66.87%、SEN66.40%、PRE72.73%，Kappa原数53.33、STD0.7051、Param.(MB)89.70；不改成89.7M参数/运行显存，不把最大STD当更稳。相对SpectralFormer OA差2.96个百分点。Table2的CS✓/PWS×为71.20、CS×/PWS✓为72.88，正文的withoutCS/withoutPWS名称正相反；按原表留证不猜修正。全模型10/20/30/40% OA为63.53/73.34/83.13/85.81，非与2018 SE/SP可直接比较的临床指标。

补充20个φ/window配置中，φ0.01/window3的OA73.34、24.3472GFLOPs最高OA，但window2的PRE73.14更高；STD最高亦在另一配置。文字先说lowerφ更稠密/高成本，随后说lowerφ降低成本，原GFLOPs表随φ降低而下降，保留矛盾，不凭理论纠正实际实现。七组编码/注意力消融不是完整16组合，无实测实时系统、患者级/多中心/前瞻临床有效性证据。

作者数据仓库固定提交94324c5bcce4f583f30df22856d2747025e8bb6a树仅README，完整未截断，原README blob核验。它链接正式数据论文、学位论文、相机GUI和外部原图/校正cube，但本身未列330数值。未下载/清点GoogleDrive/Dropbox载荷，license=null/无LICENSE，公开入口不作许可证明；相机GUI不作2025分类实现，正文/补充未给专用代码链接不证明外部实现不存在。

全文分类纠正2025的地物标签，新增必要任务“医学高光谱病变与组织分类”；两篇都关联该任务，2025补既有给定谱库稀疏回归、Transformer、皮肤/生医应用，2018保留数据集标签。未整体迁移其他未读医学记录。2018四图为谱图/样图，没有方法流程，队列记no_framework，不移用2025图。共11份原始响应/4派生全文或表审计，既有两篇升级，无新论文；当前757目录、周峻188（175摘要级/13全文级）、214三维、304标签（任务100/方法181/应用23）、340原图；394分类确认（审计339）、344暂定、19待。arXiv531与八pending不变，作者全集/全领域任务未完成。证据见 [两篇全文与输入/协议交叉审计](sources/jun-zhou-dermoscopy-pws-full-reading-2026-10-11.json)。
