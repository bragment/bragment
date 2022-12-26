import { Cell } from '@tanstack/react-table';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import {
  useDialogStore,
  useFormatMessage,
} from '../../../../../../components/hooks';
import {
  IProjectDataRecord,
  IRecordFieldData,
} from '../../../../../client/types';
import { useUpdateProjectDataRecordMutation } from '../../../../../react-query';
import { ICurrentViewRenderer } from '../../../types';
import styles from '../index.module.scss';

interface ICellProps {
  index: number;
  cell: Cell<IProjectDataRecord, IRecordFieldData | undefined>;
  renderer: ICurrentViewRenderer;
  leftBordered?: boolean;
  rightBordered?: boolean;
  className?: string;
}

function BodyCell(props: ICellProps) {
  const { index, cell, renderer, leftBordered, rightBordered, className } =
    props;
  const { toastError } = useDialogStore();
  const f = useFormatMessage();
  const { isLoading, mutateAsync } = useUpdateProjectDataRecordMutation();

  const data = cell.getValue();
  const fieldId = cell.column.id;
  const recordId = cell.row.original._id;
  const fieldRenderer = renderer.getFieldRendererById(fieldId);
  const {
    checkIfCellActive,
    checkIfCellEditing,
    setActiveCell,
    setEditingCell,
  } = renderer.store;
  const { projectId } = renderer.commonStore.unobservable;
  const active = checkIfCellActive(recordId, fieldId);
  const editing = checkIfCellEditing(recordId, fieldId);
  const activeOrEditing = active || editing;

  const handleBlur = () => {
    setActiveCell(recordId, fieldId, false);
  };

  const handleClick = () => {
    if (!activeOrEditing) {
      setActiveCell(recordId, fieldId, true);
    } else if (active && fieldRenderer?.editable) {
      setActiveCell(recordId, fieldId, false);
      setEditingCell(recordId, fieldId, true);
    }
  };

  const onCancel = useCallback(() => {
    setEditingCell(recordId, fieldId, false);
  }, [setEditingCell, recordId, fieldId]);

  const onChange = useCallback(
    async (value: string) => {
      if (isLoading) {
        return;
      }
      value = value.trim();
      if (value === data?.value) {
        if (onCancel) {
          onCancel();
        }
        return;
      }
      const fields = {
        projectId,
        recordId,
        data: {
          [fieldId]: { value },
        },
      };
      try {
        await mutateAsync(fields);
        setEditingCell(recordId, fieldId, false);
      } catch (error: any) {
        // TODO: handle request error
        toastError(f('common.networkError'));
      }
    },
    [
      f,
      toastError,
      setEditingCell,
      onCancel,
      mutateAsync,
      isLoading,
      projectId,
      recordId,
      fieldId,
      data?.value,
    ]
  );

  return (
    <div
      role="gridcell"
      tabIndex={-1}
      aria-colindex={index}
      className={classNames(
        className,
        'w-52 p-0 outline-none',
        leftBordered && 'border-l',
        rightBordered && 'border-r',
        activeOrEditing && 'z-30',
        styles.cell
      )}
      onBlur={handleBlur}
      onClick={handleClick}>
      <div className={styles.content}>
        <div
          className={classNames(
            'w-full min-h-full p-1',
            activeOrEditing && 'bg-base-100 absolute top-0 left-0 z-30',
            activeOrEditing && 'ring-4 ring-inset ring-secondary',
            'flex items-center'
          )}>
          {fieldRenderer?.render({
            recordId,
            fieldId,
            data,
            active,
            editing,
            loading: isLoading,
            onCancel,
            onChange,
          })}
        </div>
      </div>
    </div>
  );
}

export default observer(BodyCell);
