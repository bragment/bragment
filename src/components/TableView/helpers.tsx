import { createColumnHelper } from '@tanstack/react-table';
import classNames from 'classnames';
import { IProjectDataField, IProjectDataRecord } from '../../libs/client/types';
import BodyCell from './BodyRow/Cell';
import HeadCell from './HeadRow/Cell';
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
