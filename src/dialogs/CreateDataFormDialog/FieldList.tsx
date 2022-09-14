import classNames from 'classnames';
import { memo, useCallback } from 'react';
import DragDropList, {
  IDragDropListProps,
} from '../../components/SortableList/DragDropList';
import { IProjectDataField } from '../../libs/client/types';
import FieldItem from './FieldItem';
import styles from './index.module.scss';

interface IFieldListProps {
  offsetDiffRef: IDragDropListProps<void>['offsetDiffRef'];
  fields: IProjectDataField[];
}

export const USABLE_FIELD_LIST_ID = 'USABLE_FIELD_LIST';

function FieldList(props: IFieldListProps) {
  const { offsetDiffRef, fields } = props;

  const getItemId = useCallback((field: IProjectDataField) => {
    return field._id;
  }, []);

  const renderItem: IDragDropListProps<IProjectDataField>['renderItem'] =
    useCallback((field, _, dragHandleProps) => {
      return (
        <div className={classNames('rounded-lg px-2', styles.draggableItem)}>
          <FieldItem field={field} dragHandleProps={dragHandleProps} />
        </div>
      );
    }, []);

  return (
    <DragDropList
      droppableId={USABLE_FIELD_LIST_ID}
      droppable={false}
      offsetDiffRef={offsetDiffRef}
      listClassName="p-3"
      itemClassName={classNames('bg-base-100', 'h-12 rounded-lg')}
      list={fields}
      getItemId={getItemId}
      renderItem={renderItem}
    />
  );
}

export default memo(FieldList);
