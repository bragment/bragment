import { Header, Table } from '@tanstack/react-table';
import { IconType } from 'react-icons/lib';
import { IProjectDataRecord, IRecordFieldData } from '@/libs/client/types';

export const COLUMN_SEQUENCE = 'COLUMN_SEQUENCE';
export const COLUMN_SEQUENCE_WIDTH = 64;
export const COLUMN_ADD = 'COLUMN_ADD';
export const COLUMN_ADD_WIDTH = 64;
export const COLUMN_WIDTH_MIN = 120;
export const COLUMN_WIDTH_MAX = 600;

export interface ITableHeaderMenuItem<
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
