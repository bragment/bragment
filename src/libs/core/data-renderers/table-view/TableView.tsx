import {
  ColumnPinningState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { memo, useMemo, useState } from 'react';
import {
  createColumns,
  getColumnOrder,
  getColumnPinning,
  getColumnVisibility,
} from './helpers';
import './index.scss';
import { ITableHeaderMenuItem } from './types';
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
  headerMenuItems: ITableHeaderMenuItem[];
}

function TableView({
  view,
  modelFields,
  modelRecords,
  headerMenuItems,
}: ITableViewProps) {
  const modelFieldIds = modelFields.map((el) => el._id);
  const { visibleFields } = view;
  const columns = useMemo(
    () => createColumns(modelFields, { headerMenuItems }),
    [modelFields, headerMenuItems]
  );

  const [columnOrder, setColumnOrder] = useState(
    getColumnOrder(modelFieldIds, visibleFields)
  );

  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(
    getColumnPinning()
  );

  const [columnVisibility, setColumnVisibility] = useState(
    getColumnVisibility(modelFieldIds, visibleFields)
  );

  const tableOptions: DataTableProps<IProjectDataRecord, IRecordFieldData> = {
    data: modelRecords,
    columns,
    columnResizeMode: 'onChange',
    state: {
      columnOrder,
      columnPinning,
      columnVisibility,
    },
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
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
