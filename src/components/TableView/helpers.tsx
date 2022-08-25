import {
  Column,
  createColumnHelper,
  FilterFnOption,
} from '@tanstack/react-table';
import classNames from 'classnames';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../libs/client/types';
import BodyCell from './BodyRow/Cell';
import HeadCell from './HeadRow/Cell';
import { IGlobalFilter } from './types';
import styles from './index.module.scss';

export function createFieldDataAccessor(field: IProjectDataField) {
  return (record: IProjectDataRecord) => record.data[field._id];
}

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
        field.type === EDataFieldType.MultiLineText,
      cell: (info) => (
        <BodyCell
          className={classNames(
            main ? 'sticky left-16 z-10' : 'relative',
            main && styles.scrollableLeft
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
            main && styles.scrollableLeft
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
