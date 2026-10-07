import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./spectral-scene.css";

type Material = "vegetation" | "rock" | "water";
type Mode = "natural" | "band" | "geometry";
interface Point {
  x: number;
  y: number;
  z: number;
  material: Material;
  shade: number;
}
const materials: { id: Material; name: string; color: string; note: string }[] =
  [
    {
      id: "vegetation",
      name: "植被",
      color: "#91c6a6",
      note: "留意 700 nm 附近的上升：示意植被的红边响应。",
    },
    {
      id: "rock",
      name: "岩石",
      color: "#d0ad7a",
      note: "这条示意曲线随波长缓慢变化，与植被的陡升形成对照。",
    },
    {
      id: "water",
      name: "水体",
      color: "#78b4dd",
      note: "在这个示意中，水体的近红外响应较低，因此呈深色。",
    },
  ];
const modes: { id: Mode; label: string; description: string }[] = [
  {
    id: "natural",
    label: "自然色",
    description: "先认识场景：绿色为植被，褐色为岩石，蓝色为水体。",
  },
  {
    id: "band",
    label: "光谱响应",
    description: "几何保持一致；改变波长，观察不同材料的响应差异。",
  },
  {
    id: "geometry",
    label: "三维结构",
    description: "颜色仅表示相对高度；拖动场景，从不同角度观察地形。",
  },
];
const presets = [
  { value: 550, name: "绿光" },
  { value: 680, name: "红光" },
  { value: 850, name: "近红外" },
];

// Analytical examples, not measured reflectance or material identification results.
function response(material: Material, wavelength: number) {
  if (material === "vegetation")
    return (
      0.09 +
      0.12 * Math.exp(-(((wavelength - 550) / 42) ** 2)) +
      0.64 / (1 + Math.exp(-(wavelength - 720) / 16))
    );
  if (material === "water")
    return 0.04 + 0.15 * Math.exp(-(((wavelength - 490) / 95) ** 2));
  return 0.3 + 0.00055 * (wavelength - 450) + 0.05 * Math.sin(wavelength / 105);
}
const points: Point[] = [];
for (let row = 0; row < 98; row++) {
  for (let column = 0; column < 126; column++) {
    const x = (column / 125 - 0.5) * 3.6;
    const z = (row / 97 - 0.5) * 2.7;
    const river = Math.sin(z * 2.7) * 0.24 + z * 0.12;
    const distance = Math.abs(x - river);
    const ridge =
      0.95 * Math.exp(-((x + 0.96) ** 2 * 1.7 + (z + 0.38) ** 2 * 1.6)) +
      0.7 * Math.exp(-((x - 1.15) ** 2 * 2 + (z - 0.45) ** 2 * 2.7));
    const valley = 1 - Math.exp(-((distance / 0.35) ** 2));
    const texture = 0.01 * Math.sin(x * 25 + z * 13) * Math.cos(z * 19 - x * 7);
    const y =
      distance < 0.12 ? 0.018 : Math.max(0.03, ridge * valley + texture);
    const material: Material =
      distance < 0.12 ? "water" : y > 0.57 ? "rock" : "vegetation";
    points.push({
      x,
      y,
      z,
      material,
      shade: 0.82 + 0.18 * Math.abs(Math.sin(column * 1.7 + row * 0.8)),
    });
  }
}
// Surface normals provide coherent lighting instead of random per-point noise.
points.forEach((point, index) => {
  const row = Math.floor(index / 126);
  const column = index % 126;
  const dx =
    (points[row * 126 + Math.min(125, column + 1)].y -
      points[row * 126 + Math.max(0, column - 1)].y) /
    (7.2 / 125);
  const dz =
    (points[Math.min(97, row + 1) * 126 + column].y -
      points[Math.max(0, row - 1) * 126 + column].y) /
    (5.4 / 97);
  const lighting = (-dx * -0.45 + 0.85 - dz * 0.3) / Math.hypot(dx, 1, dz);
  point.shade = 0.64 + 0.36 * Math.max(0, lighting);
});
const cells = Array.from({ length: 97 * 125 }, (_, index) => {
  const corner = Math.floor(index / 125) * 126 + (index % 125);
  return [corner, corner + 1, corner + 127, corner + 126];
});
const natural: Record<Material, number[]> = {
  vegetation: [88, 140, 106],
  rock: [176, 155, 126],
  water: [85, 150, 183],
};
const curves = materials.map((item) => ({
  ...item,
  line: Array.from(
    { length: 101 },
    (_, index) =>
      `${index ? "L" : "M"}${32 + index * 2.6},${126 - response(item.id, 450 + index * 5) * 100}`,
  ).join(" "),
}));
const defaultSample = (material: Material) =>
  points
    .filter((point) => point.material === material)
    .reduce((best, point) => {
      const target =
        material === "water"
          ? [0, 0.6]
          : material === "rock"
            ? [-0.95, -0.35]
            : [0.9, 0.75];
      const distance = (p: Point) =>
        Math.hypot(p.x - target[0], p.z - target[1]);
      return distance(point) < distance(best) ? point : best;
    });

export function SpectralScene() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const hitPoints = useRef<{ x: number; y: number; point: Point }[]>([]);
  const drag = useRef<{
    x: number;
    y: number;
    yaw: number;
    moved: boolean;
    pointerId: number;
  } | null>(null);
  const [mode, setMode] = useState<Mode>("band");
  const [wavelength, setWavelength] = useState(850);
  const [sample, setSample] = useState<Point>(() =>
    defaultSample("vegetation"),
  );
  const [yaw, setYaw] = useState(-0.28);
  const [compare, setCompare] = useState(
    () => window.matchMedia("(min-width: 900px)").matches,
  );
  const material = sample.material;
  const currentMaterial = materials.find((item) => item.id === material)!;
  const chooseWavelength = (value: number) => {
    setWavelength(value);
    setMode("band");
  };
  const reset = () => {
    setMode("band");
    setWavelength(850);
    setSample(defaultSample("vegetation"));
    setYaw(-0.28);
    setCompare(window.matchMedia("(min-width: 900px)").matches);
  };

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
      const context = element.getContext("2d");
      if (!context) return;
      context.scale(ratio, ratio);
      hitPoints.current = [];
      const split = compare && mode !== "natural";
      const stacked = split && width < 540;
      const views = split ? (["natural", mode] as Mode[]) : [mode];
      views.forEach((view, index) => {
        const w = split && !stacked ? width / 2 : width;
        const h = stacked ? height / 2 : height;
        const left = stacked ? 0 : index * w;
        const top = stacked ? index * h : 0;
        context.save();
        context.beginPath();
        context.rect(left, top, w, h);
        context.clip();
        const scale = Math.min(w / 4.5, (h - 55) / 2.65);
        const project = (point: { x: number; y: number; z: number }) => {
          const rx = point.x * Math.cos(yaw) - point.z * Math.sin(yaw);
          const rz = point.x * Math.sin(yaw) + point.z * Math.cos(yaw);
          return {
            x: left + w / 2 + rx * scale,
            y: top + h * 0.61 + (rz * 0.52 - point.y) * scale,
            depth: rz - point.y * 0.3,
          };
        };
        context.strokeStyle = "#3c484d";
        context.lineWidth = 0.7;
        for (let offset = -2; offset <= 2; offset += 0.4) {
          for (const coords of [
            [offset, -1.5, offset, 1.5],
            [-2, offset, 2, offset],
          ]) {
            const a = project({ x: coords[0], y: -0.03, z: coords[1] });
            const b = project({ x: coords[2], y: -0.03, z: coords[3] });
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
        const projected = points.map((point) => ({ point, ...project(point) }));
        hitPoints.current.push(
          ...[...projected].sort((a, b) => a.depth - b.depth),
        );
        const surfaces = cells
          .map((corners) => ({
            corners,
            depth:
              corners.reduce(
                (total, corner) => total + projected[corner].depth,
                0,
              ) / 4,
          }))
          .sort((a, b) => a.depth - b.depth);
        for (const { corners } of surfaces) {
          const point = points[corners[0]];
          let color: number[];
          if (view === "natural")
            color = natural[point.material].map((value) => value * point.shade);
          else {
            const value =
              view === "geometry"
                ? Math.min(1, point.y / 0.95)
                : response(point.material, wavelength);
            color = [35 + value * 207, 82 + value * 141, 112 - value * 30].map(
              (value) => value * point.shade,
            );
          }
          const fill = `rgb(${color.map((value) => Math.round(value)).join(",")})`;
          context.fillStyle = fill;
          context.strokeStyle = fill;
          context.lineWidth = 0.4;
          context.beginPath();
          corners.forEach((corner, index) => {
            const projectedPoint = projected[corner];
            if (index === 0) context.moveTo(projectedPoint.x, projectedPoint.y);
            else context.lineTo(projectedPoint.x, projectedPoint.y);
          });
          context.closePath();
          context.fill();
          context.stroke();
        }
        if (view === "geometry") {
          context.fillStyle = "#ebf1d9a0";
          for (let row = 0; row < 98; row += 4) {
            for (let column = 0; column < 126; column += 4) {
              const point = projected[row * 126 + column];
              context.fillRect(point.x - 0.6, point.y - 0.6, 1.2, 1.2);
            }
          }
        }
        const selected = project(sample);
        context.beginPath();
        context.arc(selected.x, selected.y, 8, 0, Math.PI * 2);
        context.strokeStyle = "#fff";
        context.lineWidth = 3;
        context.stroke();
        context.strokeStyle = "#294c50";
        context.lineWidth = 1;
        context.stroke();
        context.beginPath();
        context.moveTo(selected.x, selected.y - 8);
        context.lineTo(selected.x, selected.y - 34);
        context.stroke();
        const label = `${currentMaterial.name} · 采样点`;
        context.font = "11px sans-serif";
        const labelWidth = context.measureText(label).width + 20;
        const labelX = Math.max(
          left + 5,
          Math.min(left + w - labelWidth - 5, selected.x - labelWidth / 2),
        );
        context.fillStyle = "#fff";
        context.beginPath();
        context.roundRect(labelX, selected.y - 57, labelWidth, 25, 5);
        context.fill();
        context.strokeStyle = "#d4dfdf";
        context.stroke();
        context.fillStyle = "#294c50";
        context.fillText(label, labelX + 10, selected.y - 40);
        context.fillStyle = "#b4c0c5";
        context.font = "12px sans-serif";
        context.fillText(
          view === "natural"
            ? "自然色参考 · 示意配色"
            : view === "band"
              ? `${wavelength} nm · 光谱响应`
              : "三维结构 · 相对高度",
          left + 20,
          top + 28,
        );
        const origin = project({ x: -1.85, y: 0, z: 1.6 });
        for (const [x, y, z, label] of [
          [-1.45, 0, 1.6, "X"],
          [-1.85, 0.4, 1.6, "Y"],
          [-1.85, 0, 1.2, "Z"],
        ] as const) {
          const end = project({ x, y, z });
          context.strokeStyle = "#7193a3";
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(origin.x, origin.y);
          context.lineTo(end.x, end.y);
          context.stroke();
          context.fillStyle = "#9bb5c2";
          context.font = "10px monospace";
          context.fillText(label, end.x + 3, end.y - 3);
        }
        context.restore();
      });
      if (split) {
        context.strokeStyle = "#47616e";
        context.setLineDash([4, 5]);
        context.beginPath();
        if (stacked) {
          context.moveTo(0, height / 2);
          context.lineTo(width, height / 2);
        } else {
          context.moveTo(width / 2, 0);
          context.lineTo(width / 2, height);
        }
        context.stroke();
      }
    };
    const observer = new ResizeObserver(draw);
    observer.observe(element);
    draw();
    return () => observer.disconnect();
  }, [mode, wavelength, yaw, sample, currentMaterial, compare]);

  return (
    <section className="spectral-lab" aria-label="高光谱三维交互实验">
      <header className="lab-toolbar">
        <div>
          <span className="lab-live-dot" />
          <strong>光谱 × 空间实验室</strong>
          <span className="lab-demo-badge">交互示意</span>
        </div>
        <button className="lab-reset" onClick={reset}>
          ↺ 重置演示
        </button>
      </header>
      <div className="lab-body">
        <div className="lab-scene">
          <div className="lab-view-controls">
            <div
              className="lab-modes"
              role="group"
              aria-label="三维场景显示方式"
            >
              {modes.map((item) => (
                <button
                  key={item.id}
                  aria-pressed={mode === item.id}
                  onClick={() => setMode(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="lab-compare">
              <input
                type="checkbox"
                checked={compare}
                disabled={mode === "natural"}
                onChange={(event) => setCompare(event.target.checked)}
              />
              对照自然色
            </label>
          </div>
          <p className="lab-mode-description">
            {modes.find((item) => item.id === mode)!.description}
          </p>
          <div
            className="lab-mobile-presets"
            role="group"
            aria-label="快捷切换观察波长"
          >
            <span>试一试</span>
            {presets.map((preset) => (
              <button
                key={preset.value}
                aria-pressed={wavelength === preset.value && mode === "band"}
                onClick={() => chooseWavelength(preset.value)}
              >
                {preset.name} · {preset.value}
              </button>
            ))}
          </div>
          <div
            className={`lab-viewport${compare && mode !== "natural" ? " is-comparing" : ""}`}
          >
            <canvas
              ref={canvas}
              role="img"
              aria-label={`合成山谷三维表面，${mode === "band" ? `${wavelength} 纳米光谱响应` : mode === "geometry" ? "三维结构" : "自然色"}；已选${currentMaterial.name}。拖动旋转，点击采样。也可使用下方旋转按钮和材料按钮。`}
              onPointerDown={(event) => {
                if (!event.isPrimary || event.button !== 0) return;
                drag.current = {
                  x: event.clientX,
                  y: event.clientY,
                  yaw,
                  moved: false,
                  pointerId: event.pointerId,
                };
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                const start = drag.current;
                if (!start || start.pointerId !== event.pointerId) return;
                if (
                  Math.hypot(event.clientX - start.x, event.clientY - start.y) >
                  4
                ) {
                  start.moved = true;
                  setYaw(start.yaw + (event.clientX - start.x) * 0.006);
                }
              }}
              onPointerUp={(event) => {
                const start = drag.current;
                if (!start || start.pointerId !== event.pointerId) return;
                if (!start.moved) {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const nearest = [...hitPoints.current]
                    .reverse()
                    .find(
                      (point) =>
                        Math.hypot(
                          point.x - event.clientX + rect.left,
                          point.y - event.clientY + rect.top,
                        ) < 9,
                    );
                  if (nearest) setSample(nearest.point);
                }
                drag.current = null;
                if (event.currentTarget.hasPointerCapture(event.pointerId))
                  event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              onPointerCancel={() => {
                drag.current = null;
              }}
              onLostPointerCapture={() => {
                drag.current = null;
              }}
            />
            <div className="lab-legend">
              {mode === "natural" ? (
                <span>预设材料配色</span>
              ) : (
                <>
                  <span>{mode === "band" ? "响应低" : "地形低"}</span>
                  <i />
                  <span>{mode === "band" ? "响应高" : "地形高"}</span>
                </>
              )}
            </div>
          </div>
          <div className="lab-scene-bottom">
            <span>拖动旋转 · 点击地表采样</span>
            <div>
              <button
                aria-label="向左旋转三维场景"
                onClick={() => setYaw((value) => value - 0.25)}
              >
                ↶
              </button>
              <button
                aria-label="向右旋转三维场景"
                onClick={() => setYaw((value) => value + 0.25)}
              >
                ↷
              </button>
              <button onClick={() => setYaw(-0.28)}>复位视角</button>
            </div>
          </div>
          <div className="lab-insight">
            <span aria-hidden="true">◎</span>
            <p>
              <strong>每一个三维点，都有一条光谱。</strong>
              空间坐标描述「在哪里」，光谱响应帮助观察「有什么不同」。
            </p>
          </div>
        </div>
        <aside className="lab-inspector" aria-label="光谱实验控制面板">
          <section className="lab-control-section">
            <h2>
              <span>01</span>选择观察波长{" "}
              <output>
                {wavelength}
                <small> nm</small>
              </output>
            </h2>
            <div className="lab-presets">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  aria-pressed={wavelength === preset.value && mode === "band"}
                  onClick={() => chooseWavelength(preset.value)}
                >
                  {preset.name}
                  <small>{preset.value} nm</small>
                </button>
              ))}
            </div>
            <input
              className="lab-wavelength"
              aria-label="选择光谱波长"
              aria-valuetext={`${wavelength} 纳米`}
              type="range"
              min="450"
              max="950"
              step="10"
              value={wavelength}
              onChange={(event) => chooseWavelength(Number(event.target.value))}
            />
            <div className="lab-range-labels">
              <span>450 · 可见光</span>
              <span>近红外 · 950 nm</span>
            </div>
            <p className="lab-control-hint">
              调整波长，场景切换为对应的光谱响应。
            </p>
          </section>
          <section className="lab-control-section">
            <h2>
              <span>02</span>选择材料采样点
            </h2>
            <div
              className="lab-materials"
              role="group"
              aria-label="选择材料光谱曲线"
            >
              {materials.map((item) => (
                <button
                  key={item.id}
                  aria-pressed={material === item.id}
                  onClick={() => setSample(defaultSample(item.id))}
                  style={{ "--material": item.color } as CSSProperties}
                >
                  <i />
                  {item.name}
                  <span>{material === item.id ? "✓" : "○"}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="lab-control-section lab-readout">
            <h2>
              <span>03</span>读取光谱曲线{" "}
              <span className="lab-unit">相对响应</span>
            </h2>
            <svg
              className="lab-chart"
              viewBox="0 0 320 155"
              role="img"
              aria-label={`${currentMaterial.name}的合成光谱响应曲线；${wavelength} 纳米处相对响应 ${response(material, wavelength).toFixed(2)}`}
            >
              {[0, 0.5, 1].map((value) => (
                <g key={value}>
                  <path
                    d={`M32 ${126 - value * 100}H292`}
                    stroke="#dfe7e9"
                    strokeDasharray="3 4"
                  />
                  <text x="23" y={130 - value * 100} textAnchor="end">
                    {value.toFixed(1)}
                  </text>
                </g>
              ))}
              {curves.map((item) => (
                <path
                  key={item.id}
                  d={item.line}
                  stroke={item.color}
                  strokeWidth={item.id === material ? 2.8 : 1.5}
                  opacity={item.id === material ? 1 : 0.25}
                  fill="none"
                />
              ))}
              <path
                d={`M${32 + (wavelength - 450) * 0.52} 18V126`}
                stroke="#617c87"
                strokeDasharray="3 3"
              />
              <circle
                cx={32 + (wavelength - 450) * 0.52}
                cy={126 - response(material, wavelength) * 100}
                r="4.5"
                fill={currentMaterial.color}
                stroke="white"
                strokeWidth="2"
              />
              {[450, 650, 850, 950].map((value) => (
                <text
                  key={value}
                  x={32 + (value - 450) * 0.52}
                  y="148"
                  textAnchor="middle"
                >
                  {value}
                </text>
              ))}
            </svg>
            <div className="lab-reading" aria-live="polite">
              <span>
                <i style={{ background: currentMaterial.color }} />
                {currentMaterial.name}
                <small> / {wavelength} nm</small>
              </span>
              <strong>{response(material, wavelength).toFixed(2)}</strong>
            </div>
            <p className="lab-material-note">{currentMaterial.note}</p>
          </section>
        </aside>
      </div>
      <footer className="lab-footer">
        <span>
          <i />
          合成地形 · {points.length.toLocaleString("en-US")} 个空间采样点
        </span>
        <span>曲线与配色仅作概念演示，非实测数据</span>
      </footer>
    </section>
  );
}
