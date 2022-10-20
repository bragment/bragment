import { ILocalMessage } from '../i18n/types';
import { IProjectDataField } from '../libs/client/types';
import type FieldRendererBase from './renderers/FieldRendererBase';
import { EFieldCategory } from './types';

const projectFieldMap = new Map<string, IProjectDataField>();
export function setProjectFields(fields: IProjectDataField[]) {
  projectFieldMap.clear();
  fields.forEach(setProjectField);
}
export function setProjectField(field: IProjectDataField) {
  projectFieldMap.set(field._id, field);
}
export function getProjectField(fieldId: string) {
  return projectFieldMap.get(fieldId);
}

const fieldRendererMap = new Map<string, FieldRendererBase>();
export function registerFieldRenderer(Renderer: typeof FieldRendererBase) {
  const renderer = new Renderer();
  fieldRendererMap.set(renderer.type, renderer);
}
export function getFieldRenderer(type: string) {
  return fieldRendererMap.get(type);
}

export function getDefaultFieldType() {
  return getAllFieldRenderers()[0].type;
}

export function getAllFieldRenderers() {
  return Array.from(fieldRendererMap.values());
}

export function getFieldIcon(type: string) {
  return fieldRendererMap.get(type)?.Icon;
}

export function checkIfFieldFullWidth(type: string) {
  return !!fieldRendererMap.get(type)?.fullWidth;
}

export function checkIfFieldResolvable(type: string) {
  return !!fieldRendererMap.get(type)?.resolvable;
}

export function getResolvablePaths(type: string) {
  return fieldRendererMap.get(type)?.resolvablePaths || [];
}

export function getCategoryMessageId(category: EFieldCategory) {
  return {
    [EFieldCategory.Basic]: 'dataField.basic',
    [EFieldCategory.Builtin]: 'dataField.builtin',
    [EFieldCategory.Advanced]: 'dataField.advanced',
  }[category] as ILocalMessage;
}

export function getAllCategoryFieldRenderers() {
  const record = {} as Record<EFieldCategory, FieldRendererBase[]>;
  const list = [] as {
    category: EFieldCategory;
    renderers: FieldRendererBase[];
  }[];
  getAllFieldRenderers().forEach((el) => {
    if (!record[el.category]) {
      record[el.category] = [];
      list.push({ category: el.category, renderers: record[el.category] });
    }
    record[el.category].push(el);
  });
  return list;
}
