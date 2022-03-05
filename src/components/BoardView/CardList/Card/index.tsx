import { Card as AntdCard } from 'antd';
import { memo } from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { useGetProjectItem } from '../../../hooks';

import styles from './index.module.scss';

interface ICardProps {
  objectId: string;
  index: number;
}

function Card(props: ICardProps) {
  const { objectId, index } = props;
  const { data: itemData } = useGetProjectItem(objectId);
  const item = itemData?.projectItem;

  return item ? (
    <Draggable draggableId={objectId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={styles.wrapper}
          data-rdb-draggable-index={index}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <AntdCard hoverable bordered={false}>
            <div className={styles.body}>{item.title}</div>
          </AntdCard>
        </div>
      )}
    </Draggable>
  ) : null;
}

export default memo(Card);
