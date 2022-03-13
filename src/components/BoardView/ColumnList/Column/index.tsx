import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from '@breeze2/react-beautiful-dnd';
import classnames from 'classnames';
import { memo, useCallback, useRef, useState } from 'react';
import {
  positionValues as IPositionValues,
  Scrollbars,
} from 'react-custom-scrollbars';

import { Element } from '../../../../graphql';
import { useGetProjectColumn } from '../../../hooks';
import CardList from '../../CardList';
import {
  calculateColumnBodyScrollBarMaxHeightByFooterHeight,
  defaultColumnBodyScrollBarMaxHeight,
} from '../../helpers';
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
  const scrollBarRef = useRef<Scrollbars>(null);
  const [scrollbarMaxHeight, setScrollbarMaxHeight] = useState(
    defaultColumnBodyScrollBarMaxHeight
  );
  const column = columnData?.projectColumn;
  const itemOrder = column?.itemOrder as Element[] | undefined;

  const handleScrollFrame = useCallback((values: IPositionValues) => {
    if (values.scrollTop !== 0) {
      wrapperRef.current?.classList.add(styles.scrolled);
    } else {
      wrapperRef.current?.classList.remove(styles.scrolled);
    }
  }, []);

  const handleFooterHeightChange = useCallback((footerHeight?: number) => {
    setScrollbarMaxHeight(
      calculateColumnBodyScrollBarMaxHeightByFooterHeight(footerHeight)
    );
  }, []);

  const handleCreateCardFinish = useCallback(() => {
    scrollBarRef.current?.scrollToBottom();
  }, []);

  return column ? (
    <Draggable draggableId={column.id} index={index}>
      {(dragProvided: DraggableProvided) => (
        <div
          className={classnames(styles.wrapper)}
          data-rbd-draggable-index={index}
          data-rbd-draggable-object-id={objectId}
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
            ref={scrollBarRef}
            className={styles.content}
            autoHeightMax={scrollbarMaxHeight}
            autoHeight
            autoHide
            onUpdate={handleScrollFrame}
            onScrollFrame={handleScrollFrame}>
            <Droppable droppableId={column.id} type={EDragType.Card}>
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
                  {itemOrder && (
                    <CardList cardIds={itemOrder.map((el) => el.value)} />
                  )}
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          </Scrollbars>
          <Footer
            objectId={objectId}
            onHeightChange={handleFooterHeightChange}
            onCreateCardFinish={handleCreateCardFinish}
          />
        </div>
      )}
    </Draggable>
  ) : null;
}

export default memo(Column);
