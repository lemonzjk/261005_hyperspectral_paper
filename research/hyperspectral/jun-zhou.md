# 周峻老师高光谱论文调研

状态更新：2026-10-12。目录、全文与资源快照续核至2026-10-12。当前目标是论文目录完整，优先查漏及必要的作者身份、范围和版本核验，不新增学习笔记；免费可获取的PDF与框架图须整理信息。目录覆盖尚未闭环；付费且无公开版本或确实不可获取材料的留白不阻塞目录完成。

## 当前目录

已收录181条，全部为直接高光谱；88条摘要级、93条全文级。会议、期刊及预印本按实际版本分别记录，不等于181个独立方法。全文级只对应实际读过的版本；官方代码只记录链接，不审查代码或运行复现。

其中80条符合普通总库的白名单顶会顶刊/arXiv来源要求，101条来源不在当前白名单，按作者专项例外保留。原目录中的7条多光谱关联（含1条会议摘要）已按用户要求删除；作者例外仅放宽发表来源，不放宽高光谱范围。清理决定见`catalog-cleanup.json`，原始记录可通过Git追溯。

88条摘要级是阅读深度统计，需按材料可访问性区分后续任务。免费PDF、正文或框架图可获取时，须获取并整理输入输出、方法、框架和实验信息；仅在付费且没有公开版本或确实无法获取时，保留摘要、来源与访问限制，相应细节留白或标记“未获取/未核验”。摘要和基本书目足以确认身份及高光谱范围的论文可以先入库，可访问资料尚未整理则保留资料待办。

后续专项只调研直接高光谱论文，纯多光谱按当前范围排除；直接处理或重建高光谱数据的融合论文仍可收录。保护ID列于`../../src/data/collection-policy.json`，不能仅凭同名放宽作者来源范围。

网站支持“来源范围”筛选：顶会顶刊（白名单）、arXiv预印本、白名单外（周峻专项）。可与作者、年份、具体出版来源、分类及资料状态取交集；分享链接保存`publicationScope`参数。

论文事实、来源、版本、阅读状态与分类统一维护在 [catalog.json](../../src/data/catalog.json)，避免另建手工论文目录。本地网站打开 `?collection=hyperspectral&author=Jun%20Zhou`，或在高光谱总库作者筛选中输入 `Jun Zhou`。

目标作者是Griffith的周峻：ORCID `0000-0001-5822-8233`、DBLP `99/3847-1`、Scholar `6hOOxw0AAAAJ`。同名作者必须逐篇核验，不按姓名字符串自动合并。

三份既有甘蔗稿本次全文升级共29 PDF页：IVCNZ2021接受稿7页、JAFR2024正式VoR12页、arXiv2501.16700v1共10页；新增三张原方法图。2024 §2.4.1/Fig4/ref36明确沿用2021 DSAB，与已读ASSCT2023仅作方法族关联，未确认会议扩展关系；161/150/150带、200/3245/1828图及各自日期/划分分别保留。2025为八品种、七个预定义花叶病抗性评级，纠正“地物分类”，新增“植物抗病性评级”；实际11带及传感器细节缺失保留，不猜密集全谱规格或感染标签。原TableI计数、学习率措辞、植株隔离及阈值选择限制按原文记录；不查代码。

原31项机构资料队列已完成31份：21 AM共294页、6 VoR共92页、4份未标版本机构稿50页，共66张原图（含采集装置与输出示例，SMDS图选固定arXiv v2）。该冻结队列已无摘要级待办，其他可获取资料继续整理。另甘蔗arXiv10页、SSUMamba/SSRT预印本26页及SMDS v2对应12页不混入此冻结队列。作者目录与正式版本仍未闭环，正文补齐不作作者全集完成声明。

异常IOACED接受稿16页与SBE反射估计未标版本机构稿21页已逐页全读，新增四原图并将Fig3几何示意换为机构图版，旧ANU图保留。IOACED补LLE/LAKDE、OICA、双侧PASNR/OSP与最终KLRX，移除监督分类ICA错配；三主场景AUC领先但速度不全胜，经验参数/ROC局部落后及印式差异保留。SBE完整/简化/鲁棒变体、四HSI与两RGB数据分开，Toys照明误差明显不及对照，速度优势不写成精度全面保持；RGB不是谱重建，H*不是相机深度。ANU30页稿本批仅1/2/10三页选读，正式16页未读，不因Fig3对应认定整稿相同。两稿引用无目标作者直接HSI条目；原31队列完成不等于作者或资料全集，代码仅链接。

空间超分辨率、人脸3DLDP与跨维图匹配三份机构稿共32页全读，新增五原图、Fig3人脸描述子替换高清且保留旧文件。SR保持31谱带，仅恢复空间细节，纠正光谱任务、期刊类型和BibTeX，移除无成员的光谱超分辨率标签并同步导航；Eq2谱损失/最小化方向及Eq4 PSNR印式疑点按原稿保留。人脸稿未标版本不猜AM/VoR，人工对齐、CMU实际47人子集及DCT未用PLS边界保留。图匹配AM正文三作者、正式书目五作者分别记录；31带HSI与同场景合成RGB不称独立跨传感器实验，全部编辑批注、参数命名及表Average聚合缺口保留。三稿参考书目无目标作者直接HSI引用；正式版均未读，代码只链接。

跨场景MTJDL/MTSLR与逐带结构一致性SCSC/GSCSC两AM45页全读，新增四原图。两域共享非稀疏NMF字典与逐带不同字典/跨带共享L1编码分开，纠正目标必须有标签及稀疏NMF误配。DAIS72带Pavia六类不混同ROSIS103带九类；主表优势、AA非全胜、协议/印刷冲突按实际稿保留。当前AM Fig14已3×3，2018正式勘误仍只核摘要、图版未得；不把原稿当勘误版。六处直接HSI作者引用涉及五已录，另通用编码背景引用沿用既有范围排除。代码仅链接。

丰度CNN、三元组CNN与异构ICV融合三稿29页全读，新增五原图。三元组补正式DOI10.1109/WHISPERS.2018.8747227及pp1–5；PRRS改为实际遥感模式识别会议，DICTA类型改会议，规范别名同步政策。两监督深度分类稿删除预训练错配，三元组没有数据发布/基准主贡献证据；不同六类新集的224²/145²及划分分别保留。丰度稿封面未标版本不猜AM/VoR，Fig1误写CRF的原注保留并注明；两个目标作者引用均已录。代码仅链接。

两CRF论文机构接受稿共22页已逐页整理，新增四原图（含一输出示例），纠正表征预训练错配。会议稿为超像素CNN与Gaussian CRF-RNN、单场景初步结果；期刊稿为局部谱组3D CNN、卷积势深CRF与成对势内反卷积。期刊AM正文题名Segmentation与同DOI正式Classification不同，保留正式书目及实际版本；未见明确会刊扩展声明，暂不合并方法族或实验。两最终VoR及期刊arXiv各版独立待，代码只链接。

活/死SKOV3细胞接受稿6页与FCNN–SPLBP杂草分类正式VoR16页已逐页全文整理，新增五张采集装置/方法原图，纠正两条地物分类误配。医学状态分类与植物种类图像块分类维护在现有库，人工分割、模拟降采样和61带HSI/四带MSI结果分开；原任务导航已预留植物种类ID。五条目标作者引文均已录；杂草ref16的J. Zhou经正式完整作者核为Jie Zhou，不是Jun。来源例外、实际版本和正文待办分别保留，代码仅官方链接。

ICV免费Griffith正式VoR16页与MFSuDF接受稿17页已逐页全文整理，新增五张原方法图；两稿首页Griffith单位及Crossref稳定ORCID确认目标Jun。MFSuDF机构Published2020与正式TGRS59(2)2021分开，最终VoR未读。输入输出、方法、原主表、实验协议与局限维护在现有文献库；两条目标作者引文均已有目录，未新增论文或猜测版本关系。代码仅官方链接。

FSHyperRGAN接受稿17页与S³ARN正式VoR13页已逐页全文整理，新增五张原框架图。两份Crossref注册ORCID和首页Griffith单位确认目标Jun Zhou；S³ARN封面Published2022、首次出版2022-12-01与正式卷16(2023)年份分开保留。FSHyperRGAN每类总5标注与训练support1-shot分别记，标签条件生成/重建辅助关系分类，测试只用RC；主表聚合指标领先，但部分类别和耗时并非全胜。TableXI首场景印作Salinas而正文四主场景含KSC，不替作者改名。S³ARN为三谱块接三空间块、split attention和两残差掩码，移除无独立证据的表征预训练任务；随机像元划分不证明15²空间窗口不重叠，默认radix2与部分场景分析最佳4分开。主表、消融、成本和印刷冲突均按实际版本维护，代码仅官方链接。

两稿的四条目标作者引文全部已有目录，未发现新周峻条目；引用目录读取不等于被引正文已读。FSHyperRGAN ref34引出的HSIGene官方arXiv v2摘要明确直接HSI条件生成/空间超分辨率，当前七作者无Jun Zhou，与原引文五作者分别记录。固定v2免费PDF已下载，正文尚未读、正式版本关系待核，单列后续全领域候选；不以下载状态冒称资料整理完成，不访问作者代码仓库。

GMSC-Net接受稿5页与SMDS-Net机构公开稿13页已全部逐页阅读，三张原方法图保留版本、页码、图号、裁区和哈希。前者从单幅噪声HSI的聚类中心构造伪干净目标，展开三步带输入/遗忘门的动量稀疏编码；后者预计算输入相关谱子空间，展开六步张量稀疏编码，两种方法族保持独立。Pavia Centre80带、ICVL/CAVE31带及Urban210带各按实际稿记录，主表、非单调消融和真实数据定性结果不混合。代码仅记录机构原摘要提供的SMDS官方链接，未访问作者仓库。

SMDS机构封面和元数据未标AM/VoR，12页正文与固定arXiv2012.01829v2逐页文本对应，首页新增版本戳；同裁区渲染只有10/12页一致，首页及Fig2符号显示差异另核。展示v2数学符号完整的Fig2，机构原裁图另归档。正式TIP书目5469–5483共15页，尚未取得/阅读，不以2022机构封面推定最终版本，也不将对应预印本重复计为新增独立全文。

SSUMamba和SSRT两份免费Griffith接受稿共28页已逐页全文阅读，六张原方法图保留来源、AM版本、页码、图号、裁区与哈希。前者六层各用一种连续扫描并采用双向SSM，后者窗口Transformer与改进SRU共享键值、跨波段双向循环；分别补状态空间/Transformer标签，不合并方法族。训练、噪声、主表、消融和成本按各稿记录：SSUMamba默认模型不比SERT全面更轻更快，SSRT混合噪声SSIM/SAM并非全胜且耗时高于其深度基线。GF-5分别是武汉/上海，不混用真实结果；SSRT仅定性真实对照。代码只放原文官方链接，未访问作者仓库。

固定arXiv2405.01726v7、2401.03885v2各13页已下载，并逐页与已读AM正文对应；页2–13文本及同区域渲染一致，首页归一空白文本仅多版本戳，但字体像素仍有差异，首页作者/机构/摘要另作视觉核对。不重复记为新增独立全文，不声称PDF逐字节相同、SSUMamba v1或最终VoR已读。

共同作者Fengchao Xiong当前公开书目中完整BibTeX含Jun Zhou的43条已逐一对照：36条匹配已有目录、5条继承既有排除、1条仍标在审且无DOI、1条仅题名“XXXX”、2027/published0占位。后者保留为无题名来源线索，不猜高光谱范围或已录用/发表；CV仍是3个有题名候选。两个原仅题名排除（MLA-Net/WS-Net++）已取得完整原摘要和全部基准名单，本轮选读MLA正式VoR的6/14页；原LEVIR论文Table2明确RGB，原CLCD论文明确GF-2及广东2017/2019，GF-2原传感器定义为PAN＋四宽VNIR带。WHU原论文只确认Christchurch2012/2016建筑变化航片，未明确波段数，仍保留定义缺口；WS-Net++正文未得。范围外共11页选读不记整篇全文，保留继承暂排，不冒称两项范围审计闭环。Xiuping Jia旧路径403的缺口已由新版UNSW staff页面续核，当前覆盖见下段；旧访问失败不删除。两稿引用的TGRS2023非局部结构稀疏论文，其J. Zhou由出版社注册Crossref全名、澳门单位和ORCID明确为Jiantao Zhou，非目标Jun，分流普通总库待核；其他13项引文匹配9个已有目录ID，不表示引用正文已读。

## 来源覆盖与缺口

| 来源 | 已核范围 | 尚未解决 |
| --- | --- | --- |
| ORCID | 263组、269条书目完整拉取；262组有当前范围决定 | UEMM重开1组待核；无摘要的书目集合不证明作者全集完整 |
| DBLP | 365条合并记录，357条有范围决定 | 8条的输入、范围、身份或正式版本待核；网页/XML访问仍受限 |
| Google Scholar | 4页取得387条记录、384个唯一题名；非关键词差集209条已逐项处理 | 差集5条待核；引用元数据与作者归属仍需原始来源互证 |
| Griffith | 当前机构个人profile7205全分页387关联项，ID集合与个人页完全一致；175条匹配168个既有目录ID，187条继承排除、6条对应当前多光谱删除、3条新摘要暂排、1条新来源排除、1数据资源、1已排除原文勘误、3条DDFNet/FAT/SA-Net原摘要与基准范围暂排；此前两仓库指定查询351条独立保留 | 8条继承范围/版本待核；另2条直接HSI来源外候选。386条作者有resolvedUser7205，NSP/KUM仅个人关联、单篇正式机构待核；机构目录闭环不证明作者全集 |
| arXiv | 带引号姓名531条已有映射/逐审；倒序Zhou_Jun的531条ID及元数据完全相同。此前Zhou+指定任务词101条；扩展谱词1891条完整返回，20个目标样式姓名中15旧ID、5新简写摘要范围外。四单项词20/27/3/1845的并集与1891完全一致；UEMM/AdvMIM/RADC/VITask四固定稿共45页全读、UltraVR选读21/70页，均按直接HSI范围排除；医学三稿下载135页、实际选读52页，方法及完整实验/研究汇总表支持固定v1范围暂排 | 此531姓名快照0原稿范围pending，不等于全部全文或作者目录闭环；MerMED/医学综述正式候选及UEMM/AdvMIM正式版独立未核。reflectance宽匹配机制未明；其余1871未逐项范围筛查，不当作者/领域全集。此前J._Zhou全量超时/503；本次无点au:"J Zhou"已完整989元数据，视觉/学习分类两简称均六条且同集，六摘要范围暂排；其余982新ID仅元数据，不能称989逐篇排除；其他姓名变体仍需查漏 |
| 旧作者主页及共同作者CV | ANU旧页2001–2012与共同作者公开CV已用于查漏 | CV3候选指定Crossref排序前5及arXiv作者/任务词查询无对应版本，仍待核；不同题名/作者不自动合并，旧页不能代表当前成果全集 |

上述待核项可能跨来源重叠，不能相加为剩余论文数。暂排除保留证据，可在新输入或身份信息出现后重审；题名没有高光谱关键词不构成自动排除依据。

机构个人387条快照与交叉核对已闭环，但不是作者全集；13个既有保护ID在该源没有精确匹配。两个直接HSI来源外候选Dualmamba（IGARSS）/土壤碳SSTR（SSRN）仍待合格版本，作者例外不扩展。FAT/SA-Net已按完整原摘要与全部命名基准定义暂排直接HSI范围，未取得本文全文；NSP/KUM已补主要机构原摘要，单篇正式作者机构待。原始PDF链接75条对应已录HSI，其中原31条资料队列现均已实际阅读全文，不代表其余摘要级论文均受限或作者目录完成。

本轮CV3候选分别核Crossref前5与arXiv指定查询，未取得对应版本，仍保留在审/缓存证据；不能断言未发表或不存在。检索返回的SSTCF/SUIT旧论文及其他作者prototype论文不当作候选版本，三个其他作者TGRS题名分流全领域待核，未自动入库。

三份免费Griffith作者接受稿共50页现已全部逐页阅读：SUIT16、医学原型网络15、FedDA-HSI19页（均含机构封面），共5张原始框架图。SUIT指标/视频统计/公式与代码API404未决仍保留。医学补三主基准与HyperVein跨域测试、协方差双度量及DAAB；1-shot分母、门控路由、α/β与患者划分边界保留，补已有域适配/Transformer标签。FedDA补丰度条件扩散、解码高光谱增强与联邦分类，4客户端主表与2客户端消融分别记录；共享解码器、隐私预算、生成/测试划分和非单调结果保留，标签改为地物分类＋扩散。所有全文级升级仅对应实际阅读AM，最终排版、代码与性能未复核。医学ref19的2023多域表征论文已录，Crossref精确书目去重；3个其他作者TGRS/arXiv题名分流全领域候选。总库390、周峻181不变。三稿逐页阅读证据及当批次状态保留，当前阅读总数和资料队列以下续核为准。

ADLKAN免费Griffith接受稿19页已逐页阅读，Fig1–4四原图保留版本/原注/页码。Chikusei源域、IP/Salinas/KSC/UP/PC五目标每类5标注，两个谱空大核块与三尺度条件域判别/额外反域损失已核；主表13×13核、1–10标签曲线另用7×7，分别记录。Algorithm1目标损失符号、公式/末端谱卷积、独立验证及表格异常保留；4条作者引文已有目录映射，无新论文，未称引文全文已读。周峻全文级现61、摘要120；原31机构资料队列中4份AM已全读，剩27项。

四单项谱词查询的唯一并集、题名、摘要、作者、版本与时间均与旧OR响应完全一致，组合查询的集合关系已核；不能再将大集合直接归因于OR异常。reflectance单项返回1845条，其宽匹配机制仍未确认；下划线spectral_imaging返回0，而带空格短语返回20，不互相替代。此次未新增目标姓名记录或论文。

UEMM-Air v3免费原稿12页与AdvMIM v1原稿11页已全部逐页阅读，PDF、哈希、逐页文本和视觉核对证据已保存。UEMM的六模态及全部任务/实验围绕RGB、几何、IMU与文字；§III-B的infrared/Depth写法冲突保留，但不构成直接高光谱贡献。AdvMIM明确H×W×3输入，所有实验是MRI、CT、皮肤镜的分割。两份固定原稿按当前直接HSI口径范围排除；其正式版本仍未读，机构/DBLP/ORCID等对应正式记录继续待核，不外推身份或发表版范围。当前待核数量以下述续核及来源表为准。此次范围外全文阅读不增加库内61条全文或221张原图，周峻181条与27项机构资料待办不变。

RADC v1六页与VITask v1十六页现已全部逐页阅读。RADC是CLIP分类/双缓存测试时适配，所有基准已列；EuroSAT官方说明Sentinel-2 RGB或13波段多光谱，两种版本均按当前口径范围排除。VITask为MedMNIST2D医学分类及外部糖尿病眼底验证，官方4RGB/8灰定义与原稿全部12数据、70类别对应；70类别、九模态及空间切片不作为光谱维。具体RGB/MS选版、APTOS引用/转换或未复现像素不人为阻塞已明确的固定稿范围决定。

UltraVR v1下载70页，实际逐页读1–10、15–22、68–70共21页。主文与A–D的全部四域构造、问答/GT-CoT任务和实现已核：PANDA监控、DOTA1.5航片、TCGA-BRCA H&E病理、MVTec LOCO AD网格。DOTA官方明确RGB/全色灰度PNG；空间对象/形态推理不是直接HSI研究，固定原稿按选读证据范围暂排。11–14引用/目录及23–67示例未全读，不记整篇全文。原稿作者机构/邮件各自保留，不据机构差异证明另一同名。该批次之后的当前原稿待核数以下续核为准；四份范围外固定稿全文45页与UltraVR选读不增加库内61全文、221原图。没有新增论文，作者目录仍未闭环。

医学三稿的固定v1已下载并核对旧PDF哈希，共135页。实际选读EVLF-FM 25/39页（1–3、5、7、15–25、31–39）、MerMED-FM 13/42页（1、4、15–21、27–30）、医学综述14/54页（1–3、13、18、29、34–41），共52页；全部精确读页与页级发现已保存，未记任何整篇全文升级。EVLF的方法及完整实验表明确疾病分类、医学VQA和空间定位，C为特征通道；MerMED的方法与完整Table1明确CT/CXR/US/CFP/OCT/病理/皮肤镜七模态及诊断输出；综述检索协议、模态任务统计和完整Table1–2对应通用医疗VFM/VLFM研究，未建立直接高光谱研究主题。综述的multi-color/红外反射等不按关键词扩大范围，也没有逐篇审读全部304条引用。三固定v1按选择性阅读证据暂排直接HSI范围，此531姓名快照现0原稿范围pending；447摘要暂排、11选读范围暂排与4全文范围排除仍按不同证据深度保留。

个人身份与正式版本仍独立：EVLF/MerMED的Jun为IHPC、综述为Emory/Winship，未取得其稳定个人标识，不凭机构差异确认另一同名。MerMED正式35作者与原25不同；医学综述候选改题尾且7变8作者，正式正文、版本关系和身份未核，不移植预印本范围决定。EVLF十一/十/九模态和样本分池总和差异、MerMED外部SupplementaryTable6未取等资料边界保留。作者目录未闭环，库内390/周峻181/61全文/221原图及27项机构资料待办均不变。

DDFNet正式DOI10.1016/j.inffus.2025.103359的机构原摘要列全三基准：ISPRS Vaihingen、ISPRS Potsdam和LoveDA。当前ISPRS官方定义明确Vaihingen为IRRG三波段、Potsdam为IRRG/RGB三或RGBIR四波段，DSM为单通道高度；LoveDA原NeurIPS2021论文第4页明确RGB三波段。原摘要的方法为空间/频域高低频融合与几何边界先验，不是HSI采集或谱维处理。依完整摘要和全部命名数据的原始定义，暂排此正式DOI直接HSI范围；未取得本文正文、具体RGB/MS选版、转换或实际训练像素，不把这些未知人为留作HSI范围未决。新明确HSI贡献证据可重审。LoveDA12页PDF下载仅实际读第4页（1页），不记数据论文全文或加入HSI库。

DDFNet范围决定同步当前DBLP、Scholar及两个机构交叉表；原始来源快照/旧批次决定保留。DBLP现9、Scholar差集7、个人机构继承未决10，集合重叠不相加为论文缺口。四个指定GitHub仓库检索未取得FDNet/GPINet/SAPNet的新可认证原稿或实际输入，不用相似方法或同名简称外推范围；DDFNet4RSI仍为既有待发布占位。其余候选、正式版本与可获取资料继续，作者目录未闭环。

SSIT免费Griffith正式发表版（VoR）15页已逐页阅读，原Fig.1完整裁图保留版本、页码、图注与来源。ICVL31带、Houston选末46带、Realistic34带和Urban210带的协议与主结果已补；空间置换/光谱压缩注意力、交互和SSFFN确认Transformer去噪，替换笼统表征学习标签。部分SAM不及SERT、Case5自引用、variance表述和31→46带测试机制未说明按论文记录，官方代码只保留链接。四条作者引用已有目录，无新增论文；引用目录阅读不等于引用正文已读。周峻全文级现62、摘要119；原31机构资料队列完成5份（4 AM＋1 VoR），剩26项。

Hancock纪念文章与Transformer编辑文章仅补Crossref书目、Elsevier coredata及公开版本访问证据，未得摘要/正文，范围仍待核。ScienceDirect403不能判定必须付费；OpenAlex的开放标志没有PDF且与出版社标志不一致。Hancock的WhiteRose限定ALL DOI/题名查询零匹配仅为指定查询结果，不证明无公开版本；未来2026-12卷期不当实际首发时间。Transformer编辑文章参考书目中的CasFormer已经收录，引用它不能证明编辑文章有直接HSI贡献。DBLP9/Scholar7/个人机构10未决数量不变、互有重叠，作者目录未闭环。

FAT和SA-Net正式DOI的完整原摘要及全部命名基准已交叉核对：FAT使用ISPRS Potsdam/LoveDA，均RGB或多光谱；SA-Net使用HTCD/MRCDD，两份原数据论文指定页明确RGB三波段。两项暂排直接HSI范围，不把尚未取得的本文全文、具体采样或RGB/MS选版视作范围未决；后续明确HSI贡献证据可重审。HTCD/MRCDD原稿下载18/25页，只实际读10–11/12共3页，不记整篇全文。当前DBLP8、Scholar差集5、个人机构8项未决，集合仍有重叠。

MFTNet免费Griffith正式VoR20页已全部阅读，原Fig.1–3保留版本、页码、原图注和来源。其双支路在潜在空间特征上作高低频分解，再用自重建与Mahalanobis双分数检测；不支持原“频域光谱相似性”的波长DFT距离定义，纠正错配并删除无成员标签。六主场景、额外Segundo裁区、CPU训练与检测耗时及非全胜指标按原表记录；参数选择无独立验证说明、Eq8文字与印式、通道及单位差异保留。官方代码只记录链接。周峻现63全文、118摘要；原31机构资料队列完成6份（4 AM＋2 VoR），剩25项。没有新增论文，作者目录未闭环。

UBSTrack免费Griffith接受稿17页（1封面＋16论文页）已全部逐页阅读，原Fig.1–3完整裁取。HOT2024的nir/rednir/vis分别25/15/16带，训练217视频、验证117视频；主协议按序列固定Top3，OSTrack/YOLOv7候选与历史外观余弦相似度选框，缓冲4帧和两路IoU之和阈值1.4已核。主表AUC .574、DP@20 .725、15.7 FPS；camera motion/out-of-view/reflection等属性未全部领先，HOT速度设备不同。UAV123补充只有RGB定性演示，不作为HSI无人机验证。选带分数、ResNet特征形状、Eq18印式、Fig3及TableV表头等原文边界保留，代码只记录原PDF链接。10项作者引文已在目录；AM全文阅读不等于最终VoR或引文正文已读。周峻现64全文、117摘要；原31机构资料队列完成7份（5 AM＋2 VoR），剩24项。

FDNet、GPINet、SAPNet的Crossref指定PDF链接本轮跳转到出版社公开HTML，原摘要与Jun Zhou的Griffith机构、稳定出版社作者ID37536459600已取得；出版社元数据isOpenAccess=false。原摘要各报四/三/三基准而未列名字，仍无法判断实际高光谱贡献。指定canonical响应202空，未取得三篇PDF；HTTP200 HTML不计全文，非OA标记不证明没有作者公开稿。保留访问限制，不反复追索付费正文或检查代码。当前DBLP8/Scholar5/个人机构8项未决不变，作者目录尚未闭环。

SS non-Linear Model固定arXiv2412.00283v2的17页已逐页全读，首页Griffith通讯作者与既有来源互证；两原方法图、主表、参数、消融及效率整理到现有目录。删除无预训练目标的关联，保留作者双向谱SSM定义而不认定标准Mamba实现。TableIV–VI的OA为97.57/97.60、92.53/93.32、98.07/97.04%，正文窗口p3与表注p5、部分精度/样本计数/效率单位冲突分列；本方法不是参数最少或所有训练/测试最快。两条目标作者直接HSI引用均已录，v1及正式版未核；Crossref指定前5无对应正式版本不证明没有。正文仅给代码名，没有可确认官方URL，不猜链接或访问代码。

三项新的arXiv查询取得有效完整返回：J. Zhou配合当前谱词19条摘要已读，均为等离子体、材料反射谱、天文/粒子/核物理等，未显示本库直接HSI/CV贡献；缩写身份不作Griffith归属。Jun Zhou＋reflectance九项均匹配旧531来源；Zhou＋abs:reflectance完整1826项是旧all:reflectance1845的子集，无新ID，摘要均含reflect子串而只有77含完整reflectance。后者只作自动字面/ID比较，没有逐读1826摘要，宽词形匹配机制仍未由官方已读查询手册确证；其他变体和作者全集未闭环。

共同作者Xiuping Jia新版UNSW主页本次返回438条书目，58条作者串含Zhou、17条为Zhou J：14源项精确DOI/预印本对应13个已有目录ID，2条继承范围排除、1条2022会议仍未决。Jia ORCID212组/213书目与该页匹配188条，25差集完整贡献者只一条Zhou J，为已清理的2010纯多光谱配准，不恢复；其余24只作作者线索筛查，不排除其全领域HSI价值。两个2019杂草书目同时列Farooq A/Awan AF，出版社正式登记仍三/四作者；别名关系有既有ORCID依据，页面重复机制未证实，不增加作者。CRF正式2018来源年与2019卷期、2017预印本按已有版本去重，未升级正文状态。

两太阳能板期刊接受稿共34页已下载，本次实际选读11页：TIP2024的GMS-ACT/GMS-BRIS原文明确RGB，补强旧仅题名排除；TGRS2026的AerialGDA2020与GloSoFarID实验明确RGB，后者原13带不能改称HSI。DualGMS段只明Google Static Maps来源，通道数保留缺口；该稿沿用范围排除，不称全部输入审计闭环。2026正文声明前序是无Jun的WHISPERS2023稿，不是2022 IGARSS未决稿，不能迁移数据/范围决定。两稿均不计整篇全文、不加入HSI框架图库；正式VoR仍未读。

HSIMamba固定arXiv2404.00272v1共11页已逐页全读，Fig1/Algorithm1两原图及全部36参考书目已整理；首页Griffith通讯作者互证身份。监督地物分类删除预训练错配，谱A/B与Δ处理按作者SSM启发定义记录，不认定标准Mamba实现或与SS non-Linear合并版本。三主表OA97.29/89.92/98.08%，窗口7/最佳5、正文/表格的κ、Pavia指标、126/160.98MB及161/170s冲突分别保留；主表聚合领先不等于全部类别或耗时最优。当前API仍v1，Crossref题名前5无对应正式版不能证明无正式发表。官方代码URL从PDF首页超链接取得，仅保存链接、未访问仓库。

NSP/KUM与Shearlet两早期稿新增仓库精确DOI/题名查询未返回目标原稿；旧ANU主页有效但所链Griffith/~junzhou地址404，SPIE200仍失败HTML。NSP/KUM已有机构原摘要及个人关联，单篇正式作者单位仍未得；Shearlet旧CV身份依据保留。此轮无新全文或身份确认，不升级阅读，也不称无其他公开版本，不反复追同一受限入口。

合成HSI数据集2309.00005v1实际仅一页，已完整阅读；采集规格、12对象/60角度与概念空间上采样/谱带补充已补现有目录，新增Fig1输入示例原图。原RGB“1200 megapixels”与图注行列措辞冲突保留；最终网格、标定配准、完整融合算法/定量实验留白。SfM只是潜在应用，未增加三维成员。简称无主题词查询989元数据已完整分页，六视觉/学习摘要范围暂排、一个ID已有旧531摘要决定，其余982只元数据；未据缩写核个人身份或宣称作者全集。指定带点全量503，不将两分类子集相同推定全量相等。

MAC-Net作者公开稿14页已完整阅读，新增Fig1整体框架与Fig3NAB原图；首页/履历及出版社ORCID互证Griffith身份，正式2022书目与作者页2021写法分别保留。Σ/D按观测估计、仅SDPM学习，五步单次流程不作迭代展开。四数据集、三噪声范围/blind、主表与消融已补；WDCM重噪声弱于FastHyDe，样本性能非单调、K部分指标并列，式7/NAB放置/σ疑点按稿保留。七作者HSI引文全部已录；未标AM/VoR，不替代未读正式版。TV-NTF作者页仍只链接旧IEEE，指定arXiv查询有效零返回不证明无公开版；保持摘要级，当前只用原摘要展示方法，移除旧代码实现细节/运行待办并保留历史证据。

## 下一步

1. 优先查漏并完成来源交叉核对：其余姓名变体及arXiv无谱词/其他拼写查询与reflectance宽词形机制边界、DBLP/Scholar/arXiv差集、两条来源外直接HSI的合格版本及共同作者CV候选；机构个人目录已完成本次387条快照，不反复拉取同一快照；区分已发表、预印本、在审线索，按书目与明确证据去重。
2. 继续核MerMED/医学综述正式候选及UEMM/AdvMIM正式版等候选；按实际可获取的摘要、正文和作者材料判断范围与身份。已核固定预印本的全文/选读范围决定与未读正式版分开；材料不足保留未决与访问限制，不反复追索付费正文。
3. 原31项机构PDF队列已完成；对其余摘要级及BABS、SiamBAG、BAE、DMT、TV/NTF、ISTA等资料不全条目检查免费PDF、框架图及公开版本；可获取则整理方法与实验，付费且无公开版本或确实无法获取才留白。Hy-Tracker等版本方法差异按各版实际证据注明。
4. 分别报告来源覆盖、未决候选和可获取但尚未整理的资料。可获取材料应继续整理，受限材料记录留白原因；性能复现不作为本阶段要求。

## 证据与归档

- [MAC-Net14页作者稿与TV摘要范围续核](sources/jun-zhou-mac-author-reading-tv-scope-2026-10-12.json)、[原始访问](sources/jun-zhou-mac-author-reading-tv-scope-2026-10-12-access.json)：公开稿全文/两原图，TV仍摘要；代码仅URL。
- [简称989元数据与一页合成HSI数据集](sources/jun-zhou-initial-query-synthetic-data-reading-2026-10-12.json)、[简称逐项索引](sources/jun-zhou-initial-query-synthetic-data-reading-2026-10-12-initial-index.json)：六分类摘要范围暂排，数据集固定v1全1页/一原数据示例图；不是989摘要全审。
- [早期访问缺口与HSIMamba v1全文](sources/jun-zhou-early-access-hsimamba-reading-2026-10-12.json)、[原始访问](sources/jun-zhou-early-access-hsimamba-reading-2026-10-12-access.json)、[论文官方代码超链接](sources/jun-zhou-early-access-hsimamba-reading-2026-10-12-pdf-links.json)：v1全11页/两原图，早期两稿身份与访问缺口保留，未访问代码。

- [Jia独立书目与两太阳能原稿范围续核](sources/jun-zhou-jia-bibliography-solar-scope-2026-10-12.json)、[17源项对照](sources/jun-zhou-jia-bibliography-solar-scope-2026-10-12-staff-crosswalk.json)、[ORCID差集25贡献者](sources/jun-zhou-jia-bibliography-solar-scope-2026-10-12-orcid-difference-decisions.json)、[原始访问](sources/jun-zhou-jia-bibliography-solar-scope-2026-10-12-access.json)：新版438书目有效覆盖，11/34页选读不记全文；两作者名单导出差异和2022会议未决分别保留。

- [SS non-Linear v2全文与两原图](sources/jun-zhou-name-query-ssnl-reading-2026-10-12.json)、[三个姓名/词项查询及集合边界](sources/jun-zhou-name-query-ssnl-reading-2026-10-12-query-checks.json)、[原始访问](sources/jun-zhou-name-query-ssnl-reading-2026-10-12-access.json)：17页全文、19条简称命中摘要筛查；大集合自动比较不当逐篇范围阅读。

- [异常精炼与反射估计全文及原31队列闭环](sources/jun-zhou-anomaly-reflectance-reading-2026-10-12.json)、[原稿与正式书目访问](sources/jun-zhou-anomaly-reflectance-reading-2026-10-12-access.json)：两稿37页全文、ANU3页选读、四新图及一换版；速度/误差与实际版本分别记录。

- [空间SR、人脸与图匹配三稿全文及版本边界](sources/jun-zhou-sr-face-matching-reading-2026-10-12.json)、[PDF与正式书目访问](sources/jun-zhou-sr-face-matching-reading-2026-10-12-access.json)：32页全文、五新原图及一高清替换；原稿作者/公式疑点与未读正式版分列。

- [跨场景与结构稀疏分类两AM全文及版本边界](sources/jun-zhou-sparse-domain-structural-reading-2026-10-12.json)、[PDF/书目/勘误机构访问](sources/jun-zhou-sparse-domain-structural-reading-2026-10-12-access.json)：45页全文、四原图，六处引用去重为五已录；正式勘误图版与当前AM不混同。

- [三早期分类稿全文、原图及书目补正](sources/jun-zhou-early-feature-classification-reading-2026-10-12.json)、[PDF与正式DOI访问](sources/jun-zhou-early-feature-classification-reading-2026-10-12-access.json)：29页全文、五原图，两个引用已录；来源规范、实际版本和数据协议分别记录。

- [CRF两接受稿全文、原图与版本边界](sources/jun-zhou-crf-segmentation-reading-2026-10-12.json)、[实际PDF/书目访问](sources/jun-zhou-crf-segmentation-reading-2026-10-12-access.json)：22页全文、四原图；期刊题名差异与会刊扩展未证实分别记录，Crossref429未冒充成功。

- [细胞与杂草应用全文、原图及引用身份](sources/jun-zhou-cells-weed-applications-reading-2026-10-12.json)、[原始访问记录](sources/jun-zhou-cells-weed-applications-reading-2026-10-12-access.json)：22页全文、五原图、五作者引文已录；一引用确认为Jie Zhou而非目标作者，未读取其正文。

- [ICV与MFSuDF经典融合全文及引文查漏](sources/jun-zhou-classical-hsi-lidar-fusion-reading-2026-10-12.json)、[原始访问记录](sources/jun-zhou-classical-hsi-lidar-fusion-reading-2026-10-12-access.json)：33页全文、五原图、两作者引文已录；ICV为VoR，MFSuDF为AM，作者和全领域目录仍未闭环。

- [FSHyperRGAN与S³ARN分类全文及引文查漏](sources/jun-zhou-relgan-split-classification-reading-2026-10-12.json)、[原始访问记录](sources/jun-zhou-relgan-split-classification-reading-2026-10-12-access.json)：两稿30页全文、五原图、四条作者引文已录；HSIGene仅官方摘要及固定v2下载，正文待读，不计新全文。

- [两种模型去噪全文、原图及原始数据范围证据](sources/jun-zhou-model-denoisers-dataset-scope-2026-10-12.json)、[原始访问记录](sources/jun-zhou-model-denoisers-dataset-scope-2026-10-12-access.json)：两机构稿18页全文、SMDS v2十二页对应、三原图；范围外11页选读，WHU波段缺口与三未决的出版社身份/非OA/无PDF边界分别保留。

- [共同作者书目与SSUMamba/SSRT全文版本核验](sources/jun-zhou-denoising-versions-coauthor-2026-10-11.json)、[原始访问记录](sources/jun-zhou-denoising-versions-coauthor-2026-10-11-access.json)：43条书目对照、28页AM实际全文、26页预印本正文对应与六原图；在审/无题名线索和Jiantao身份边界分别保留。

- [甘蔗DSAB与抗病评级三稿全文](sources/jun-zhou-sugarcane-dsab-mosaic-reading-2026-10-11.json)、[PDF及正式版本查询访问](sources/jun-zhou-sugarcane-dsab-mosaic-reading-2026-10-11-access.json)：29页全文、三原图；2021/2023/2024方法关联，2025实际七级抗病性任务。指定Crossref前5无对应正式版，不证明无其他版本；UEMM两原摘要、九作者及改序续核，正式范围仍待。

- [UBSTrack接受稿全文与两正式候选访问](sources/jun-zhou-ubstrack-reading-pending-access-2026-10-11.json)、[原始访问记录](sources/jun-zhou-ubstrack-reading-pending-access-2026-10-11-access.json)：17页AM、三原图、10项引文去重；两个IEEE页面空响应，范围仍待。

- [FAT/SA-Net范围交叉与MFTNet正式版整理](sources/jun-zhou-fat-sanet-scope-mftnet-reading-2026-10-11.json)、[原始访问记录](sources/jun-zhou-fat-sanet-scope-mftnet-reading-2026-10-11-access.json)：两项范围暂排、20页VoR全文、三原图；数据原稿仅选读3页，代码仅链接。

- [SSIT正式版全文、原图与两编辑记录访问续核](sources/jun-zhou-ssit-reading-editorial-access-2026-10-11.json)、[原始访问记录](sources/jun-zhou-ssit-reading-editorial-access-2026-10-11-access.json)：15页VoR全读、1原图、四引文去重；两编辑范围仍待，代码仅链接。

- [来源查漏及交叉决定](sources/jun-zhou-author-corpus-followup-2026-10-10.json)、[ORCID目录](sources/jun-zhou-orcid-inventory.json)、[DBLP范围决定](sources/jun-zhou-dblp-remaining-scope-decisions-2026-10-10.json)、[Scholar差集](sources/jun-zhou-scholar-nonkeyword-screening-2026-10-10.json)。
- [机构个人全目录交叉核对](sources/jun-zhou-griffith-profile-2026-10-11.json)、[公开API与材料访问](sources/jun-zhou-griffith-profile-2026-10-11-access.json)：387条原响应、请求参数、哈希及逐项决定。
- [CV候选、SUIT全文及接受稿资料](sources/jun-zhou-coauthor-suit-materials-2026-10-11.json)、[访问记录](sources/jun-zhou-coauthor-suit-materials-2026-10-11-access.json)：PDF原文、哈希、页级提取与实际读页分别记录。
- [医学原型/FedDA接受稿全文及引用去重](sources/jun-zhou-medical-fedda-reading-2026-10-11.json)、[引用查询响应](sources/jun-zhou-medical-fedda-reading-2026-10-11-access.json)：34页全文、3张原图、主协议与疑点，原下载及局部阅读快照保留。
- [倒序姓名/扩展谱词与ADLKAN全文](sources/jun-zhou-name-order-adlkan-reading-2026-10-11.json)、[原始响应及PDF访问](sources/jun-zhou-name-order-adlkan-reading-2026-10-11-access.json)：姓名匹配语义边界、5项摘要范围决定、19页AM和4原图。
- [单词查询并集与两份范围外原稿全文](sources/jun-zhou-query-semantics-scope-reading-2026-10-11.json)、[原始响应与PDF访问](sources/jun-zhou-query-semantics-scope-reading-2026-10-11-access.json)：1891集合完全一致、固定v3/v1共23页已读；正式版仍待，不升级库内阅读数量。
- [RADC/VITask全文与UltraVR四域范围续核](sources/jun-zhou-radc-vitask-ultravr-scope-reading-2026-10-11.json)、[PDF及数据官方来源访问](sources/jun-zhou-radc-vitask-ultravr-scope-reading-2026-10-11-access.json)：两全文22页、UltraVR选读21/70页；三个固定版范围处理，不等于身份/正式版或性能复现。
- [医学三固定v1范围选读续核](sources/jun-zhou-medical-fixed-scope-reading-2026-10-11.json)、[PDF访问](sources/jun-zhou-medical-fixed-scope-reading-2026-10-11-access.json)：135页下载、52页实际选读，三固定稿暂排；完整实验/研究汇总表不等于全部引用或正式版已读。
- [DDFNet机构摘要与三官方基准范围交叉](sources/jun-zhou-ddfnet-official-dataset-scope-2026-10-11.json)、[官方页面/PDF访问](sources/jun-zhou-ddfnet-official-dataset-scope-2026-10-11-access.json)：正式DOI范围暂排，未冒充全文或实际像素；ISPRS新旧路径与GitHub发现边界保留。
- [姓名变体核对](sources/jun-zhou-arxiv-name-variants-2026-10-11.json)、[weed mapping身份归并](sources/jun-zhou-weed-author-identity-2026-10-11.json)、[融合/选带全文核验](sources/jun-zhou-fusion-band-order-reading-2026-10-11.json)。
- [arXiv逐项映射](sources/jun-zhou-arxiv-survey-mapping-index-2026-10-11.json)；其余原文、代码README、响应、哈希和逐页审计统一保留在 `sources/jun-zhou-*`，不改写冻结证据。
- [历史调研记录](archive/jun-zhou/research-log.md)：逐批范围决定、版本差异、公式与实验审计。批次中的数量属于当时状态，不用于判断当前完成度。
- [学习资料归档](archive/jun-zhou/learning-notes.md)：合并原阅读路线和7份专题笔记，仅供学习参考，不继续维护重复目录或调研进度。
- `reproduction/`：独立公式、约束和checkpoint检查脚本；不是完整论文复现。

后续只更新本入口的当前状态和待办；新增论文事实进入目录，核验证据进入 `sources/` 与 `survey.json`。全领域场所矩阵见 [coverage.md](coverage.md)，作者来源筛查完成不等于全领域覆盖完成。
