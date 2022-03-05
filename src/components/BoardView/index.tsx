import { useApolloClient } from '@apollo/client';
import classnames from 'classnames';
import { memo, useCallback, useRef } from 'react';
import {
  DragDropContext,
  DraggableLocation,
  DragStart,
  DragUpdate,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  generateElement,
  readCachedProjectColumn,
  writeCachedProjectColumn,
  writeCachedProjectView,
} from '../../api/apollo';
import {
  Element,
  useMoveProjectColumnMutation,
  useMoveProjectItemMutation,
} from '../../graphql';
import { useGetProjectView } from '../hooks';
import ColumnList from './ColumnList';
import ColumnCreator from './ColumnList/Creator';
import {
  draggingHandlers,
  getCardWrapperId,
  getColumnWrapperId,
  requestAutoScrolling,
} from './helpers';

import { EDragType } from './types';
import styles from './index.module.scss';

interface IBoardViewProps {
  objectId: string;
}

function BoardView(props: IBoardViewProps) {
  const { objectId } = props;
  const client = useApolloClient();
  const { data } = useGetProjectView(objectId);
  const [moveProjectColumn] = useMoveProjectColumnMutation();
  const [moveProjectItem] = useMoveProjectItemMutation();
  const scrollBarRef = useRef<Scrollbars>(null);
  const draggingDivRef = useRef<HTMLDivElement>();
  const stopAutoScrollingRef = useRef<() => unknown>();
  const view = data?.projectView;
  const columnOrder = view?.columnOrder as Element[] | undefined;

  const moveColumn = useCallback(
    async (source: DraggableLocation, destination: DraggableLocation) => {
      const { index: fromIndex } = source;
      const { index: toIndex } = destination;
      const columnId = getColumnWrapperId(fromIndex);
      if (!view || !columnId || fromIndex === toIndex) {
        return;
      }
      const newColumnOrder = [...view.columnOrder] as Element[];
      newColumnOrder.splice(fromIndex, 1);
      newColumnOrder.splice(toIndex, 0, generateElement(columnId));
      const toViewId = view.objectId;
      const afterId: string | undefined = newColumnOrder[toIndex - 1]?.value;
      writeCachedProjectView(client, {
        ...view,
        columnOrder: newColumnOrder,
      });
      await moveProjectColumn({
        variables: {
          input: {
            id: columnId,
            fields: { toViewId, afterId },
          },
        },
      });
    },
    [client, view, moveProjectColumn]
  );

  const moveCard = useCallback(
    async (source: DraggableLocation, destination: DraggableLocation) => {
      const { index: fromIndex, droppableId: fromColumnId } = source;
      const { index: toIndex, droppableId: toColumnId } = destination;
      const itemId = getCardWrapperId(fromColumnId, fromIndex);
      const sameColumn = fromColumnId === toColumnId;
      const toColumn = readCachedProjectColumn(client, toColumnId);
      const fromColumn = sameColumn
        ? toColumn
        : readCachedProjectColumn(client, fromColumnId);
      if (
        !itemId ||
        !fromColumn ||
        !toColumn ||
        (sameColumn && fromIndex === toIndex)
      ) {
        return;
      }
      const newToItemOrder = [...toColumn.itemOrder] as Element[];
      const newFromItemOrder = sameColumn
        ? newToItemOrder
        : ([...fromColumn.itemOrder] as Element[]);
      newFromItemOrder.splice(fromIndex, 1);
      newToItemOrder.splice(toIndex, 0, generateElement(itemId));
      const afterId: string | undefined = newToItemOrder[toIndex - 1]?.value;
      writeCachedProjectColumn(client, {
        ...toColumn,
        itemOrder: newToItemOrder,
      });
      if (!sameColumn) {
        writeCachedProjectColumn(client, {
          ...fromColumn,
          itemOrder: newFromItemOrder,
        });
      }
      await moveProjectItem({
        variables: {
          input: {
            id: itemId,
            fields: { toColumnId, fromColumnId, afterId },
          },
        },
      });
    },
    [client, moveProjectItem]
  );

  const handleDragEnd = useCallback(
    async (result: DropResult) => {
      stopAutoScrollingRef.current && stopAutoScrollingRef.current();
      stopAutoScrollingRef.current = undefined;
      draggingDivRef.current = undefined;
      const { destination, source, type } = result;
      if (!destination) {
        return;
      }
      draggingHandlers.dragEnd[type as EDragType](destination);
      if (type === EDragType.Column) {
        moveColumn(source, destination);
      }
      if (type === EDragType.Card) {
        moveCard(source, destination);
      }
    },
    [moveColumn, moveCard]
  );
  const handleDragStart = useCallback((initial: DragStart) => {
    const { source, type } = initial;
    const div = (draggingDivRef.current =
      draggingHandlers.getDragging[type as EDragType](source) || undefined);
    if (div) {
      draggingHandlers.dragStart[type as EDragType](div, source);
      const boardDiv = div.closest('.' + styles.container);
      const scrollDiv = boardDiv?.parentElement;
      const scrollBar = scrollBarRef.current;
      // HACK: See https://github.com/atlassian/react-beautiful-dnd/issues/131
      if (type === EDragType.Card && scrollDiv && scrollBar) {
        stopAutoScrollingRef.current = requestAutoScrolling(
          div,
          scrollDiv,
          () => scrollBar.scrollLeft(scrollDiv.scrollLeft + 10),
          () => scrollBar.scrollLeft(scrollDiv.scrollLeft - 10)
        );
      }
    }
  }, []);
  const handleDragUpdate = useCallback((initial: DragUpdate) => {
    const { destination, type } = initial;
    if (!destination) {
      return;
    }
    const div = draggingDivRef.current;
    if (div) {
      draggingHandlers.dragUpdate[type as EDragType](div, destination);
    }
  }, []);

  return (
    <Scrollbars ref={scrollBarRef} autoHide>
      <DragDropContext
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="board"
          type={EDragType.Column}
          direction="horizontal">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              id={objectId}
              ref={provided.innerRef}
              className={classnames(
                styles.container,
                snapshot.isDraggingOver ? styles.draggingOver : ''
              )}
              {...provided.droppableProps}>
              <div className={styles.columnPlaceholder} />
              {columnOrder && (
                <ColumnList columnIds={columnOrder.map((el) => el.value)} />
              )}
              {provided.placeholder}
              {view && (
                <div>
                  <ColumnCreator viewId={view.objectId} />
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Scrollbars>
  );
}

export default memo(BoardView);
