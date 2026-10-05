import type { TrackId } from './types';

export const tracks: { id: TrackId; name: string; en: string; color: string; description: string }[] = [
  { id: 'capture', name: '采集系统与标定', en: 'Acquisition & calibration', color: '#aa8051', description: '高光谱相机模型、多视角采集系统，以及几何和辐射标定。' },
  { id: 'geometry', name: '几何与光谱联合重建', en: 'Geometry & reconstruction', color: '#6485b5', description: '从高光谱观测恢复深度、点云与表面几何。' },
  { id: 'rendering', name: '场景表示与新视角合成', en: 'Representation & rendering', color: '#258477', description: '光谱 NeRF、三维高斯与波长相关的场景表示。' },
  { id: 'materials', name: '材料分解与逆渲染', en: 'Materials & inverse rendering', color: '#9972aa', description: '连接三维空间、光谱解混、反射率与材料属性。' },
  { id: 'understanding', name: '三维理解与应用', en: 'Understanding & applications', color: '#cc795e', description: '联合几何与光谱的分割、识别和场景应用。' },
  { id: 'active', name: '主动光谱三维成像', en: 'Active spectral 3D imaging', color: '#ac815a', description: '结构光、投影编码与衍射光学，联合恢复深度和光谱。' },
  { id: 'lightfield', name: '高光谱光场与立体匹配', en: 'Spectral light fields', color: '#7a8fb5', description: '多视角多波段光场、跨波段立体匹配与深度恢复。' },
  { id: 'holography', name: '光谱全息与三维计量', en: 'Holography & metrology', color: '#8079af', description: '频率梳、多波长全息与相位测量，恢复三维波场和表面轮廓。' },
  { id: 'lidar', name: '高光谱 LiDAR 与辐射校正', en: 'Hyperspectral LiDAR', color: '#5a968a', description: '主动多波长激光测距、波形处理，以及距离和入射角相关的光谱校正。' },
  { id: 'pointcloud', name: '光谱点云构建与映射', en: 'Spectral point cloud mapping', color: '#8b9456', description: '将成像光谱映射到真实三维点云，建立具有光谱属性的空间模型。' },
  { id: 'registration', name: '跨模态配准与定位', en: 'Registration & localization', color: '#ab7694', description: '跨光谱特征匹配、HSI–LiDAR 配准、传感器外参估计与定位。' },
  { id: 'volumetric', name: '三维光谱体成像', en: 'Spectral volumetric imaging', color: '#b66a87', description: '光声等体成像中的真实三维空间与波长联合恢复，区别于二维光谱立方体。' },
  { id: 'fusion', name: 'HSI 与高度信息融合', en: 'HSI & elevation fusion', color: '#a98166', description: '利用 LiDAR 或 DSM 高度辅助地物分类和检测；明确区分二维分类与三维点云任务。' },
];
export const getTrack = (id: TrackId) => tracks.find(t => t.id === id)!;
