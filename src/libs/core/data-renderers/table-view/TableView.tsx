import {
  ColumnPinningState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Table,
} from '@tanstack/react-table';
import { isEqual } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  createColumns,
  getColumnOrder,
  getColumnPinning,
  getColumnVisibility,
} from './helpers';
import './index.scss';
import { useDeepState } from './hookts';
import { ITableHeaderMenuItem } from './types';
import {
  IProjectDataField,
  IProjectDataRecord,
  IProjectDataView,
  IRecordFieldData,
} from '@/libs/client/types';
import DataTable, {
  IDataTableProps,
  IDataTableRef,
} from '@/libs/radix-ui/data-table/DataTable';

export interface ITableViewProps {
  view: IProjectDataView;
  modelFields: IProjectDataField[];
  modelRecords: IProjectDataRecord[];
  headerMenuItems: ITableHeaderMenuItem[];
  onFieldWidthChange?: (
    table: Table<IProjectDataRecord>,
    columnId: string
  ) => void;
  onVisibleFieldsChange?: (table: Table<IProjectDataRecord>) => void;
}

function TableView({
  view,
  modelFields,
  modelRecords,
  headerMenuItems,
  onVisibleFieldsChange,
  onFieldWidthChange,
}: ITableViewProps) {
  const dataTableRef = useRef<IDataTableRef<IProjectDataRecord>>(null);
  const modelFieldIds = modelFields.map((el) => el._id);
  const { fieldWidth, leftPinnedFields, visibleFields } = view;
  const columns = useMemo(
    () =>
      createColumns(modelFields, {
        fieldWidth: fieldWidth || {},
        headerMenuItems,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modelFields, headerMenuItems]
  );

  const [columnOrder, setColumnOrder] = useDeepState(
    getColumnOrder(modelFieldIds, visibleFields)
  );

  const [columnPinning, setColumnPinning] = useDeepState<ColumnPinningState>(
    getColumnPinning(leftPinnedFields)
  );

  const [columnVisibility, setColumnVisibility] = useDeepState(
    getColumnVisibility(modelFieldIds, visibleFields)
  );

  const columnOrderRef = useRef(columnOrder);
  const columnPinningRef = useRef(columnPinning);
  const columnVisibilityRef = useRef(columnVisibility);
  useEffect(() => {
    const changed =
      !isEqual(columnOrderRef.current, columnOrder) ||
      !isEqual(columnPinningRef.current, columnPinning) ||
      !isEqual(columnVisibilityRef.current, columnVisibility);
    const table = dataTableRef.current?.getTable();
    if (changed && table && onVisibleFieldsChange) {
      onVisibleFieldsChange(table);
    }
    columnOrderRef.current = columnOrder;
    columnPinningRef.current = columnPinning;
    columnVisibilityRef.current = columnVisibility;
  }, [columnOrder, columnPinning, columnVisibility, onVisibleFieldsChange]);

  const dataTableProps: IDataTableProps<IProjectDataRecord, IRecordFieldData> =
    {
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

      onResizeColumnEnd: useCallback(
        (columnId: string) => {
          const table = dataTableRef.current?.getTable();
          if (table && onFieldWidthChange) {
            onFieldWidthChange(table, columnId);
          }
        },
        [onFieldWidthChange]
      ),
    };

  return <DataTable ref={dataTableRef} {...dataTableProps} />;
}

export default memo(TableView);
