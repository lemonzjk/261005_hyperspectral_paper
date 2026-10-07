# 文献扩充交接（2026-10-07）

任务已恢复，继续扩充高光谱三维视觉文献。先阅读 CONTEXT.md 与 AGENTS.md；仅本地预览、校验与提交，不推送、不发布。

## 当前基线

网站收录 178 篇；126 篇有 148 张框架图，43 篇 needs_access，9 篇 no_framework，0 篇 pending。现有框架全部初查不等于来源已穷尽；新论文同步查图，旧缺图可遇到新公开入口时重试。

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

逐篇核对原始摘要/全文、作者、版本、正式场所、重复条目与三维任务。H×W×B 不是三维几何；高度辅助二维分类单列。用 research/record.py 立即记录，每条显式填写真实核验日期；该工具 updatedAt 仍硬编码，结束时复核 catalog 与 survey 日期。用 figures.py init 同步新论文，逐张 add 保存原图或 attempt 记录真实失败；只在完整全文图审查后判 no_framework。

每轮更新 CONTEXT（最多 2000 字符、60 行），运行 validate；网站代码变更运行 build 与交互检查。完成后本地提交。

本轮两篇全文哈希、正式版本关系与图号见 sources/gas-plume-nerf-and-cascaded-spectral-tof-2026-10-07.json。继续专业期刊、arXiv 与引文追溯；框架初查结束不等于文献搜集全面。
