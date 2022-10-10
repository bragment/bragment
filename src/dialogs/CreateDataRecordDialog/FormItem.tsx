import classNames from 'classnames';
import { memo } from 'react';
import {
  checkIfFieldFullWidth,
  getFieldRenderer,
} from '../../fields/renderers';
import { IInnerDataFormItem } from '../CreateDataFormDialog/CreateForm';

interface IFormItemProps {
  index: number;
  name: string;
  item: IInnerDataFormItem;
}

function FormItem(props: IFormItemProps) {
  const { index, name, item } = props;
  const { field, defaultValue } = item;
  const renderer = getFieldRenderer(field.type);
  return (
    <div className={classNames('px-4 pt-0 pb-6')}>
      <div className="flex items-center">
        <div
          className={classNames('text-base-content/50', 'text-3xl font-bold')}>
          <div className="h-10 leading-10 tabular-nums">
            {(index + 1).toString().padStart(2, '0')}
          </div>
        </div>
        <div className="text-lg font-bold px-2.5 bg-transparent">
          {field.title}
        </div>
      </div>
      <div className="my-1">
        {renderer?.renderFormItem(field, name, defaultValue, {
          className: classNames(checkIfFieldFullWidth(field.type) && 'w-full'),
        })}
      </div>
    </div>
  );
}

export default memo(FormItem);
