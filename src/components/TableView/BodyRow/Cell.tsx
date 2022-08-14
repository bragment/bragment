import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import {
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../../libs/client/types';
import UpdateRecordFieldDataForm from './UpdateRecordFieldDataForm';
import styles from '../index.module.scss';

interface IItermProps {
  field: IProjectDataField;
  record: IProjectDataRecord;
  data: IRecordFieldData;
  borderedLeft?: boolean;
  borderedRight?: boolean;
  className?: string;
}

function Cell(props: IItermProps) {
  const { field, record, data, borderedLeft, borderedRight, className } = props;
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = useCallback(() => {
    setEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setEditing(false);
  }, []);

  const value = data?.value || '';

  return (
    <div
      className={classNames(
        'w-52 py-0 px-4',
        borderedLeft && 'border-l',
        borderedRight && 'border-r',
        className,
        styles.cell
      )}
      onDoubleClick={handleDoubleClick}>
      <div className="text-ellipsis overflow-hidden">{data?.value || ''}</div>
      {editing && (
        <div
          className={classNames(
            'bg-base-100',
            'absolute top-0 left-0 z-20',
            'w-full h-full',
            'flex items-center'
          )}>
          <UpdateRecordFieldDataForm
            projectId={record.project}
            recordId={record._id}
            fieldId={field._id}
            defaultValue={value}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}

export default memo(Cell);
