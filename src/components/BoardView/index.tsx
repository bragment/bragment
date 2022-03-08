import { useApolloClient } from '@apollo/client';
import {
  BeforeCapture,
  DragDropContext,
  DragDropContextInstance,
  DraggableLocation,
  DragStart,
  DragUpdate,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
  moveByWindowScroll,
  setDragDropContextContainer,
} from '@breeze2/react-beautiful-dnd';
import classnames from 'classnames';
import { memo, useCallback, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  checkClassGlobalId,
  generateElement,
  readCachedProjectColumn,
  writeCachedProjectColumn,
  writeCachedProjectView,
} from '../../api/apollo';
import {
  EClassName,
  Element,
  useMoveProjectColumnMutation,
  useMoveProjectItemMutation,
} from '../../graphql';
import { useGetProjectView } from '../hooks';
import ColumnList from './ColumnList';
import ColumnCreator from './ColumnList/Creator';
import {
  draggingHandlers,
  getCardWrapperObjectId,
  getColumnWrapperObjectId,
  requestAutoScrolling,
  runningPaceByTimes,
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
  const dragDropContextRef = useRef<DragDropContextInstance>(null);
  const containerDivRef = useRef<HTMLDivElement>();
  const draggingDivRef = useRef<HTMLDivElement>();
  const stopAutoScrollingRef = useRef<() => unknown>();
  const view = data?.projectView;
  const columnOrder = view?.columnOrder as Element[] | undefined;

  const moveColumn = useCallback(
    async (source: DraggableLocation, destination: DraggableLocation) => {
      const { index: fromIndex } = source;
      const { index: toIndex } = destination;
      const columnId = getColumnWrapperObjectId(fromIndex);
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
      const itemId = getCardWrapperObjectId(fromColumnId, fromIndex);
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
    (result: DropResult) => {
      setDragDropContextContainer(undefined);
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
  const handleBeforeCapture = (before: BeforeCapture) => {
    const { draggableId } = before;
    if (checkClassGlobalId(EClassName.ProjectItem, draggableId)) {
      setDragDropContextContainer(containerDivRef.current?.parentElement);
    }
  };
  const handleBeforeDragStart = (initial: DragStart) => {
    const { source, type } = initial;
    draggingDivRef.current =
      draggingHandlers.getDragging[type as EDragType](source) || undefined;
  };
  const handleDragStart = useCallback((initial: DragStart) => {
    const { source, type } = initial;
    const div = draggingDivRef.current;
    if (!div) {
      return;
    }
    draggingHandlers.dragStart[type as EDragType](div, source);
    // HACK: See https://github.com/atlassian/react-beautiful-dnd/issues/131
    const store = dragDropContextRef.current?.getStore();
    const boardDiv = div.closest('.' + styles.container);
    const scrollDiv = boardDiv?.parentElement;
    const scrollBar = scrollBarRef.current;
    if (type !== EDragType.Card || !scrollDiv || !scrollBar || !store) {
      return;
    }
    let times = 0;
    let goRight = true;
    const scroll = (right: boolean) => {
      if (!draggingDivRef.current) {
        return;
      }
      if ((right && !goRight) || (!right && goRight)) {
        goRight = !goRight;
        times = 0;
      }
      scrollBar.scrollLeft(
        scrollDiv.scrollLeft + runningPaceByTimes(++times) * (goRight ? 1 : -1)
      );
      store.dispatch(
        moveByWindowScroll({
          newScroll: { x: scrollDiv.scrollLeft, y: 0 },
        })
      );
    };
    stopAutoScrollingRef.current = requestAutoScrolling(
      div,
      scrollDiv,
      scroll.bind(undefined, true),
      scroll.bind(undefined, false)
    );
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
        ref={dragDropContextRef}
        onBeforeCapture={handleBeforeCapture}
        onBeforeDragStart={handleBeforeDragStart}
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="board"
          type={EDragType.Column}
          direction="horizontal">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              ref={(ref) => {
                provided.innerRef(ref);
                containerDivRef.current = ref || undefined;
              }}
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
