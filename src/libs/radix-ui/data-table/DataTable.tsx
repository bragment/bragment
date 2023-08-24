import {
  ColumnDef,
  Header,
  Table,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import {
  forwardRef,
  memo,
  Ref,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import { ScrollArea } from '../scroll-area';
import TableBodyRow from './TableBodyRow';
import TableFootRow from './TableFootRow';
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

export interface IDataTableRef<TData> {
  getTable(): Table<TData>;
  scrollToRight(): void;
}

export interface IDataTableProps<TData, TValue> extends TableOptions<TData> {
  columns: ColumnDef<TData, TValue>[];
  onResizeColumnEnd?: (resizingColumn: string) => void;
}

function DataTable<TData, TValue>(
  { onResizeColumnEnd, ...others }: IDataTableProps<TData, TValue>,
  ref: Ref<IDataTableRef<TData>>
) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastColumnRef = useRef<HTMLTableColElement>(null);

  const table = useReactTable(others);
  const leafHeaders = table.getLeafHeaders();
  const rowModel = table.getRowModel();
  const { isResizingColumn } = table.getState().columnSizingInfo;
  const resizingColumnRef = useRef(isResizingColumn || '');

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

  useEffect(() => {
    if (
      onResizeColumnEnd &&
      resizingColumnRef.current &&
      isResizingColumn === false
    ) {
      onResizeColumnEnd(resizingColumnRef.current);
    }
    resizingColumnRef.current = isResizingColumn || '';
  }, [isResizingColumn, onResizeColumnEnd]);

  useImperativeHandle(
    ref,
    () => ({
      getTable: () => table,
      scrollToRight: () => {
        const div = wrapperRef.current?.querySelector(
          '[data-radix-scroll-area-viewport]'
        );
        if (div) {
          div.scrollLeft = div.scrollWidth - div.clientWidth;
        }
      },
    }),
    [table]
  );

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <ScrollArea
        className={clsx('border-base-200 border-t', 'h-full')}
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
          <tfoot className={clsx('bg-base-100', 'sticky bottom-0 z-10')}>
            <TableFootRow footers={leafHeaders} />
          </tfoot>
        </table>
      </ScrollArea>
    </div>
  );
}
type IDataTableComponent = <TData, TValue>(
  props: IDataTableProps<TData, TValue> & { ref: Ref<IDataTableRef<TData>> }
) => JSX.Element;
export default memo(forwardRef(DataTable)) as IDataTableComponent;
