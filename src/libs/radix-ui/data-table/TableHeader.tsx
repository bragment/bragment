import { flexRender, Header } from '@tanstack/react-table';
import clsx from 'clsx';
import { ITableItemProps } from './types';

interface ITableHeaderProps<TData, TValue> extends ITableItemProps {
  header: Header<TData, TValue>;
}

function TableHeader<TData, TValue>({
  header,
  sticky,
  left,
  right,
  firstCentered,
  lastCentered,
  firstLeftPinned,
  lastLeftPinned,
  firstRightPinned,
  lastRightPinned,
}: ITableHeaderProps<TData, TValue>) {
  const context = header.getContext();
  const resizing = header.column.getIsResizing();
  const { enableResizing } = header.column.columnDef;

  return (
    <th
      className={clsx('relative', sticky ? 'sticky bg-base-100 z-[1]' : 'z-0')}
      data-first-centered={firstCentered || undefined}
      data-last-centered={lastCentered || undefined}
      data-first-left-pinned={firstLeftPinned || undefined}
      data-last-left-pinned={lastLeftPinned || undefined}
      data-first-right-pinned={firstRightPinned || undefined}
      data-last-right-pinned={lastRightPinned || undefined}
      style={{ width: header.getSize(), left, right }}>
      {flexRender(header.column.columnDef.header, context)}

      <div
        className={clsx(
          'resizer',
          'absolute top-0 bottom-0 right-0',
          'w-2 select-none touch-none',
          'bg-transparent data-[resizing=true]:bg-base-content/20 border-l-2 border-l-transparent border-r border-r-base-200',
          enableResizing && 'cursor-col-resize hover:bg-base-content/20',
          lastRightPinned && 'hidden'
        )}
        data-resizing={resizing}
        onMouseDown={enableResizing ? header.getResizeHandler() : undefined}
        onTouchStart={enableResizing ? header.getResizeHandler() : undefined}
      />
    </th>
  );
}

export default TableHeader;
