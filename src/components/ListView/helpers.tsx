import { createColumnHelper } from '@tanstack/react-table';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
} from '../../libs/client/types';
import { getFieldRenderer } from '../../libs/fields';
import {
  createFieldDataAccessor,
  filterFn,
  sortingFn,
} from '../TableView/helpers';
import ItemCell from './Item/Cell';

export function calculateListItemHeight(fields: IProjectDataField[]) {
  return fields.reduce((prev, el) => {
    const renderer = getFieldRenderer(el.asType || el.type);
    return prev + (renderer?.listItemCellHeight || 0);
  }, 0);
}

export function createColumns(
  projectId: string,
  modelFields: IProjectDataField[],
  mainFieldId?: string
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
        <ItemCell
          projectId={projectId}
          record={info.row.original}
          field={field}
          data={info.getValue()}
          main={main}
        />
      ),
    });
  });
}
