# 项目上下文

更新：2026-10-14。

## 目标与约定

- HS3D Atlas三维专题与高光谱总库，覆盖采集、成像、重建、处理、学习及应用；按场所/年份矩阵查漏，不以数量结束。
- 仅本地预览，不推送、不发布；caveman full、中文简洁；检查后本地提交。
- 普通总库仅直接高光谱、顶会顶刊白名单或arXiv；纯多光谱/泛关联不收录。周峻既有181条直接HSI保留，作者例外仅放宽来源，保护ID不扩张；7条旧多光谱已删除。
- 每篇一个可用版本、一张主要原框架图；只读身份/HSI范围和定位图必要内容，不逐页/逐版读或深挖性能。无图/不可获取可留白，目录与图待办分开；官方代码仅链接，不访问检查。

## 运行与检查

- React19、TypeScript、Vite7；Node22.12+。
- npm run dev -- --port 5173，远程需转发。
- 数据/上下文：npm run validate；网站：npm run build；交互：浏览器检查。原图队列倒序。

## 当前状态

- 总库903，890分类确认（审计874）、13暂定；203标签（任务92/方法98/应用13）。三维135，数据资源2，原图601。
- 来源白名单456/arXiv346/作者例外101；出版来源69种，11任务组、细标签搜索、多标签并集，URL恢复及SVG/BibTeX导出。
- 来源范围、阅读深度、资料状态独立；PDF链接不表示已读，原图阻拦不表示全文付费。桌面/手机筛选与详情已核；dev可上传/替换≤10MB，FVMGN补图待核。
- CVPR/ICCV/NeurIPS/ICML等指定查询有闭环，非全领域完成；矩阵只白名单，见coverage.md。

## 关键文件与下一步

- src/data/catalog.json事实/分类/图；collection-policy.json来源与保护ID；library-groups.ts导航；materials.ts资料状态。
- research/hyperspectral/含survey、sources、coverage、catalog-cleanup及classification-audit；legacy-topic-baseline保留旧事实；catalog-cleanup登记新三维成员。public/figures与research/figures.json原图续接；figures.py维护队列。
- 作者先查漏，不增笔记。Jun确认182（81普通口径/101例外，103历史实际全文/79摘要），网页183含IF身份未核；ORCID3、DBLP12、Scholar10未决。Griffith387源项中176匹配169目录ID、12未决，另3直接HSI来源外待合格版本。jun-zhou.md统一待办。
- 作者差集：ASTER原注册五人/第二Jun、无单位/ORCID/摘要；二级Jun Wei不判身份，范围/身份/来源待。两ETM+按MS排，电影人脸/光流检测按原摘要排；Event-RGB/去块注册无摘要，输入/身份待。番茄/流场、shape/traffic、去雨/测井、种子/在轨谱带待；单位不转移IF。
- 最新领域：2018指定114已处理（107原摘要/七旧书目），103关联/5排/6范围关系待，非年度全集。本批10新/7主图，3TGRS/7arXiv；三旧复用，EELS范围待。DSFA/HEG实际HSI与MS分列；CoSpace训练直接处理HSI、测试MSI类别，不当HSI重建；六正式来源外仅书目。Ladder附RG定位注册404不作正式版。EELS、MALDI质荷比、组织24通道、PLS点谱、Bayes/Rank-1仍待；无框架留白。2017指定93为84关联/7排/2待；2016指定61为54入/6排/1待；2015指定50为44入/3排/3待；至2013指定76为66入/5排/5待、2014指定41为38工作/1版本/2排。其他词/年/场所及作者继续。
- 作者遗留：Mamba、皮肤、海洋塑料及谱成像/多视图编辑的范围或合格版待；SOC/HVOT仅SSRN，有限arXiv/注册查询没有合格对应，不能证明无公开版。FDNet/GPINet/SAPNet实际输入、IF身份、Phase署名待；TraNCE原ILSVRC非HSI/Griffith署名已核，不能代替Axiomatization异题候选。简称989原索引现142摘要排/109题名主题排/1继承/737元数据；粒子题名暂排，不确认身份。OpenAlex混并367未映射/106survey关联、6译题仅引用关联；其他作者/历年仍待。
