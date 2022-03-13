import { Draggable, DraggableProvided } from '@breeze2/react-beautiful-dnd';
import { Card as AntdCard } from 'antd';
import { memo } from 'react';
import { getCardComponent } from '../../../../cards';
import { IProjectItemFragment } from '../../../../graphql';
import { useGetProjectItem } from '../../../hooks';

import styles from './index.module.scss';

interface ICardProps {
  objectId: string;
  index: number;
}

function renderSimpleView(data: IProjectItemFragment) {
  const CardComponent = getCardComponent(data.type);
  const SampleView = CardComponent?.SampleView;
  return SampleView ? (
    <SampleView data={data} />
  ) : (
    <>{data.title || 'Untitled'}</>
  );
}

function Card(props: ICardProps) {
  const { objectId, index } = props;
  const { data: itemData } = useGetProjectItem(objectId);
  const item = itemData?.projectItem;

  return item ? (
    <Draggable draggableId={item.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className={styles.wrapper}
          data-rbd-draggable-index={index}
          data-rbd-draggable-object-id={objectId}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <AntdCard hoverable bordered={false}>
            <div className={styles.body}>{renderSimpleView(item)}</div>
          </AntdCard>
        </div>
      )}
    </Draggable>
  ) : null;
}

export default memo(Card);
