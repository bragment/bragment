import { CellContext } from '@tanstack/react-table';
import { IProjectDataRecord, IRecordFieldData } from '@/libs/client/types';

interface ICellProps
  extends CellContext<IProjectDataRecord, IRecordFieldData> {}

function Cell({ cell }: ICellProps) {
  return (
    <div className="w-full">
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {cell.getValue()?.value}
      </div>
    </div>
  );
}

export default Cell;
