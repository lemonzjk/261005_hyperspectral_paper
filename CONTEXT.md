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

- 总库598，585分类确认（审计569）、13暂定；190标签（任务79/方法98/应用13）。三维126，数据资源2，原图466。
- 来源白名单376/arXiv121/作者例外101；出版来源69种，11主要任务组、细标签搜索、多标签并集，URL恢复及SVG/BibTeX导出。
- 来源范围、阅读深度、资料状态独立；PDF链接不表示已读，原图阻拦不表示全文付费。桌面/手机筛选与详情已核；dev可上传/替换≤10MB，FVMGN补图待核。
- CVPR/ICCV/NeurIPS/ICML等指定查询有闭环，非全领域完成；矩阵只白名单，见coverage.md。

## 关键文件与下一步

- src/data/catalog.json事实/分类/图；collection-policy.json来源与保护ID；library-groups.ts导航；materials.ts资料状态。
- research/hyperspectral/含survey、sources、coverage、catalog-cleanup及classification-audit；legacy-topic-baseline保留旧专题事实。public/figures与research/figures.json原图续接；figures.py维护队列。
- 作者先查漏，不增笔记。Jun确认182（81普通口径/101例外，103历史实际全文/79摘要），网页183含IF身份未核；ORCID3、DBLP12、Scholar10未决。Griffith387源项中176匹配169目录ID、12未决，另3直接HSI来源外待合格版本。jun-zhou.md统一待办。
- 旧186继承排除已有处置：179声明范围排除、5重开、1补录PR导读、1书籍容器，非作者全集。目标ORCID120注册77目录/39排除/4待核不变。
- 最新作者差集：种子综述原XML有实质HSI内容；Jun单位浙大/新疆农大。在轨稿Jun注册单位Shanghai Institute of Satellite Engineering，二级FY-3仪器型号/谱带未明。单位不判异人；两来源外、原始个人身份待，指定arXiv零匹配不证无版本。两条单列候选，不计Jun确认182。
- 最新领域：arXiv2014指定41/41书目，前10各一版必要选读入库（3白名单/7arXiv），仅MARTE Fig2一主光学系统；余9无框架。Urban NMF实际HSI解混、HyMap126带/0.45–2.5微米、编码224/1501通道已核；API单位/姓名倒序/PDF题名差异保留。后31摘要未读，1已录/4旧来源排除工作有arXiv重开/26新候选待；查询现11入/30待，非年度全集。早期—2013指定76现64入/5排/7待、ECCV六范围及作者未决继续。SADL正式撤除标记保留。
- Mamba-UNet、海洋塑料、跨域皮肤、谱成像编辑、多视图编辑未决；SOC两个SSRN版本已对账但仍无合格来源，HVOT、三分割输入、IF身份、Phase署名仍待。OpenAlex混并392未映射/81survey关联，6译题仅引用关联；其他姓名与共同作者候选、历年矩阵仍待，不称全量完成。
