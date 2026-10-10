"""Inspect a locally generated SNMF checkpoint with unmodified author modules.

Requires NumPy, SciPy, PyTorch and CVXPY. Use a trusted checkpoint from our own
local training run. This audit does not reproduce the full paper benchmark.
"""
import argparse
import sys
import json
import pathlib
import platform
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--workdir', type=pathlib.Path, required=True)
parser.add_argument('--output', type=pathlib.Path, required=True)
args = parser.parse_args()
root = args.workdir.resolve()
sys.path.insert(0, str(root))
import torch,numpy as np,scipy,cvxpy
from SNMF import L1NMF_Net,prepare_data,UnmixingUtils
checkpoint=next(root.glob('model/**/net_params_20.pkl'))
model=torch.load(checkpoint,weights_only=False,map_location='cpu')
X,A,s=prepare_data(root / 'data/SNR/syntheticDataNewSNR25dB20170601.mat')
A0=np.zeros_like(A);S0=np.zeros_like(s.T)
from SNMF import prepare_init
for i in range(10):
 a0,s0=prepare_init(root / f'data/SNR/syntheticDataNewSNR25dB20170601VCAiter{i+1}init.mat')
 _,_,order=UnmixingUtils(A,s).hyperSAD(a0)
 A0+=a0[:,order];S0+=s0[order,:]
A0/=10;S0/=10
with torch.no_grad():
 M,S=model(torch.FloatTensor(X),A0,S0.T)
 util=UnmixingUtils(A,s)
 dist,mean,order=util.hyperSAD(M[-1].numpy());rmse=util.hyperRMSE(S[-1].T.numpy(),order)
 columns=S[-1].sum(0)
 unit=L1NMF_Net.sum2one(None,torch.FloatTensor([[.5],[.5]])).sum().item()
 zero=L1NMF_Net.sum2one(None,torch.zeros(2,1)).sum().item()
 d={'checkedAt':'2026-10-10','environment':{'python':platform.python_version(),'torch':torch.__version__,'numpy':np.__version__,'scipy':scipy.__version__,'cvxpy':cvxpy.__version__},'device':'CPU','originalCommand':'python SNMF.py --end_epoch 20','sourceCodeModified':False,'originalExitStatus':1,'originalFailure':'TypeError: only 0-dimensional arrays can be converted to Python scalars','completedTrainingEpochs':20,'evaluation':'从20轮本地生成checkpoint重新前向；仅报告转换meanDistance.item()，未改算法。','data':{'X':list(X.shape),'A':list(A.shape),'s':list(s.shape),'snrDb':25,'trainingPixels':500,'layers':9,'initialization':'原入口：10组VCA结果按参考A匹配后平均，FCLS初始丰度用作batch_label；不是丰度真值监督损失。'},'checkpointMetrics':{'SAD':np.asarray(mean).item(),'RMSE':float(rmse),'endmemberShape':list(M[-1].shape),'abundanceShape':list(S[-1].shape),'finite':bool(torch.isfinite(M[-1]).all() and torch.isfinite(S[-1]).all()),'abundanceColumnSumMin':columns.min().item(),'abundanceColumnSumMax':columns.max().item()},'normalizationProbe':{'unitColumnAfterNormalization':unit,'zeroColumnAfterNormalization':zero,'explanation':'原函数分母加1e-4；列和不是严格1，零列输出0。'},'boundary':'20轮CPU运行核验与代码数学探针；未运行原默认500轮、全部噪声/数据集与重复实验，结果不是论文复现或公平基线。'}
args.output.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n');print(json.dumps(d['checkpointMetrics']));print(d['normalizationProbe'])
