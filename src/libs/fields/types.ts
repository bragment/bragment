import { ILocalMessage } from '../../i18n/types';
import { IProjectDataField } from '../client/types';

export enum EFieldCategory {
  Basic = 'BASIC',
  Builtin = 'BUILTIN',
  Advanced = 'ADVANCED',
}

export interface IResolvablePath {
  name: ILocalMessage;
  value: string;
}

export interface ICreateFieldExtraProps {
  existingFields?: IProjectDataField[];
}

export interface ICreateFieldExtraRef {
  getExtraData: () => Partial<IProjectDataField>;
}

export interface IEditingTableBodyCellProps {
  className?: string;
  loading?: boolean;
  bordered?: boolean;
  onCancel?: () => void;
  onChange?: (value: string) => void;
}
