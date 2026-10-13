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

- 总库522，509分类确认（审计493）、13暂定；185标签（任务74/方法98/应用13）。三维126，数据资源2，原图450。
- 来源白名单365/arXiv56/作者例外101；出版来源69种，11主要任务组、细标签搜索、多标签并集，URL恢复及SVG/BibTeX导出。
- 来源范围、阅读深度、资料状态独立；PDF链接不表示已读，原图阻拦不表示全文付费。桌面/手机筛选与详情已核；dev可上传/替换≤10MB，FVMGN补图待核。
- CVPR/ICCV/NeurIPS/ICML等指定查询有闭环，非全领域完成；矩阵只白名单，见coverage.md。

## 关键文件与下一步

- src/data/catalog.json事实/分类/图；collection-policy.json来源与保护ID；library-groups.ts导航；materials.ts资料状态。
- research/hyperspectral/含survey、sources、coverage、catalog-cleanup及classification-audit；legacy-topic-baseline保留旧专题事实。public/figures与research/figures.json原图续接；figures.py维护队列。
- 作者先查漏，不增笔记。Jun确认182（81普通口径/101例外，103历史实际全文/79摘要），网页183含IF身份未核；ORCID3、DBLP12、Scholar10未决。Griffith387源项中176匹配169目录ID、12未决，另3直接HSI来源外待合格版本。jun-zhou.md统一待办。
- 旧186继承排除已有处置：179声明范围排除、5重开、1补录PR导读、1书籍容器，非作者全集。目标ORCID120注册77目录/39排除/4待核不变。
- 最新：三个已有公开稿候选入库，各只读首页/主图页、各一主框架。HSIGene关联TPAMI2026正式书目，图用arXiv v2；双相机物理重建与JMPT变化检测按arXiv收录，无Jun。ECCV2002—2008取得852登记题名，2002/2006非全量证明，6反射率/去马赛克候选未决；ECCV2014/2016六篇主图待补。简称989快照142摘要/79物理题名暂排/1继承、767仅元数据，不确认身份/全集；Huanfa过滤漏已知IF，四CV候选仍待；受限图入口不重复追。
- Mamba-UNet、海洋塑料、跨域皮肤、谱成像编辑、多视图编辑未决；SOC两个SSRN版本已对账但仍无合格来源，HVOT、三分割输入、IF身份、Phase署名仍待。OpenAlex混并394未映射，6译题仅引用关联；其他姓名与共同作者候选、历年矩阵仍待，不称全量完成。
