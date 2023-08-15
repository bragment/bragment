import { resolveFieldRenderer } from './helpers';
import defaultRenderer from './single-line-text';
import { EDataFieldType } from '@/libs/client/types';

export function getFieldRenderer(type: EDataFieldType) {
  return resolveFieldRenderer(type) ?? defaultRenderer;
}
