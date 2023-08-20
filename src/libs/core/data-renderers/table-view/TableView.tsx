import {
  ColumnPinningState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { isEqual } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  createColumnList,
  getColumnOrder,
  getColumnPinning,
  getColumnVisibility,
} from './helpers';
import './index.scss';
import { useDeepState } from './hookts';
import { ITableViewProps } from './types';
import { IProjectDataRecord, IRecordFieldData } from '@/libs/client/types';
import DataTable, {
  IDataTableProps,
  IDataTableRef,
} from '@/libs/radix-ui/data-table/DataTable';

function TableView({
  project,
  view,
  records,
  headerMenuItems,
  CreateFieldForm,
  onVisibleFieldsChange,
  onFieldWidthChange,
}: ITableViewProps) {
  const dataTableRef = useRef<IDataTableRef<IProjectDataRecord>>(null);
  const { model: modelId, leftPinnedFields, visibleFields } = view;

  const modelFields = useMemo(
    () => project.fields.filter((el) => el.model === modelId) || [],
    [modelId, project.fields]
  );
  const modelRecords = useMemo(
    () => records?.filter((el) => el.model === modelId) || [],
    [modelId, records]
  );

  const columns = useMemo(
    () =>
      createColumnList(modelFields, {
        project,
        view,
        records,
        headerMenuItems,
        CreateFieldForm,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modelFields, headerMenuItems, CreateFieldForm]
  );

  const modelFieldIds = modelFields.map((el) => el._id);
  const [columnOrder, setColumnOrder] = useDeepState(
    getColumnOrder(modelFieldIds, visibleFields)
  );
  const [columnPinning, setColumnPinning] = useDeepState<ColumnPinningState>(
    getColumnPinning(leftPinnedFields)
  );
  const [columnVisibility, setColumnVisibility] = useDeepState(
    getColumnVisibility(modelFieldIds, visibleFields)
  );

  const columnCountRef = useRef(modelFields.length);
  const columnOrderRef = useRef(columnOrder);
  const columnPinningRef = useRef(columnPinning);
  const columnVisibilityRef = useRef(columnVisibility);
  useEffect(() => {
    const added = columnCountRef.current !== modelFields.length;
    if (added) {
      dataTableRef.current?.scrollToRight();
    }
    const changed =
      added ||
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
  }, [
    modelFields.length,
    columnOrder,
    columnPinning,
    columnVisibility,
    onVisibleFieldsChange,
  ]);

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
