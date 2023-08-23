import { IViewRenderer } from './types';
import { EDataViewType } from '@/libs/client/types';

const viewRendererMap = new Map<EDataViewType, IViewRenderer>();

export function registerViewRenderer(renderer: IViewRenderer) {
  return viewRendererMap.set(renderer.type, renderer);
}

export function resolveViewRenderer(type: EDataViewType) {
  return viewRendererMap.get(type);
}

export function getAllViewRenderers() {
  return Array.from(viewRendererMap.values());
}
