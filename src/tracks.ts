import type { TrackId } from './types';

export const tracks: { id: TrackId; name: string; en: string; color: string; description: string }[] = [
  { id: 'capture', name: '采集、标定与配准', en: 'Acquisition & calibration', color: '#aa8051', description: '相机模型、多视角采集，以及几何和辐射标定。' },
  { id: 'geometry', name: '几何与光谱联合重建', en: 'Geometry & reconstruction', color: '#6485b5', description: '从高光谱观测恢复深度、点云与表面几何。' },
  { id: 'rendering', name: '场景表示与新视角合成', en: 'Representation & rendering', color: '#258477', description: '光谱 NeRF、三维高斯与波长相关的场景表示。' },
  { id: 'materials', name: '材料分解与逆渲染', en: 'Materials & inverse rendering', color: '#9972aa', description: '连接三维空间、光谱解混、反射率与材料属性。' },
  { id: 'understanding', name: '三维理解与应用', en: 'Understanding & applications', color: '#cc795e', description: '联合几何与光谱的分割、识别和场景应用。' },
];
export const getTrack = (id: TrackId) => tracks.find(t => t.id === id)!;
