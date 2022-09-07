import {
  Column,
  ColumnSort,
  createColumnHelper,
  FilterFn,
  FilterFnOption,
  SortingFn,
} from '@tanstack/react-table';
import classNames from 'classnames';
import {
  EDataFieldType,
  EDataFilterOperator,
  IProjectDataField,
  IProjectDataFilter,
  IProjectDataRecord,
  IProjectDataSorter,
  IRecordFieldData,
} from '../../libs/client/types';
import BodyCell from './BodyRow/Cell';
import HeadCell from './HeadRow/Cell';
import { IGlobalFilter } from './types';
import styles from './index.module.scss';

export function createFieldDataAccessor(field: IProjectDataField) {
  return (record: IProjectDataRecord) => record.data[field._id];
}

const sortingFn: SortingFn<IProjectDataRecord> = (rowA, rowB, columnId) => {
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

const filterFn: FilterFn<IProjectDataRecord> = (
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

export function createColumns(
  projectId: string,
  mainFieldId: string,
  modelFields: IProjectDataField[]
) {
  const columnHelper = createColumnHelper<IProjectDataRecord>();
  return modelFields.map((field) => {
    const id = field._id;
    const main = id === mainFieldId;
    return columnHelper.accessor(createFieldDataAccessor(field), {
      id,
      enableGlobalFilter:
        field.type === EDataFieldType.SingleLineText ||
        field.type === EDataFieldType.MultipleLineText,
      enableColumnFilter: true,
      filterFn,
      enableSorting: true,
      sortingFn,
      cell: (info) => (
        <BodyCell
          className={classNames(
            main ? 'sticky left-16 z-10' : 'relative',
            main && styles.leftScrollable
          )}
          projectId={projectId}
          record={info.row.original}
          field={field}
          data={info.getValue()}
        />
      ),
      header: () => (
        <HeadCell
          className={classNames(
            main ? 'sticky left-16 z-10' : 'relative',
            main && styles.leftScrollable
          )}
          projectId={projectId}
          existingFields={modelFields}
          field={field}
          main={main}
        />
      ),
    });
  });
}

export function convertToColumnVisibility(
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

export function convertToColumnSorting(sorters: IProjectDataSorter[]) {
  return sorters.map<ColumnSort>(({ field, descending }) => ({
    id: field,
    desc: descending,
  }));
}

export function convertToColumnFilters(filters: IProjectDataFilter[]) {
  return filters.map(({ field, operator, operand }) => ({
    id: field,
    value: { operator, operand },
  }));
}

export const globalFilterFn: FilterFnOption<IProjectDataRecord> = (
  row,
  columnId: string,
  filter: IGlobalFilter
) => {
  const { updatedAt, keywords } = filter;
  const data = row.getValue<IRecordFieldData | undefined>(columnId);
  const value = data?.value;
  if (!value) {
    return false;
  }
  if (!keywords.length || row.original.updatedAt > updatedAt) {
    return true;
  }
  let index = 0;
  for (const word of keywords) {
    index = value.indexOf(word, index);
    if (index > -1) {
      index += word.length;
    } else {
      return false;
    }
  }
  return true;
};

export const getColumnCanGlobalFilter = (column: Column<IProjectDataRecord>) =>
  !!column.columnDef.enableGlobalFilter;
