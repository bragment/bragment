import { resolveViewRenderer } from './helpers';
import defaultRenderer from './table-view';
import { EDataViewType } from '@/libs/client/types';

export function getViewRenderer(type: EDataViewType) {
  return resolveViewRenderer(type) ?? defaultRenderer;
}

export { getAllViewRenderers } from './helpers';
