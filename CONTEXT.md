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

- 总库736，723分类确认（审计707）、13暂定；195标签（任务84/方法98/应用13）。三维129，数据资源2，原图517。
- 来源白名单414/arXiv221/作者例外101；出版来源69种，11主要任务组、细标签搜索、多标签并集，URL恢复及SVG/BibTeX导出。
- 来源范围、阅读深度、资料状态独立；PDF链接不表示已读，原图阻拦不表示全文付费。桌面/手机筛选与详情已核；dev可上传/替换≤10MB，FVMGN补图待核。
- CVPR/ICCV/NeurIPS/ICML等指定查询有闭环，非全领域完成；矩阵只白名单，见coverage.md。

## 关键文件与下一步

- src/data/catalog.json事实/分类/图；collection-policy.json来源与保护ID；library-groups.ts导航；materials.ts资料状态。
- research/hyperspectral/含survey、sources、coverage、catalog-cleanup及classification-audit；legacy-topic-baseline保留旧事实；catalog-cleanup登记新三维成员。public/figures与research/figures.json原图续接；figures.py维护队列。
- 作者先查漏，不增笔记。Jun确认182（81普通口径/101例外，103历史实际全文/79摘要），网页183含IF身份未核；ORCID3、DBLP12、Scholar10未决。Griffith387源项中176匹配169目录ID、12未决，另3直接HSI来源外待合格版本。jun-zhou.md统一待办。
- 旧186继承排除已有处置：179声明范围排除、5重开、1补录PR导读、1书籍容器，非作者全集。目标ORCID120注册77目录/39排除/4待核不变。
- 最新作者差集：放疗剂量/环境网格产量原摘要输入按范围排；胎儿监护范围排、医院管理原挑战待。测井Jun为CNPC但摘要/PDF未得，输入/身份待，不向IF转移单位；ASTER、种子综述身份/来源、在轨谱带待。
- 最新领域：2017指定93书目前10新增9（NHMC-ED/TGRS一白名单、八arXiv），六完整主图；MCRC融合361连续带与完整3D点云，新增三维实例分割。Orion84–116GHz/200kHz立方体的12派生线特征属HSI；古抄本仅365nm对照、全输入不明留候选。PSS/A&A/TSP/GRSL/TCYB只书目；MI-HE题名429不猜版本。93现13入/80待，四既有仅映射，后83摘要未新读，VIS-NIR SMOTE来源定位重开但范围待；非年度全集。2016指定61为54入/6排/1DSDP未决；2015指定50为44入/3排/3未决（MLNMF/AMP关系、SPA范围）；至2013指定76为66入/5排/5待、2014指定41为38工作/1版本/2排。其他词/年/白名单、ECCV六范围及作者继续。
- Mamba-UNet新Griffith442449仅两许可文本无可见PDF，范围/合格版待；谱成像/多视图编辑未决；皮肤指定arXiv题名词查询0，不证明无公开版；海洋塑料索引无PDF直链，两范围/版本待；SOC/HVOT新题名前五仅匹配SSRN，仍待合格来源；三分割输入、IF身份、Phase署名仍待。OpenAlex混并381未映射/92survey关联，6译题仅引用关联；其他姓名与共同作者候选、历年矩阵仍待，不称全量完成。
