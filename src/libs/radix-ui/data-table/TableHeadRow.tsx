import { Header } from '@tanstack/react-table';
import { useMemo } from 'react';
import TableHead from './TableHeader';

interface ITableHeadRowProps<TData, TValue> {
  headers: Header<TData, TValue>[];
}

function TableHeadRow<TData, TValue>({
  headers,
}: ITableHeadRowProps<TData, TValue>) {
  const [leftHeaders, centerHeaders, rightHeaders] = useMemo(() => {
    const left: Header<TData, TValue>[] = [];
    const center: Header<TData, TValue>[] = [];
    const right: Header<TData, TValue>[] = [];
    headers.forEach((header) => {
      const pinned = header.column.getIsPinned();
      if (pinned === 'left') {
        left.push(header);
      } else if (pinned === 'right') {
        right.push(header);
      } else {
        center.push(header);
      }
    });
    return [left, center, right];
  }, [headers]);

  let rightWidth = rightHeaders.reduce(
    (previous, current) => previous + current.getSize(),
    0
  );

  return (
    <tr>
      {leftHeaders.map((header, i) => (
        <TableHead
          key={header.id}
          header={header}
          left={header.getStart('left')}
          firstLeftPinned={i === 0}
          lastLeftPinned={i === leftHeaders.length - 1}
          sticky
        />
      ))}
      {centerHeaders.map((header, i) => (
        <TableHead
          key={header.id}
          header={header}
          firstCentered={i === 0}
          lastCentered={i === centerHeaders.length - 1}
        />
      ))}
      {rightHeaders.map((header, i) => (
        <TableHead
          key={header.id}
          header={header}
          right={(rightWidth -= header.getSize())}
          firstRightPinned={i === 0}
          lastRightPinned={i === rightHeaders.length - 1}
          sticky
        />
      ))}
    </tr>
  );
}

export default TableHeadRow;
