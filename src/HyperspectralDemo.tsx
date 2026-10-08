import { useState } from 'react';
import { response, type Material } from './spectral-response';
import './hyperspectral-demo.css';

const materials: { id: Material; name: string; color: string; point: [number, number]; note: string }[] = [
  { id: 'vegetation', name: '植被', color: '#91c6a6', point: [55, 62], note: '从红光切到近红外，观察植被由暗变亮，曲线在红边附近快速上升。' },
  { id: 'rock', name: '岩石', color: '#d0ad7a', point: [188, 66], note: '这个示例中，岩石响应随波长较平缓地变化。' },
  { id: 'water', name: '水体', color: '#78b4dd', point: [130, 130], note: '这个示例中，水体在近红外响应较低，单波段图像中呈深色。' },
];
const presets = [{ value: 550, name: '绿光' }, { value: 680, name: '红光' }, { value: 850, name: '近红外' }];

export function HyperspectralDemo() {
  const [wavelength, setWavelength] = useState(850);
  const [material, setMaterial] = useState<Material>('vegetation');
  const [natural, setNatural] = useState(false);
  const selected = materials.find(item => item.id === material)!;
  const level = response(material, wavelength);
  const fill = (id: Material) => {
    if (natural) return materials.find(item => item.id === id)!.color;
    const value = Math.round(response(id, wavelength) * 255);
    return `rgb(${value}, ${value}, ${value})`;
  };
  const cursor = 36 + (wavelength - 450) / 500 * 284;
  return <section className="hsi-demo" aria-labelledby="hsi-demo-title">
    <header className="hsi-demo-header">
      <div><span className="eyebrow">HYPERSPECTRAL EXPLORER</span><h1 id="hsi-demo-title">一张图像，不止三种颜色。</h1><p>每个像素都有一条光谱。切换波段，看看同一场景如何变化。</p></div>
      <button type="button" onClick={() => { setWavelength(850); setMaterial('vegetation'); setNatural(false); }}>重置演示 ↺</button>
    </header>
    <div className="hsi-demo-body">
      <div className="hsi-demo-scene">
        <div className="hsi-demo-caption"><span>01 / 空间 × 光谱</span><span>第三维是波长，不是空间深度</span></div>
        <svg className="hsi-cube" viewBox="0 0 680 360" role="img" aria-label={`高光谱数据立方体与${wavelength}纳米切片，当前取样${selected.name}`}>
          <g transform="translate(35 130)">
            {Array.from({ length: 13 }, (_, i) => <g key={i} transform={`translate(${(12 - i) * 8} ${-(12 - i) * 6})`}>
              <path d="M0 0L160 30L160 174L0 144Z" fill={`hsl(${260 - (12 - i) * 20} 22% 24%)`} stroke="#a5b3bf" strokeOpacity=".35"/>
            </g>)}
            <path d={`M${(wavelength - 450) / 500 * 96} ${-(wavelength - 450) / 500 * 72}l160 30v144l-160 -30Z`} fill="#d5e7ef" fillOpacity=".15" stroke="#e6f4fa" strokeWidth="2"/>
            <text x="0" y="176">x · 宽</text><text x="172" y="167">y · 高</text><text x="112" y="-92">λ · 波长</text>
            <text x="-3" y="-16">450</text><text x="246" y="-41">950 nm</text>
          </g>
          <path d="M302 177H353" stroke="#9fb1bc" strokeDasharray="4 6"/><path d="m347 172 6 5-6 5" fill="none" stroke="#9fb1bc"/>
          <g transform="translate(375 88)">
            <rect width="250" height="200" rx="3" fill={fill('vegetation')}/>
            <path d="M145 0H250V118L203 100 175 70 138 45Z" fill={fill('rock')}/>
            <path d="M90 0C170 60 65 83 126 124S180 168 140 200H179C215 160 157 144 154 119S202 43 124 0Z" fill={fill('water')}/>
            <g stroke="#000" strokeOpacity=".1" fill="none">{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${i * 30} 0V200M0 ${i * 25}H250`}/>)}</g>
            <circle cx={selected.point[0]} cy={selected.point[1]} r="10" fill="none" stroke="#fff" strokeWidth="2"/>
            <circle cx={selected.point[0]} cy={selected.point[1]} r="3" fill="#fff" stroke="#172128"/>
            <text x="0" y="-18">{natural ? '场景配色示意' : `单波段切片 · ${wavelength} nm`}</text>
            <text x="0" y="225">{natural ? '颜色用于区分材料' : '灰度越亮，示意反射率越高'}</text>
          </g>
        </svg>
        <div className="hsi-demo-view"><button type="button" aria-pressed={!natural} onClick={() => setNatural(false)}>单波段</button><button type="button" aria-pressed={natural} onClick={() => setNatural(true)}>场景配色</button><span>同一场景 · 不同波段</span></div>
      </div>
      <div className="hsi-demo-controls">
        <label className="hsi-demo-label" htmlFor="hsi-band"><span>02 / 选择波段</span><output>{wavelength} <small>nm</small></output></label>
        <input id="hsi-band" type="range" min="450" max="950" step="5" value={wavelength} onChange={event => { setWavelength(Number(event.target.value)); setNatural(false); }}/>
        <div className="hsi-demo-scale"><span>450 · 可见光</span><span>近红外 · 950 nm</span></div>
        <div className="hsi-demo-presets">{presets.map(item => <button type="button" key={item.value} aria-pressed={wavelength === item.value} onClick={() => { setWavelength(item.value); setNatural(false); }}>{item.name}<small>{item.value} nm</small></button>)}</div>
        <div className="hsi-demo-label"><span>03 / 材料取样</span><small>选择位置，查看光谱</small></div>
        <div className="hsi-demo-materials">{materials.map(item => <button type="button" key={item.id} aria-pressed={material === item.id} onClick={() => setMaterial(item.id)}><i style={{ background: item.color }}/>{item.name}</button>)}</div>
        <svg className="hsi-demo-chart" viewBox="0 0 350 155" role="img" aria-label={`${selected.name}示意反射率曲线，${wavelength}纳米处为${level.toFixed(2)}`}>
          {[0, .5, 1].map(value => <g key={value}><path d={`M36 ${120 - value * 95}H320`} stroke="#354048" strokeDasharray="3 4"/><text x="8" y={124 - value * 95}>{value}</text></g>)}
          <text x="36" y="13">示意反射率</text>
          {materials.map(item => <path key={item.id} d={Array.from({ length: 101 }, (_, i) => `${i ? 'L' : 'M'}${36 + i * 2.84} ${120 - response(item.id, 450 + i * 5) * 95}`).join(' ')} fill="none" stroke={item.color} strokeWidth={item.id === material ? 2.5 : 1} opacity={item.id === material ? 1 : .25}/>)}
          <path d={`M${cursor} 22V124`} stroke="#dce7ed" strokeDasharray="3 4"/>
          <circle cx={cursor} cy={120 - level * 95} r="4" fill={selected.color} stroke="#fff"/>
          <text x="36" y="145">450</text><text x="167" y="145">700</text><text x="281" y="145">950 nm</text>
        </svg>
        <div className="hsi-demo-reading" aria-live="polite"><span>{selected.name} · {wavelength} nm</span><strong>{level.toFixed(2)}</strong></div>
        <p className="hsi-demo-note">{selected.note}</p>
      </div>
    </div>
    <footer>原理示意 · 场景与曲线均为模拟数据，不代表实测光谱。<span>二维空间 + 多个波段 = 高光谱数据立方体</span></footer>
  </section>;
}
