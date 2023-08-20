import { IconType } from 'react-icons/lib';
import { EDataFieldType } from '@/libs/client/types';

export enum EFieldCategory {
  Basic = 'BASIC',
  Builtin = 'BUILTIN',
  Advanced = 'ADVANCED',
}

export interface IFieldRenderer {
  type: EDataFieldType;
  category: EFieldCategory;
  Icon: IconType;
}
