import { useEffect, useRef, useState } from 'react';
import './spectral-scene.css';

type Material = 'vegetation' | 'rock' | 'water';
type Mode = 'natural' | 'band' | 'geometry';
interface Point { x: number; y: number; z: number; material: Material; shade: number }
const materials: { id: Material; name: string; color: string }[] = [
  { id: 'vegetation', name: '植被', color: '#528e66' },
  { id: 'rock', name: '岩石', color: '#a79b85' },
  { id: 'water', name: '水体', color: '#588caa' },
];

// An analytical scene demonstrates spatial coordinates and wavelength-dependent attributes.
// These values are illustrative, not measurements or material identification results.
function response(material: Material, wavelength: number) {
  if (material === 'vegetation') return .09 + .12 * Math.exp(-(((wavelength - 550) / 42) ** 2)) + .64 / (1 + Math.exp(-(wavelength - 720) / 16));
  if (material === 'water') return .04 + .15 * Math.exp(-(((wavelength - 490) / 95) ** 2));
  return .3 + .00055 * (wavelength - 450) + .05 * Math.sin(wavelength / 105);
}
const points: Point[] = [];
for (let row = 0; row < 98; row++) {
  for (let column = 0; column < 126; column++) {
    const x = (column / 125 - .5) * 3.6;
    const z = (row / 97 - .5) * 2.7;
    const river = Math.sin(z * 2.7) * .24 + z * .12;
    const distance = Math.abs(x - river);
    const ridge = .95 * Math.exp(-((x + .96) ** 2 * 1.7 + (z + .38) ** 2 * 1.6)) +
      .7 * Math.exp(-((x - 1.15) ** 2 * 2 + (z - .45) ** 2 * 2.7));
    const valley = 1 - Math.exp(-((distance / .35) ** 2));
    const texture = .045 * Math.sin(x * 25 + z * 13) * Math.cos(z * 19 - x * 7);
    const y = distance < .075 ? .018 : Math.max(.03, ridge * valley + texture);
    const material: Material = distance < .075 ? 'water' : y > .57 || Math.sin(x * 17 + z * 12) > .8 ? 'rock' : 'vegetation';
    points.push({ x, y, z, material, shade: .72 + .28 * Math.abs(Math.sin(column * 1.7 + row * .8)) });
  }
}
const natural: Record<Material, number[]> = { vegetation: [83, 128, 96], rock: [157, 151, 139], water: [77, 133, 159] };

export function SpectralScene() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const hitPoints = useRef<{ x: number; y: number; material: Material }[]>([]);
  const drag = useRef<{ x: number; yaw: number; moved: boolean } | null>(null);
  const [mode, setMode] = useState<Mode>('natural');
  const [wavelength, setWavelength] = useState(850);
  const [material, setMaterial] = useState<Material>('vegetation');
  const [yaw, setYaw] = useState(-.28);
  const currentMaterial = materials.find(item => item.id === material)!;
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const draw = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = width * ratio;
      element.height = height * ratio;
      const context = element.getContext('2d');
      if (!context) return;
      context.scale(ratio, ratio);
      context.clearRect(0, 0, width, height);
      const scale = Math.min(width / 4.5, height / 2.4);
      const project = (x: number, y: number, z: number) => {
        const rx = x * Math.cos(yaw) - z * Math.sin(yaw);
        const rz = x * Math.sin(yaw) + z * Math.cos(yaw);
        return { x: width / 2 + rx * scale, y: height * .58 + (rz * .52 - y) * scale, depth: rz + y * .3 };
      };
      context.strokeStyle = '#dbe6df';
      context.lineWidth = .6;
      for (let offset = -2; offset <= 2; offset += .4) {
        for (const coords of [[offset, -1.55, offset, 1.55], [-2, offset, 2, offset]]) {
          const a = project(coords[0], -.025, coords[1]);
          const b = project(coords[2], -.025, coords[3]);
          context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
        }
      }
      const projected = points.map(point => ({ ...point, elevation: point.y, ...project(point.x, point.y, point.z) })).sort((a, b) => a.depth - b.depth);
      hitPoints.current = projected;
      for (const point of projected) {
        let color: number[];
        if (mode === 'natural') color = natural[point.material].map(value => value * point.shade);
        else if (mode === 'geometry') color = [89 + point.elevation * 48, 123 + point.elevation * 40, 139 + point.elevation * 35];
        else {
          const value = response(point.material, wavelength);
          color = [39 + value * 201, 111 + value * 107, 120 - value * 47].map(value => value * point.shade);
        }
        context.fillStyle = `rgb(${color.map(value => Math.round(value)).join(',')})`;
        const radius = Math.max(.65, scale / 100);
        context.fillRect(point.x, point.y, radius * 1.15, radius * 1.15);
      }
      const origin = project(-1.95, 0, 1.65);
      for (const [x, y, z, label, color] of [[-1.55, 0, 1.65, 'X', '#9aab9b'], [-1.95, .4, 1.65, 'Y', '#79969d'], [-1.95, 0, 1.25, 'Z', '#a6a18a']] as const) {
        const endpoint = project(x, y, z);
        context.strokeStyle = color;context.lineWidth = 1;
        context.beginPath();context.moveTo(origin.x, origin.y);context.lineTo(endpoint.x, endpoint.y);context.stroke();
        context.fillStyle = color;context.font = '9px monospace';context.fillText(label, endpoint.x + 3, endpoint.y - 3);
      }
    };
    const observer = new ResizeObserver(draw);
    observer.observe(element);draw();
    return () => observer.disconnect();
  }, [mode, wavelength, yaw]);
  const path = materials.map(item => ({ ...item, line: Array.from({ length: 51 }, (_, index) => `${index ? 'L' : 'M'}${25 + index * 5.7},${76 - response(item.id, 450 + index * 10) * 62}`).join(' ') }));
  return <section className="spectral-scene" aria-label="高光谱三维场景交互示意">
    <div className="spectral-scene-header"><div><span>SPATIAL × SPECTRAL</span><h1>高光谱 × 三维视觉</h1></div><span className="spectral-scene-badge"><i/>交互演示</span></div>
    <div className="spectral-scene-modes" role="group" aria-label="三维场景显示方式">
      {([{ id: 'natural', label: '自然色' }, { id: 'band', label: '单波段响应' }, { id: 'geometry', label: '三维几何' }] as const).map(item => <button key={item.id} aria-pressed={mode === item.id} onClick={() => setMode(item.id)}>{item.label}</button>)}
    </div>
    <div className="spectral-scene-viewport">
      <span className="spectral-scene-caption">XYZ POINT CLOUD<span>{points.length.toLocaleString('en-US')} 个采样点</span></span>
      <canvas ref={canvas} role="img" aria-label={`合成山谷三维点云，${mode === 'band' ? `${wavelength} 纳米波段响应伪彩色` : mode === 'geometry' ? '几何显示' : '自然色示意'}。可拖动旋转、点击表面选择材料。`}
        onPointerDown={event => { drag.current = { x: event.clientX, yaw, moved: false }; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={event => { if (!drag.current) return; if (Math.abs(event.clientX - drag.current.x) > 4) { drag.current.moved = true; setYaw(drag.current.yaw + (event.clientX - drag.current.x) * .006); } }}
        onPointerUp={event => { if (drag.current && !drag.current.moved) { const rect = event.currentTarget.getBoundingClientRect(); const nearest = [...hitPoints.current].reverse().find(point => Math.hypot(point.x - event.clientX + rect.left, point.y - event.clientY + rect.top) < 8); if (nearest) setMaterial(nearest.material); } drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}/>
      <div className="spectral-scene-rotation"><span>拖动旋转 · 点击表面选材料</span><div><button aria-label="向左旋转三维场景" onClick={() => setYaw(yaw - .25)}>↶</button><button aria-label="向右旋转三维场景" onClick={() => setYaw(yaw + .25)}>↷</button><button onClick={() => setYaw(-.28)}>复位</button></div></div>
    </div>
    <div className="spectral-scene-analysis">
      <div className="spectral-response-heading"><div><span>表面光谱响应</span><small>同一三维场景，观察不同波长下的响应</small></div><div className="spectral-materials" role="group" aria-label="选择材料光谱曲线">{materials.map(item => <button key={item.id} aria-pressed={material === item.id} onClick={() => setMaterial(item.id)}><i style={{ background: item.color }}/>{item.name}</button>)}</div></div>
      <svg className="spectral-response-chart" viewBox="0 0 340 100" role="img" aria-label={`${currentMaterial.name}的合成光谱响应曲线，当前 ${wavelength} 纳米`}>
        {[.25, .5, .75].map(value => <path key={value} d={`M25 ${76 - value * 62}H310`} stroke="#e6ece8" strokeDasharray="3 4"/>)}
        {path.map(item => <path key={item.id} d={item.line} stroke={item.color} strokeWidth={item.id === material ? 2.5 : 1} opacity={item.id === material ? 1 : .3} fill="none"/>)}
        <path d={`M${25 + (wavelength - 450) * .57} 12V79`} stroke="#506b5c" strokeDasharray="3 3"/>
        <circle cx={25 + (wavelength - 450) * .57} cy={76 - response(material, wavelength) * 62} r="3.5" fill={currentMaterial.color} stroke="white" strokeWidth="1.5"/>
        <path d="M25 12V79H310" stroke="#ccd9d0" fill="none"/><text x="8" y="19" fontSize="8" fill="#92a397">1</text><text x="8" y="80" fontSize="8" fill="#92a397">0</text>
        {[450, 650, 850, 950].map(value => <text key={value} x={25 + (value - 450) * .57} y="94" textAnchor="middle" fontSize="8" fill="#92a397">{value}</text>)}<text x="323" y="94" fontSize="8" fill="#92a397">nm</text>
      </svg>
      <label className="spectral-wavelength"><span>波长<strong>{wavelength} <small>nm</small></strong></span><input aria-label="选择光谱波长" type="range" min="450" max="950" step="10" value={wavelength} onChange={event => { setWavelength(Number(event.target.value)); setMode('band'); }}/><span className="spectral-wavelength-end">可见光 — 近红外</span></label>
    </div>
    <div className="spectral-scene-footnote"><span>几何位置 + 波长相关属性</span><span>合成场景 · 响应为概念示意</span></div>
  </section>;
}
