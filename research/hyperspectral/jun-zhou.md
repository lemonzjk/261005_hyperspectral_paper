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

当前作者目录188条：直接高光谱181条、多光谱关联7条（含1会议摘要）；146条摘要级、42条全文级。出版版、预印本及会议摘要分别留证，不能当作188个独立方法。[既有索引](jun-zhou-study-guide.md#当前作者目录完整索引)仅同步目录。

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

五篇分别是2009 OTCBVS/CVPR Workshops高光谱纹理描述、2010 ICIP CCRE配准、2011 TGRS L1/2-NMF、2011 ICCV材料用户颜色配置、2011 IGARSS结构稀疏分类。五篇均阅读原稿摘要，并仅对明确记录的局部页读图或实验；不标为全文阅读。ICIP登记拼写Regisration保留，正常拼写作为审计别名；作者顺序按原稿和精确DOI。首批误记2009作者稿10页，2026-10-11已核同一PDF实际8页；正式112–119仍另核，见末节纠错。L1/2两份2011年作者稿的摘要差异单列，不借早稿“无偏”表述充当正式定理。

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

ICIP MMSNMF原Figure1 PDF3；端元与丰度各自图，不误作空间/特征双图。先前局部只读合成；2026-10-11全文已确认Jasper Ridge实测及表均值/公式疑点，见末节。登记constrainted与正文constrained拼写不混改。TGRS MTSNMF共享系数/各波段字典，原Figure1 PDF8/稿内7；正式2015-05:2621–2639，公开作者稿36页。ORCID190/192题名差异为同DOI、同三作者/摘要，只入库一次。

DICTA相对深度只机构完整摘要，边缘直方图散焦与邻域谱差生成相对稀疏深度，合并/归一化/光滑；传感器、数据、误差和原图未知。JSTARS五作者原稿终于匹配：初始Semisupervised查询2结果无精确匹配，Semi-supervised变体精确匹配后下载；Figure1 PDF5/稿内4只展示超图构造。原引言[20]/[21]对应两2013会议且指出未考虑空间关系，本稿加入空间和组稀疏，三数据APHI/Indian Pines/Washington。补旧会议关联同方法族，不借期刊数据/作者或假称已核正式扩展声明。八篇均只摘要及记录局部，不标全文，未报未核性能数值。

2015余十组首轮决定

本批新增3、排除7、待审0：新增《A Large Margin Learning Method for Matching Images of Natural Objects with Different Dimensions》书章节、《Automatic Estimation of Soil Biochar Quantity via Hyperspectral Imaging》书章节及《Learning Graph Model for Different Dimensions Image Matching》GbRPR会议论文。三篇均明确以高光谱影像为输入或匹配对象；前两篇保留章节原始DOI与摘要边界，GbRPR条目保留作者稿和正式页码。

《An Incremental Structured Part Model for Object Recognition》《Local and Global Regularized Sparse Coding for Data Representation》及《Object Classification via Feature Fusion Based Marginalized Kernels》分别核到通用目标识别、通用稀疏编码和QuickBird VHR实验，未因 spectral/spatial 字样收录。《Isometric Mapping Hashing》为通用流形哈希；两条Preface/整书记录不是独立论文，均排除。《Automatic estimation...》的2015 ch011与后续2018 ch073是不同书籍、不同DOI，禁止混用摘要、页码和实验事实。

WHISPERS 版本年份差集

Scholar 分页和 DBLP 记录补出两条 ORCID 登记年份为2017、正式 DOI/会议为2015的高光谱论文：《Multiple graph regularized NMF for hyperspectral unmixing》（DOI 10.1109/WHISPERS.2015.8075468）与《On the sampling strategies for evaluation of joint spectral-spatial information based classifiers》（DOI 10.1109/WHISPERS.2015.8075474）。前者已取得 Griffith 作者仓储接受稿摘要，核实多尺度多图正则化 NMF 机制；后者取得机构作者稿和摘要，已核光谱—空间分类评估问题。两篇不与 ORCID 2017 年份重复计数，版本差异保留在 `sources/jun-zhou-whispers-2015-version-audit.json`；旧 `sources/jun-zhou-2015-multiple-graph-abstract-followup.json` 错挂2025跟踪身份，2026-10-11已用IEEE原摘要/本AM全文另存纠错；旧记录保留但不再作为本解混内容证据，见末节。

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


## E2E-MPT固定v1全文、材料提示与原图核验（2026-10-11）

既有arXiv2605.20569v1通读12页（公式1–19、表I–VIII共59行、图1–10图注、54参考条目和作者简介）。第1页Griffith机构及第12页周峻简介支持目标身份，保留作者Guanmanyi Fu的原拼写。原站仅v1历史，PDF标Research Report，仍为预印本；项目README题名多Wavelet-Enhanced，只留别名，不新增论文。Crossref题名查询前五结果无精确同题，只是该查询阴性，不证明没有正式版本。引用条目已读不等于引用作品全部通读。全部原响应与逐页抽取留证。

输入为原HSI模板/搜索帧及首帧bbox；完整方法先可训练投影对接冻结OSTrack，不能把RGB基线用的FCI当本方法只输入三波段。MRDM默认CNNAEU编码丰度A/解码光谱，r=6；1×1 adaptor变成6个学习通道，再沿相邻通道做1D Haar形成各3通道低/高材料支路。这是学习basis的和/差，不是原波长轴低/高频或六真实物质的证明。每支路WMP另对空间特征做2D Haar，LL跨注意力，HL/LH/HH为group conv后IHaar；FPFM瓶颈残差融合，在层1,2,4,6,8,10,12注入主干。按联合丰度/跟踪任务及Transformer归类，移除光谱表征预训练暂定标签，不套用高光谱压缩的小波编码类别。

联合损失为(1−λu)Ltracking+λuLunmixing，默认λu=.5；tracking为focal+2GIoU+5L1，reconstruction为SAD+MSE。Search二值mask来自backbone candidate elimination scores，V=0目标相关/V=1背景；默认λce=.2时目标重构权重.8、背景.2，加完整template重构，不是额外像素级材料真值。未给具体候选阈值/掩码插值、置零谱SAD约定和区域归一化；丰度非负/和一及decoder端元实现待代码。图3(b)标ReLU但Eq12/14正文称LeakyReLU；图2画预测头冻结，而正文只明说冻结backbone/优化新增模块，确切冻结范围保留待核。

本文§IV-A报告HOTC2020为40训练/35测试，16通道460–600nm/25FPS、11属性；HOTC2023为110训练/87测试，VIS16/NIR25/RedNIR15；HOTC2024为216训练/117验证，按原文保留validation名称。当前官网首页406/75/75属于HOTC2026，不能替换旧年协议；未取得全部旧年原视频、成员和许可。单V100/PyTorch、预训练OSTrack/ViPT协议，50 epoch、每轮5600对、batch16，AdamW lr4e−5/WD1e−4，第47轮后lr乘.1。OPE报DP@20像素与success AUC，没有多seed/置信区间；实际训练组合、跨年度序列重叠与各域汇总权重仍未知。

表I HOTC2020为DP/AUC .966/.734；HOTC2023 NIR .973/.759、RedNIR .732/.596、VIS .899/.688；HOTC2024相应.939/.758、.724/.549、.743/.564。总体正文HOTC2023 .903/.701而表III .902/.701，HOTC2024 .790/.611；分别留值，不用各域简单平均强改总分。HOTC2020 MMF在表I为.931/.692、表III CLSUnSAL+MMF为.933/.691，运行/配置差异未知。两种AE的端到端消融优于对应两阶段，不据此证明任意解混模型泛化。没有独立端元/丰度真值质量表，材料解释不升级为已证明的物理浓度。

默认7层新增1.78M、23.76G MACs、26.02FPS（表V/VI）；表VIII约为+1.8M/24G/26FPS，主干93.4M，不能说整个模型仅1.78M。表VII的FPFM却为2.6M，计数/配置差异待核；正文还提multiplication而表VII只有4行无此项，不能补造结果。全12层DP .967略高于默认.966，但AUC .730低于.734且20.73FPS慢于26.02；卷积融合AUC .701低于简单相加.720。Figure1的19.3ms对1.6ms/12.1×只比较材料处理，整体26FPS慢于OSTrack52.4FPS，不宣称整体加速。11属性中8项第一，形变/平面外旋转/出视野非第一；作者Fig9明确长遮挡、低分辨率及极端照度失败，没有显式时序记忆，未见材料也会退化。

当前作者分支仍afeb3490a52998fe81654e365c8432b0dbdb8b02，完整递归树8项/7 blobs逐路径git SHA与旧审计一致，README字节哈希相同。只有README、MIT、2图片及3结果ZIP；训练/测试路径、配置和模型权重未在树中。ZIP35/87/117文本成员与抽样来自2026-10-10旧审计，本轮未重取或复算指标，不能当原视频/运行代码。MIT只属仓库，不转移原数据、论文或上游权重许可。既有项目Overview人工比对v1第3页Figure2，保留原图字节/来源，补图号页码；新保存第4页完整Figure3(a,b)，无重绘。没有新增学习笔记。

8份原始响应与2份派生全文/表审计；既有1篇升级，不新增论文、类别、作者查询或年度扫描。当前757目录、周峻188（174摘要级/14全文级）、214三维、304标签（任务100/方法181/应用23）、341原图；395分类确认（审计340）、343暂定、19待。保留531arXiv决定、八pending及旧mapping-only历史，追加本篇fullTextFollowup。其余作者原文、身份/姓名变体/多源差集与全领域顶会顶刊/arXiv覆盖仍未完成。证据见 [E2E-MPT全文、表格及资源审计](sources/jun-zhou-e2empt-v1-full-reading-2026-10-11.json)。


## MHT材料跟踪v5全文、基准及作者实现续核（2026-10-11）

既有TIP2020材料跟踪论文关联arXiv1812.04179v5通读12页，含Appendix A、公式1–16、表I–IV、图1–10图注/图例和63参考条目；未逐篇读所引作品。正式登记题名不含Benchmark and Algorithms，TIP29:3719–3733为15页；IEEE PDF返回418、页面202空，Griffith完整一页bundles仅SWORD/130字节XML元数据，无正文PDF。本轮全文状态明确限定v5，不当正式15页或v1–v4已读。原站五版日期补齐；Crossref目标精确ORCID、Griffith同题/DOI和共同作者主页支持身份/版本关联，不新增论文。

v5数据为35组HSI与35组近视点RGB视频，平均约500帧、25FPS；相机up to180 cubes/s不能当实际采样率。16波段名义470–620nm、512×256；RGB与HSI各自标单目标直立bbox，作者报告三志愿者含一专家检查，不把两模态框直接互用。附录是暗扣除/相机谱校正矩阵，首帧人工匹配的几何矩阵变换后续RGB；CIE2006 10deg/.1nm CMF→XYZ/sRGB再色迁移用于FCI。没有40训练序列声明、固定train/test或离线谱库/测试隔离证据，不能用E2E-MPT2026所报HOTC2020的40/35回填。原始视频、实际波长与校准矩阵未取得。表IV 35名字与表I属性计数有差异：MB4/5、OCC15/14、OPR18/19、BC18/17；Player的DFF原拼写不改，若认作DEF才能合该项7。

方法以SSHMG空间/波段多维梯度和外部解混丰度两组材料表示驱动BACF：z=4立方、9空间/4光谱角bin、2×2 block L2/.2截断/重归一，再沿光谱拼接；第三维是波长，不是场景几何。离线VCA/Kmeans谱库、首框CLSUnSAL行组稀疏、按行和top-R/HySime选端元、后续SPU丰度，端元固定。在线可靠性用各组框与最终预测框的IoU/中心距离和位移平滑，EMAη=.0023；不是用每帧GT指导可靠性，也没有端到端CNN材料模型，后者只在future work。v5 Windows/i7-7800X3.50GHz/128GB RAM，OPE首帧GT初框、DP20像素/success AUC，余参数承BACF，无多seed/置信区间或完整实测FPS表。

Fig5 MHT DP/AUC .878/.612，SSHMG .860/.593，BHOG .851/.585，HOG .835/.589，单丰度 .626/.349，raw spectrum .545/.273。比BACF RGB AUC .540增7.2百分点、比FCI .578增3.4百分点；RGB C-COT .617高于MHT HSI .612，不宣称超过所有深度方法。两模态实际采集/独立标注不构成仅输入信息量变化的严格控制实验。表III数值/表题第一是IPR/OPR/DEF/BC/OV五项，正文却写IPR/OPR/SV/DEF/BC；SV .609低于C-COT .613，不照正文扩大结论。IV .490非最佳，作者解释端元固定且与照度相关。E2E-MPT后续表中MHT .880/.593与本文v5 .878/.612另留，实际正式版/成员/评价差异待核；没有材料丰度真值质量验证。

共同作者主页精确条目链接MHT_release.zip，取得完整153成员/CRC与每成员SHA256。去除目录、mac元数据和.DS_Store为75载荷文件：50 MATLAB、7 C/C++、15 MEX、2 DLL、1 MAT；不是75源码已全部读。通读19个关键MATLAB文件、另3局部选读，没有MATLAB/Octave或真实视频运行。实际lib为16×300 double，MAT header写2020-05-07仅文件时间，不推公开发布日期或300真实材料。默认材料+SSHMG、208维SSHMG、5尺度1.01、search scale5、ADMM2轮/.01、Newton50；CLSUnSAL active lambda3e−4/200迭代/TOL1e−6且POSITIVITY/ADDONE=yes，不能把无效lambda1e−3注释当使用值。

原式/实现分别留证：Eq5把min下标写X而观测已给定，只有S≥0，代码另加和一；Eq1比值arctan和[-1,0,1]描述，代码gradient/atan2及偏移、gradientHist最近方向+空间soft bin不同；Eq7/8的sqrt(D)在Eq9乘子更新缺项，分母Tμ的T未定义，未当已独立证明的正确闭式。simplex_project原注释明说非所有情况保证最优；getDymaticMaterial调用未随包提供的bsst，但默认未启用，不把它写作动态端元主方法。

代码Demo同为35序列但不是v5同一名单：规范board1→board和pedestrain→pedestrian后，表IV有board2/kangaroo2/toy3，Demo对应rider1/rider2/trucker。固定4×4/16的X2Cube注释1088×2048输入、256×512×14输出与实际reshape不符，裁行语句已注释，实际输入须取载荷。hyper2im显示为1/8/16波段标准化，非附录CIE转换；不推RGB基线生成也如此。构库函数VCA返回band×端元、拼接后kmeans直接按行未转置，不能据其证明已给16×300库可重生。MHT计时排除读图/转换/归一及循环前库选择，FPS以结束loop_frame=N+1计；Demo FPSs标量覆盖而非逐视频数组。静态口径缺口不替代真实FPS复算。总代码无许可文件，CLSUnSAL称GPL2.0，Piotr工具称Simplified BSD且所指bsd.txt未随包提供，许可分开记录。

HOT2020官网有两套数据入口及Evaluation.zip/X2Cube.zip/HyperTools.py。本轮只取得公共工具、核完整CRC及关键源，不取完整视频。MATLAB评测DP严格<阈值、IoU≥阈值，AUC为.02:.02:1的均值，NaN剔除改变分母，注释中心输入与实际xywh转换不同。当前Python helper在NumPy2.5.1合成数组探针：VIS4×4/16转换通过独立reshape对照；NIR5×5/25因输出固定//4报ValueError；np.float导致compile_results报AttributeError；相同x/y=0框success AUC0、正坐标完美框AUC1。仅AST中原函数定义在隔离NumPy空间执行，省略未使用pandas导入，原文件未修改；这不是MHT运行或真实标注有零坐标/指标错误证明。当前工具不自动转作2019实际实现。

保存v5第3页Figure2与第4页Figure3完整原方法裁图，无重绘；图号明确版本。15份原始响应（13个200、202空与418各一）及5份派生全文/表/源码/工具审计，不新增学习笔记。补必要“相关滤波跟踪”方法标签和既有纹理/给定谱库稀疏回归，仅迁移本篇。当前757总库、188作者（173摘要/15全文级）、214三维、305标签（任务100/方法182/应用23）、343原图；395分类确认（审计341）、343暂定、19待。531arXiv及八待核、旧来源映射批次不改，两个既有survey候选只追加v5全文续核。作者全集与全领域顶会顶刊/arXiv覆盖仍未完成。证据见 [MHT v5全文、协议与作者实现审计](sources/jun-zhou-mht-v5-full-reading-2026-10-11.json)。


## CNHT v1与接收稿全文、书目纠错及实现续核（2026-10-11）

既有高光谱视频KCF条目通读arXiv1810.11819v1全部12页，含式1–8、两表18行、图1–6图注/结果图例及18参考条目；所引作品未逐篇读。首页明确Kun Qian、Jun Zhou、Fengchao Xiong、Huixin Zhou、Juan Du五作者，Jun Zhou为Griffith；原目录Xiao Bai/Jun Zhou/Antonio Robles-Kelly错误更正，不能把参考1作者当本文作者。Crossref精确DOI、Griffith机构作者与共同作者主页确认正式会议为ICSM2018，不是ICIP，Smart Multimedia/LNCS11010:308–319，DOI10.1007/978-3-030-04375-9_26，在线2018-12-08。旧ORCID/DBLP/arXiv决定和快照保留，新增书目续核，不新增论文。

Griffith明确Accepted Manuscript，取得12页PDF，MD5与原记录吻合。逐页对比：第2–12页文字提取字符完全相同，首页去掉精确arXiv侧标后只差空白；两PDF整体字节不同，未推图片/字体/对象完全一致。AM全文已读，Springer章节页面与PDF入口均HTTP200但实际Client Challenge HTML，未取得VoR；不能因页数/文字一致而标正式排版全文已读。arXiv当前只有v1，提交2018-10-28；页面Rights入口指向CC0，Griffith另列Springer版权，预印本、正式版、代码和数据权利不合并。

实验只有apple/deer/people三场景，分别Gray/RGB/HSI，共九序列而非九独立场景。HSI/灰度182/114/641帧合937，512×272；RGB422/230/676帧合1328，原表写1980×1080。HSI30FPS，Gray为490nm单带，与HSI同帧数/内容/位置；RGB用旁置NikonD600，视点、长度和分辨率不同，不是仅光谱信息量变化的控制实验。引言14波段/470–620nm，§3.1写原16/460–630nm，经校准Photonfocus14或Ximea11；表1三HSI均14，11通道实际实验及删带/校准载荷待核。不能套用MHT35组或HOTC2020的40/35协议。

CNHT从首帧局部空间×空间×谱块随机选固定卷积核，实验10个6×6×14，响应堆叠为多通道Gaussian KCF，核岭回归/FFT峰值定位并在线更新相关滤波器。本文称两层CNN，所述实际是卷积和堆叠，无离线大数据梯度训练；不是学习的端到端材料网络，第三维不是场景几何。d在波段数与核数重用，14与10分别保留。式6/8印刷的交叉项在−1/σ²括号外且未显式复共轭，代码另有conj、通道求和、全距离缩放/标准化与max(0)，不静默修正原式或称已独立证明正确。

MATLAB/i7-7700HQ2.8GHz/32GB；首帧GT初框，base sample原文0.2–3倍初目标，比较方法改搜索域（STC例6倍），余承KCF。表2为中心距离DP@20px，不是分类准确率或IoU AUC：CNHT98.2%/1FPS，CNTGray92.7%/0.5FPS、KCFGray53.6%/278FPS。绝对提升5.5/44.6百分点，正文83%可由相对KCF83.21%解释，非83百分点；1FPS低于采集30FPS。未给多随机seed、置信区间、平均权重或外场景泛化；精度与速度是作者报告，未运行复现。正文DLT[8]/CNT[17]/STC[7]分别指错作品，参考实际8=STC、17=DLT、7=CNT；参考11/13重复，18条不等于18不同作品。

共同作者精确条目链接ICSM.zip，24项/CRC与逐成员SHA256已核：22 MATLAB、2 MEX。15核心MATLAB完整读取，其余未通读，不当全部源码或MEX审计。默认gaussian/cnn、lambda1e−4/sigma.5/interp.075/output_sigma_factor.1/cell_size1/padding3，实际window为target×(1+padding)。首帧全图最大值归一，select_fliter每核独立randperm(20,1)作相同正x/y偏移，无目标框约束/越界保护或rng，也可能重复采样，不是无放回选十不同块。cn用same三维卷积后仅取h(:,:,1)，演示main另用valid；get_features除255/减全局mean，cosine应用代码已注释，核固定、KCF模型EMA更新。谱边界取片/滤波归一与论文差异分别记录。

包缺tracker所需X2Cube和main所需X2Cube2，也没有论文视频/标注；不挪用MHT16带或当前官网转换器填历史14带实现。Demo只有ball/basketball、Windows Updated Dataset路径，非三场景入口；loader假设HSI目录/四位PNG。单视频返回positions/ground_truth/fps，choose/all仍当precision/fps接收，precision计算已注释、all还加入Jogging，不构成论文汇总入口。评测helper分别用DP<20与≤20，并删NaN/截短，默认均未调用；表2实际边界/聚合待。大目标半尺度分支的图像resize被注释，但表中HSI初框均未触发该条件，不能据静态代码说论文HSI实测错误。计时排除读图/转换/归一/显示及循环前采样；download_videos是普通OTB50，不证明三HSI数据可得。无MATLAB/Octave或实际跟踪，总代码无LICENSE，Henriques归属/Piotr BSD第三方声明分别留待。

保存v1第3页Fig1和第4页Fig2完整原裁图，未重绘。13原始响应、5派生全文/版本比对/表/源码审计；不新增学习笔记。补“模板采样卷积特征”方法与既有相关滤波，仅本篇关联。当前757总库、188作者（172摘要/16全文级）、214三维、306标签（任务100/方法183/应用23）、345原图；395分类确认（审计342）、343暂定、19待。两个既有survey候选追加全文及书目续核，531arXiv历史决定与八pending不变。作者全集及全领域顶会顶刊/arXiv尚未完成。见 [CNHT全文、书目纠错、版本及代码审计](sources/jun-zhou-cnht-v1-full-reading-2026-10-11.json)。


## SST-Net会议公开稿全文与结果资源、DMT原始摘要续核（2026-10-11）

既有SST-Net（WHISPERS2021，DOI10.1109/WHISPERS52202.2021.9484032）取得会议官网5页公开稿，完整通读式1–4、表1/2、图1–3图注和图2图例及22参考条目；未逐篇读引用作品。原文首页/Crossref/Griffith均确认六作者及目标Jun Zhou的Griffith机构，公开稿不当IEEE正式VoR。IEEE下载入口202空响应，机构仓库仅SWORD/XML；正式版差异仍待。原始PDF及逐页文字抽取保存，无新论文或学习笔记。

方法是BAE-Net的1×1谱卷积/反卷积与Softmax权重，加空间三卷积/两反卷积和门控RNN式时间状态，三路权重平均、排序重排为三通道FCI，送VITAL弱跟踪器并平均位置。不是Transformer。空间正文称沿channel pooling而公式称global average，确切轴/维度待实现；Eq3 m_t同时用作门与新记忆，不静默修成标准GRU。Eq4平均弱跟踪损失，但L与前文C的对应、排序梯度和余带处理未明确，作者“end-to-end”不等于全链路已独立核实。新增必要的光谱波段分组任务与谱—空间—时间注意力方法，仅本篇关联；未据分组直接套严格波段子集缩减。

公开稿明确竞赛40训练/35测试，同场景HSI/FCI/RGB，谱/空间模块离线预训练，时间模块首帧训练；得分低于交叉验证阈值时三模块更新，lr=.005。正文仅链竞赛根站，没有通道数、分辨率、具体HOT2020载荷/成员、阈值/划分、轮次、硬件或FPS。当前官网与35结果文件不证明2021实际输入版本相同。OPE precision/success AUC，图2汇总精度未显式给20px阈值，不写成DP@20。表1 AUC .6061/.6190/.6101/.6230，空间/时间/合用比基线增1.29/.40/1.69百分点，无显著性或协同证明；表2 SST .6230比HSI/FCI VITAL .6047高1.83百分点、比RGB C-COT .6020高2.10百分点，n/a保持缺值。

图2 success AUC SST/BAE/MHT为.623/.606/.589，precision .915/.876/.888；BAE的AUC高于MHT但精度低，不能照正文概括成所有指标获胜。此处MHT .589/.888、已读MHTv5 .612/.878与后续E2E-MPT引用.593/.880均另留，版本/序列/评价差异未解。表2 C-COT误引[20]（实际fDSST，C-COT为[22]）保留。新增公开稿第2页完整Fig1流程、第4页Fig2双子图原裁图，无重绘；图号限定这份公开稿。

hscv/SST-Net描述自称官方源码，README六作者/题名/会议与首作者邮箱一致，但独立账号归属或论文反链未核。固定提交b14b415200373e872d2d396f2c9cf93cc2ed2b4e（元数据日期2025-03-29），完整树仅README和HOT2020/HOT2022/IMEC25三ZIP，4 blobs逐字节size/Git SHA1/SHA256核验；未提供模型实现、训练/测试入口、配置、权重、GT/原视频或LICENSE。代码字段指向该资源仓库，明确“结果资源”，不能由自述推实现已公开或许可。提交日期不当2021实验/结果生成时间，后两个标签不回填旧论文。

三ZIP分别36/46/81成员（含各一目录），35/45/80结果文本，16574/28152/14107非空行；总163成员、160文本、58833行。全部成员CRC、SHA256和全部四列有限数值已核，后两列正值；列顺序/坐标原点/单位未证明，不据此宣称真实框有效。原CRLF/尾tab原样留存，分割仅用于派生审计；全部文本行数/首末行保存。无GT/真实帧映射，未复算AUC/precision、未运行SST-Net。35/45/80只是本次ZIP文件数，不证明完整基准规模。

DMT（Dynamic Material-Aware Object Tracking in Hyperspectral Videos，WHISPERS2019，DOI10.1109/WHISPERS.2019.8921176）本轮以Crossref登记PDF链接取得IEEE staging的原始摘要HTML/结构化出版元数据。四作者Fengchao Xiong、Jun Zhou、Jocelyn Chanussot、Yuntao Qian及Griffith身份确认，完整摘要与机构摘要逐字符一致，正式页码1–6。摘要支持利用时序信息在线联合解混丰度与谱—空间SSHOG纹理、相关滤波跟踪；没有数据集/通道/参数/指标或实际端元更新与约束，不借MHT的固定谱库或未启用getDymaticMaterial当本篇实现。补纹理/相关滤波类别，移除独立视频采集任务的无证标签；只改本篇。

DMT IEEE正常下载202空，staging所谓PDF返回摘要HTML而非PDF；机构完整bundle/bitstream页仅一个130字节SWORD XML，第三方OpenAlex/Semantic OA入口只落到相同元数据。HAL限定DOI/题名查询0不证明全网没有全文。共同作者CV此题在HTML注释内且有题名/作者顺序差异，没有活动下载链接，不当公开正文证据。DMT仍abstract_read，队列needs_access，六页全文/公式/协议/动态材料实现待，不和MHT当同一方法。

29份原始响应与4份派生全文/表/资源/摘要审计；既有两篇续核，新增全文阅读1篇，无新论文或年度扫描。两个原先无survey候选的Scholar条目新增真实来源续核行和一批/一查询，历史候选、批次与arXiv531决定/八pending不改，Griffith仅追加两篇primarySourceFollowup。当前757总库、188作者（171摘要/17全文级）、214三维、308标签（任务101/方法184/应用23）、347原图；397分类确认（审计344）、341暂定、19待。作者全集及全领域顶会顶刊/arXiv仍未完成。见 [SST-Net全文/结果资源与DMT原始摘要审计](sources/jun-zhou-dmt-sst-followup-2026-10-11.json)。


## Hy-Tracker v1全文与正式版方法变更、BAE-Net原始摘要续核（2026-10-11）

既有Hy-Tracker arXiv2311.18199v1通读全部10页，含式1–11、六表107明细行与1总计行、图1–8图注/结果图例和39参考条目；未逐篇读引用作品。原站当前只有v1，提交2023-11-30，首页五作者及Jun Zhou的Griffith机构明确。正式TGRS2024/1–14页由Crossref、IEEE原始作者机构/精确ORCID0000-0001-5822-8233及Griffith同题/DOI互证，保留同一方法族，不新增论文。LaTeX模板页眉2014不是本文发表年份。

发现正式原始摘要与v1主要模块不同：2023v1为跨波段目标/邻域余弦对比BABS、YOLOv7与MDNet式classifier/Gaussian候选/Kalman；2024正式摘要为hierarchical attention for band selection（HAS-BS）、YOLOv7与classifier/GRU时间网络。旧目录正式论文总述只写Kalman错误，已改为逐版本说明。正式14页PDF正常入口202空，Crossref登记PDF路径200实际摘要HTML；机构两个完整LICENSE bundle各一txt，无正文PDF。正式摘要已读、正式全文/图号/参数/结果未读；v1不能替代HAS-BS/GRU原文。

v1 BABS对每带提取目标O与padding邻域L，跨带累加|cos(O_n,O_j)−cos(L_n,L_j)|，排序为多组三通道伪彩图供YOLO。16带示例依次分组，余带/padding值、归一/组数及更新策略未明确。正文O称ground truth区域，但没有把后续帧取框边界说清；不能直接证明后续GT泄漏，也不能宣称无泄漏。v1引用背景感知波段论文不等于该被引作品全文已读，不把排序分组自动认成严格子集缩减。正式HAS-BS只取得摘要，不补造层次模块结构或损失。

v1 tracker为3Conv/3FC二类classifier、前框中心Gaussian候选与Kalman状态模型。MDNet预训练，Conv固定、FC在线BCE，lr .0005/.001，每10帧以过去10帧正负候选更新；Gaussian对角(.09r²,.09r²,.25)，r为宽高均值、尺度1.05^sc。YOLO候选和采样候选取最高分类分，尺度相对前框变化>5%则用Kalman预测。YOLO离线明确包含训练集与测试首帧，并用Gaussian cut-paste；首帧适配和严格仅训练集模型分开，具体类别/预训练/epoch/样本数与实际测试隔离待。表I 107×107/kernel7/stride2到11×11的隐含pool/padding未列，不能单凭表独立重建网络；YOLO训练概要不当已核上游实现或本框架半监督训练证据。

v1称HOT2022：40训练/35测试、16带470–620nm/25FPS，XIMEA/IMEC mosaic及同场景RGB/HSI-False。表II/III 35序列共16574帧，与此前SST仓库HOT2020结果33同名序列帧数一致，另pedestrain2/pedestrian2各363帧、truck/trucker各221帧；近名未自动合并身份，这是编号/协议歧义线索，不证明实际载荷相同，也不静默把原文年份改成2020。表II尺寸随序列不同，原始全帧/裁切规则未核。当前HOT2022/2023网页只给外部数据/工具入口，2023明确updated link，没有取原视频、GT或历史成员/版本/许可。HOT2023原文VIR/RedNIR/NIR16/15/25带、110训练/87validation，保持原命名；对照结果取官网，跨域/序列聚合与首帧训练的实际协议待。

v1 i7-12700/32GB/RTX A4000 16GB，OPE AUC/DP@20。表III序列等权均值从印刷数值算为AUC .721257、DP20 .972629、FPS3.374171，吻合总计72.1%/97.3%/3.374；帧加权则.706240/.965129/3.409824，不能互换。只是表值算术，未取预测/GT，不是指标或实测速度复算，也不证明其他表图权重一致。Eq11却印NCLE>η，而正文成功条件CLE<η，τ/η亦混用；实际20px边界/采样网格待代码，不静默修原式。

表IV HSI YOLO-only .637/.851，+tracker .707/.952、+Kalman alone .646/.870、联合.721/.973；联合相对基线增8.4/12.2百分点，Kalman在YOLO+tracker之上增1.4/2.1百分点。RGB .576/.806到.666/.943，HSI-False .536/.746到.624/.864，表中RGB +Kalman的∆AUC印.0033而减法为.033，原值/计算分留。表V Hy3.37FPS慢于SiamBAG5.7及采集25FPS，不能因YOLO实时就叫整体实时；AUC .721比SiamBAG .632高8.9百分点，但速度排序不同，无多seed/置信区间。

表VI Hy在11属性印刷值均最高，但表题未显式标指标名称，具体汇总定义待；有限对照不外推全领域。表V MHT .586/.882、SST .623/.916、BAE .606/.878，与各原稿或后引数值分别留。HOT2023 Fig7 Hy .624/.836比TranST .566/.777高5.8/5.9百分点，原文写百分数，记录绝对百分点；这是v1结果，不回填正式HAS-BS/GRU。v1结论承认线性Kalman限制与非线性/速度改进待，正式GRU不推已经解决所有负例。没有取得模型实现/权重或运行实验；Git宽查询681仅第一页30条、限定Hy-Tracker+hyperspectral为0，仅该查询阴性，不宣称全网无代码。

BAE-Net ICIP2020（DOI10.1109/ICIP40778.2020.9191105）取得完整IEEE原始摘要，与Griffith摘要逐字符一致；六作者及Griffith Jun Zhou、页码2106–2110核实。摘要仅支持autoencoder-like band attention、band-wise weights、多组三通道图、deep color弱跟踪器与ensemble；没有明确网络层数、VITAL、组数、严格选子集、数据协议或指标，不借SST/Hy相关工作/引用表回填。正常IEEE202空、Crossref路径摘要HTML，机构单SWORD/130字节XML，共同作者CV只有HTML注释条目与IEEE链接，五页全文仍待。旧严格波段子集标签改为已支持分组，补波段注意力方法，只改本篇。

新存v1第3页Fig1完整框架与第4页Fig3完整BABS原裁图（含图例），无重绘，归属明确“2023 v1”，不当2024正式架构图。新增必要波段注意力与检测提案/状态细化方法，仅本轮两篇关联，不误用Kalman光谱解混或Transformer类别。22份原始响应/4派生全文、全表、版本及访问审计；既有2篇续核、1篇升级，无新论文或年度扫描。Hy两条旧survey候选、机构/arXiv匹配仅追加续核；BAE新增当前真实来源索引，旧决定/映射历史保留。当前757总库、188作者（170摘要/18全文级）、214三维、310标签（任务101/方法186/应用23）、349原图；399确认（审计346）、339暂定、19待。作者全集与全领域顶会顶刊/arXiv尚未完成。见 [Hy-Tracker版本差异、全文与BAE原始证据](sources/jun-zhou-hy-bae-followup-2026-10-11.json)。


## BABS、SiamBAG原始摘要与实现续核、Attend来源纠错（2026-10-11）

三篇既有目录取得完整IEEE原始摘要、作者机构与精确ORCID。正式全文均未取得，没有新增论文或学习笔记；代码阅读、下载成功和相关章节均不记作期刊全文阅读。

BABS（GRSL2023，DOI10.1109/LGRS.2023.3326148）四作者与1–5页确认。IEEE与机构摘要存在缩写、paper/letter、语法和连字符差异；两者均明确跨带比较目标/局部区域的不相似度、选前三带组成一幅三通道图并送跟踪器。Hy-Tracker v1虽引用本篇，却组成多组；其余弦式、padding、分组、GT措辞和实验不能反填本篇。正式公式、跟踪器、区域/更新、后续取框与数据协议仍待。机构完整一页只有SWORD/130字节XML，IEEE下载202空、staging登记PDF路径实际为摘要HTML。保留严格选带，分类确认但仍摘要级。

SiamBAG（TGRS61/2023，DOI10.1109/TGRS.2023.3285802）四作者及1–12页确认，完整原始摘要直接反链zephyrhours/Hyperspectral-Object-Tracking-SiamBAG；不单凭README自述关联，也不当独立账号身份验证。固定提交8b3ee425da3dc76464774b9f05b19b57b578c752，元数据日期2023-06-26不当实验生成日期。完整树233项/179 blobs/35 Python，无PDF或LICENSE文件名。通读9个关键Python与两README，取得84 blobs全部核size/Git SHA1/SHA256；没有取得其余源码/缓存、巨大GIF/视频、原图/GT或外部SiamRPN model.pth。3163字节通道checkpoint未加载，“35 videos”文件名不证明训练数据或泄漏；HyperTools写All rights reserved，上游软件/权重许可另待。

固定代码的注意力为逐像素Linear16→8→4→8→16、部分ReLU、全局最大值归一/谱Softmax与空间均值排序。16带零起点排序秩分组为(0,9,10)、(1,8,11)、(2,7,12)、(3,6,13)、(4,5,14)、(0,8,15)，全16带覆盖并复用0/8，非前三带缩减，也不保证组权重严格相等。每帧载入注意力/重排，实际FCI使用原归一立方，首帧模板核固定；谱排序变化是否影响组对应需真实轨迹。分类响应按组权重融合，回归偏移等权平均；默认模板127/搜索271（小目标287）、stride8，尺度分支固定组0、尺度.98/1/1.02。模板与主搜索全局亮度均衡，尺度搜索未调用该均衡，实测影响待。九源码没有训练入口，内层README继承上游SiamRPN，不能由此证明本文训练协议。未使用的forward对tuple使用**与实际init/update路径分开，不据此宣布跟踪失败。

35预测文件四列全部有限、宽高正，共16574行；35时间文件各两列，共33148正有限时间值。源码可追加旧时间列，一份预测/两列时间不证明两次对应预测。报告去每序列首帧，共16539评测长度；按此长度加权存储的序列AO/SR可算回.652692999/.838382006，101点success曲线均值.650637946。AO为平均IoU，图例亦标AO，不当论文AUC或DP，也不以Hy引用的SiamBAG .632覆盖仓库报告。报告bound首次推定后跨序列复用、IoU原地裁框；实际参数/尺寸影响需原图/GT。没有GT，仅核内部算术，未独立复算精度。

计时文件按mean(1/t)算回5.698116003 FPS；1/mean(t)为4.981128510，序列等权mean(1/t)为5.616662105，口径不能互换。计时排除读图、谱转换、注意力模型载入/推理、分组/PIL转换与可视化，不能称全链路速度或本轮硬件实测。NumPy2.5.1隔离原函数AST的合成探针核16/25带X2Cube2均吻合独立stride切片；Cube2X固定4倍分配使25带逆变换报ValueError，常量带出现除零/转换警告。原评测严格IoU>阈值，IoU1的101点曲线均值100/101，IoU=.5的SR0；这只是工具合成输入，没有模型/真实视频运行。改SiamBAG旧严格选带为分组，补波段注意力及必要孪生提案方法，只关联本篇。

Attend in Bands（JSTARS2019，DOI10.1109/JSTARS.2019.2955097）的IEEE与机构摘要逐字符一致，三作者、12(12):4712–4727共16页确认。旧主PDF是Jing Wang的192页博士论文《Hyperspectral Image Classification Based on Deep Learning and Module Inspired by Human Attention Mechanism》，父item/首页确认DOI10.25904/1912/3959、issued2020-08-31，内封March2020另留。PDF94–130页为第4章同题（印刷75–111页），168页列三作者期刊及IGARSS2019/DICTA2018相关发表。本轮只查PDF1/2/94/130/168页，不称整篇论文、37页章节或期刊16页已读。响应MD5与机构stored bitstream MD5不同，封面处理只是可能解释，未证；仅下载字节/SHA256核验。期刊item完整一页只有SWORD/XML，IEEE202空，无期刊全文。纠正主链接及旧“作者论文局部”类型；正式摘要支持加权/两类选带与分类，不自动回填相关章节的激活或实验。

109原始响应（含70预测/时间载荷及关联博士论文PDF）/6派生审计，原响应字节保留；旧候选/机构交叉表仅追加续核，531arXiv决定及八pending不改。当前757总库、188作者（170摘要/18全文级）、214三维、311标签（任务101/方法187/应用23）、349原图；401分类确认（审计349）、337暂定、19待。三篇原图needs_access；分类与来源纠错不表示作者全集完成。其余原文、身份/姓名变体/多源差集及全领域顶会顶刊/arXiv仍待。见 [三篇原始来源、实现与纠错审计](sources/jun-zhou-band-tracking-followup-2026-10-11.json)。

## 2013植物SfM与2015跨波段三维融合全文及版本纠错（2026-10-11）

两篇既有论文升级全文级：2013植物建模通读CVF公开6页与Griffith封面+6页作者稿，2015三维重建通读Griffith封面+8页作者稿。三稿共22 PDF页（20正文、2封面），全部公式、图注/图版及两表25数值核验；引用条目分别20/18/21，所引作品未逐篇读。没有新增论文、标签或学习笔记，原三维214成员不变。

2013公开稿式1–5，AOTF400–1000nm/10nm共61带，剔400–590nm留41带，转台3°/120视角/约2GB每株。120视角构成7140图像对，不等于成功点匹配数。白参考归一化、Gaussian平滑，790nm锚互信息优化二维相似变换后跨带线性拟合；K-means四类随机初值/收敛，SVM一幅手标HSI训练后分类其余，公开稿明确RBF/LIBSVM默认。Canny边缘增加SIFT候选，逐带SfM与三角化，原文称virtual-SFM，实际版本/参数未核。600/800/850/900nm展示局部点云，700/750nm失败，作者承认局部断开且不准确。跨带合并、同项目RGB比较及特征改进属于未来工作，不写成已完成融合、植物性状/生物量测量或定量几何优势；无株数/物种、几何GT、分割指标、训练测试隔离或运行成本。

2013机构作者稿另有Canny/形态学加边与Eq6，所印S_i=I_i+F_i/n_i与文字最大值归一的具体次序/常量不明；公开稿没有该式，不能混为同一预处理。AM印51带600–1000nm/10nm，却范围算术只有41带；公开稿为61原带/41可用带，矛盾按版本保留。AM名Brimrose、没有同段白参考句，引用18而公开稿20且引言有未解[]；并非逐字符相同稿。CVF站点和可见PDF页首注明权威版在IEEE，纠正先前“CVF正式稿”措辞为公开会议稿；正式172–177书目/摘要已核，但IEEE下载202空，未独立取得VoR。CVF BibTeX June与Crossref December/会议December2–8分开，页面保留2013年。

2015作者稿式1–9与Algorithm1，先逐带SfM；每点到所有其余点的欧氏距离按各点最大距离分箱，再按计数归一、相关系数对应，RANSAC/单位四元数恢复尺度/旋转/平移。每轮以配准点平均欧氏距离更新非对称矩阵并合并模型；旧“均方误差”更正。正文称TSP-like路径，所给却是逐步贪心合并，没有全局最优保证。Eq4的y_i/y_j索引、Eq5相关标量范数、Eq6未显式scale/平方、Eq7链上界及冲突/tie规则留待实现，未静默修原式。分箱数、RANSAC阈值/seed、SfM密集设置与硬件未给。点模型相加/融合不等于已标定每点完整光谱、绝对尺度或闭合无缺失表面。

2015列五对象：咖啡罐、陶瓷玩偶、玩具猴、植物、玩具鱼；30 HSI/30 RGB是每对象或全部载荷的确切统计待原数据，不套2013的120转台视角。AOTF400–1000nm/20nm，咖啡因低SNR去400–560/1000、因特征不足去880–980，余580–860共15带；玩偶600–740八带，四带展示640/660/700/720。RGB同位置但更高空间分辨率；高光谱模型更密主要为图示，无数量、完整度/形状GT或严格SNR/曝光/计算预算控制实验。

定量配准使用参考[10]的392点脸随机变换与Oxford VGG普通RGB恐龙36帧红/蓝SfM点集6310/7526，未证脸来自Stanford，旧来源表述已纠正。这些不是高光谱几何GT。表1本法平均对应距离.0014/2.7e−8，不外推绝对重建精度。表2Face2.706s慢于RPM2.126/TPS-L2 1.549，Dino13.773s与Coffee12.675s快于所列其他方法；对最快其他基线比值约9.78/7.12，仅印刷值算术。时间是匹配/配准，不含采集/SfM全链路；没有重复试验/方差。Oxford当前原站确认36帧、2D轨迹和由重建生成的相机矩阵，只取页面，未下载载荷/历史版本，更不当矩阵就是几何真值。2015正式WACV318–325摘要/四作者机构由IEEE与Griffith确认；IEEE202空、当前Crossref429，保留旧登记快照，不称正式VoR已读。

11当前原始响应中CVF PDF与旧存字节完全相同，复用原文件；其余10响应新存，另复用2个旧机构PDF和1份旧Crossref结构化访问快照，4派生全文/版本/全表/元数据审计留证。两篇无独立框架图，四/八结果图及文字Algorithm1不冒作框架，原队列no_framework只补续核。既有188行索引仅同步源链接/阅读等级及过时统计，不增学习内容。当前757总库、188作者（168摘要/20全文级）、214三维、311标签/349原图；401确认（349审计）、337暂定、19待；1615候选/238查询/231批次。旧发现决定和531arXiv/八pending不改；作者全集与全领域顶会顶刊/arXiv未完成。见 [早期三维全文、版本与公式/协议审计](sources/jun-zhou-early-3d-full-reading-2026-10-11.json)。

## 超图半监督选带三篇全文、实验划分与公式续核（2026-10-11）

完整通读ICIP2013封面+5页、IGARSS2013封面+4页、JSTARS2015封面+10页，共22 PDF页（19正文/3封面），39编号式、13表、16图及19/15/30引用条目；所引作品未逐篇阅读。正式IEEE完整摘要、作者顺序及Griffith身份、DOI与页码逐篇确认，正式PDF三次202空，未称IEEE VoR全文已读。ICIP四作者、IGARSS五作者含Haichuan Yang、JSTARS五作者含Yanyang Wang；期刊全稿[20]/[21]确认光谱超图先行方法与新增空间关系/组惩罚，未见明确正式扩展声明，仍保留各出版物实验与方法族边界。

ICIP以Gaussian近邻构建K-uniform光谱超图，共享超边权重转邻接M，阻尼传播带C+1异常列的标签，岭投影Q后LAR稀疏矩阵S，按跨类最大绝对系数选带，RBF-SVM一对多分类。APHI210×150×64/455–805nm/六类，340训练/2610测试；AVIRIS去噪后200带，1081训练/5776测试，两表合计相符。正文列八类而表1九类，缺列Soybeans-notill。原稿联合熵Eq4缺概率乘项，归一式印D^(-1/2)MD^(+1/2)，Eq11仅残差目标而LAR约束/参数未完全写明；按印刷式记录，不静默替换成常用公式。Figure2为曲线，对MVPCA/AP有优势但未证始终高于全带参考，无精确OA表或独立复现。

IGARSS以显式lasso残差+λL1稀疏回归、谐函数分块标签传播与加权岭投影U选带。仅APHI，选带126标注/2610未标注，后续SVM另抽700训练/1600测试，随机十次平均OA；两套样本身份/重叠未给，不能写成只用126标签完成全部监督或已证严格独立测试。Eq4最大值下标与文字类系数、结论sum措辞不一致；Eq8从D_UU到I的等式缺显式归一条件，正文Fig4实际为Figure1。K、熵估计/离散化、λ和SVM完整配置未知，不从ICIP或期刊回填。

JSTARS每像元锚定K−1光谱近邻，以空间坐标Gaussian平均与多元互信息混合超边权重；P=D^(-1)M阻尼传播，邻带20为组的惩罚回归后系数排序与SVM。K9、传播λ.92、组θ.25、γ训练子集交叉验证；APHI最优空间权重t=.425不当通用参数。印刷Eq7为log(x)而非log(P(x))；Eq14只显示组L2范数之和的组L1惩罚，没有独立元素L1项，不能仅据式证明组内稀疏；Eq17称Gaussian RBF却无平方距离。熵估计、负权处理、求解器/尾组/d_k及实际核函数仍待实现。交互信息的非负性、零即独立需要条件，不能自动当作普通二元互信息的性质。

期刊APHI表I逐行未标注样本2610、总计与正文印2410；Indian Pines表III逐行测试5776、总计与正文印5407（训练1081一致）；原文与算术分别保留，未取得实际划分。APHI“每类12%”也不与各行比例完全一致；APHI随机五次、Indian十次，未标注样本用于传播/SVM，独立留出与测试标签隔离细节不足。DC Mall原210带/400–2500nm、1208×307，选六类450标注/2760未标注；不和会议APHI/AVIRIS协议合并。

全九表留证：II/IV/VI的40×3个波段索引逐序保留（Indian MVPCA原97先于37）；VII的ID/MVPCA/FCGL/本法时间由分钟秒换算，Indian为10/190/124/122秒，APHI7/126/120/85秒，DC11/184/240/325秒。ID三数据最快，本法DC比所列其余方法都慢；Intel Core i5笔记本而型号/RAM/软件未详，不外推全链路速度。VIII十带组稀疏对普通稀疏为86.1→86.4、66.4→67.3、66.8→67.8%，即0.3/0.9/1.0个百分点。IX图/超图为68.9/75.5与70.5/78.3%，提升6.6/7.8个百分点；另用每数据五类2000样本、15%标注/85%未标注，不混作主实验或VIII同一协议。无方差/置信区间，图示相关性低不等同证明统计独立。

13当前响应含三份机构PDF、六份精确元数据、三份IEEE202空与一份排除的错误IEEE编号探测（7123647是TMAG，目标7152840由旧Crossref精确链接与新DOI互证）。三PDF与旧存字节不同而全部提取文本一致，分别保存原字节/SHA256，差异原因未证；本轮渲染核查用当前PDF。三份派生审计保存全页文本、全表/公式观察和原始元数据。既有JSTARS Figure1超图构造子图复核，未增图；两会议无框架图。既有188行索引仅同步三行阅读状态与计数，不新增学习笔记。

当前757总库、188作者（165摘要/23全文级）、214三维、311标签/349原图；401确认（审计349）/337暂定/19待；1615候选/239查询/232批次。旧发现/作者差集和531arXiv八pending不变。其余作者原文、正式版本/代码与数据及全领域顶会顶刊/arXiv仍未完成。详见 [超图三稿全文与协议审计](sources/jun-zhou-hypergraph-full-reading-2026-10-11.json)。

## CCRE配准与材料特定颜色配置两稿全文续核（2026-10-11）

完整通读ICIP2010 CCRE作者托管4页、ICCV2011颜色作者托管8页，共12正文页、23编号式、9图及1特征表，参考条目12/29；未扩称所引作品均已读。两PDF当前响应与旧存逐字节一致，复用原文件；正式IEEE完整原始摘要、作者顺序、DOI与2329–2332/1987–1994页确认，但独立正式PDF均202空。早期ANU/NICTA作者机构及原稿首页支持目标周峻，IEEE数字作者编号不当ORCID或稳定身份编号，颜色稿注工作完成于NICTA时期。

CCRE用六参数仿射与负相似度Newton优化，将多模态影像转灰度后配准。MI基于联合/边缘概率、Parzen cubic B-spline；CCRE改用联合/边缘累积残余分布，目标灰度维与参考灰度维分别用累积残余函数和B-spline估计。解析梯度/Hessian细节引用先行工作，本文没有独立导数展开。均值灰度/CIE1931转换作为选项讨论，最终配置及灰度方式消融未明确，不能同时写成已实现两套预处理。

七组高倾角停车场/周边影像，声光滤波器/FireWire采21带430–630nm，RGB Nikon D80；Figure2样例HSI1280×960、RGB缩为1437×1139不外推全部组。每组先人工配准，再施50个人工扰动：平移≤120像素，旋转−25°至25°、缩放85–115%；名义350是7×50扰动，非350独立场景或成功数。可见原文用上标0作角度，提取“-250 to250”现由高清排除。多尺度0.125/0.25/0.5，Figure3在第200次迭代换到0.25导致误差骤降。Figure3是第二图像组平均最大配准误差曲线，非全部组汇总或实际耗时。

作者称初始位移≤70像素时CCRE有效100%成功、较大位移优于MI，SSD所有案例失败；按原报告记录，不外推动态/非仿射/任意相机或独立物理GT。未给充分成功阈值、每区间分母、随机种子/停止/插值边界处理、硬件与真实耗时，无置信区间或实际复现。配准是融合前处理，没有输出高分辨率光谱融合立方或检验融合质量。题名原拼写Regisration及五作者顺序保留，BibTeX补正式页码。

颜色方法先引用二色反射分解恢复反射/光源等参数，再用1−cos谱距离、最大熵确定性退火与Gibbs软材料聚类，按材料均值求非负和为一的端元系数、按像元关联混合。Table1五个材料系数对应最多/次多材料、三分构图、全图均值和中心/外围比例；乘饱和度的五维与乘亮度的三维组成八维特征，QDA审美模型来自Photo.net。审美不含hue，用户颜色残差加τexp(−评分)由quasi-Newton优化，在偏好与其余影像审美间调节。Figure2是配置学习和新光谱图颜色生成两阶段，Figure1/4编辑结果、3误差曲线不混作框架。

高清核公式：Table1三分构图系数h/9、h=1/像元数；Photo.net高/低审美切分为5.0±t/2，不是文本提取的9h或5±2t。原[8]的五折特征选择不当本论文自身交叉验证设置。Photo.net评分1–7，t由交叉验证选择，但值、训练测试数量/准确率以及普通照片到每端元系数特征的计算未详。零谱/分母处理、退火分裂/冷却/求解停止规则和相似像元选择阈值/σ_r/σ_s未知。

实验297自采StellarNet反射谱、九类材料430–720nm/1nm，四光源（tungsten/incandescent/fluorescent/sunlight）；77幅风景/人物/静物原23带430–650nm、10nm间隔，作者称多光谱图像且前文相机称高光谱。方法明确兼容多/高光谱，保留直接成像光谱研究关系，同时把实采名称/范围记录清楚，不靠23这个数强制模态分界。B-spline重采样为27/36/45/54/63/72点，末版端元库54谱、每材料4端元；重采样点/库大小不是新采集波段，不增加实测信息。图像650nm截止与库720nm截止的未观测段处理未完整解释。原称至少MN+M像元，代4光源/54端元得220只是算术，实际像元数/设计矩阵秩与联合分解可辨识性未核。

每用户随机编辑10幅图，配置用于其余图，Figure4展示三个用户配置不等于总受试人数；τ5/0示审美调节，未报告完整满意度统计、人口信息或盲评实验。Figure3为预设color-matching参考的MAE曲线，不冒称感知ΔE、唯一真实颜色或反射谱精度，不捏造曲线精确值。Eq10平均4.7秒，Eq13平均0.6秒/5.6次迭代，Core2 Duo3GHz；温度0.02至0.00025。时间只针对指定求解步骤，不相加当全链路速度。专用实现、77图/297谱/Photo.net快照及实际用户运行未取得。

6当前响应中2 PDF复用、4新HTML（含2空202），3派生审计保存全页文本、原始元数据、全部公式/特征表与协议/可见符号纠错；原字节及提取乱码不覆盖。既有颜色Figure2原图复核、CCRE no_framework，无新论文/标签/原图/学习笔记。188行索引只同步两行状态与计数。当前757目录、188作者（163摘要/25全文级）、214三维、311标签/349原图，401确认（审计349）/337暂定/19待，1615候选/240查询/233批次；531arXiv八pending保留。作者全集、正式版本/实现数据与全领域顶会顶刊/arXiv仍待。详见 [配准及颜色两稿全文、协议和可见公式审计](sources/jun-zhou-ccre-colour-full-reading-2026-10-11.json)。

## 2009纹理描述与2011调和分析章节全文、DOI双登记及表格续核（2026-10-11）

两篇既有记录升级为**公开作者稿全文核验**。2009原稿8页，2011章节稿24页（19页内容、第20页空白、21–24页参考）；共32 PDF页/31非空页、61编号式、12图、6表全部通读及视觉复核。参考条目20/43已读，不表示所引作品逐篇阅读全文。当前下载两PDF与先前保存源字节完全一致，复用原文件。2009旧“作者稿10页”是目录错误，已纠正并在审计保存完整旧记录；与正式112–119共8页相同的页数不能证明逐字相同。

IEEE当前原始摘要/作者/书目与Crossref一致指向 **10.1109/CVPRW.2009.5204126**、112–119页。旧 **10.1109/CVPR.2009.5204126** 仍有同题、同三作者登记，但缺页码和完整名；主DOI与BibTeX改用当前IEEE值，旧登记作为同论文变体保留，未添加重复论文、推定旧DOI无效或声称已核DOI跳转。Jun Zhou的历史ANU/NICTA机构由稿首页、作者个人托管和IEEE原始元数据互证；不以现在的Griffith机构要求历史稿，也不把IEEE数字作者ID当ORCID。正式IEEE stamp/direct PDF返回202空，staging PDF入口回到摘要HTML。Springer两个入口200仅Client Challenge HTML，既不是原摘要也不是正式21页PDF；Crossref只核2011/book-chapter/179–199。公开Chapter1/Figure1.1与正式Chapter8编号始终分开。

**2009实验**为100幅OFM蛾虫图（380–1050nm/10nm）、50幅城市图（明确10带420–650nm/25nm）及另列普通DynTex时间纹理。OFM每图8蛾，50/50图训练测试，400训练蛾块/400测试蛾；城市25/25图、189/198车，合计387车。均值亮度SIFT产生候选块，引用的光源估计用于光度校准，近邻作识别定位；只有DynTex明确k=6/Euclidean，不能补成HSI的统一配置。Table1定位率城市83.65%对LBP69.20%、OFM83.09%对76.54%，增14.45/6.55个百分点，指标不是像元OA/AP。Table2 DynTex FCT9000/1000维为96.24%/95.71%，LBP4176维95.07%；两FCT差0.53个百分点，而非正文“约1%”。原文说三个FCT长度但表只列两个；结论提MIT temporal texture但实验正文/图表没有其协议或结果，不增加虚构MIT实验。DynTex1080子序列半数测试，是否按父序列隔离未证；缩短描述维数不等于已测速度。

**2011实验**为62玩具各10视角（10°增量）、32硬币各正反两面，62×10+32×2=684图、51带550–1000nm/9nm，AOTF/FireWire采集，Spectralon供光源校准。五玩具类别加硬币六类，半数图训练/测试对应342/342是算术，不等于按对象身份隔离。4/16/64分区同尺度或84块跨尺度多数投票，比较未校准辐亮度/校准反射率、NN/RBF SVM及FCT1500/LBP1938维；四表88行352数全部记录。Table1.1跨分区平均单尺度校准/未校准93.47/93.27、多尺度98.17/98.54；Table1.2 LBP对应46.25/75.65、38.82/67.68。作者“持续更优”不能推广为每个设置：四分区单尺度未校准NN的FCT89.47低于LBP97.56，SVM96.81低于LBP99.15。正文LBP75.63与表75.65、分区图的正文32与图注/可见图/表64均留差异。98.54是跨格设置的平均行，不是新外部测试或全部配置的得分；未知对象重叠不直接称已证泄漏。

**方法与理论边界**：二者共享逐带FCT、固定参考的两峰仿射校正和沿波段半索引余弦核，Nx×Ny×Nλ是二维空间与谱/时间数据表示，不是三维重建或显式表面法向。2011增加调和核正交展开/Hilbert空间讨论并提出Mellin、wavelet、Hankel选项，实际实验仍只用FCT；不能从正交基概念推出所有核均收敛、同样仿射不变或性能更优。共享作者/核心流程/图支持同方法族，但两份全文未见明确正式扩展声明，章节43参考也未列2009论文；玩具硬币实验不回填蛾虫/城市/DynTex。2009 Figure3末阶段称波长变换，章节Figure1.1末面板称V而正文仍讨论最终G，分别保留原图注。

逐式高分辨率复核发现：CDF和式、无限方差与高阶矩措辞、重尾重参数的α端点/正实尺度/β符号、相位与衰减同用sin及含ω的振幅、平移向量[c,h]后写f=c=0、逆坐标y系数变号、2009式15的共同因子范围、2×2矩阵与标量F的作用，以及Φ乘法顺序均有未交代或印刷矛盾。依照原列坐标约定UB=ΦUA且UA可逆，独立代数得到Φ=UB UA⁻¹，原式23/章节1.31却逆序写参考因子的乘积；这个条件推断与原文观察分开，不替换PDF或伪称已恢复实现。仿射适用仍依赖局部平面、中心对齐、非奇异变换/参考峰、峰对应与重采样；示例图不保证任意投影、遮挡、非平面或光照不变。完整参数、变换截断/归一、命中规则、代码/原始立方、独立划分、重复实验及计时仍待，无实现或实验复现。

11当前HTTP响应（2原PDF复用、9新原响应含2空202与2挑战HTML）/3派生审计及总清单保存字节数/SHA256；网页检索工具404后直接HTTP读取原站，不当作者或年度发现新扫描。既有两框架原裁图复核，图字节/队列顺序保留；无新增论文、标签、原图或学习笔记，既有188行索引仅同步状态。当前757总库、188作者（161摘要/27全文）、214三维、311标签/349图，401确认（审计349）/337暂定/19待，1615候选/241查询/234批次；arXiv531历史决定及8范围身份待不变。作者全集、正式版本与全领域覆盖尚未完成。证据：[完整来源与旧记录纠错](sources/jun-zhou-texture-harmonic-full-reading-2026-10-11.json)、[全页文本](sources/jun-zhou-texture-harmonic-full-all-page-text-2026-10-11.json)、[书目/身份](sources/jun-zhou-texture-harmonic-full-primary-metadata-2026-10-11.json)、[实验、全表及公式审计](sources/jun-zhou-texture-harmonic-full-protocol-equations-tables-2026-10-11.json)。

## 2015/2016 SVM波段加权全文、任务与作者版本续核（2026-10-11）

两篇既有机构稿由摘要级升级全文：IGARSS2015为封面+四页正文，GRSL2016接受稿为封面+五页正文，共11PDF页全部通读和图版复核，六编号式/六图/五数值表、会议Table1伪码与期刊Algorithm1逐项核验。两份14参考条目读完不等于所引作品全文已读。当前IEEE完整摘要、作者单位/书目、Crossref及机构item互证；正式PDF两次202空。2016正式13(7):922–925四页、六作者含Wenzhong Tang，AM正文五作者未列他，封面则六作者；目录/BibTeX保留正式身份，未解释缺名原因，也不称正式全文已读。

**2015方法**为逐类one-vs-all SVM、固定初始超平面后优化类共享波段向量v，以带标签分数和beta偏离全一向量惩罚选择TopK再重训。摘要“sample weights”不代表每像元标量权重。Eq2把v×x称dot product，却接w转置，维度与逐带语义有疑点；可能意指逐元素乘只是推断，不静默改式。当前类为正、其余为负，每类子集可不同，测试分别送入对应子集分类器再取最高分。

**2016方法**先训练逐类线性SVM，v=1时求每训练像元的波段平衡向量b_i，再用含gamma/theta正则的新hinge目标求类v并重训。全文明确保留全部波段，表中Top5仅解释重要性，纠正旧选带标签；新增“光谱波段加权”任务并只关联这两篇，SVM方法定义容纳选子集或全带两种用法，另两篇摘要级关联不变。Eq2原图可见转置后额外未定义T且无y_i；正文称gradient descent用于最大化，方向/步骤未给；Eq4缺括号、最后重训负例用哪个类v和复杂度M=类数/迭代数混用均留疑问。原始分数不自动等于归一几何距离或一般类间欧氏距离；没有据印刷疑点宣称真实实现失败。

2015 Indian原220→200带，训练/测试1020/10200；Salinas先称224又写220→200带，训练/测试2450/49000。旧目录Salinas204带无本稿支持，改为本稿声称200并保留224/220差异；光谱单位可见m，不静默修为已核μm。正文每类10%/5%与表train/(train+test)的9.09%/4.76%分母不同，行和全部与总计吻合，未取得实际互斥划分。MVPCA/AP/MEAC、5–40带曲线无精确全点数值/方差，不补造OA/AA/κ。

2016两场景均称原224→200；Indian训练/测试1020/10200，Salinas205/49000，所有行和吻合，不能与2015不同训练量直接比较。报告随机十次平均，Salinas25参数格选择gamma1/theta10、打印值99.0；验证/测试隔离与完整C、bias、约束、步长/停止、seed及原通道索引未知。参数格95.1–99.0相差3.9百分点，不把作者“不敏感”扩大为无影响。正文CKF与表/图PSCMCA身份未解释，不混同2015 MVPCA。

期刊两全表32类×七方法、总计/时间及25参数格保存277准确率/时间/参数值、64训练测试数及159波段ID。Indian C4 FEWT原印0.79不改79；Salinas C16仅四个波段不填第五个。作者总准确率91.5/99.0，对FEWT多0.3/0.1百分点，部分单类更差；按打印测试数加权为91.77216/98.62408、类等权为90.38125/98.9375。仅是表值算术，不能认定真实OA/AA或所有十次聚合/舍入都已排除；无GT/预测与原始统计。MATLAB3.4GHz/20GB，20.24/6.08秒仅快于BFO、慢于另五基线，阶段未定义，不当FPS或端到端实时性证明。

期刊Fig1公开AM第3页新增完整原裁图633×289，核对四阶段及箭头，注明正文五作者与正式六作者的版本边界。会议四图均输入/分类/曲线，Table1伪码不冒充框架，no_framework保留。两篇共享作者与SVM思想但没有明确扩展声明，期刊十四参考未列该会议题名，保留独立方法族与不同实验。12新原始HTTP响应保留全部字节/哈希；当前两PDF与旧缓存字节不同、全页提取文本相同，双方均留，不声称下载通过机构stored MD5。三派生审计和总清单保存全页/元数据/公式/全部表；未运行模型或写新学习笔记，既有索引只同步两行任务/状态及计数。

当前757目录、188作者（159摘要/29全文）、214三维、312标签（102任务/187方法/23应用）及350原图；401确认（350审计）/337暂定/19待；1615候选/242查询/235批次。旧发现决定、作者差集和531arXiv八pending不变；作者其余原文、正式版本/代码数据及全领域顶会顶刊/arXiv未完成。证据：[全文及旧记录细化](sources/jun-zhou-svm-margin-full-reading-2026-10-11.json)、[全部页文本](sources/jun-zhou-svm-margin-full-all-page-text-2026-10-11.json)、[书目/作者版本与字节差异](sources/jun-zhou-svm-margin-full-primary-metadata-2026-10-11.json)、[全部公式、协议和表值](sources/jun-zhou-svm-margin-full-protocol-equations-tables-2026-10-11.json)。

## 2016一类SVM、2017差分权重选带全文与印刷协议续核（2026-10-11）

两篇既有目录升级全文：IGARSS2016公开AM封面+四页正文，IJWMIP2017公开AM封面+17页正文/参考，共23PDF页全部通读、图版复核，13编号式/12图/六数值表及会议Table1伪码逐项阅读。参考10/35条不当所有引用作品已读。IEEE staging完整会议原摘要及五作者/Jun Griffith已核，直接IEEE正式PDF202空；期刊Crossref完整登记摘要、六作者顺序/Jun Griffith及2017-11/15(06):1750065已核，World Scientific页面/PDF403。文章号1750065不是页数，不声称正式全文已取得。

会议旧`TangPUB1960.pdf`路径本轮200但只755字节HTML壳；通过原item、全部一页bundles与唯一ORIGINAL bitstream恢复REST原PDF，主链修正，历史路径作为来源版本保留。item与自动封面写“Zhou, Fun”，正文/IEEE/Crossref均为Jun Zhou，正文与IEEE单位Griffith，沿正式身份记录而不添加同名作者。期刊六作者一致，但Yun Liu单位在正式Crossref与AM正文不同，按源保留。当前两个下载PDF均不符合机构stored MD5，只核实际下载SHA256；期刊旧/新PDF字节不同、全页提取文本一致，分别保存。

两稿共同机制为当前类与竞争类分类器系数差乘像元各带强度构造u，经各类样本/竞争类的hinge总和加lambda||v||1求波段向量，选最大有符号权重Top-n再重训。会议初始/最终均线性SVM；期刊评测KNN k3、one-vs-all LDA、RBF SVM与5折正则验证，不能据最终RBF核推定初始系数也由相同非线性核产生。新增“差分权重一类SVM选带”精确方法标签，只关联本轮两稿；补波段加权任务和会议地物分类，既有SVM共用关联保留。一类SVM是权重求解模型，实际是有标签监督选带与多类分类，不是实际异常检测实验。

原式审计区分2016独立类索引与2017混用的y_i：期刊此前y_i定义为样本真类，Eq2又将c称真类，Eq6对i∈D_c并要求y_i≠c，若沿原定义会冲突；可能想将y_i换作竞争类枚举只是推断，不拿会议清晰索引自动覆盖期刊。期刊Eq1印为二次范数减lambda分数和，没有常见hinge/max或slack约束，不静默改成前作SVM。两稿L1 hinge形式、阈值1，作者引用LIBSVM可解，但没有给solver选项/等价变换/代码；不称原实现失败或已由普通one-class调用复现。全带总分正差不推出每带都正，逐带条件是更强启发式；未写非负/和为一/按绝对值排序，L1不保证恰n非零、唯一子集或任意分类无损。

会议Pavia Centre ROSIS2002/1096×1096/102带九类，随机每类10%，Table2行和748训练/6708测试与总计吻合。Indian AVIRIS1992/145×145/原224带、删除七类留九类，删[104–108]/[150–163]/220共20带，224减20算204只是通道端点算术，实际载荷/重编号待。Table3训练924吻合，测试行和8310而总计7172，两个值原样留证。比较AP/MVPCA/全带与5–50带曲线，Fig2/4均印Indian Pines；正文两场景、Fig2靠Pavia表及99%曲线暗示可能为Pavia，但未独立证实，不静默改图注或估精确OA/AA/κ。

期刊Pavia/Indian正文称每类15%；Pavia TableI印1118/6338，逐行1116/7040，多数类train/(train+test)为13.22–13.42%，Tiles15%、Shadows14.916%，不能把表总值当已核真实划分。TableII题Indian，却列APHI正文六类Paddy/Bamboo/Tea/Pachyrhizus/Caraway/Water，700/1600行和一致；TableIII题APHI，却列Indian九类Corn/Grass/Hay/Soybean/Woods，印1214/6882、逐行1386/7844。因此不仅疑似表题交叉，总计亦不一致，简单交换表题不能修复协议。APHI正文210×150×64/455–805nm、Tee/Pachysandras与表Tea/Pachyrhizus拼写另留，不推定真实作物名。

期刊四数值表全部保存24类行/48训练测试数，以及四方法各15波段共60ID。Indian TableIV AP最大编号206，而224删20算204；可能为原224编号或移除后重编号，未说明，不能直接判206无效或修号。基线AP/mRMR/SVM-RFE/全带，与会议AP/MVPCA不同；Pavia/Indian5–50带、APHI5–30带，另Indian50带每类同训练数的规模实验。正文§III-D错指Fig6，真实训练量是Fig8，原图留证。作者称大部分设置有效、Pavia40带接近全带，也承认SVM-RFE在少带或KNN竞争；未有精确性能全表、方差/CI、seed、完整参数/测试隔离或实际模型运行，不能推广所有分类器/配置必然更好。

期刊Fig1 PDF第4页（正文第3页）四步框架新增完整原裁图1080×570，来源/图注/箭头/六作者归属已核；会议四图输入/GT/准确率，文字伪码不是框架图，队列标no_framework。两稿共享公式结构但作者集合与实验不同，期刊参考28/29为前轮已读的2016GRSL/2015IGARSS，并未引用该2016 Tang题名，也无明确扩展声明；保持原独立方法族，不能由共享方法标签宣布正式扩展关系。

15当前原HTTP响应、三派生审计与总清单保留字节/哈希及全部页/元数据/全表/公式，旧发现决定和作者差集只追加续核，未增加学习内容，188行索引仅两行链接/任务/状态与计数同步。当前757总库、188作者（157摘要/31全文）、214三维、313标签（102任务/188方法/23应用）及351原图；401确认（352审计）/337暂定/19待；1615候选/243查询/236批次，531arXiv历史与八pending保留。作者其余全文、正式版修订与实际代码数据及整个高光谱顶会顶刊/arXiv覆盖仍未完成。证据：[两稿全文与来源细化](sources/jun-zhou-oneclass-differential-full-reading-2026-10-11.json)、[全部页文本](sources/jun-zhou-oneclass-differential-full-all-page-text-2026-10-11.json)、[正式身份与旧链恢复](sources/jun-zhou-oneclass-differential-full-primary-metadata-2026-10-11.json)、[全部公式/协议/表与算术](sources/jun-zhou-oneclass-differential-full-protocol-equations-tables-2026-10-11.json)。

## 三篇图NMF解混全文、Jasper实测及旧身份审计纠错（2026-10-11）

DICTA2014双图、ICIP2015 MMSNMF和WHISPERS2015多图三篇既有记录由摘要级升级为**公开机构稿全文核验**：分别9/6/5 PDF页，共20页（3封面/17正文参考）、52编号式、13图、2数值表3面板及2伪码全部通读与图版复核。参考条目26/19/21已读，不表示所引作品全文均读。三份IEEE原摘要、完整作者与Griffith Jun Zhou单位、Crossref精确DOI和机构item互证；正式PDF入口均202空。DICTA封面没有AM/VoR标记，保持“公开机构稿”，正式2014-11:1–8与机构Published2015分源；另两篇明确AM。ICIP登记constrainted/正文constrained、WHISPERS正式2015-06与Crossref创建2017-10分别记录，创建日期不另算论文。

三种图机制分开：DICTA以光谱kNN热图和空间一阶邻域的π/2−SAD图共同正则**丰度R**，alpha是固定平衡参数；MMSNMF逐层分解上一层丰度，最终端元是A1…AP，两因子各自图/平方根稀疏约束，正文图顶点来自X像元列和Xᵀ通道列；WHISPERS对不同kNN尺度图用非负和为一权重组合，加权重平方惩罚，交替优化M/R和alpha。二值图是多图方法允许的选择，实验仅明确heat/3、5、7近邻，不称已测两kernel六图。DICTA结尾只称多图为future work；WHISPERS参考未引用它，ICIP则明确引用DICTA为已有约束。相近作者/稀疏目标不足以确认正式扩展或合并三个方法族。补一精确“学习多尺度图权重NMF解混”方法标签及三篇共用图结构标签，多图由待分类转确认。

DICTA合成USGS四端元、64×64/8×8区域、低通混合、丰度>0.8改等分、高斯噪声；SNR30dB，10次均值/标准差，另15/25/35/45/∞dB和4–8端元扫描。最大3000次或目标相对差≤10⁻⁴；图/权重参数具体值与初始化未知。Urban307×307、210删48后162带，四材料Asphalt/Tree/Grass/Roof却在图6行解释改为road/grass/asphalt/tree，未把road自动等同Roof。作者明确无丰度GT，真实实验仅SAD/可视化，不称Urban丰度RMSE已验证。WHISPERS合成六端元/SNR20dB/10次及4–8端元扫描、Urban210→162带；本稿未印307×307尺寸，也不从DICTA回填。图3(a)单收敛案例约600次不等于最大迭代数、全局或普遍单调收敛；真实丰度图没有GT或数值RMSE。

**MMSNMF实测缺口已关闭到本AM范围**：Jasper Ridge100×100，原图起点(105,269)，删1–3、108–112、154–166、220–224后198带，road/soil/water/tree四端元，GT引用Zhu等2014，实际参考谱/GT文件未下载。合成USGS六端元、64×64/8×8块、9×9低通；SNR20dB与15–40dB六档，10次均值/标准差。P=10、Tmax=300、lambdaA=0.1 exp(−t/25)、lambdaM=2lambdaA、betaA=betaM=0.5；近邻数、层宽、种子和丰度和处理未说明。两表共80行内值/15均值全存。合成六档SAD/AAD均最低，平均0.0688/0.2719；Jasper平均SAD0.1096最低且3/4材料最低，水VCA0.0330优于MMSNMF0.0481。MNMF表2平均印0.1190，四行算术均值却0.11085（四位半入0.1109）；不能据印均值夸大已核收益。本文把结果称SAD/AAD的root mean square errors但未给定义，表算术并非运行复现；真实丰度AAD数值表未提供。

逐式视觉核验保留实际印刷问题：DICTA/WHISPERS degree求和重复固定下标，两稿Mf增广下行都写1_N而列数应对应P/K端元，有限delta仍是丰度和软惩罚。MMSNMF式6反向邻域印成自邻域；式7按定义的I×I/L×L图与首层A L×N、M N×I维度不合，A重构梯度印Al Mlᵀ Ml，图梯度左乘而更新右乘，层间图/尺寸变化未完整说明。WHISPERS式11在已带权L外再放alpha、式13未明确聚合W/D，式14用W而非R计算迹、R矩阵又作求和上限且相对beta漏mu/2。独立代数子问题与原式分列，不伪称恢复作者执行代码；参数、零值处理、solver与正式修订仍待。没有模型训练、代码复现或逐约束完整消融。

旧 `jun-zhou-2015-multiple-graph-abstract-followup.json` 的paperId/title/abstractSummary错挂2025跟踪报告，却配2015解混DOI/PDF。目录此前解混条目本身正确；本轮以四作者AM/IEEE完整解混摘要/Crossref另存纠错，旧派生审计保留但不再作本论文内容证据，未借此复核跟踪稿。18当前HTTP原响应按字节保存并核SHA256；下载动态封面与stored MD5不是同载荷，新旧DICTA/MMSNMF PDF字节不同但全页提取文本一致，二者均保留。三份派生审计及总清单区分原响应、文字、印式和算术。

MMSNMF既有Fig1 PDF3结构原图字节不变；DICTA六图、WHISPERS四图均结果/输入/收敛，伪码不当框架，多图队列由pending改no_framework，顺序不变。无新论文/原图/学习笔记，188行既有索引仅同步状态/任务/链接。当前总库757、作者188（154摘要/34全文）、三维214、314标签/351图，402分类确认（审计353）/337暂定/18待；1615候选/244查询/237批次。作者全集、多来源差集、arXiv八身份范围待及全领域覆盖仍未完成。证据：[全文与来源清单](sources/jun-zhou-graph-nmf-full-reading-2026-10-11.json)、[20页文本](sources/jun-zhou-graph-nmf-full-all-page-text-2026-10-11.json)、[书目/旧错挂纠正](sources/jun-zhou-graph-nmf-full-primary-metadata-2026-10-11.json)、[全部公式/实验/表算术](sources/jun-zhou-graph-nmf-full-protocol-equations-tables-2026-10-11.json)。

## 2016部分端元先验、端元自表示图及结构判别NMF全文续核（2026-10-11）

三篇既有记录升级为**机构接受稿（AM）全文核验**，不是新增论文或正式版全文核验：TGRS部分已知端元稿33页（封面1、正文参考32），两篇ICIP各6页（封面1、正文参考5）。全部45页/42正文参考、70编号式、13图、11数值表13面板及2伪码通读和逐页渲染复核；全部表303组mean±std、135会议行内值及25均值共766数值留证。参考条目41/18/21读完，不表示所引作品阅读全文。TGRS正文标2016-06-17 DRAFT，正式54(11):6531–6544；ICIP正式1843–1847/1848–1852，三个正式PDF入口均202空。

**来源恢复与作者边界**：TGRS旧bitstream当前200但仅755字节HTML；结构判别旧Scispace为二手摘要。通过精确机构item、bundles完整一页3条、唯一ORIGINAL及其bitstreams完整一页1条，恢复TongPUB2302/LiPUB1813的REST PDF，不猜链接。两主链接改为机构AM，旧来源和先前局部证据保留。IEEE三个完整原摘要、正式作者顺序、Jun Zhou Griffith单位与机构身份互证，TGRS还给目标ORCID。当前两个Crossref正常，端元图Crossref429空，不写成当前核验成功。结构判别正式IEEE/Crossref、机构item/封面六作者，AM正文五作者缺Xun Yu，目录保留正式六作者，差异原因未知。端元图新旧PDF字节不同、全部页提取文本一致；动态封面下载与stored MD5不相同，按各归档实际SHA分别核验，不声称正文或正式版字节一致。

三种机制分开，原方法族不合并。**NMF-PPK**用B=[已知谱列,零列]及S=diag(Iq,0)，在½||Y−MR||²中加lambda/2||B−MS||²，所有M列继续估计，区别UPK硬固定已知谱和CLSUNSAL/SUNSPI过完备字典回归；L1/2/MRS扩展稀疏和图作用于丰度。**ESGNMF**联合A/S/W，以A≈AW学习端元稀疏非负自表示，L1/2作用于W而非丰度S；另有固定像元光谱二值对称OR kNN丰度图，不是空间位置图。**SDNMF**将原光谱近邻亲和与远邻排斥约束丰度，排斥权重还依赖当前丰度距离；L=Llocal−(beta/alpha)Lrep_tilde可非半正定，按元素正负拆分更新S，加gamma L1/2丰度稀疏。两ICIP无已知谱输入；ESGNMF Fig2“known endmembers”与正文总端元数4–10冲突，不据图注改为半监督。新增两精确方法标签，端元先验正则定义由暂定升确认，三篇分类审计补齐；已确认分类不代表公式可直接运行。

**NMF-PPK实验与结论范围**：USGS六材料Carnallite、Ammonio-jarosite、Almandine、Brucite、Axinite、Actinolite；64×64/8×8区域/9×9低通/阈值0.7/Gaussian。已知q1–5全组合分别6/15/20/15/6，各10次；620是条件算术而非实际运行日志。q4噪声15/25/35/45/∞dB；VCA初始化、非负丰度截断、贪心先验配对，lambda50来自同合成扫描（建议20–100）、mu0.1、delta10，仅R更新用增广，最多3000次。q5 Unknown SAD .061±.010胜UPK .090±.020，All .037却不及UPK .015；q5丰度RMSE .062胜UPK .067/NMF .068，不推广为每指标领先。四材料/SNR25失配实验正文GDS84生成/GDS83先验，Fig4图注反转；TableV NMF-PPK .088±.010 SAD/.092±.014 RMSE胜UPK .140±.049/.168±.023。Fig5正文及曲线NMF-PPK、图注L1/2-PPK不同；完整498字典SUNSPI好于NMF且高SNR CLSUNSAL更好，移两Carnallite成496后才反转，不能说普遍胜稀疏回归。六矿物合成段另插入tree/road手工影像谱说明，实际分配未解释。

其真实实验：Urban307×307/210→162带、road/grass/asphalt/tree；Jasper原512×614，(105,269)起100×100/224→198带、road/soil/water/tree；Cuprite250×190/224→188带十矿物。Urban/Jasper每材料从同影像选10谱求均值作端元参考，前两数据q1–3全组合各10次；Cuprite随机选先验、不穷举，次数未单独说明，不借前面10次补事实。三实测原文明确无现成丰度/端元GT，Cuprite谱参考USGS；真实丰度只有可视化，没有RMSE数值表，同影像参考限制独立泛化但不直接认定泄漏。七图均数据/结果，Algorithm1是伪码，无独立方法框架，队列标no_framework。

**两ICIP实验与全表算术**：ESGNMF USGS64×64/8×8区域/9×9低通，阈值未给；lambda1=.2/lambda2=.1/lambda3=.05，SNR25、总端元4–10、20次，噪声15–40dB六档的端元数/次数未明。合成mean SAD .0626/RMSE .0818最低，RMSE只4/6档最低，15dB VCA .1067胜.1105、40dB GLNMF .0452胜.0455（ESG仍加粗）；NMF RMSE原均值.1029，六行算术.088266…（四位.0883），超舍入包络。Washington DC Mall HYDICE150×150/191带，tree/grass/water/roof/street，mean SAD .1206最低而water GLNMF .0654胜.0665；裁块起点、删带及参考谱协议未给，没有真实丰度RMSE表。SDNMF USGS六端元64×64/8×8块/9×9低通、阈值0.8，SNR25/P6/10次、近邻5远邻5，另15/25/35/45/∞dB。mean SAD .0676/RMSE .0745最低，逐噪声各4/5档最低，35dB SAD GLNMF .0663胜.0671、45dB RMSE GLNMF .0696胜.0713；VCA RMSE均值印.1287，五行算术.1043，原印/算回分别保留。Urban307×307/210→162带，Asphalt/Grass/Road/Roof，Fig3称GT而构建来源不明，无实测SAD/RMSE表；不借别稿Tree或10谱协议回填。

**逐式疑点保留原印**：NMF-PPK Eq17–18 RᵀR与m的K维不合，作者目标非增论证不证明变量收敛到stationary point，原文明确后者仍待；Eq23当前目标绝对值≤epsilon前次目标（1e−4）左边没有目标差，不改成相对变化停止；Eq28 lambda Bᵀ与Y Rᵀ形状不合，Eq13写B Sᵀ正确且此构造B Sᵀ=B，不能把代数修式称作者代码。非负可逆C还需C⁻¹R非负才能保持NMF可行。ESGNMF Eq4 A⊙M维度不合/罚项无W，Eq5对角零在联合Eq6/8被放松，不能说全程排自环；Eq6/8系数变化、常数行增广用于A更新/伪码Af且底行是否保持未述、SNR分母缺期望均留证。SDNMF Eq4距离未平方而Eq5 trace对应平方，heat分子也未印平方，Eq10 vi/vj未定义；独立对称图下的梯度与原式分列，近/远邻对称化不假定完成。两ICIP完整参数、初始化、停止、零值、实际代码/GT/时间与独立消融仍待，无模型复现。

补两张PDF3原Fig1：ESGNMF为KNN/端元稀疏图对照，SDNMF为四面板结构判别概念示意；都保留完整图注和AM页码，不当完整solver流程或真实实验。21原始HTTP响应/三派生审计/总清单已保存；既有188行索引仅同步状态与主链接，无新学习笔记。当前757目录、作者188（151摘要/37全文）、三维214、316标签/353图，402确认（356审计）/337暂定/18待；1615候选/245查询/238批次。arXiv531决定及八范围/身份待核不变，作者全集、正式修订与全领域顶会顶刊/arXiv覆盖未完成。证据：[全文来源总清单](sources/jun-zhou-nmf-2016-full-reading-2026-10-11.json)、[45页文本](sources/jun-zhou-nmf-2016-full-all-page-text-2026-10-11.json)、[来源恢复/版本作者](sources/jun-zhou-nmf-2016-full-primary-metadata-2026-10-11.json)、[公式/协议/全表及算术](sources/jun-zhou-nmf-2016-full-protocol-equations-tables-2026-10-11.json)。

## 2013显著检测及2014/2016流形自然色可视化全文续核（2026-10-11）

三份既有论文升级为**公开机构稿全文核验**：ICIP2013显著检测6页、ICPR2014可视化7页、TGRS2016自然色AM13页，共26PDF页/3封面/23正文参考、40编号式、28图、5表120数值逐页通读和图版复核；18/20/38参考条目已读，不表示所引作品阅读全文。三份IEEE完整原摘要/完整作者/Jun Zhou Griffith单位与Crossref、机构item/稿首页互证，正式PDF均202空。两会议封面/item未标AM/VoR，期刊明确AM，不能用相同正文页数说正式版已读。新旧三PDF字节不同但所有页提取文本一致，各自保留，动态封面响应与stored MD5分载荷，按实际归档SHA核验。正式ICIP2393–2397、ICPR70–75、TGRS54(6):3151–3162；期刊IEEE另给displayPublicationDate/dateOfInsertion=2016-01-13，正式June2016与登记字段分列，首次online未独立证，不按DOI2015或数据库插入另算论文。

**显著检测**三方案实际四实现：CIE XYZ→sRGB再Itti的RGB、四等宽可见波段组对抗GS、全谱Euclidean SS、SAD/Euclidean组合SSO，加Moan第五对照。Itti九尺度、六强度/十二颜色/二十四方向通道；Otsu阈值、形态学补孔/去小分量、winner-take-all取最高显著值区域，假设每图一目标，多目标仅顺次选择建议。Foster两组共55图（原文16在线）及Harvard50图中人工选择13图区域，用边界框结合合成RGB/材料知识标注。PR为像元precision/recall随阈值扫描，但框如何变像元GT、汇聚/阈值步长、13编号/裁块及原标注未知。四图包含分组示意、PR和两示例显著/检测结果，无数值表/AP/IoU/Fbeta/速度，不能从曲线估数冒充正式结果或将作者“首次”主张当领域已证优先权。

四原数据说明页与真实入口已核并追加数据链接：Foster2002当前研究30场景但只展示8示例，31带410–710nm/10nm；Foster2004研究25场景、8示例，通常33带400–720/10nm、scene5为32带。说明页的采集/处理参数不回填成显著稿已经印出的参数。Harvard项目页50图，下载说明当前另含25人工/混合照明，NuanceFX/LCTF31带420–720/10nm与movement masks，非商业研究使用；75是资源现集合，不把2013研究50改成测75。没有下载整库或13裁块/框GT，原数据页可用不证明专用实现或数据实验已复现。

**ICPR2014视觉范围**：HSI/RGB本域对称OR kNN热图、少量跨域配对、线性广义特征向量和Srgb=S Fs Ft⁻¹，3D是共同颜色空间，输出仍HSI像元网格，不是高分辨率光谱立方/物理3D。匹配为每带SIFT、粗仿射最小二乘/RANSAC、邻域细搜索，邻域数值/k/sigma未给。Washington HYDICE1208×307×191，Google maps RGB5160×1640，20配对/alpha1=1/alpha2=500；权重30/100/500及配对5/30扫描，建议200–500且配对增多宜减权重。两地面HSI480×640×18、SLR RGB2592×3872×3，20配对/alpha2=300。对照选带、PCA、Laplacian Eigenmaps，后两移坐标最小值后映0–255。会议11图只有视觉/参数比较，没有定量表或已测跨地点/交互工具；后者在结尾future work，不能搬期刊数据/能力给会议。

**TGRS2016实际新增核验**：期刊引言与参考[32]明确引用ICPR2014题名/三作者/70–75，共享方法族保持，但没有明确extended version声明，引用不等于正式扩展声明。期刊增加Yuan Yan Tang，配准改八参数homography/最少四非共线配对、9×9细搜索；四数据为Washington1208×307×191/RGB5160×1640、Moffett501×651×224/RGB1560×1830（两RGB Google Earth）、G03/D04 OKSI+LCTF960×1280×18、460–630nm/10nm、NikonD60 RGB2592×3872。地面960×1280不同会议480×640，未确定文件/重采样关系。G03投影直接复用于F02/G04/G02，只有视觉图，不能推广任意传感器；D04 HSI配G03 RGB手工14对；58/80/120三带显示单列，理论至少三带。k/sigma/SIFT比率r具体数、种子、执行时间/硬件及原参考资源未给。

五表六方法×四列120数值全部保存：同地点MA的熵、梯度、可分性分别3/2/3组最好，排名1/1/1/3、1/3/1/2、1/1/1/4，不能说所有指标均胜。RGB RMSE四组58.41/27.30/32.88/23.08均最低；参考由同一引导RGB配准缩放近似true color，不是独立物理标定GT，不当光谱恢复验证或直接定性泄漏。跨地点TableV MA7.50/.0350/147.54/58.47，前两第一、后两第二，RMSE不及stretched CMF28.70；同地点D04 MA23.08与跨地点58.47不同设置。TableI/V D04 LP熵5.58/5.59、bilateral7.27/7.26分印保留，原因未说明。论文未给标准差/显著性检验，“significantly better”不提升为已证统计显著。

原式与独立代数分开：会议Eq3跨集合i≠m可漏数值同索引配对、全有序双和到trace差常数；线性降维不保证所有不同谱距离保持。期刊Eq7跨域单次而对称块Eq8/10全有序双和数两次，相对alpha2需代码核；近邻正文OR/式中互邻措辞、sigma²背景/sigma应用分母及III-A行/列S约定与Eq16列乘法不同。按II列约定Eq16逆转置正确，按III-A行约定需相应转置表示，不伪造作者执行实现。q3仅使Ft方阵，仍需满秩及稳定性；无约束trace零解需归一/特征值条件。homography Eq18/20未印齐次尺度/除第三分量，与一般透视模型的实现需核。熵式21为ln：若256离散灰度其上界ln256约5.545而表7.40超界，若log2可达8；实际位深/分箱/对数未知，不静默改原式或定性造假。可分性Eq23分母(N−1)²而所有有序不等像元对数N(N−1)，RGB RMSE向量通道求和/平均未明。全部为待核边界，无模型复现。

三张既有原Fig1裁切字节不变（显著分组PDF3、会议流程PDF4、AM流程PDF6），队列顺序保留；无新论文/标签/原图/学习笔记，彩色可视化任务定义从暂定升确认，原356分类审计条目续核。22当前原HTTP响应、三派生审计和总清单保存，188行索引仅状态同步。当前757目录、188作者（148摘要/40全文）、214三维、316标签/353图，402确认（356审计）/337暂定/18待；1615候选/246查询/239批次。arXiv531决定与八待核不变，正式/实现、作者全集与全领域顶会顶刊/arXiv覆盖仍未完成。证据：[全文清单](sources/jun-zhou-visual-saliency-full-reading-2026-10-11.json)、[26页文本](sources/jun-zhou-visual-saliency-full-all-page-text-2026-10-11.json)、[身份/版本/日期](sources/jun-zhou-visual-saliency-full-primary-metadata-2026-10-11.json)、[公式/协议/全部表及数据页](sources/jun-zhou-visual-saliency-full-protocol-equations-tables-2026-10-11.json)。

## 稀疏多任务与非局部张量去噪全文续核（2026-10-11）

本轮沿用既有两条记录，新增2份公开稿全文阅读；作者目录仍188条，其中146条摘要级、42条全文级。MTSNMF机构稿36页未标AM/VoR，ICIP张量稿6页明确AM；共42 PDF页（2封面、40正文参考）、40编号式、23图、11表、9算法、60/22参考条目均已通读及逐页图版复核。9张性能/时间表277个数值完整保存，其中MTS四分类表84对均值/std。读取参考条目不代表所引作品阅读全文，也没有作者程序复现。

- **MTSNMF，TGRS2015。** 各波段重叠空间块拥有各自字典、共享同一稀疏非负系数；正则在印式中合成`lambda_sum`，没有逐带独立系数或逆噪声方差残差权重。MU/HALS及加速版本全部核对，后续实验采用A-HALS。SpecTIR Reno低噪样本200×200×356当近似clean，按各带不同Gaussian或Poisson–Gaussian噪声合成；原生IndianPines/Pavia无clean，以视觉与分类间接评估。最优扫描ISNR16.64dB；混合VST18.31较未加15.37高2.94dB。Indian全带三指标排名1/4/1，Pavia全带全部第二于K-SVD；两坏带子集三指标全部最高。原图基线先删20/4坏带，不能当相同带集消融；随机像元划分不当独立场景测试。CUDA相对自身Matlab约3.24/3.15倍，非所有方法最快。已有Fig1原字节保留。
- **非局部张量去噪，ICIP2017。** 全谱3D块在空间窗口匹配、堆成四阶张量，正交Tucker低秩与AIC/MDL rank交替恢复、聚合，并以`delta=.1`反馈残差；不是非负张量分解或几何三维重建。32幅Columbia图512×512×31、400–700nm/10nm加Gaussian，表内九指标平均值均最高，PSNR42.87/39.85/36.26。所谓真实数据实验将Pavia103带抽31带后再加Gaussian sigma40，只给视觉图，不能当原生混合噪声恢复已证。正文称8比较方法，但表为七具名基线加Ours与Noisy；不补造基线。实际引用MTS[9]，没有直接表格比较或扩展声明，方法族分别保留。新增原Fig1（PDF2/AM正文1）；出版类型由误标期刊纠正为会议，BibTeX改`@inproceedings`并补正式booktitle/1890–1894。

印式与判断分列留证：MTS仅印非负约束时存在字典放大/系数缩小的尺度自由度；`b`在式8为方差、实验文字称标准差；真实段`R=3N=137`不满足整数块大小，若N=49则3N=147；epsilon投影与精确非负子问题、A-HALS旧/新状态索引、外循环停止仍待正式/代码核。Tensor式2单独无低秩约束有平凡解，式3才给先验；式4印`min`投影范数，与正交Tucker最小重构应最大投影能量不一致，未重列正交约束；块边界索引与总块数相差1。保留原式，不把推导修正式当作者实现。

IEEE完整摘要、三作者/Griffith单位与Crossref正式书目均已核。MTS正式May2015、IEEE显示/插入2014-10-29；Tensor正式September2017、插入2018-02-22；数据库插入日期不当独立证实首次online或新论文。MTS机构摘要含VST段、当前正式摘要未含，不能据此推断正式正文一致或删除。两正式PDF入口均202空。Purdue原说明200、220带原文件与PURR DOI可追踪但未下载；SpecTIR样本链转联系页，EHU403、CAVE两scheme均500空，未取得原库/专用代码。

证据：[阅读清单与18原响应SHA](sources/jun-zhou-denoise-full-reading-2026-10-11.json)、[全42页文本](sources/jun-zhou-denoise-full-all-page-text-2026-10-11.json)、[身份/版本/日期/类型及原下载校验](sources/jun-zhou-denoise-full-primary-metadata-2026-10-11.json)、[全部式表/协议与数据入口](sources/jun-zhou-denoise-full-protocol-equations-tables-2026-10-11.json)。分类审计356增至357，757论文/316标签不变，原图354张；队列非目标记录及顺序保留。作者全集、其余146摘要级记录、差集及全领域顶会顶刊/arXiv覆盖仍未完成。
