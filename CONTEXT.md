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

- 总库805，792分类确认（审计776）、13暂定；201标签（任务90/方法98/应用13）。三维133，数据资源2，原图548。
- 来源白名单431/arXiv273/作者例外101；出版来源69种，11主要任务组、细标签搜索、多标签并集，URL恢复及SVG/BibTeX导出。
- 来源范围、阅读深度、资料状态独立；PDF链接不表示已读，原图阻拦不表示全文付费。桌面/手机筛选与详情已核；dev可上传/替换≤10MB，FVMGN补图待核。
- CVPR/ICCV/NeurIPS/ICML等指定查询有闭环，非全领域完成；矩阵只白名单，见coverage.md。

## 关键文件与下一步

- src/data/catalog.json事实/分类/图；collection-policy.json来源与保护ID；library-groups.ts导航；materials.ts资料状态。
- research/hyperspectral/含survey、sources、coverage、catalog-cleanup及classification-audit；legacy-topic-baseline保留旧事实；catalog-cleanup登记新三维成员。public/figures与research/figures.json原图续接；figures.py维护队列。
- 作者先查漏，不增笔记。Jun确认182（81普通口径/101例外，103历史实际全文/79摘要），网页183含IF身份未核；ORCID3、DBLP12、Scholar10未决。Griffith387源项中176匹配169目录ID、12未决，另3直接HSI来源外待合格版本。jun-zhou.md统一待办。
- 最新作者差集：两矿产完整OpenAlex索引摘要明确ETM+，USGS确认MS，范围排/身份仍未核；原IEEE202空/SPIE挑战不当原摘要或付费。番茄/流场、shape/traffic、去雨/测井、ASTER/种子/在轨谱带待，单篇单位不转移IF。
- 最新领域：2017第九十项新增10（两TGRS/PR、八arXiv）、四主图；两文档1040带400–1000nm实际HSI，草图四带合并258/PCA五维输出不改范围，新增材料层分离任务。MUSE3600带取60实际异常；定点Jacobi实际HSI协方差，不查代码/硬件。无人机270带赋谱独立摄影测量点云新增三维相关，非HSI几何恢复；地面240带按稿保留。MUA API Tech Report前缀由明确DOI关联GRSL元数据，其他来源外仅书目。93现82关联/7排/4待，前90书目（87摘要/三既有），两范围待，后三条未新读；非年度全集。2016指定61为54入/6排/1DSDP待；2015指定50为44入/3排/3待；至2013指定76为66入/5排/5待、2014指定41为38工作/1版本/2排。其他词/年/白名单、ECCV六范围及作者继续。
- Mamba-UNet机构仅许可，题名/第一作者限定arXiv均0，范围/合格版待；谱成像/多视图编辑未决；皮肤指定arXiv题名词查询0，不证明无公开版；海洋塑料指定arXiv词查询1异经济稿，不关联/不证明无公开版；范围/版本待；SOC/HVOT新题名前五仅匹配SSRN，仍待合格来源；三分割指定arXiv查询0/0/1异光场稿，不关联；输入、IF身份、Phase署名仍待。OpenAlex混并371未映射/102survey关联，6译题仅引用关联；其他姓名与共同作者候选、历年矩阵仍待，不称全量完成。
