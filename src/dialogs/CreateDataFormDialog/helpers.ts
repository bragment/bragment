import { IProjectDataField, IProjectDataForm } from '../../libs/client/types';
import { checkIfFieldFormable } from '../../libs/fields';
import { IInnerDataFormItem } from './CreateForm';

export function initializeUsableFields(
  modelFields: IProjectDataField[],
  formItems: IInnerDataFormItem[]
) {
  const set = new Set(formItems.map((el) => el.field._id));
  return modelFields.filter(
    (el) => !set.has(el._id) && checkIfFieldFormable(el.type)
  );
}

export function initializeFormItems(
  modelFields: IProjectDataField[],
  visibleFieldIds?: string[],
  modelForm?: IProjectDataForm
) {
  const record: Record<string, IProjectDataField> = {};
  modelFields.forEach((el) => (record[el._id] = el));
  if (modelForm) {
    return modelForm.items
      .map((el) => ({
        ...el,
        field: record[el.field],
      }))
      .filter((el) => !!el.field && checkIfFieldFormable(el.field.type));
  }
  let visibleFields: IProjectDataField[] = [];
  if (visibleFieldIds && visibleFieldIds.length > 0) {
    visibleFields = visibleFieldIds
      .map((id) => record[id])
      .filter((el) => !!el && checkIfFieldFormable(el.type));
  }
  return (visibleFields.length ? visibleFields : modelFields).map((el) =>
    generateFormItem(el)
  );
}

export function generateFormItem(field: IProjectDataField) {
  return {
    field: field,
    label: field.title,
    required: false,
    defaultValue: '',
  };
}

export function initializeHiddenItems(
  modelFields: IProjectDataField[],
  visibleFieldIds?: string[],
  modelForm?: IProjectDataForm
) {
  if (!visibleFieldIds || modelForm) {
    return [];
  }
  const visibleSet = new Set(visibleFieldIds);
  return modelFields
    .filter((el) => !visibleSet.has(el._id) && checkIfFieldFormable(el.type))
    .map((el) => generateFormItem(el));
}
