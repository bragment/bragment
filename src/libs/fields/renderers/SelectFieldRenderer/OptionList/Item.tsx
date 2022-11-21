import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { ChangeEventHandler, memo, useCallback } from 'react';
import { HiTrash } from 'react-icons/hi';
import ColorSelect from '../../../../../components/ColorSelect';
import { useFormatMessage } from '../../../../../components/hooks';
import DragHandle from '../../../../../components/SortableList/DragHandle';
import { IDataFieldOption } from '../../../../client/types';

interface IItemProps {
  index: number;
  option: IDataFieldOption;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  deletable?: boolean;
  onChange: (index: number, option: IDataFieldOption) => void;
  onDelete: (index: number) => void;
}

function Item(props: IItemProps) {
  const {
    index,
    option,
    dragHandleProps,
    deletable = true,
    onChange,
    onDelete,
  } = props;
  const { title, color } = option;
  const f = useFormatMessage();
  const handleDelete = () => {
    onDelete(index);
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.currentTarget.value.trim();
    onChange(index, { ...option, title: value });
  };
  const handleColorChange = useCallback(
    (value: string) => {
      onChange(index, { ...option, color: value });
    },
    [onChange, option, index]
  );

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
        <div className="flex-none mr-3">
          <ColorSelect value={color} onChange={handleColorChange} />
        </div>
        <div className="flex-auto mr-2">
          <input
            autoFocus
            maxLength={64}
            className={classNames('input input-bordered input-sm', 'w-full')}
            defaultValue={title}
            onChange={handleInputChange}
          />
        </div>
        {deletable && (
          <button
            type="button"
            aria-label={f('common.delete')}
            className={classNames(
              'btn btn-sm btn-ghost',
              'px-2 text-lg text-error'
            )}
            onClick={handleDelete}>
            <HiTrash />
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(Item);
