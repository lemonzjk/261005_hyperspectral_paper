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

- 总库684，671分类确认（审计655）、13暂定；192标签（任务81/方法98/应用13）。三维126，数据资源2，原图495。
- 来源白名单405/arXiv178/作者例外101；出版来源69种，11主要任务组、细标签搜索、多标签并集，URL恢复及SVG/BibTeX导出。
- 来源范围、阅读深度、资料状态独立；PDF链接不表示已读，原图阻拦不表示全文付费。桌面/手机筛选与详情已核；dev可上传/替换≤10MB，FVMGN补图待核。
- CVPR/ICCV/NeurIPS/ICML等指定查询有闭环，非全领域完成；矩阵只白名单，见coverage.md。

## 关键文件与下一步

- src/data/catalog.json事实/分类/图；collection-policy.json来源与保护ID；library-groups.ts导航；materials.ts资料状态。
- research/hyperspectral/含survey、sources、coverage、catalog-cleanup及classification-audit；legacy-topic-baseline保留旧专题事实。public/figures与research/figures.json原图续接；figures.py维护队列。
- 作者先查漏，不增笔记。Jun确认182（81普通口径/101例外，103历史实际全文/79摘要），网页183含IF身份未核；ORCID3、DBLP12、Scholar10未决。Griffith387源项中176匹配169目录ID、12未决，另3直接HSI来源外待合格版本。jun-zhou.md统一待办。
- 旧186继承排除已有处置：179声明范围排除、5重开、1补录PR导读、1书籍容器，非作者全集。目标ORCID120注册77目录/39排除/4待核不变。
- 最新作者差集：无线电频谱地图稿原PDF明确MHz/天线/接收强度，细胞sensing spectrum稿原PubMed为维生素B12电化学检测，均范围排除；Jun原单位上海卫星工程/南京工业只记证据不判异人。两旧医学范围排除保留。ASTER矿物原页挑战无实际输入、种子HSI综述Jun身份/来源、在轨稿型号/谱带仍待，不计Jun182。
- 最新领域：2016指定61书目前10新增10（TIP/TGRS三白名单、七arXiv），NHMC训练/测试与Matsu批处理各一主图，余无框架；Urban复原/IASI8461通道/61带区域划分确认直接HSI。Matsu PDF/正式14作者含John Xia、API13原串保留；JSTSP2015及BigDataService/Icarus/SPIE仅元数据。61现11入/50待，后51摘要未新读，既有Jun仅映射；三旧来源外工作四候选有arXiv重开。2015指定50为44入/3排/3已读未决：MLNMF/AMP关系、SPA范围；至2013指定76为66入/5排/5待、2014指定41为38工作/1版本/2排。均非年度全集；其他词/年/白名单、ECCV六范围及作者继续。
- Mamba-UNet、海洋塑料、跨域皮肤、谱成像编辑、多视图编辑未决；SOC/HVOT新题名前五仅匹配SSRN，仍待合格来源；三分割输入、IF身份、Phase署名仍待。OpenAlex混并387未映射/86survey关联，6译题仅引用关联；其他姓名与共同作者候选、历年矩阵仍待，不称全量完成。
