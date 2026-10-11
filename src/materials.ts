import type { Paper } from './types';

export type MaterialStatus = 'full_text' | 'partial_text' | 'figures' | 'restricted' | 'pending';
export const materialLabels: Record<MaterialStatus, string> = {
  full_text: '全文已整理',
  partial_text: '部分正文已核 · 待补信息',
  figures: '原图已获取 · 正文待核',
  restricted: '原图来源访问受限',
  pending: '资料待获取或核验',
};

/** Use recorded evidence; a PDF link alone does not prove a document was obtained. */
export function materialStatus(paper: Paper): MaterialStatus {
  if (paper.library?.readingProgress === 'full_text_read') return 'full_text';
  const partial = paper.library?.evidence.some(evidence =>
    /局部(?:正文|全文|章节|页)|正文局部|全文片段|指定局部|(?:原文|原稿|作者稿|接受稿).{0,20}(?:局部|选段|通读|图表|图注)|PDF.{0,12}(?:局部|第.{1,10}页|页码|原图|方法|算法|图注|选读)|(?:方法|结果|数据).{0,8}(?:局部|选段)|读.{0,12}(?:数据段|分类方法)/.test(evidence.level) &&
    !/未获取|无法获取|访问受限|需要付费|待获取/.test(evidence.level));
  if (partial) return 'partial_text';
  if (paper.frameworkFigures?.some(figure => figure.verificationStatus !== 'pending')) return 'figures';
  if (paper.frameworkFigureSearch?.status === 'needs_access') return 'restricted';
  return 'pending';
}
