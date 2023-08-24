import { Header, Table } from '@tanstack/react-table';
import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import { IconType } from 'react-icons/lib';
import {
  EDataViewType,
  IProject,
  IProjectDataModel,
  IProjectDataRecord,
  IProjectDataView,
  IRecordFieldData,
} from '@/libs/client/types';

export const COLUMN_SEQUENCE = 'COLUMN_SEQUENCE';
export const COLUMN_SEQUENCE_WIDTH = 64;
export const COLUMN_ADD = 'COLUMN_ADD';
export const COLUMN_ADD_WIDTH = 64;
export const COLUMN_WIDTH_MIN = 120;
export const COLUMN_WIDTH_MAX = 600;

export interface IColumnHeaderMenuItem<
  TData = IProjectDataRecord,
  TValue = IRecordFieldData
> {
  key: string;
  title: string;
  className?: string;
  disabled?:
    | boolean
    | ((header: Header<TData, TValue>, table: Table<TData>) => boolean);
  hidden?:
    | boolean
    | ((header: Header<TData, TValue>, table: Table<TData>) => boolean);
  Icon?: IconType;
  onSelect?: (header: Header<TData, TValue>, table: Table<TData>) => void;
}

interface IProjectDataBaseProps {
  project: IProject;
  model: IProjectDataModel;
  view: IProjectDataView;
}
export interface ICreateFieldFormProps extends IProjectDataBaseProps {
  onFinish?(data: IProject): void;
  onLoadingChange?(loading: boolean): void;
}
export interface ICreateFieldFormRef {
  focus: () => void;
  submit: () => Promise<void>;
}
export interface ICreateRecordInputProps extends IProjectDataBaseProps {
  onFinish?(data: IProjectDataRecord): void;
  onLoadingChange?(loading: boolean): void;
}
export interface ICreateRecordInputRef extends ICreateFieldFormRef {}

export interface ICreateColumnListOptions extends IProjectDataBaseProps {
  records: IProjectDataRecord[];
  headerMenuItems: IColumnHeaderMenuItem[];
  CreateFieldForm?: ForwardRefExoticComponent<
    PropsWithoutRef<ICreateFieldFormProps> & RefAttributes<ICreateFieldFormRef>
  >;
  CreateRecordInput?: ForwardRefExoticComponent<
    PropsWithoutRef<ICreateRecordInputProps> &
      RefAttributes<ICreateRecordInputRef>
  >;
}

export interface IViewProps extends ICreateColumnListOptions {
  onFieldWidthChange?(table: Table<IProjectDataRecord>, columnId: string): void;
  onVisibleFieldsChange?(table: Table<IProjectDataRecord>): void;
}

export interface IViewRenderer {
  type: EDataViewType;
  Icon: IconType;
  View(props: IViewProps): JSX.Element;
}
