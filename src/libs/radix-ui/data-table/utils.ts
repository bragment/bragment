import { Header, Table } from '@tanstack/react-table';

export function checkIfPinned<TData, TValue>(header: Header<TData, TValue>) {
  return header.column.getIsPinned();
}

export function checkIfLeftMovable<TData, TValue>(
  header: Header<TData, TValue>,
  table: Table<TData>
) {
  const pinned = header.column.getIsPinned();
  if (pinned === 'left') {
    const headers = table.getLeftLeafHeaders();
    return headers[0] !== header && headers[1] !== header;
  }

  if (pinned === 'right') {
    const headers = table.getRightLeafHeaders();
    return headers[0] !== header && headers[headers.length - 1] !== header;
  }
  const headers = table.getCenterLeafHeaders();
  return headers[0] !== header;
}

export function checkIfRightMovable<TData, TValue>(
  header: Header<TData, TValue>,
  table: Table<TData>
) {
  const pinned = header.column.getIsPinned();
  if (pinned === 'left') {
    const headers = table.getLeftLeafHeaders();
    return headers[headers.length - 1] !== header && headers[0] !== header;
  }

  if (pinned === 'right') {
    const headers = table.getRightLeafHeaders();
    return (
      headers[headers.length - 1] !== header &&
      headers[headers.length - 2] !== header
    );
  }
  const headers = table.getCenterLeafHeaders();
  return headers[headers.length - 1] !== header;
}

export function pinLeft<TData, TValue>(header: Header<TData, TValue>) {
  header.column.pin('left');
}

export function unpin<TData, TValue>(header: Header<TData, TValue>) {
  header.column.pin(false);
}

export function moveLeft<TData, TValue>(
  header: Header<TData, TValue>,
  table: Table<TData>
) {
  table.setColumnOrder((order) => {
    const columnId = header.column.columnDef.id;
    const index = order.findIndex((id) => id === columnId);
    if (columnId && index > 0) {
      const newOrder = order.filter((id) => id !== columnId);
      newOrder.splice(index - 1, 0, columnId);
      return newOrder;
    }
    return order;
  });
}

export function moveRight<TData, TValue>(
  header: Header<TData, TValue>,
  table: Table<TData>
) {
  table.setColumnOrder((order) => {
    const columnId = header.column.columnDef.id;
    const index = order.findIndex((id) => id === columnId);
    if (columnId && index > -1 && index < order.length - 1) {
      const newOrder = order.filter((id) => id !== columnId);
      newOrder.splice(index + 1, 0, columnId);
      return newOrder;
    }
    return order;
  });
}
