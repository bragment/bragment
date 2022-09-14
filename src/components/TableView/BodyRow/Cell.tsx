import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import { getFieldRenderer } from '../../../fields/renders';
import {
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../../libs/client/types';
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

  const handleDoubleClick = () => setEditing(true);

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
        {renderer && renderer.renderTableCell(field, data)}
        {editing && (
          <div
            className={classNames(
              'absolute top-0 left-0 z-20',
              'w-full h-full pt-1',
              'flex items-start'
            )}>
            <UpdateRecordFieldDataForm
              projectId={projectId}
              recordId={record._id}
              field={field}
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
