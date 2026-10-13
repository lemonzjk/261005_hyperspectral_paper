# 项目上下文

更新：2026-10-13。

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

- 总库630，617分类确认（审计601）、13暂定；190标签（任务79/方法98/应用13）。三维126，数据资源2，原图478。
- 来源白名单388/arXiv141/作者例外101；出版来源69种，11主要任务组、细标签搜索、多标签并集，URL恢复及SVG/BibTeX导出。
- 来源范围、阅读深度、资料状态独立；PDF链接不表示已读，原图阻拦不表示全文付费。桌面/手机筛选与详情已核；dev可上传/替换≤10MB，FVMGN补图待核。
- CVPR/ICCV/NeurIPS/ICML等指定查询有闭环，非全领域完成；矩阵只白名单，见coverage.md。

## 关键文件与下一步

- src/data/catalog.json事实/分类/图；collection-policy.json来源与保护ID；library-groups.ts导航；materials.ts资料状态。
- research/hyperspectral/含survey、sources、coverage、catalog-cleanup及classification-audit；legacy-topic-baseline保留旧专题事实。public/figures与research/figures.json原图续接；figures.py维护队列。
- 作者先查漏，不增笔记。Jun确认182（81普通口径/101例外，103历史实际全文/79摘要），网页183含IF身份未核；ORCID3、DBLP12、Scholar10未决。Griffith387源项中176匹配169目录ID、12未决，另3直接HSI来源外待合格版本。jun-zhou.md统一待办。
- 旧186继承排除已有处置：179声明范围排除、5重开、1补录PR导读、1书籍容器，非作者全集。目标ORCID120注册77目录/39排除/4待核不变。
- 最新作者差集：两医学稿原摘要/必要方法核为全部RGB持续分类、转录组与病理WSI免疫预测，按声明范围排除；Jun单篇单位A*STAR/上海同仁医院不判异人。ASTER矿物稿原页HTTP200挑战，无摘要/实际输入，范围/身份/来源待。种子综述直接HSI但Jun个人身份/来源待；在轨稿型号/谱带未明，两条仍候选不计Jun182。
- 最新领域：既有引文/综述候选补CVPR2011自然HSI统计、TGRS2015 MVSA、arXiv2015全色融合综述三篇；仅MVSA主算法/综述整体比较流程各一图，统计稿无框架。31带420–720nm真实HSI已核，Jun Li不混Jun Zhou。旧文档增强正式2011非引文2012；选带可视化原摘要仅generic spectral、HAL挑战，实际输入待，另三题名Crossref429。至2013指定76现66入/5排/5待；2014指定41现38工作/1早期版本/2排/0待，非年度全集。2015官方查询429未得目录，不记零匹配；其他年/白名单、ECCV六范围及作者继续。
- Mamba-UNet、海洋塑料、跨域皮肤、谱成像编辑、多视图编辑未决；SOC两个SSRN版本已对账但仍无合格来源，HVOT、三分割输入、IF身份、Phase署名仍待。OpenAlex混并389未映射/84survey关联，6译题仅引用关联；其他姓名与共同作者候选、历年矩阵仍待，不称全量完成。
