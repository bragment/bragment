import classNames from 'classnames';
import { memo } from 'react';
import { IProjectDataField } from '../../libs/client/types';
import { getFieldIcon } from '../../libs/fields';
import { useFormatMessage } from '../hooks';
import Select, { Option } from '../Select';

interface IDataFieldSelectProps {
  fields: IProjectDataField[];
  className?: string;
  size?: 'sm';
  value?: string;
  onChange?: (value: string) => void;
}

function DataFieldSelect(props: IDataFieldSelectProps) {
  const { fields, className, size, value, onChange } = props;
  const f = useFormatMessage();

  return (
    <Select
      className={classNames(
        'select select-bordered',
        size === 'sm' && 'select-sm',
        className
      )}
      dropdownClassName="[&>div]:py-2"
      showArrow={false}
      dropdownMatchSelectWidth={240}
      placeholder={<div className="w-full">{f('project.fieldType')}</div>}
      value={value}
      onChange={onChange}>
      {fields.map(({ _id, type, title }) => {
        const Icon = getFieldIcon(type);
        return (
          <Option
            key={_id}
            value={_id}
            className={classNames(
              'mx-2 px-2 flex items-center',
              size === 'sm' && 'option-sm'
            )}>
            <div className="w-full flex items-center">
              {Icon && <Icon className="flex-none mr-2 text-lg" />}
              <div
                className="flex-auto text-ellipsis overflow-hidden whitespace-nowrap"
                title={title}>
                {title}
              </div>
            </div>
          </Option>
        );
      })}
    </Select>
  );
}

export default memo(DataFieldSelect);
