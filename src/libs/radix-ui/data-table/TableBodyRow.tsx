import { Row } from '@tanstack/react-table';
import TableCell from './TableCell';

interface ITableBodyRowProps<TData> {
  row: Row<TData>;
}

function TableBodyRow<TData>({ row }: ITableBodyRowProps<TData>) {
  const leftCells = row.getLeftVisibleCells();
  const centerCells = row.getCenterVisibleCells();
  const rightCells = row.getRightVisibleCells();

  let rightWidth = rightCells.reduce(
    (previous, current) => previous + current.column.getSize(),
    0
  );

  return (
    <tr className="hover">
      {leftCells.map((cell, i) => (
        <TableCell
          key={cell.id}
          cell={cell}
          left={cell.column.getStart('left')}
          firstLeftPinned={i === 0}
          lastLeftPinned={i === leftCells.length - 1}
          sticky
        />
      ))}
      {centerCells.map((cell, i) => (
        <TableCell
          key={cell.id}
          cell={cell}
          firstCentered={i === 0}
          lastCentered={i === centerCells.length - 1}
        />
      ))}
      {rightCells.map((cell, i) => (
        <TableCell
          key={cell.id}
          cell={cell}
          right={(rightWidth -= cell.column.getSize())}
          firstRightPinned={i === 0}
          lastRightPinned={i === rightCells.length - 1}
          sticky
        />
      ))}
    </tr>
  );
}

export default TableBodyRow;
