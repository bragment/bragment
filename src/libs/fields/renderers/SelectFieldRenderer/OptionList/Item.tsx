import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { ChangeEventHandler, memo } from 'react';
import { HiTrash } from 'react-icons/hi';
import { useFormatMessage } from '../../../../../components/hooks';
import DragHandle from '../../../../../components/SortableList/DragHandle';
import { IDataFieldOption } from '../../../../client/types';

interface IItemProps {
  index: number;
  option: IDataFieldOption;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  onChange: (index: number, option: IDataFieldOption) => void;
  onDelete: (index: number) => void;
}

function Item(props: IItemProps) {
  const { index, option, dragHandleProps, onChange, onDelete } = props;
  const { title } = option;
  const f = useFormatMessage();
  const handleDelete = () => {
    onDelete(index);
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.currentTarget.value.trim();
    onChange(index, { ...option, title: value });
  };

  return (
    <div className={classNames('rounded-lg')}>
      <div
        className={classNames(
          'rounded-lg px-2 py-2 flex items-center text-base-content'
        )}>
        <DragHandle
          dragHandleProps={dragHandleProps}
          className={'h-8 px-1 mr-2 text-xl'}
        />
        <div className="flex-none mr-2" />
        <div className="flex-auto mr-2">
          <input
            autoFocus
            maxLength={64}
            className={classNames('input input-bordered input-sm', 'w-full')}
            defaultValue={title}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          aria-label={f('common.delete')}
          className={classNames(
            'btn btn-sm btn-ghost btn-square text-error',
            'px-2 text-lg'
          )}
          onClick={handleDelete}>
          <HiTrash />
        </button>
      </div>
    </div>
  );
}

export default memo(Item);
