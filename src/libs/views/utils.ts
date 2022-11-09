import type ViewRendererBase from './renderers/ViewRendererBase';

const viewRendererMap = new Map<string, ViewRendererBase>();
export function registerViewRenderer(Renderer: typeof ViewRendererBase) {
  const renderer = new Renderer();
  viewRendererMap.set(renderer.type, renderer);
}
export function getViewRenderer(type: string) {
  return viewRendererMap.get(type);
}

export function getDefaultViewType() {
  return getAllViewRenderers()[0].type;
}

export function getAllViewRenderers() {
  return Array.from(viewRendererMap.values());
}

export function getViewIcon(type: string) {
  return viewRendererMap.get(type)?.Icon;
}
