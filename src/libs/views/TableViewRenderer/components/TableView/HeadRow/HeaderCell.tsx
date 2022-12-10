import { Header } from '@tanstack/react-table';
import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import {
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../../../../client/types';
import { getFieldIcon } from '../../../../../fields';
import { ICurrentViewRenderer } from '../../../types';
import UpdateDataFieldTitleForm from './UpdateDataFieldTitleForm';
import styles from '../index.module.scss';

interface IItermProps {
  index: number;
  header: Header<IProjectDataRecord, IRecordFieldData | undefined>;
  renderer: ICurrentViewRenderer;
  modelFields?: IProjectDataField[];
  className?: string;
  borderedLeft?: boolean;
  borderedRight?: boolean;
}

function HeaderCell(props: IItermProps) {
  const {
    modelFields,
    header,
    renderer,
    borderedLeft,
    borderedRight,
    className,
  } = props;
  const [editing, setEditing] = useState(false);
  const fieldId = header.column.id;
  const field = renderer.getFieldRendererById(fieldId)?.field;
  const { projectId } = renderer.commonStore.unobservable;
  const title = field?.title || '';
  const Icon = field ? getFieldIcon(field.type) : undefined;

  const handleDoubleClick = () => {
    setEditing(true);
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
        className,
        'w-52 px-4 py-0',
        'justify-start',
        borderedLeft && 'border-l',
        borderedRight && 'border-r',
        styles.cell
      )}
      onDoubleClick={handleDoubleClick}>
      {Icon && (
        <Icon
          className={classNames(
            'flex-none mr-2 text-lg',
            editing && 'relative z-30'
          )}
        />
      )}
      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
        {field?.title}
      </div>
      {editing && (
        <div
          className={classNames(
            'bg-base-100',
            'absolute top-0 left-0 z-20',
            'h-full p-1 ring-4 ring-inset ring-secondary',
            'flex items-center'
          )}>
          <UpdateDataFieldTitleForm
            projectId={projectId}
            fieldId={field?._id || ''}
            title={title}
            existingFields={modelFields}
            onCancel={handleCancel}
            onFinish={handleFinish}
          />
        </div>
      )}
    </div>
  );
}

export default memo(HeaderCell);
