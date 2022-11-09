import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { memo } from 'react';
import DragHandle from '../../components/SortableList/DragHandle';
import { IProjectDataField } from '../../libs/client/types';
import { getFieldIcon } from '../../libs/fields';

interface IFieldItemProps {
  className?: string;
  field: IProjectDataField;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  actions?: React.ReactNode;
}

function FieldItem(props: IFieldItemProps) {
  const { className, field, dragHandleProps, actions } = props;
  const { type } = field;
  const Icon = getFieldIcon(type);

  return (
    <div className={classNames('h-12 flex items-center', className)}>
      <DragHandle
        dragHandleProps={dragHandleProps}
        className={'h-8 px-1 mr-2 text-xl'}
      />
      {Icon && <Icon className={classNames('flex-none mr-2 text-lg')} />}
      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
        {field.title}
      </div>
      {actions && (
        <div className="flex-auto flex items-center justify-end">{actions}</div>
      )}
    </div>
  );
}

export default memo(FieldItem);
