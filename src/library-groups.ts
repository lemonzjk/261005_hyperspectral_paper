import type { LibraryCategory, Paper } from './types';

/** Navigation groups organize existing task labels; scientific assignments stay intact. */
export const taskGroups = [
  { id: 'acquisition', name: '采集与成像', categoryIds: ['computational-imaging', 'spectral-instrument-design', 'adaptive-spectral-acquisition', 'joint-spectral-depth', 'hyperspectral-video-acquisition', 'hyperspectral-light-field', 'volumetric-imaging', 'holographic-imaging', 'sensor-sensitivity-evaluation'] },
  { id: 'restoration', name: '重建与复原', categoryIds: ['spectral-reconstruction', 'spectral-denoising', 'spectral-data-restoration', 'spectral-noise-estimation', 'image-compression', 'spectral-factor-initialization'] },
  { id: 'unmixing', name: '解混与端元', categoryIds: ['spectral-unmixing', 'nonlinear-spectral-unmixing', 'endmember-number-estimation', 'mixing-model-characterization', 'spectral-subspace-number-estimation'] },
  { id: 'recognition', name: '分类与理解', categoryIds: ['hyperspectral-superpixel-segmentation', 'semantic-segmentation', 'land-cover-classification', 'hsi-lidar-classification', 'hyperspectral-clustering', 'biometric-recognition', 'planetary-terrain-classification', 'plant-variety-discrimination', 'plant-species-discrimination', 'plant-disease-resistance-rating', 'food-type-classification', 'hyperspectral-biomedical-classification', 'hyperspectral-image-retrieval', 'representation-learning', 'active-sample-selection', 'spectral-texture-description'] },
  { id: 'detection', name: '检测与跟踪', categoryIds: ['hyperspectral-object-detection', 'spectral-material-detection', 'hyperspectral-anomaly-detection', 'hyperspectral-point-target-detection', 'hyperspectral-target-tracking', 'hyperspectral-salient-object-detection', 'hyperspectral-boundary-detection', 'hyperspectral-change-detection', 'plant-disease-detection', 'spectral-background-estimation'] },
  { id: 'selection', name: '降维与选带', categoryIds: ['spectral-dimensionality-reduction', 'spectral-band-selection', 'spectral-band-grouping', 'spectral-band-weighting', 'hsi-sparse-representation', 'spectral-information-evaluation'] },
  { id: 'fusion', name: '融合与配准', categoryIds: ['spatial-super-resolution', 'unregistered-spectral-fusion', 'blind-hsi-fusion', 'spatiotemporal-spectral-fusion', 'multimodal-spectral-correspondence', 'geometric-calibration', 'optical-image-registration'] },
  { id: 'scene', name: '三维与场景', categoryIds: ['novel-view-synthesis', 'surface-reconstruction', 'spectral-pointcloud-generation', 'pointcloud-classification', 'pointcloud-segmentation', 'pointcloud-object-detection', 'lidar-waveform-processing', 'spectral-photometric-geometry'] },
  { id: 'physics', name: '物理建模与反演', categoryIds: ['surface-temperature-emissivity-estimation', 'optical-response-dynamics', 'spectral-relighting', 'spectral-illumination-estimation', 'spectral-intrinsic-decomposition', 'reflection-fluorescence-separation', 'spectral-flare-modeling', 'radiometric-calibration', 'atmospheric-correction', 'spectral-radiative-transfer', 'spectral-reflectance-modeling', 'spectral-absorption-mapping', 'spectral-polarimetric-characterization', 'spectral-refractive-index-inversion', 'material-specific-color-editing', 'model-sensitivity-analysis', 'brdf-anisotropy-correction'] },
  { id: 'applications', name: '应用与参数估计', categoryIds: ['celestial-spectral-characterization', 'vegetation-biophysical-estimation', 'temperature-emissivity-separation', 'water-quality-estimation', 'water-column-spectral-modeling', 'crop-stress-monitoring', 'optical-thickness-metrology', 'surface-property-estimation', 'biomedical-parameter-estimation', 'soil-property-estimation', 'litterfall-chemical-estimation', 'food-composition-estimation', 'atmospheric-tracegas-retrieval', 'optical-bathymetry', 'water-optical-typing', 'oil-film-spectral-inspection', 'soil-constituent-sorting', 'canopy-fluorescence-productivity', 'ecosystem-service-mapping', 'atmospheric-state-retrieval', 'mineral-composition-estimation', 'surface-longwave-radiation-estimation'] },
  { id: 'resources', name: '数据、评测与综述', categoryIds: ['hyperspectral-batch-processing', 'datasets-benchmarks', 'hyperspectral-data-synthesis', 'spectral-color-visualization', 'hyperspectral-research-review', 'hyperspectral-model-watermarking'] },
] as const;

export function groupedTasks(categories: LibraryCategory[]) {
  return taskGroups.map(group => ({
    ...group,
    categories: categories.filter(category => category.dimension === 'task' && (group.categoryIds as readonly string[]).includes(category.id)),
  })).filter(group => group.categories.length);
}

/** Count a paper once even when it has several labels in the same navigation group. */
export function countGroupPapers(papers: Paper[], categoryIds: string[]): number {
  return papers.filter(paper => paper.library?.categoryIds.some(id => categoryIds.includes(id))).length;
}
