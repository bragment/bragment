import { Header } from '@tanstack/react-table';
import TableFooter from './TableFooter';

interface ITableFootRowProps<TData, TValue> {
  footers: Header<TData, TValue>[];
}

function TableFootRow<TData, TValue>({
  footers,
}: ITableFootRowProps<TData, TValue>) {
  return (
    <tr className="border-base-200 border-t">
      {footers.map((footer) => (
        <TableFooter key={footer.id} footer={footer} />
      ))}
    </tr>
  );
}

export default TableFootRow;
