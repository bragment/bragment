import {
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from '@hello-pangea/dnd';
import classNames from 'classnames';
import { memo, useCallback } from 'react';

export interface IDragDropProps<T> {
  droppableId: string;
  list: T[];
  listClassName?: string;
  itemClassName?: string;
  customDragHandle?: boolean;
  getItemId: (data: T) => string;
  getItemDraggable?: (data: T) => boolean;
  renderItem: (
    data: T,
    index: number,
    handleProps: DraggableProvidedDragHandleProps | null
  ) => React.ReactElement;
}

export interface IDragDropListProps<T> extends IDragDropProps<T> {
  offsetDiffRef: React.RefObject<{ x: number; y: number }>;
  droppable?: boolean;
}

function DragDropList<T>(props: IDragDropListProps<T>) {
  const {
    droppableId,
    list,
    offsetDiffRef,
    droppable = true,
    customDragHandle = false,
    listClassName,
    itemClassName,
    getItemId,
    getItemDraggable,
    renderItem,
  } = props;

  const generateDraggableItem = useCallback(
    (data: T, index: number) => (
      <Draggable
        key={getItemId(data)}
        index={index}
        draggableId={getItemId(data)}
        isDragDisabled={getItemDraggable ? !getItemDraggable(data) : false}>
        {(draggableProvided) => {
          const { draggableProps, dragHandleProps, innerRef } =
            draggableProvided;
          const { style } = draggableProps;
          const diff = offsetDiffRef.current || { x: 0, y: 0 };
          let dragging = false;
          if (style) {
            dragging = 'position' in style;
            if ('top' in style) {
              style.top -= diff.y;
            }
            if ('left' in style) {
              style.left -= diff.x;
            }
          }
          return (
            <li
              className={classNames(dragging && 'dragging', itemClassName)}
              ref={innerRef}
              {...draggableProps}
              {...(customDragHandle ? null : dragHandleProps)}>
              {renderItem(data, index, dragHandleProps)}
            </li>
          );
        }}
      </Draggable>
    ),
    [
      customDragHandle,
      getItemDraggable,
      getItemId,
      itemClassName,
      offsetDiffRef,
      renderItem,
    ]
  );

  return (
    <Droppable droppableId={droppableId} isDropDisabled={!droppable}>
      {(droppableProvided) => (
        <ul
          className={listClassName}
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}>
          {list.map(generateDraggableItem)}
          {droppableProvided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default memo(DragDropList) as typeof DragDropList;
