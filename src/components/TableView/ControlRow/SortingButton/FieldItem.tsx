import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { memo, useCallback, useMemo } from 'react';
import { HiArrowDown, HiArrowUp, HiTrash } from 'react-icons/hi';
import { IProjectDataField } from '../../../../libs/client/types';
import DataFieldSelect from '../../../DataFieldSelect';
import { useFormatMessage } from '../../../hooks';
import DragHandle from '../../../SortableList/DragHandle';
import styles from './index.module.scss';

export interface IInnerSorter {
  field: IProjectDataField;
  descending: boolean;
}

interface IFieldItemProps extends IInnerSorter {
  index: number;
  otherFields: IProjectDataField[];
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  onChange: (index: number, sorter: IInnerSorter) => void;
  onDelete: (index: number) => void;
}

function FieldItem(props: IFieldItemProps) {
  const {
    index,
    field,
    descending,
    otherFields,
    dragHandleProps,
    onChange,
    onDelete,
  } = props;
  const f = useFormatMessage();
  const selectedFieldId = useMemo(() => field._id, [field]);
  const selectableFields = useMemo(
    () => [field, ...otherFields],
    [field, otherFields]
  );

  const handleDelete = () => {
    onDelete(index);
  };
  const handleDescendingChange = () => {
    onChange(index, { field, descending: !descending });
  };
  const handleFieldChange = useCallback(
    (fieldId: string) => {
      const newField = otherFields.find((el) => el._id === fieldId);
      if (newField && newField._id !== field._id) {
        onChange(index, {
          field: newField,
          descending,
        });
      }
    },
    [onChange, index, field, descending, otherFields]
  );

  return (
    <div className={classNames('rounded-lg', styles.fieldItemWrapper)}>
      <div
        className={classNames(
          'rounded-lg px-2 py-2 flex items-center text-base-content',
          styles.fieldItem
        )}>
        <DragHandle
          dragHandleProps={dragHandleProps}
          className={'h-8 px-1 mr-2 text-xl'}
        />
        <div className="flex-auto mr-2">
          <DataFieldSelect
            size="sm"
            fields={selectableFields}
            value={selectedFieldId}
            onChange={handleFieldChange}
          />
        </div>
        <button
          aria-label={
            descending ? f('dataView.descending') : f('dataView.ascending')
          }
          className={classNames(
            'btn btn-sm btn-ghost text-info',
            'px-2 text-lg'
          )}
          onClick={handleDescendingChange}>
          {descending ? <HiArrowDown /> : <HiArrowUp />}
        </button>
        <button
          aria-label={f('common.delete')}
          className={classNames(
            'btn btn-sm btn-ghost text-error',
            'px-2 text-lg'
          )}
          onClick={handleDelete}>
          <HiTrash />
        </button>
      </div>
    </div>
  );
}

export default memo(FieldItem);
