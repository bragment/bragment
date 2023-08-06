import { Cell, flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import { ITableItemProps } from './types';

interface ITableCellProps<TData, TValue> extends ITableItemProps {
  cell: Cell<TData, TValue>;
}

function TableCell<TData, TValue>({
  cell,
  sticky,
  left,
  right,
  firstCentered,
  lastCentered,
  firstLeftPinned,
  lastLeftPinned,
  firstRightPinned,
  lastRightPinned,
}: ITableCellProps<TData, TValue>) {
  const context = cell.getContext();
  return (
    <td
      className={clsx(sticky ? 'sticky bg-base-100 z-[1]' : 'z-0')}
      data-first-centered={firstCentered || undefined}
      data-last-centered={lastCentered || undefined}
      data-first-left-pinned={firstLeftPinned || undefined}
      data-last-left-pinned={lastLeftPinned || undefined}
      data-first-right-pinned={firstRightPinned || undefined}
      data-last-right-pinned={lastRightPinned || undefined}
      style={{ width: cell.column.getSize(), left, right }}>
      {flexRender(cell.column.columnDef.cell, context)}
    </td>
  );
}

export default TableCell;
