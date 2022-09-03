import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from '@hello-pangea/dnd';
import { memo, useCallback, useRef } from 'react';

interface ISortableListProps<T> {
  droppableId: string;
  list: T[];
  containerRef?: React.RefObject<HTMLElement | null | undefined>;
  listClassName?: string;
  itemClassName?: string;
  getItemId: (data: T) => string;
  getItemDraggable?: (data: T) => boolean;
  renderItem: (data: T, index: number) => React.ReactElement;
  onChange: (list: T[]) => void;
}

function SortableList<T>(props: ISortableListProps<T>) {
  const {
    droppableId,
    list,
    containerRef,
    listClassName,
    itemClassName,
    getItemId,
    getItemDraggable,
    renderItem,
    onChange,
  } = props;

  const offsetDiff = useRef({ x: 0, y: 0 });

  const handleDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const from = result.source.index;
      const to = result.destination?.index;
      if (to !== undefined && from !== to) {
        const item = list[from];
        const newList = [...list];
        newList.splice(from, 1);
        newList.splice(to, 0, item);
        onChange(newList);
      }
    },
    [list, onChange]
  );

  const handleBeforeDragStart = useCallback(() => {
    const container = containerRef?.current;
    if (container) {
      const cRect = container.getClientRects()[0];
      offsetDiff.current = {
        x: cRect.x + container.scrollLeft - container.offsetLeft,
        y: cRect.y + container.scrollTop - container.offsetTop,
      };
    }
  }, [containerRef]);

  return (
    <DragDropContext
      onBeforeDragStart={handleBeforeDragStart}
      onDragEnd={handleDragEnd}>
      <Droppable droppableId={droppableId}>
        {(droppableProvided) => (
          <ul
            className={listClassName}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}>
            {list.map((data, index) => (
              <Draggable
                key={getItemId(data)}
                index={index}
                draggableId={getItemId(data)}
                isDragDisabled={
                  getItemDraggable ? !getItemDraggable(data) : false
                }>
                {(draggableProvided) => {
                  const { style } = draggableProvided.draggableProps;
                  const diff = offsetDiff.current;
                  if (style) {
                    if ('top' in style) {
                      style.top -= diff.y;
                    }
                    if ('left' in style) {
                      style.left -= diff.x;
                    }
                  }
                  return (
                    <li
                      className={itemClassName}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}>
                      {renderItem(data, index)}
                    </li>
                  );
                }}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default memo(SortableList) as typeof SortableList;
