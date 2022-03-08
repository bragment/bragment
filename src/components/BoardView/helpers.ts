import { DraggableLocation } from '@breeze2/react-beautiful-dnd';

import { EDragType } from './types';
import cardStyles from './CardList/Card/index.module.scss';
import columnStyles from './ColumnList/Column/index.module.scss';
import styles from './index.module.scss';

const APP_HEADER_HEIGHT = 48;
const COLUMN_WIDTH = 280;
const COLUMN_GUTTER = 16;
const COLUMN_HEADER_HEIGHT = 50;
const COLUMN_FOOTER_HEIGHT = 50;
const CARD_GUTTER = 12;

export const COLUMN_CONTENT_PADDING_TOP = 6;
export const defaultColumnBodyScrollBarMaxHeight = `calc(100vh - ${
  APP_HEADER_HEIGHT +
  COLUMN_GUTTER +
  COLUMN_HEADER_HEIGHT +
  COLUMN_FOOTER_HEIGHT +
  COLUMN_GUTTER
}px)`;

export function calculateColumnBodyScrollBarMaxHeightByFooterHeight(
  footerHeight = COLUMN_FOOTER_HEIGHT
) {
  return `calc(100vh - ${
    APP_HEADER_HEIGHT +
    COLUMN_GUTTER +
    COLUMN_HEADER_HEIGHT +
    footerHeight +
    COLUMN_GUTTER
  }px)`;
}

export function calculateColumnFooterTextAreaMaxRows(defaultMaxRows = 6) {
  const rows = Math.floor(
    (document.body.offsetHeight -
      APP_HEADER_HEIGHT -
      COLUMN_GUTTER -
      COLUMN_HEADER_HEIGHT -
      COLUMN_GUTTER -
      COLUMN_FOOTER_HEIGHT -
      COLUMN_GUTTER) /
      22
  );
  return Math.max(Math.min(rows, defaultMaxRows), 1);
}

export function getDraggableIndex(div: HTMLDivElement) {
  const index = div.dataset.rbdDraggableIndex;
  return index === undefined ? undefined : parseInt(index);
}

export function getParentDroppableId(div: HTMLDivElement) {
  return div.parentElement?.dataset.rbdDroppableId;
}

export function getColumnPlaceholder() {
  return document.querySelector<HTMLDivElement>(`.${styles.columnPlaceholder}`);
}

export function getColumnWrapper(index: number) {
  return document.querySelector<HTMLDivElement>(
    `.${columnStyles.wrapper}[data-rbd-draggable-index="${index}"]`
  );
}

export function getColumnWrapperObjectId(index: number) {
  const div = getColumnWrapper(index);
  return div?.dataset.rbdDraggableObjectId;
}

export function getCardWrapperObjectId(droppableId: string, index: number) {
  const container = getColumnContainer(droppableId);
  const div = container
    ? getCardWrapperInColumnContainer(container, index)
    : undefined;
  return div?.dataset.rbdDraggableObjectId;
}

export function getColumnContainer(droppableId: string) {
  return document.querySelector<HTMLDivElement>(
    `.${columnStyles.container}[data-rbd-droppable-id="${droppableId}"]`
  );
}

export function getAllCardPlaceholders() {
  return document.querySelectorAll<HTMLDivElement>(
    `.${columnStyles.cardPlaceholder}`
  );
}

export function getCardPlaceholder(droppableId: string) {
  return document.querySelector<HTMLDivElement>(
    `.${columnStyles.container}[data-rbd-droppable-id="${droppableId}"] .${columnStyles.cardPlaceholder}`
  );
}

export function getColumnHeight(column: HTMLDivElement) {
  const height = Array.prototype.reduce.call(
    column.children,
    (prev, el) => prev + el.offsetHeight,
    0
  );
  return (height || column.offsetHeight || 0) as number;
}

export function getAllCardWrappersInColumnContainer(container: HTMLDivElement) {
  return container.querySelectorAll<HTMLDivElement>(`.${cardStyles.wrapper}`);
}

export function getCardWrapperInColumnContainer(
  container: HTMLDivElement,
  index: number
) {
  return container.querySelector<HTMLDivElement>(
    `.${cardStyles.wrapper}[data-rbd-draggable-index="${index}"]`
  );
}

export function getDraggingColumnWrapper(from: DraggableLocation) {
  const fromIndex = from.index;
  return getColumnWrapper(fromIndex);
}

export function getDraggingCardWrapper(from: DraggableLocation) {
  const fromColumnContainer = getColumnContainer(from.droppableId);
  return fromColumnContainer
    ? getCardWrapperInColumnContainer(fromColumnContainer, from.index)
    : null;
}

export function makeColumnPlaceholderStyle(
  fromColumn: HTMLDivElement,
  to: DraggableLocation
) {
  const toIndex = to.index;
  return `display: block; height: ${getColumnHeight(fromColumn)}px; left: ${
    COLUMN_WIDTH * toIndex + COLUMN_GUTTER * toIndex + COLUMN_GUTTER
  }px; top: ${COLUMN_GUTTER + APP_HEADER_HEIGHT}px`;
}

export function makeCardPlaceholderStyle(
  fromCard: HTMLDivElement,
  to: DraggableLocation
) {
  const toColumnContainer = getColumnContainer(to.droppableId);
  if (toColumnContainer) {
    const toCards = getAllCardWrappersInColumnContainer(toColumnContainer);
    let top = Array.prototype.slice
      .call(toCards, 0, to.index)
      .reduce((value, card) => {
        return value + card.offsetHeight + CARD_GUTTER;
      }, 0);
    const fromIndex = getDraggableIndex(fromCard);
    const fromDroppableId = getParentDroppableId(fromCard);
    if (
      to.droppableId === fromDroppableId &&
      fromIndex !== undefined &&
      to.index > fromIndex
    ) {
      top += toCards[to.index].offsetHeight - toCards[fromIndex].offsetHeight;
    }
    return `display: block; height: ${
      fromCard.offsetHeight
    }px; position: absolute; top: ${
      top + COLUMN_CONTENT_PADDING_TOP
    }px; left: ${CARD_GUTTER}px`;
  }
}

export function handleColumnDragStart(
  fromColumn: HTMLDivElement,
  from: DraggableLocation
) {
  const style = makeColumnPlaceholderStyle(fromColumn, from);
  if (style) {
    getColumnPlaceholder()?.setAttribute('style', style);
  }
}

export function handleColumnDragUpdate(
  fromColumn: HTMLDivElement,
  to: DraggableLocation
) {
  const style = makeColumnPlaceholderStyle(fromColumn, to);
  const placeholder = getColumnPlaceholder();
  if (style) {
    placeholder?.setAttribute('style', style);
  } else {
    placeholder?.removeAttribute('style');
  }
}

export function handleCardDragStart(
  fromCard: HTMLDivElement,
  from: DraggableLocation
) {
  const style = makeCardPlaceholderStyle(fromCard, from);
  if (style) {
    getCardPlaceholder(from.droppableId)?.setAttribute('style', style);
  }
}

export function handleCardDragUpdate(
  fromCard: HTMLDivElement,
  to: DraggableLocation
) {
  getAllCardPlaceholders().forEach((el) => el.removeAttribute('style'));
  if (to) {
    const style = makeCardPlaceholderStyle(fromCard, to);
    if (style) {
      getCardPlaceholder(to.droppableId)?.setAttribute('style', style);
    }
  }
}

export const draggingHandlers = {
  getDragging: {
    [EDragType.Card]: getDraggingCardWrapper,
    [EDragType.Column]: getDraggingColumnWrapper,
  },
  dragStart: {
    [EDragType.Card]: handleCardDragStart,
    [EDragType.Column]: handleColumnDragStart,
  },
  dragUpdate: {
    [EDragType.Card]: handleCardDragUpdate,
    [EDragType.Column]: handleColumnDragUpdate,
  },
  dragEnd: {
    [EDragType.Card]: (to: DraggableLocation) =>
      getCardPlaceholder(to.droppableId)?.removeAttribute('style'),
    [EDragType.Column]: (to: DraggableLocation) =>
      getColumnPlaceholder()?.removeAttribute('style'),
  },
};

export function requestAutoScrolling(
  item: HTMLElement,
  scrollContainer: HTMLElement,
  scrollForward: () => void,
  scrollBack: () => void
) {
  let ended = false;
  const handler = () => {
    const itemRect = item.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    if (itemRect.x < containerRect.x && scrollContainer.scrollLeft > 0) {
      scrollBack();
    } else if (
      itemRect.x + itemRect.width > containerRect.x + containerRect.width &&
      scrollContainer.scrollLeft + scrollContainer.clientWidth <
        scrollContainer.scrollWidth
    ) {
      scrollForward();
    }
    if (!ended) {
      requestAnimationFrame(handler);
    }
  };
  requestAnimationFrame(handler);
  return () => {
    ended = true;
  };
}

export function runningPaceByTimes(times: number) {
  if (times > 60) {
    return 40;
  } else if (times > 20) {
    return 20;
  } else {
    return 10;
  }
}
