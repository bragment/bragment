import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { memo } from 'react';
import { AiOutlineHolder } from 'react-icons/ai';
import { getFieldIcon } from '../../fields/renders';
import { IProjectDataField } from '../../libs/client/types';

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
      <div
        {...dragHandleProps}
        className={classNames(
          'h-8 px-1 mr-2 cursor-grab rounded-lg',
          'flex items-center',
          'hover:bg-base-content/10'
        )}>
        <AiOutlineHolder className="text-xl" />
      </div>
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
