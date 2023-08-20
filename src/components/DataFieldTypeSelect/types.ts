import { ILocalMessage } from '@/i18n/types';
import { EDataFieldType } from '@/libs/client/types';
import { EFieldCategory } from '@/libs/core/field-renderers/types';

export const fieldTypeMessageIdRecord: Record<EDataFieldType, ILocalMessage> = {
  [EDataFieldType.Date]: 'dataField.date',
  [EDataFieldType.HttpLink]: 'dataField.httpLink',
  [EDataFieldType.Image]: 'dataField.image',
  [EDataFieldType.Image]: 'dataField.image',
  [EDataFieldType.MultipleLineText]: 'dataField.multipleLineText',
  [EDataFieldType.MultipleSelect]: 'dataField.multipleSelect',
  [EDataFieldType.Number]: 'dataField.number',
  [EDataFieldType.Resolver]: 'dataField.resolver',
  [EDataFieldType.Plain]: 'dataField.plain',
  [EDataFieldType.SingleLineText]: 'dataField.singleLineText',
  [EDataFieldType.SingleSelect]: 'dataField.singleSelect',
};

export const fieldCategoryMessageIdRecord: Record<
  EFieldCategory,
  ILocalMessage
> = {
  [EFieldCategory.Basic]: 'dataField.basic',
  [EFieldCategory.Builtin]: 'dataField.builtin',
  [EFieldCategory.Advanced]: 'dataField.advanced',
};

export const defaultFieldType = EDataFieldType.SingleLineText;
