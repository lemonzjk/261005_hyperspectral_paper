"""Probe unchanged public NumPy utilities in isolation; no tracking model is run."""
import ast
import json
import warnings
from pathlib import Path
from types import SimpleNamespace

import numpy as np

ROOT = Path(__file__).resolve().parent


def extract(filename, names, class_name=None):
    tree = ast.parse((ROOT / filename).read_text())
    nodes = tree.body
    if class_name:
        nodes = next(n for n in nodes if isinstance(n, ast.ClassDef) and n.name == class_name).body
    selected = [n for n in nodes if isinstance(n, ast.FunctionDef) and n.name in names]
    assert {n.name for n in selected} == set(names)
    namespace = {'np': np}
    exec(compile(ast.Module(body=selected, type_ignores=[]), filename, 'exec'), namespace)
    return namespace


tools = extract('jun-zhou-band-tracking-siambag-code-SiamBAG--HyperTools-py-2026-10-11.py.txt', ['X2Cube', 'X2Cube2', 'Cube2X'])
metrics = extract('jun-zhou-band-tracking-siambag-code-SiamBAG--got10k--utils--metrics-py-2026-10-11.py.txt', ['rect_iou', '_intersection'])
evaluate = extract('jun-zhou-band-tracking-siambag-code-SiamBAG--got10k--experiments--hot2022-py-2026-10-11.py.txt', ['_evaluate'], 'ExperimentHOT2022')['_evaluate']
out = {'checkedAt': '2026-10-11', 'numpyVersion': np.__version__, 'scope': 'Exact original function ASTs, no module imports, model loading, real videos or GT. Synthetic inputs only.', 'probes': []}
for window in [4, 5]:
    mosaic = np.arange(window * 2 * window * 3, dtype=np.uint16).reshape(window * 2, window * 3)
    expected = np.stack([mosaic[r::window, c::window] for r in range(window) for c in range(window)], axis=-1)
    result = tools['X2Cube2'](mosaic, B=[window, window], skip=[window, window], bands=window ** 2)
    assert np.array_equal(result, expected)
    try:
        rebuilt = tools['Cube2X'](result, win=[window, window])
        inverse = {'shape': list(rebuilt.shape), 'equalsOriginal': bool(np.array_equal(rebuilt, mosaic))}
    except Exception as error:
        inverse = {'errorType': type(error).__name__, 'message': str(error)}
    out['probes'].append({'case': f'mosaic_{window}x{window}', 'cubeShape': list(result.shape), 'equalsIndependentStrideSlices': True, 'Cube2X': inverse})

with warnings.catch_warnings(record=True) as caught:
    warnings.simplefilter('always')
    constant = tools['X2Cube'](np.zeros((8, 12), dtype=np.uint8))
out['probes'].append({'case': 'constant_uint8_mosaic', 'outputDtype': str(constant.dtype), 'finite': bool(np.isfinite(constant).all()), 'warnings': sorted({str(w.message) for w in caught}), 'interpretation': 'Shows absent constant-band denominator guard on a synthetic input; does not prove occurrence in the real benchmark.'})

for iou in [0, 0.5, 1]:
    ao, sr, fps, curve = evaluate(SimpleNamespace(nbins_iou=101), np.array([iou], dtype=float), np.array([0.1, 0.4]))
    out['probes'].append({'case': f'evaluate_iou_{iou}', 'AO': float(ao), 'SR_strict_gt_half': float(sr), 'successCurveMean': float(curve.mean()), 'meanReciprocalFPS': float(fps), 'inverseMeanTimeFPS': float(1 / np.mean([0.1, 0.4]))})
box = np.array([[1., 1., 2., 2.]])
out['probes'].append({'case': 'identical_positive_box', 'iou': metrics['rect_iou'](box.copy(), box.copy()).tolist()})

(ROOT / 'jun-zhou-band-tracking-utility-probe-results-2026-10-11.json').write_text(json.dumps(out, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(out, ensure_ascii=False, indent=2))
