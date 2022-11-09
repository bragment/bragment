import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import {
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../../libs/client/types';
import { getFieldRenderer } from '../../../libs/fields';
import UpdateRecordFieldDataForm from './UpdateRecordFieldDataForm';
import styles from '../index.module.scss';

interface IItermProps {
  projectId: string;
  field: IProjectDataField;
  record: IProjectDataRecord;
  data?: IRecordFieldData;
  borderedLeft?: boolean;
  borderedRight?: boolean;
  className?: string;
}

function Cell(props: IItermProps) {
  const {
    projectId,
    field,
    record,
    data,
    borderedLeft,
    borderedRight,
    className,
  } = props;
  const [editing, setEditing] = useState(false);
  const renderer = getFieldRenderer(field.type);

  const handleDoubleClick = () => {
    if (renderer?.editable) {
      setEditing(true);
    }
  };

  const handleCancel = useCallback(() => {
    setEditing(false);
  }, []);

  const handleFinish = useCallback(() => {
    setEditing(false);
  }, []);

  return (
    <div
      className={classNames(
        'w-52 p-0',
        borderedLeft && 'border-l',
        borderedRight && 'border-r',
        className,
        styles.cell
      )}
      onDoubleClick={handleDoubleClick}>
      <div className={styles.content}>
        {renderer && renderer.renderTableBodyCell(field, record)}
        {editing && (
          <div
            className={classNames(
              'bg-base-100',
              'absolute top-0 left-0 z-30',
              'w-full min-h-full py-1 ring-4 ring-inset ring-secondary',
              'flex items-start'
            )}>
            <UpdateRecordFieldDataForm
              projectId={projectId}
              field={field}
              record={record}
              data={data}
              onCancel={handleCancel}
              onFinish={handleFinish}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Cell);
