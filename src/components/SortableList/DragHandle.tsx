import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { memo } from 'react';
import { AiOutlineHolder } from 'react-icons/ai';

interface IDragHandleProps {
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  className?: string;
}

function DragHandle(props: IDragHandleProps) {
  const { dragHandleProps, className } = props;
  return (
    <div
      {...dragHandleProps}
      className={classNames(
        'flex items-center',
        dragHandleProps && 'cursor-grab rounded-lg hover:bg-base-content/10',
        className
      )}>
      <AiOutlineHolder />
    </div>
  );
}

export default memo(DragHandle);
