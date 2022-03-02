import { DraggableLocation } from 'react-beautiful-dnd';

import columnStyles from './ColumnList/Column/index.module.scss';
import styles from './index.module.scss';

const APP_HEADER_HEIGHT = 48;
const COLUMN_WIDTH = 280;
const COLUMN_GUTTER = 16;

export function getColumnPlaceholder() {
  return document.querySelector<HTMLDivElement>(`.${styles.columnPlaceholder}`);
}

export function getColumnWrapper(index: number) {
  return document.querySelector<HTMLDivElement>(
    `.${columnStyles.wrapper}[data-rdb-draggable-index="${index}"]`
  );
}

export function getColumnWrapperId(index: number) {
  const div = getColumnWrapper(index);
  return div?.dataset.rbdDraggableId;
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

export function makeColumnPlaceholderStyle(
  from: DraggableLocation,
  to: DraggableLocation
) {
  const fromIndex = from.index;
  const toIndex = to.index;
  const fromColumn = getColumnWrapper(fromIndex);
  if (fromColumn) {
    return `display: block; height: ${getColumnHeight(fromColumn)}px; left: ${
      COLUMN_WIDTH * toIndex + COLUMN_GUTTER * toIndex + COLUMN_GUTTER
    }px; top: ${COLUMN_GUTTER + APP_HEADER_HEIGHT}px`;
  }
}

export function handleColumnDragStart(from: DraggableLocation) {
  const style = makeColumnPlaceholderStyle(from, from);
  if (style) {
    getColumnPlaceholder()?.setAttribute('style', style);
  }
}

export function handleColumnDragUpdate(
  from: DraggableLocation,
  to: DraggableLocation
) {
  const style = makeColumnPlaceholderStyle(from, to);
  const placeholder = getColumnPlaceholder();
  if (style) {
    placeholder?.setAttribute('style', style);
  } else {
    placeholder?.removeAttribute('style');
  }
}
