import { useApolloClient } from '@apollo/client';
import classnames from 'classnames';
import { memo, useCallback } from 'react';
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import { generateElement, updateCachedProjectView } from '../../api/apollo';
import { Element, useMoveProjectColumnMutation } from '../../graphql';
import { useGetProjectView } from '../hooks';
import ColumnList from './ColumnList';
import ColumnCreator from './ColumnList/Creator';
import {
  getColumnPlaceholder,
  getColumnWrapperId,
  handleColumnDragStart,
  handleColumnDragUpdate,
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
  const view = data?.projectView;
  const columnOrder = view?.columnOrder as Element[] | undefined;

  const handleDragEnd = useCallback(
    async (result: DropResult) => {
      const { destination, source, type } = result;
      if (!view || !columnOrder || !destination) {
        return;
      }
      if (type === EDragType.Column) {
        getColumnPlaceholder()?.removeAttribute('style');
        const columnId = getColumnWrapperId(source.index);
        if (!columnId || source.index === destination.index) {
          return;
        }
        const newColumnOrder = [...columnOrder];
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, generateElement(columnId));
        const afterColumnId: string | undefined =
          newColumnOrder[destination.index - 1]?.value;
        updateCachedProjectView(client, {
          ...view,
          columnOrder: newColumnOrder,
        });
        await moveProjectColumn({
          variables: {
            input: {
              id: columnId,
              fields: { toViewId: view.objectId, afterId: afterColumnId },
            },
          },
        });
      }
    },
    [moveProjectColumn, client, view, columnOrder]
  );
  const handleDragStart = useCallback((initial: DragStart) => {
    const { source, type } = initial;
    if (type === EDragType.Column) {
      handleColumnDragStart(source);
    }
  }, []);
  const handleDragUpdate = useCallback((initial: DragUpdate) => {
    const { destination, source, type } = initial;
    if (!destination) {
      return;
    }
    if (type === EDragType.Column) {
      handleColumnDragUpdate(source, destination);
    }
  }, []);

  return (
    <Scrollbars autoHide>
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
                <div className={styles.actions}>
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
