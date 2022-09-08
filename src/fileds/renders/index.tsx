import BaseFieldRenderer from './BaseFieldRenderer';
import DateFieldRenderer from './DateFieldRenderer';
import HttpLinkFieldRenderer from './HttpLinkFieldRenderer';
import MultipleLineTextFieldRenderer from './MultipleLineTextFieldRenderer';
import NumberFieldRenderer from './NumberFieldRenderer';
import SingleLineTextFieldRenderer from './SingleLineTextFieldRenderer';

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

registerFieldRenderer(SingleLineTextFieldRenderer);
registerFieldRenderer(MultipleLineTextFieldRenderer);
registerFieldRenderer(NumberFieldRenderer);
registerFieldRenderer(DateFieldRenderer);
registerFieldRenderer(HttpLinkFieldRenderer);
