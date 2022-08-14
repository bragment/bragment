import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import { IProjectDataField } from '../../../libs/client/types';
import { dataFieldTypeRecord } from '../../DataFieldTypeSelect/config';
import UpdateDataFieldTitleForm from './UpdateDataFieldTitleForm';
import styles from '../index.module.scss';

interface IItermProps {
  projectId: string;
  field: IProjectDataField;
  existingFields?: IProjectDataField[];
  main?: boolean;
  borderedLeft?: boolean;
  borderedRight?: boolean;
  className?: string;
}

function Cell(props: IItermProps) {
  const {
    projectId,
    field,
    existingFields,
    main,
    borderedLeft,
    borderedRight,
    className,
  } = props;
  const [editing, setEditing] = useState(false);
  const { title = '' } = field;
  const Icon = dataFieldTypeRecord[field.type]?.Icon;

  const handleDoubleClick = useCallback(() => {
    setEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setEditing(false);
  }, []);

  return (
    <div
      className={classNames(
        'w-52 px-4 py-0',
        'justify-start',
        borderedLeft && 'border-l',
        borderedRight && 'border-r',
        main ? 'text-info' : 'text-base-content',
        className,
        styles.cell
      )}
      onDoubleClick={handleDoubleClick}>
      {Icon && (
        <Icon
          className={classNames(
            'mr-2 text-lg',
            editing && 'relative z-30',
            main ? 'text-info-opacity' : 'text-base-content-opacity'
          )}
        />
      )}
      <div className="text-ellipsis overflow-hidden">{field.title}</div>
      {editing && (
        <div
          className={classNames(
            'bg-base-200',
            'absolute top-0 left-0 z-20',
            'h-full',
            'flex items-center'
          )}>
          <UpdateDataFieldTitleForm
            projectId={projectId}
            fieldId={field._id}
            title={title}
            existingFields={existingFields}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}

export default memo(Cell);
