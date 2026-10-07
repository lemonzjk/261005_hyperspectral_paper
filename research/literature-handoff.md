# 文献扩充交接（2026-10-07）

任务已恢复，继续扩充高光谱三维视觉文献。先阅读 CONTEXT.md 与 AGENTS.md；仅本地预览、校验与提交，不推送、不发布。

## 当前基线

网站收录 184 篇；132 篇有 156 张框架图，43 篇 needs_access，9 篇 no_framework，0 篇 pending。现有框架全部初查不等于来源已穷尽；新论文同步查图，旧缺图可遇到新公开入口时重试。

## 已完成的新论文

- HS-3D-NeRF（arXiv:2602.16950v1，2026）：四作者、摘要及 16 页全文核验；固定相机拍摄旋转农产品，60 帧、204 波段，多通道 NeRF 与两阶段训练恢复三维几何和光谱。Figure 3 完整流程从 PDF 第 3 页裁切并保存。仅有预印本证据，不能标为正式顶会论文；题名 HS-3D-NeRF 与正文 HSI-SC-NeRF 的命名差异已注明。
- DD-HGS（3DV 2026）：arXiv:2505.21890v3 方法全文与作者项目核验；Crossref 出版社登记确认 DOI 10.1109/3DV69130.2026.00120、四作者、2026-03-20 与 1218–1227。按正式会议年份收录，2025 预印本不另建条目。Figure 2 作者项目页原图已保存；图版本不冒称出版社排版。代码入口仍为 Coming soon，未当成可运行仓库。

两篇原稿哈希与正式登记见 sources/hs3d-nerf-and-ddhgs-fulltext-2026-10-07.json。

## 本轮核验与剩余线索

- Gas Plume NeRF 已按 arXiv:2603.05473v1（2026）收录，四作者、在审声明和全文已核验。DIRSIG 合成 LWIR 场景，三维表示与新视角气体检测；不能外推真实气体浓度层析。Figure 2 为损失权重计算的局部方法示意（PDF 第 7 页），不是完整网络。作者代码 lanl/HSI-Nerfstudio 已核对 README，未安装复现。
- Cascaded Spectral ToF 已按 PhotoniX 2024, 5:37 正式版收录，DOI 10.1186/s43074-024-00152-5。PMC9882592 是 2023 Research Square 预印本，不重复收录。正式全文用 500–650 nm 可调脉冲光源分次照明，恢复空间/波长/ToF；约 6 cm 是采样间隔而非精度。保存 Figure 3(a) 光谱系统（第 7 页）和 Figure 6 级联概念（第 12 页），未将概念图中的所有维度说成实验实现。
- 石翠萍作者公开目录两篇 2025 HSI–LiDAR 融合候选见 survey.json，已有 PDF 文件路径，仍待全文及场所政策核验。
- IGARSS 既有扫描候选、CVF/ECVA 扫描范围及专业期刊缺口见 survey.json 与 README.md；文献覆盖未完成，不能宣称全部收集。

## 操作

逐篇核对原始摘要/全文、作者、版本、正式场所、重复条目与三维任务。H×W×B 不是三维几何；高度辅助二维分类单列。用 research/record.py 立即记录，每条显式填写真实核验日期；工具已改用当天日期，同时更新 catalog 与 survey 日期；有历史核验日期时显式传入。用 figures.py init 同步新论文，逐张 add 保存原图或 attempt 记录真实失败；只在完整全文图审查后判 no_framework。

每轮更新 CONTEXT（最多 2000 字符、60 行），运行 validate；网站代码变更运行 build 与交互检查。完成后本地提交。

本轮两篇全文哈希、正式版本关系与图号见 sources/gas-plume-nerf-and-cascaded-spectral-tof-2026-10-07.json。继续专业期刊、arXiv 与引文追溯；框架初查结束不等于文献搜集全面。

## 最新扩充

- MS-Splatting：正式 Computer Graphics Forum / Eurographics 2026，DOI 10.1111/cgf.70337、e70337，2026-04-25；方法核验 arXiv:2506.03407v2 的 29 页作者稿。RGB 加四个离散波段，标相关研究；依赖联合 SfM，不能把无需预标定解释为无需相机参数。保存第 4 页 Figure 3 全流程；项目页所谓 Pipeline 实际为 Figure 1 展示图，未混用。
- LGDWT-GS：arXiv:2601.17185v2，2026-05-04；四波段植物共享几何、伪 RGB 与 NIR 联合监督，局部及全局小波损失，标相关研究。页脚 2023 为模板残留，不冒称 IEEE 正式出版；作者仓库实际 master 分支可访问，保存第 5 页 Figure 4 多光谱框架。两篇均未运行训练复现。
- 原稿哈希、出版社登记及来源纠错见 sources/ms-splatting-and-lgdwt-fulltext-2026-10-07.json。VMV 2025 比较论文保留场所候选；GaussianHSI 2026 为二维超分已排除。继续优先连续高光谱几何、专业期刊与引文追溯，覆盖仍未完成。

## HMAT 与 HyKey 扩充

- HMAT：TGRS 2025, 63:5503817，DOI 10.1109/TGRS.2025.3533475；作者公开正式排版 17 页 PDF 核验，Figure 1 第 3 页完整网络与算子图例已保存。输入是 HSI 与高度栅格，输出二维类别图，标 fusion/相关研究。原 pending_fulltext 候选已改 included。
- HyKey：发现于 arXiv:2604.17446v1，已核对正式 IJCARS 2026, 21:1061–1069（2026-04-27），DOI 10.1007/s11548-026-03633-z，同文只收录一次；专业场所不冒称 CV 顶刊。16 波段 460–600 nm，空间–光谱特征与单应/极线监督支持真实相对位姿估计，标 registration/核心研究，不声称已输出完整稠密表面。正式 Springer Figures 2、3 原图已保存；仓库名末尾句点已纠正，未运行复现。
- 全文哈希、出版社元数据与版本关系见 sources/hmat-and-hykey-fulltext-2026-10-07.json。仍待 JSTARS 融合候选与更多专业期刊/IGARSS；HyKey 引文 HSSPN（IEEE Access 2022）和 Optics and Lasers in Engineering 光谱 SfM 保留场所/全文候选。BoNeRF-HS 目前 bioRxiv，不自动等同用户允许的 arXiv。

## 光谱全息与偏振数据扩充

- Microcomb HS3D：arXiv:2508.18219v1（2025），15 页全文及补充核验；约 1 THz 梳齿近红外幅度/相位、重聚焦和分层相位展开高度，标 holography/核心研究。页眉 Optica 不是正式发表证据。塑料实验记录 29 s；硬币 0.96 s，1.2×10^6/s 为光谱与空间分辨单元吞吐，不是三维帧率。保存 Figure 1 概念（第 2 页）与补充 Figure 1 两种完整散射系统（第 9 页）。
- Spectro-polarimetric Dataset：CVPR 2024 官方 PDF，311 张 21 波段 450–650 nm 全 Stokes，另有 2022 张 RGB Stokes；两套数据均分析 SfP 法线的波段依赖。作为 capture/相关研究，不声称新三维重建模型或三维真值。保存第 4 页 Figure 3(a) 两种采集系统。原 pending_scope 候选已纳入。
- 全文哈希见 sources/microcomb-and-spectropolar-fulltext-2026-10-07.json。OL 2026 SVSPI 摘要及正式登记已确认，但正文挑战页，保留 pending_fulltext；需要与 MOCI-PHI 平台和方法关系核验，不混用框架。
