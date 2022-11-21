import classNames from 'classnames';
import { memo, useCallback } from 'react';
import SortableList from '../../../../../components/SortableList';
import { IDragDropListProps } from '../../../../../components/SortableList/DragDropList';
import { IDataFieldOption } from '../../../../client/types';
import Item from './Item';

interface IOptionListProps {
  options: IDataFieldOption[];
  onChange: (options: IDataFieldOption[]) => void;
}

function OptionList(props: IOptionListProps) {
  const { options, onChange } = props;
  const deletable = options.length > 1;

  const getItemId = useCallback((option: IDataFieldOption) => {
    return option._id;
  }, []);

  const getItemDraggable = useCallback(() => {
    return true;
  }, []);

  const handleOptionsChange = useCallback(
    (list: IDataFieldOption[]) => {
      onChange(list);
    },
    [onChange]
  );

  const handleOptionChange = useCallback(
    (index: number, option: IDataFieldOption) => {
      if (options[index]) {
        const list = options.slice(0);
        list[index] = option;
        onChange(list);
      }
    },
    [options, onChange]
  );
  const handleOptionDelete = useCallback(
    (index: number) => {
      if (options[index]) {
        const list = options.slice(0);
        list.splice(index, 1);
        onChange(list);
      }
    },
    [options, onChange]
  );

  const renderItem: IDragDropListProps<IDataFieldOption>['renderItem'] =
    useCallback(
      (option, index, dragHandleProps) => {
        return (
          <div className={classNames('rounded-lg')}>
            <Item
              index={index}
              option={option}
              dragHandleProps={dragHandleProps}
              deletable={deletable}
              onChange={handleOptionChange}
              onDelete={handleOptionDelete}
            />
          </div>
        );
      },
      [handleOptionChange, handleOptionDelete, deletable]
    );

  return (
    <SortableList
      customDragHandle
      droppableId="SORTABLE_FIELD_LIST"
      listClassName="px-0"
      itemClassName="[&.dragging>div]:bg-base-100 [&.dragging>div>div]:bg-base-content/10"
      list={options}
      getItemId={getItemId}
      getItemDraggable={getItemDraggable}
      renderItem={renderItem}
      onChange={handleOptionsChange}
    />
  );
}

export default memo(OptionList);
