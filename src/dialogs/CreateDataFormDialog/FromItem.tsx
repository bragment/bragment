import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { HiOutlineMinusCircle } from 'react-icons/hi';
import AutoSizeTextArea from '../../components/AutoSizeTextArea';
import { useFormatMessage } from '../../components/hooks';
import { checkIfFieldFullWidth, getFieldRenderer } from '../../fields/renders';
import { EDataFormItemKey, IProjectDataField } from '../../libs/client/types';
import FieldItem from './FieldItem';
import styles from './index.module.scss';

interface IFromItemProps {
  className?: string;
  index: number;
  field: IProjectDataField;
  label: string;
  defaultValue: string;
  required?: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  onRemove?: (fieldId: string) => void;
}

export const SEPARATOR = '.';

function FromItem(props: IFromItemProps) {
  const {
    className,
    index,
    field,
    label,
    defaultValue,
    required,
    dragHandleProps,
    onRemove,
  } = props;
  const f = useFormatMessage();
  const { type } = field;
  const renderer = getFieldRenderer(type);

  const handleRemove: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const div = e.currentTarget;
      const fieldId = div.dataset.fieldId;
      if (fieldId && onRemove) {
        onRemove(fieldId);
      }
    },
    [onRemove]
  );

  return (
    <div className={classNames(styles.draggableItem, className)}>
      <FieldItem
        field={field}
        dragHandleProps={dragHandleProps}
        actions={
          <>
            <label className={classNames('label', 'cursor-pointer p-0')}>
              <input
                type="checkbox"
                defaultChecked={required}
                name={[field._id, EDataFormItemKey.required].join(SEPARATOR)}
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span
                className={classNames('label-text text-base-content', 'ml-2')}>
                {f('common.required')}
              </span>
            </label>
            {onRemove && (
              <button
                type="button"
                title={f('common.remove')}
                data-field-id={field._id}
                className={classNames(
                  'btn btn-sm btn-ghost text-error',
                  'ml-4 px-2 text-xl'
                )}
                onClick={handleRemove}>
                <HiOutlineMinusCircle aria-label={f('common.remove')} />
              </button>
            )}
          </>
        }
      />
      <input
        type="hidden"
        name={[field._id, EDataFormItemKey.field].join(SEPARATOR)}
        value={field._id}
      />
      <div className="relative pl-20 mt-1">
        <AutoSizeTextArea
          name={[field._id, EDataFormItemKey.label].join(SEPARATOR)}
          className="text-lg font-bold leading-6 px-2.5 bg-transparent"
          defaultValue={label || field.title}
          placeholder={field.title}
          withFocusedBorder
          withoutOutline
        />
        <div
          className={classNames(
            'text-base-content/50',
            'absolute top-0 left-8 text-3xl font-bold p-[1px]'
          )}>
          <div className="h-10 leading-10">
            {(index + 1).toString().padStart(2, '0')}
          </div>
        </div>
      </div>
      <div className="pl-8 mt-1 mb-2">
        {renderer?.renderFormItem(
          field,
          [field._id, EDataFormItemKey.defaultValue].join(SEPARATOR),
          defaultValue,
          {
            className: classNames(
              checkIfFieldFullWidth(field.type) && 'w-full'
            ),
          }
        )}
      </div>
    </div>
  );
}

export default memo(FromItem);
