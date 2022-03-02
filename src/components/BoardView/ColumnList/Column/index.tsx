import classnames from 'classnames';
import { memo, useCallback, useRef } from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import {
  positionValues as IPositionValues,
  Scrollbars,
} from 'react-custom-scrollbars';

import { useGetProjectColumn } from '../../../hooks';
import { EDragType } from '../../types';
import Footer from './Footer';
import Header from './Header';
import styles from './index.module.scss';

interface IColumnProps {
  objectId: string;
  index: number;
}

function Column(props: IColumnProps) {
  const { objectId, index } = props;
  const { data: columnData } = useGetProjectColumn(objectId);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const column = columnData?.projectColumn;

  const handleScrollFrame = useCallback((values: IPositionValues) => {
    if (values.scrollTop !== 0) {
      wrapperRef.current?.classList.add(styles.scrolled);
    } else {
      wrapperRef.current?.classList.remove(styles.scrolled);
    }
  }, []);
  return column ? (
    <Draggable draggableId={objectId} index={index}>
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot
      ) => (
        <div
          className={classnames(styles.wrapper)}
          data-rdb-draggable-index={index}
          ref={(ref) => {
            dragProvided.innerRef(ref);
            wrapperRef.current = ref;
          }}
          {...dragProvided.draggableProps}>
          <Header
            objectId={column.objectId}
            title={column.title}
            dragHandle={dragProvided.dragHandleProps}
          />
          <Scrollbars
            className={styles.content}
            autoHeight
            autoHide
            onUpdate={handleScrollFrame}
            onScrollFrame={handleScrollFrame}>
            <Droppable droppableId={objectId} type={EDragType.Card}>
              {(
                dropProvided: DroppableProvided,
                dropSnapshot: DroppableStateSnapshot
              ) => (
                <div
                  ref={dropProvided.innerRef}
                  className={classnames(
                    styles.container,
                    dropSnapshot.isDraggingOver ? styles.draggingOver : ''
                  )}
                  {...dropProvided.droppableProps}>
                  <div className={styles.cardPlaceholder} />
                  {/* TODO: <CardList></CardList> */}
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          </Scrollbars>
          <Footer objectId={objectId} />
        </div>
      )}
    </Draggable>
  ) : null;
}

export default memo(Column);
