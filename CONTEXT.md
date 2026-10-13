# 项目上下文

更新：2026-10-14。

## 目标与约定

- HS3D Atlas三维专题与高光谱总库，覆盖采集、成像、重建、处理、学习及应用；按场所/年份矩阵查漏，不以数量结束。
- 仅本地预览，不推送、不发布；caveman full、中文简洁；检查后本地提交。
- 普通总库仅直接高光谱、顶会顶刊白名单或arXiv；纯多光谱/泛关联不收录。周峻既有181条直接HSI保留，作者例外仅放宽来源，保护ID不扩张；7条旧多光谱已删除。
- 每篇一个可用版本、一张主要原框架图；只读确认身份/HSI范围和定位图必要内容，不逐页/逐版读或深挖性能。无图/不可获取可留白，目录与图待办分开；官方代码仅链接，不访问检查。

## 运行与检查

- React19、TypeScript、Vite7；Node22.12+。
- npm run dev -- --port 5173，远程需转发。
- 数据/上下文：npm run validate；网站：npm run build；交互：浏览器检查。原图队列倒序。

## 当前状态

- 总库841，828分类确认（审计812）、13暂定；201标签（任务90/方法98/应用13）。三维133，数据资源2，原图568。
- 来源白名单436/arXiv304/作者例外101；出版来源69种，11主要任务组、细标签搜索、多标签并集，URL恢复及SVG/BibTeX导出。
- 来源范围、阅读深度、资料状态独立；PDF链接不表示已读，原图阻拦不表示全文付费。桌面/手机筛选与详情已核；dev可上传/替换≤10MB，FVMGN补图待核。
- CVPR/ICCV/NeurIPS/ICML等指定查询有闭环，非全领域完成；矩阵只白名单，见coverage.md。

## 关键文件与下一步

- src/data/catalog.json事实/分类/图；collection-policy.json来源与保护ID；library-groups.ts导航；materials.ts资料状态。
- research/hyperspectral/含survey、sources、coverage、catalog-cleanup及classification-audit；legacy-topic-baseline保留旧事实；catalog-cleanup登记新三维成员。public/figures与research/figures.json原图续接；figures.py维护队列。
- 作者先查漏，不增笔记。Jun确认182（81普通口径/101例外，103历史实际全文/79摘要），网页183含IF身份未核；ORCID3、DBLP12、Scholar10未决。Griffith387源项中176匹配169目录ID、12未决，另3直接HSI来源外待合格版本。jun-zhou.md统一待办。
- 作者差集：ASTER原注册五作者/第二Jun，无单位/ORCID/摘要；OpenAlex无摘要，二级Jun Wei不判身份；范围/身份/来源待。两ETM+矿产按MS排、历史电影人脸识别按原摘要排；Event-RGB注册无摘要/身份待；番茄/流场、shape/traffic、去雨/测井、种子/在轨谱带待，单篇单位不转移IF。
- 最新领域：2018指定114前40条处置（39摘要/一旧书目），41关联/2排/71待；本批8新（一TGRS/七arXiv）、4主图。TSP源外/NIPS模板非主会证据。组织24通道HSI/MSI范围/版本、Bayes/Rank-1关系待；EarthMapper代码仅链接。后74未新读/六旧书目，城市GMM/HSI-CNN正式关系待。2017指定93为84关联/7排/2待；2016指定61为54入/6排/1待；2015指定50为44入/3排/3待；至2013指定76为66入/5排/5待、2014指定41为38工作/1版本/2排。其他词/年/白名单、ECCV六范围及作者继续，非年度全集。
- Mamba-UNet机构仅许可，题名/第一作者限定arXiv均0，范围/合格版待；谱成像/多视图编辑未决；皮肤题名/第一作者限定arXiv均0，不证明无公开版；海洋塑料指定arXiv词查询1异经济稿，不关联/不证明无公开版；范围/版本待；SOC第一作者限定arXiv一项仅旧HyperVision，不作为版本；HVOT第一作者arXiv三异稿无对应；SOC/HVOT仍待合格来源；三分割指定arXiv查询0/0/1异光场稿，不关联；输入、IF身份、Phase署名仍待。OpenAlex混并369未映射/104survey关联，6译题仅引用关联；其他姓名与共同作者候选、历年矩阵仍待，不称全量完成。
