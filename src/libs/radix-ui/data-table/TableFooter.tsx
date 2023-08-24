import { flexRender, Header } from '@tanstack/react-table';
import clsx from 'clsx';
import { ITableItemProps } from './types';

interface ITableFooterProps<TData, TValue> extends ITableItemProps {
  footer: Header<TData, TValue>;
}

function TableFooter<TData, TValue>({
  footer,
}: ITableFooterProps<TData, TValue>) {
  const context = footer.getContext();
  return (
    <th className={clsx('relative px-2 py-1.5')}>
      {flexRender(footer.column.columnDef.footer, context)}
    </th>
  );
}

export default TableFooter;
