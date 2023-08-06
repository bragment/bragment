import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { memo } from 'react';
import { createColumns } from './helpers';
import './index.scss';

import {
  IProjectDataField,
  IProjectDataRecord,
  IProjectDataView,
  IRecordFieldData,
} from '@/libs/client/types';
import DataTable, {
  DataTableProps,
} from '@/libs/radix-ui/data-table/DataTable';

interface ITableViewProps {
  view: IProjectDataView;
  modelFields: IProjectDataField[];
  modelRecords: IProjectDataRecord[];
}

function TableView({ modelFields, modelRecords }: ITableViewProps) {
  const columns = createColumns(modelFields);

  const tableOptions: DataTableProps<IProjectDataRecord, IRecordFieldData> = {
    data: modelRecords,
    columns,
    columnResizeMode: 'onChange',
    state: {
      columnPinning: { left: ['_SEQUENCE_'], right: ['_ADD_'] },
      // columnFilters: fieldFilters,
      // columnOrder: fieldOrder,
      // columnPinning: fieldPinning,
      // columnVisibility: fieldVisibility,
      // sorting: fieldSorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: process.env.NODE_ENV === 'development',
    debugHeaders: process.env.NODE_ENV === 'development',
    debugColumns: process.env.NODE_ENV === 'development',
  };

  return <DataTable {...tableOptions} />;
}

export default memo(TableView);
