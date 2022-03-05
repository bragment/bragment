import classnames from 'classnames';
import { memo, useCallback, useRef, useState } from 'react';
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
            autoHeightMax={scrollbarMaxHeight}
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
          />
        </div>
      )}
    </Draggable>
  ) : null;
}

export default memo(Column);
