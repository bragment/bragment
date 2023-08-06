import {
  ColumnDef,
  Header,
  Table,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { ScrollArea } from '../scroll-area';
import TableBodyRow from './TableBodyRow';
import TableHeadRow from './TableHeadRow';

function updateLastTableColumnWidth<TData, TValue>(
  table: Table<TData>,
  lastHeader?: Header<TData, TValue>,
  wrapper?: HTMLDivElement | null,
  column?: HTMLTableColElement | null
) {
  if (lastHeader && wrapper && column) {
    const base = lastHeader.column.columnDef.size || 64;
    const diff = wrapper.clientWidth - table.getTotalSize();
    column.style.width = base + Math.max(diff, 0) + 'px';
  }
}

export interface DataTableProps<TData, TValue> extends TableOptions<TData> {
  columns: ColumnDef<TData, TValue>[];
}

function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastColumnRef = useRef<HTMLTableColElement>(null);

  const table = useReactTable(props);
  const leafHeaders = table.getLeafHeaders();
  const rowModel = table.getRowModel();
  const { isResizingColumn } = table.getState().columnSizingInfo;

  useLayoutEffect(() => {
    updateLastTableColumnWidth(
      table,
      leafHeaders[leafHeaders.length - 1],
      wrapperRef.current,
      lastColumnRef.current
    );
  });

  useEffect(() => {
    const handleWindowResize = () =>
      updateLastTableColumnWidth(
        table,
        leafHeaders[leafHeaders.length - 1],
        wrapperRef.current,
        lastColumnRef.current
      );
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [table, leafHeaders]);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <ScrollArea
        className="h-full border-t border-base-200"
        viewportClassName="max-w-full max-h-full"
        horizontal
        vertical>
        <table
          className={clsx('table table-fixed', 'w-fit z-0')}
          data-column-resizing={!!isResizingColumn || undefined}>
          <colgroup>
            {leafHeaders?.map((header, i) => (
              <col
                key={header.id}
                ref={i === leafHeaders.length - 1 ? lastColumnRef : undefined}
              />
            ))}
          </colgroup>
          <thead className={clsx('bg-base-100', 'sticky top-0 z-10')}>
            <TableHeadRow headers={leafHeaders} />
          </thead>

          <tbody className="z-0">
            {rowModel.rows.map((row) => {
              return <TableBodyRow key={row.id} row={row} />;
            })}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}

export default memo(DataTable) as typeof DataTable;
