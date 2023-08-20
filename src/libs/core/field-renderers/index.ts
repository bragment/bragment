import { getAllFieldRenderers, resolveFieldRenderer } from './helpers';
import defaultRenderer from './single-line-text';
import { EFieldCategory, IFieldRenderer } from './types';
import { EDataFieldType } from '@/libs/client/types';

export function getFieldRenderer(type: EDataFieldType) {
  return resolveFieldRenderer(type) ?? defaultRenderer;
}

export function getAllCategoryFieldRenderers() {
  const record = {} as Record<EFieldCategory, IFieldRenderer[]>;
  const list = [] as {
    category: EFieldCategory;
    renderers: IFieldRenderer[];
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
