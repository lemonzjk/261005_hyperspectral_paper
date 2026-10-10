# SNMF-Net：论文与公开代码核对

核验：2026-10-10。正式期刊年份2022，DOI [10.1109/TGRS.2021.3081177](https://doi.org/10.1109/TGRS.2021.3081177)；[作者页](https://www.xiongfuli.com/cv/)标2021，对应在线/稿件时间，不能替代正式卷年份。

本轮取得[16页作者稿](https://www.xiongfuli.com/cv/paper/TGRS-2021.pdf)和[SNMF代码包](https://www.xiongfuli.com/cv/code/SNMF.zip)，只补读模型优化、网络更新及训练损失的指定段落，并检查两个Python源文件。不是完整论文阅读。原文件SHA256与65个有效归档文件清单见 `sources/jun-zhou-snmf-author-code-access-2026-10-10.json`；代码原件保存在 `sources/jun-zhou-snmf-code/`，未修改。完整ZIP留在本地临时工作区，后续可从原始链接按记录哈希重取。

## 从NMF-SAE到SNMF-Net的学习比较

SNMF使用0<p<1的丰度幂和惩罚；这与严格非负和为1时成为常数的L1惩罚不同。论文先写一般GST的内部迭代，随后为网络简化为只做一次的激活，不把它说成精确求解完整非凸稀疏问题。

论文式22/25：先用当前S_k更新A，再用新A_(k+1)更新S；端元更新使用当前S_k转置，不学习固定的N×R矩阵，减轻像元数限制。式26将各层的重建误差都计入训练损失。没有端元/丰度真值监督损失，不表示任何初始化或评价流程都不使用参考数据。

[前一篇NMF-SAE笔记](jun-zhou-nmf-sae-note.md)使用固定A₀/S₀、共享参数和末层重建损失。两篇的作者列表、公式和版本分别保留，不能直接借用SNMF代码作为NMF-SAE复现。

## 当前代码包的具体差异

核对`SNMF.py`后发现以下行为；这只描述本次哈希对应的代码，不断言所有作者版本相同。

- 类名仍为`L1NMF_Net`，但实际上p可训练，初值0.5；不能凭类名认为是纯L1模型。
- `forward`先更新丰度，再更新端元；端元残差使用新丰度，但右乘矩阵`W_m`取传入的初始丰度，不在每层改为最新丰度转置。与论文式22/25的执行顺序及端元右乘项不同。
- `self_active`将大于1的输出裁到1；`sum2one`分母加1e-4。前者是实现额外步骤，后者使正列和略小于1，零列仍为0，不能宣称严格和为1。
- 训练损失是各层平方重建误差之和除以层数K；论文写1/(2N)乘层误差之和。缩放差异会影响固定学习率下的优化，不能当作完全相同设置。
- 主入口将十组VCA初始化按参考端元A做最优排列后平均。训练的`batch_label`来自初始丰度而非真实丰度；但参考A参与初始化对齐，复现时需报告，不能隐去后称严格无参考流程。
- 归档没有独立README/依赖锁文件或许可声明；现有数据为合成噪声组、初始化和训练索引，未看到Jasper/Urban文件。数据集可运行性与全部真实实验复现分开记录。

## 已完成的运行核验

在CPU上，以原代码默认25 dB合成数据、500训练像元、九层，显式设`--end_epoch 20`；未改作者源文件。训练完成20轮，并保存checkpoint；最后打印指标时退出，错误为`TypeError: only 0-dimensional arrays can be converted to Python scalars`。当前NumPy拒绝将单元素一维数组直接用于该标量格式化。

随后从自己生成的第20轮checkpoint重新前向，报告时仅用`.item()`转换标量，得到有限端元/丰度输出。观察到的SAD/RMSE仅是该短运行结果，完整值、环境和边界保存在 `sources/jun-zhou-snmf-smoke-2026-10-10.json`，不是论文性能复现。

独立调用原归一化函数：列(0.5,0.5)输出列和约0.999900，零列输出列和0。该数值核验印证分母保护的影响，没有修改原算法。

在已装NumPy、SciPy、PyTorch、CVXPY的隔离环境中，可执行：

```bash
# 在临时工作目录解压原始SNMF.zip，保留数据与两个Python文件。
python SNMF.py --end_epoch 20
# 原入口可能在结果打印处退出；第20轮模型已经保存。
python /path/to/research/hyperspectral/reproduction/snmf-checkpoint-audit.py \
  --workdir /path/to/extracted/SNMF \
  --output /path/to/local-report.json
```

记录本次使用Python 3.12.13、PyTorch 2.10.0+cu128、NumPy 2.5.3、SciPy 1.18.1、CVXPY 1.9.3；使用CPU，不称作者原环境。评估脚本只用于自己生成的可信本地checkpoint。

下一步继续核全部方法段、损失推导、默认500轮、五个噪声设置、重复试验、真实数据、端元匹配与最终指标；需要分别保留原实现和任何兼容性修补，不默默改代码后宣称原协议复现。
