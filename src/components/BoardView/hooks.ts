import { ApolloError, useApolloClient } from '@apollo/client';
import { useCallback } from 'react';
import {
  generateElement,
  readCachedProjectColumn,
  readCachedProjectView,
  writeCachedProjectColumn,
  writeCachedProjectView,
} from '../../api/apollo';
import {
  Element,
  useMoveProjectColumnMutation,
  useMoveProjectItemMutation,
} from '../../graphql';

export function useMoveColumn() {
  const client = useApolloClient();
  const [moveProjectColumn] = useMoveProjectColumnMutation();
  return useCallback(
    async (
      columnId: string,
      toViewId: string,
      toIndex: number,
      fromViewId: string,
      fromIndex: number
    ) => {
      const sameView = fromViewId === toViewId;
      const toView = readCachedProjectView(client, toViewId);
      const fromView = sameView
        ? toView
        : readCachedProjectView(client, fromViewId);
      if (!columnId || !toView || (sameView && fromIndex === toIndex)) {
        return;
      }
      const oldToColumnOrder = toView.columnOrder as Element[];
      const newToColumnOrder = [...oldToColumnOrder];
      const oldFromColumnOrder = (fromView?.columnOrder || []) as Element[];
      const newFromColumnOrder = sameView
        ? newToColumnOrder
        : [...oldFromColumnOrder];
      newFromColumnOrder.splice(fromIndex, 1);
      newToColumnOrder.splice(toIndex, 0, generateElement(columnId));
      const afterId: string | undefined = newToColumnOrder[toIndex - 1]?.value;

      writeCachedProjectView(client, {
        ...toView,
        columnOrder: newToColumnOrder,
      });
      if (fromView && !sameView) {
        writeCachedProjectView(client, {
          ...fromView,
          columnOrder: newFromColumnOrder,
        });
      }
      let error: ApolloError | undefined;
      try {
        await moveProjectColumn({
          variables: {
            input: {
              id: columnId,
              fields: { toViewId, afterId },
            },
          },
        });
      } catch (err: any) {
        error = err;
        writeCachedProjectView(client, {
          ...toView,
          columnOrder: oldToColumnOrder,
        });
        if (fromView && !sameView) {
          writeCachedProjectView(client, {
            ...fromView,
            columnOrder: oldFromColumnOrder,
          });
        }
      }
      return error;
    },
    [client, moveProjectColumn]
  );
}

export function useMoveCard() {
  const client = useApolloClient();
  const [moveProjectItem] = useMoveProjectItemMutation();
  return useCallback(
    async (
      itemId: string,
      toColumnId: string,
      toIndex: number,
      fromColumnId: string,
      fromIndex: number
    ) => {
      const sameColumn = fromColumnId === toColumnId;
      const toColumn = readCachedProjectColumn(client, toColumnId);
      const fromColumn = sameColumn
        ? toColumn
        : readCachedProjectColumn(client, fromColumnId);
      if (!itemId || !toColumn || (sameColumn && fromIndex === toIndex)) {
        return;
      }
      const oldToItemOrder = toColumn.itemOrder as Element[];
      const newToItemOrder = [...oldToItemOrder];
      const oldFromItemOrder = (fromColumn?.itemOrder || []) as Element[];
      const newFromItemOrder = sameColumn
        ? newToItemOrder
        : [...oldFromItemOrder];
      newFromItemOrder.splice(fromIndex, 1);
      newToItemOrder.splice(toIndex, 0, generateElement(itemId));
      const afterId: string | undefined = newToItemOrder[toIndex - 1]?.value;
      writeCachedProjectColumn(client, {
        ...toColumn,
        itemOrder: newToItemOrder,
      });
      if (fromColumn && !sameColumn) {
        writeCachedProjectColumn(client, {
          ...fromColumn,
          itemOrder: newFromItemOrder,
        });
      }
      let error: ApolloError | undefined;
      try {
        await moveProjectItem({
          variables: {
            input: {
              id: itemId,
              fields: { toColumnId, fromColumnId, afterId },
            },
          },
        });
      } catch (err: any) {
        error = err;
        writeCachedProjectColumn(client, {
          ...toColumn,
          itemOrder: oldToItemOrder,
        });
        if (fromColumn && !sameColumn) {
          writeCachedProjectColumn(client, {
            ...fromColumn,
            itemOrder: oldFromItemOrder,
          });
        }
      }
      return error;
    },
    [client, moveProjectItem]
  );
}
