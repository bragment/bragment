import BaseFieldRenderer from './BaseFieldRenderer';
import HttpLinkRenderer from './HttpLinkRenderer';
import MultipleLineTextRenderer from './MultipleLineTextRenderer';
import NumberRenderer from './NumberRenderer';
import SingleLineTextRenderer from './SingleLineTextRenderer';

const map = new Map<string, BaseFieldRenderer>();

export function registerFieldRenderer(Renderer: typeof BaseFieldRenderer) {
  const renderer = new Renderer();
  map.set(renderer.type, renderer);
}

export function getFieldRenderer(type: string) {
  return map.get(type);
}

export function getAllFieldRenderers() {
  return Array.from(map.values());
}

export function getFieldIcon(type: string) {
  return map.get(type)?.Icon;
}

registerFieldRenderer(SingleLineTextRenderer);
registerFieldRenderer(MultipleLineTextRenderer);
registerFieldRenderer(NumberRenderer);
registerFieldRenderer(HttpLinkRenderer);
