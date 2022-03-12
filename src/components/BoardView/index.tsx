import {
  BeforeCapture,
  DragDropContext,
  DragDropContextInstance,
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

import { checkClassGlobalId, convertToObjectId } from '../../api/apollo';
import { EClassName, Element } from '../../graphql';
import { useGetProjectView, useHandleGraphqlError } from '../hooks';
import ColumnList from './ColumnList';
import ColumnCreator from './ColumnList/Creator';
import {
  draggingHandlers,
  getCardWrapperObjectId,
  getColumnWrapperObjectId,
  requestAutoScrolling,
  runningPaceByTimes,
} from './helpers';
import { useMoveCard, useMoveColumn } from './hooks';
import { EDragType } from './types';
import styles from './index.module.scss';

interface IBoardViewProps {
  objectId: string;
}

function BoardView(props: IBoardViewProps) {
  const { objectId } = props;
  const { data } = useGetProjectView(objectId);
  const moveCard = useMoveCard();
  const moveColumn = useMoveColumn();
  const handleGraphqlError = useHandleGraphqlError();
  const scrollBarRef = useRef<Scrollbars>(null);
  const dragDropContextRef = useRef<DragDropContextInstance>(null);
  const containerDivRef = useRef<HTMLDivElement>();
  const draggingDivRef = useRef<HTMLDivElement>();
  const stopAutoScrollingRef = useRef<() => unknown>();
  const view = data?.projectView;
  const columnOrder = view?.columnOrder as Element[] | undefined;

  const handleDragEnd = useCallback(
    async (result: DropResult) => {
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
        const { index: fromIndex } = source;
        const { index: toIndex } = destination;
        const columnId = getColumnWrapperObjectId(fromIndex);
        const toViewId =
          /* eslint-disable @typescript-eslint/no-non-null-assertion */ view!
            .objectId;
        const error = await moveColumn(
          /* eslint-disable @typescript-eslint/no-non-null-assertion */ columnId!,
          toViewId,
          toIndex,
          toViewId,
          fromIndex
        );
        if (error) {
          handleGraphqlError(error);
        }
      }
      if (type === EDragType.Card) {
        const { index: fromIndex, droppableId: fromColumnId } = source;
        const { index: toIndex, droppableId: toColumnId } = destination;
        const itemId = getCardWrapperObjectId(fromColumnId, fromIndex);
        const error = await moveCard(
          /* eslint-disable @typescript-eslint/no-non-null-assertion */ itemId!,
          convertToObjectId(EClassName.ProjectColumn, toColumnId),
          toIndex,
          convertToObjectId(EClassName.ProjectColumn, fromColumnId),
          fromIndex
        );
        if (error) {
          handleGraphqlError(error);
        }
      }
    },
    [view, moveColumn, moveCard, handleGraphqlError]
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
