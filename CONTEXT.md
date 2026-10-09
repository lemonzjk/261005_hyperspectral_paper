# 项目上下文

更新：2026-10-10。

## 目标与约定

- HS3D Atlas 三维专题与独立高光谱总库。总库覆盖整个光学高光谱领域，含二维成像、处理、学习及应用；按覆盖矩阵推进，不以数量结束。
- 仅本地预览，不推送、不发布；检查通过后提交。caveman full、中文简洁；代码/文档正常表达。
- 两页共享时间轴、卡片、筛选、详情及CSS；三维13方向与范围不变。

## 运行与检查

- React 19、TypeScript、Vite 7；Node.js 22.12+。
- npm run dev -- --port 5173；远程需转发。
- 数据/上下文：npm run validate；网站：npm run build；交互：浏览器检查。
- 构建JS约4.5MB（gzip约0.92MB），有体积警告。

## 当前状态

- 总库748篇，391篇分类确认（审计335篇）、338篇暂定、19篇待分类，301标签（任务97/方法181/应用23）。三维214篇；状态一致性审计；总库?collection=hyperspectral。
- 作者筛选支持片段补全及URL恢复；搜索/作者筛选的完整姓名须匹配同一作者。总库标签多选并集；两页隐藏零计数侧栏，共享原图及SVG/BibTeX导出。分类逐篇留证；高光谱618、多光谱96、基础34。
- CVPR2013–2022/ICCV2013–2021奇数年主题闭环，非年度全量。
- NeurIPS2019–2023指定五词题名/摘要扫描闭环，非全领域年度完成；T3SC/DAUHST直接HSI，SatMAE/ARFNet多光谱、DiSC基础关系单列。Hyper-Skin330/306与版本差异待查。
- TPAMI视频/湿度2候选待扩展声明。u²-MDN证实扩展uSDN；正式2022、预印本2019–2021分开，归原方法族；原图v5。
- ICML2013–2024主卷扫描闭环；TGRS1994有3受限候选，年度待查；细节见coverage.md。
- RSE2001/2002登记题名与任务词已扫；受限候选、误差单位、全文/原图和出版社全量待查，详见coverage.md。
- OL2007–2010登记成像及系统/重建词已扫；后者11命中增4重1排4待2。Mueller2007关联2013勘误；Dyson两设计波长非两观测通道。原图受限，非出版社年度全量。
- TCI2015–2019登记41/63/102/75/69DOI，关键词增17排14待4。2019官方51研究中34已审17待核；5医学仅摘要片段，非年度全量。日期、DOI、真值及资源差异见coverage.md。
- dev详情上传/替换原图≤10MB，待核验、保留历史；FVMGN用户补图待核验。原图续接清单覆盖748篇、329张图。

## 关键文件与下一步

- src/data/catalog.json：事实、分类、原图；src/library.ts 筛选/排序；HyperspectralLibrary.tsx 总库；App.tsx 三维；classification-audit.json 分类审计。
- research/hyperspectral/：survey.json、sources、coverage.md、迁移快照；discover.py 会议目录、crossref-inventory.py 登记、pmlr-inventory.py 全量摘要、coverage.py 覆盖表。三维旧二维排除规则不继承。
- public/figures/<paper-id>/ 原图；research/figures.json 续接；figures.py init/queue/add/attempt；PDF为Git二进制。
- 作者优先：263组ORCID书目均已有范围决定（128入、10关联既有、125排、0待）；周峻高光谱待核尾项已清；全文状态已对齐。Scholar387条，题名差集新增41条（41条公开核验）；ORCID/Scholar摘要补充：2022年20条、2023年8条、2024年14条、2025年12条，Jun Zhou 2026条目5条；DBLP SPARQL精确作者364条，关键词差集2条摘要预印本、1条CEUR全文身份核验；网页导出仍是验证页。详见jun-zhou.md、inventory、sources。
- GRSL2015光谱66已审33待33；WHISPERS2014目录174为165入3排6待。WHISPERS2013目录161已审1–27：25入2待，余134；28–30仅下载未闭环。旧缺口见coverage.md；作者优先后续顺序28起，非年度全量。
