import Select, { Option } from 'rc-select';
import { memo } from 'react';
import { getFieldIcon } from '../../fields/renders';
import { IProjectDataField } from '../../libs/client/types';
import { useFormatMessage } from '../hooks';

interface IDataFieldSelectProps {
  fields: IProjectDataField[];
  value?: string;
  onChange?: (value: string) => void;
}

function DataFieldSelect(props: IDataFieldSelectProps) {
  const { fields, value, onChange } = props;
  const f = useFormatMessage();

  return (
    <Select
      className="select-sm"
      dropdownClassName="py-2"
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
            className="h-[1.875rem] mx-2 px-2 flex items-center">
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
