import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { HiArrowDown, HiArrowUp, HiTrash } from 'react-icons/hi';
import { getFieldIcon } from '../../../../fields/renders';
import { IProjectDataField } from '../../../../libs/client/types';
import { useFormatMessage } from '../../../hooks';
import SelectInput from '../../../SelectInput';
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
  const convertToSelectOption = useCallback(
    ({ _id, type, title }: IProjectDataField) => {
      const Icon = getFieldIcon(type);
      return {
        value: _id,
        content: title,
        node: (
          <div className="w-full flex items-center">
            {Icon && <Icon className="flex-none mr-2 text-lg" />}
            <div
              className="flex-auto text-ellipsis overflow-hidden whitespace-nowrap"
              title={title}>
              {title}
            </div>
          </div>
        ),
      };
    },
    []
  );
  const getSelectedOption = useCallback(() => {
    return convertToSelectOption(field);
  }, [convertToSelectOption, field]);
  const getOptions = useCallback(
    () => [field, ...otherFields].map(convertToSelectOption),
    [convertToSelectOption, field, otherFields]
  );

  return (
    <div className={classNames('bg-base-100', 'rounded-lg')}>
      <div
        className={classNames(
          'rounded-lg pl-2 pr-4 py-2 flex items-center text-base-content',
          styles.fieldItem
        )}>
        <DragHandle
          dragHandleProps={dragHandleProps}
          className={'h-8 px-1 mr-2 text-xl'}
        />
        <div className="flex-auto mr-2">
          <SelectInput
            className="w-full"
            selectClassName="select-sm"
            optionClassName="py-1"
            contentClassName={styles.selectContent}
            defaultValue={field._id}
            withMask
            gapSize={1}
            getOptions={getOptions}
            getSelectedOption={getSelectedOption}
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
