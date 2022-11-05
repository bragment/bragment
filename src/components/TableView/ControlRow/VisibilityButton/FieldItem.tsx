import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { memo } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { getFieldIcon } from '../../../../fields';
import { IProjectDataField } from '../../../../libs/client/types';
import { useFormatMessage } from '../../../hooks';
import DragHandle from '../../../SortableList/DragHandle';
import styles from './index.module.scss';

interface IFieldItemProps {
  field: IProjectDataField;
  main: boolean;
  visible: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  onVisibleChange: (field: IProjectDataField, visible: boolean) => void;
}

function FieldItem(props: IFieldItemProps) {
  const { field, main, visible, dragHandleProps, onVisibleChange } = props;
  const f = useFormatMessage();
  const handleChange = () => {
    onVisibleChange(field, !visible);
  };
  const Icon = getFieldIcon(field.type);

  return (
    <div className={classNames('rounded-lg', styles.fieldItemWrapper)}>
      <div
        className={classNames(
          'rounded-lg pl-2 pr-4 py-2 flex items-center',
          'text-base-content',
          main && 'text-info',
          !main && !visible && 'text-base-content/40',
          styles.fieldItem
        )}>
        <DragHandle
          dragHandleProps={visible && !main ? dragHandleProps : null}
          className={'h-8 px-1 mr-2 text-xl'}
        />
        {Icon && <Icon className="flex-none mr-2 text-lg" />}
        <span className="flex-auto mr-2 text-ellipsis overflow-hidden whitespace-nowrap">
          {field.title}
        </span>
        {main ? (
          <div
            className={classNames(
              'badge badge-info',
              'flex-none relative -right-2',
              styles.mainFieldBadge
            )}>
            {f('dataView.mainField')}
            <div
              className={classNames(
                'badge badge-info',
                'absolute right-0 opacity-0 whitespace-nowrap pointer-events-none'
              )}>
              {f('dataView.mainFieldVisibleFirst')}
            </div>
          </div>
        ) : (
          <label className={classNames('swap', 'flex-none text-lg')}>
            <input type="checkbox" checked={visible} onChange={handleChange} />
            <div className="swap-on">
              <HiOutlineEye />
            </div>
            <div className="swap-off">
              <HiOutlineEyeOff />
            </div>
          </label>
        )}
      </div>
    </div>
  );
}

export default memo(FieldItem);
