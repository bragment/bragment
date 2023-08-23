import { Table } from '@tanstack/react-table';
import { COLUMN_ADD, COLUMN_SEQUENCE } from './types';
import { IProjectDataRecord } from '@/libs/client/types';

const displayColumnSet = new Set([COLUMN_SEQUENCE, COLUMN_ADD]);
function filterNoDisplayColumn(list: string[]) {
  return list.filter((el) => !displayColumnSet.has(el));
}

export function getViewVisibleFields(table: Table<IProjectDataRecord>) {
  return filterNoDisplayColumn(
    table.getLeafHeaders().map((el) => el.column.id)
  );
}

export function getViewLeftPinnedFields(table: Table<IProjectDataRecord>) {
  return filterNoDisplayColumn(
    table.getLeftLeafHeaders().map((el) => el.column.id)
  );
}

export function getViewFieldWidth(
  table: Table<IProjectDataRecord>,
  columnId: string
) {
  return table.getColumn(columnId)?.getSize();
}
