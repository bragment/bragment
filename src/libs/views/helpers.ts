import {
  ColumnFilter,
  ColumnSort,
  FilterFn,
  SortingFn,
} from '@tanstack/react-table';
import {
  EDataFilterOperator,
  IDataFilter,
  IDataSorter,
  IProjectDataRecord,
  IRecordFieldData,
} from '../client/types';

export const sortingFn: SortingFn<IProjectDataRecord> = (
  rowA,
  rowB,
  columnId
) => {
  const a =
    rowA.getValue<IRecordFieldData | undefined>(columnId)?.value.toString() ||
    '';
  const b =
    rowB.getValue<IRecordFieldData | undefined>(columnId)?.value.toString() ||
    '';

  if (a === b) {
    return 0;
  }
  return a > b ? 1 : -1;
};

export const filterFn: FilterFn<IProjectDataRecord> = (
  row,
  columnId,
  filterValue = {}
) => {
  const value =
    row.getValue<IRecordFieldData | undefined>(columnId)?.value.toString() ||
    '';
  const { operator, operand } = filterValue;
  if (operator === EDataFilterOperator.Contain) {
    return value.includes(operand || '');
  }
  return true;
};

export function convertToFieldVisibility(
  allIds: string[],
  visibleIds: string[]
) {
  const flag = visibleIds.length === 0;
  const record = allIds.reduce<Record<string, boolean>>((prev, el) => {
    prev[el] = flag;
    return prev;
  }, {});
  if (!flag) {
    visibleIds.forEach((el) => {
      record[el] = true;
    });
  }
  return record;
}

export function convertToFieldSorting(sorters: IDataSorter[]) {
  return sorters.map<ColumnSort>(({ field, descending }) => ({
    id: field,
    desc: descending,
  }));
}

export function convertToFieldFilters(filters: IDataFilter[]) {
  return filters.map<ColumnFilter>(
    ({ field, conjunction, operand, operator }) => ({
      id: field,
      value: {
        conjunction,
        operand,
        operator,
      },
    })
  );
}
