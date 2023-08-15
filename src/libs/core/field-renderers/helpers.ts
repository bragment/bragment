import { IFieldRenderer } from './types';
import { EDataFieldType } from '@/libs/client/types';

const fieldRendererMap = new Map<EDataFieldType, IFieldRenderer>();

export function registerFieldRenderer(renderer: IFieldRenderer) {
  return fieldRendererMap.set(renderer.type, renderer);
}

export function resolveFieldRenderer(type: EDataFieldType) {
  return fieldRendererMap.get(type);
}
