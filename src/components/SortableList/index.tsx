import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import { memo, useCallback, useRef } from 'react';
import DroppableList, { IDragDropProps } from './DragDropList';

interface ISortableListProps<T> extends IDragDropProps<T> {
  containerRef?: React.RefObject<HTMLElement | null | undefined>;
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

  const offsetDiffRef = useRef({ x: 0, y: 0 });

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
      offsetDiffRef.current = {
        x: cRect.x + container.scrollLeft - container.offsetLeft,
        y: cRect.y + container.scrollTop - container.offsetTop,
      };
    }
  }, [containerRef]);

  return (
    <DragDropContext
      onBeforeDragStart={handleBeforeDragStart}
      onDragEnd={handleDragEnd}>
      <DroppableList
        droppableId={droppableId}
        list={list}
        offsetDiffRef={offsetDiffRef}
        listClassName={listClassName}
        itemClassName={itemClassName}
        getItemId={getItemId}
        getItemDraggable={getItemDraggable}
        renderItem={renderItem}
      />
    </DragDropContext>
  );
}

export default memo(SortableList) as typeof SortableList;
