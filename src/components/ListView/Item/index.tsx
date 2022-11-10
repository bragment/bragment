import { Cell } from '@tanstack/react-table';
import { memo } from 'react';
import { IProjectDataRecord } from '../../../libs/client/types';

interface IItemProps {
  index: number;
  cells: Cell<IProjectDataRecord, unknown>[];
  className?: string;
}

function Item(props: IItemProps) {
  const { cells, className } = props;

  return (
    <div className={className}>
      {cells.map((cell) => {
        const CellComponent = cell.column.columnDef.cell;
        return (
          CellComponent && (
            <CellComponent key={cell.id} {...cell.getContext()} />
          )
        );
      })}
    </div>
  );
}

export default memo(Item);
