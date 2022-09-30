import Select, { Option } from 'rc-select';
import { memo } from 'react';
import { getAllFieldRenderers } from '../../fields/renders';
import { EDataFieldType } from '../../libs/client/types';
import { useFormatMessage } from '../hooks';

interface IDataFieldTypeSelectProps {
  value?: EDataFieldType;
  onChange?: (value: EDataFieldType) => void;
}

function DataFieldTypeSelect(props: IDataFieldTypeSelectProps) {
  const { value, onChange } = props;
  const f = useFormatMessage();

  return (
    <Select
      dropdownClassName="py-2"
      showArrow={false}
      placeholder={<div className="w-full">{f('project.fieldType')}</div>}
      value={value}
      onChange={onChange}>
      {getAllFieldRenderers().map((renderer) => {
        const { type, Icon } = renderer;
        const title = f(renderer.getNameAsMessageId());
        return (
          <Option
            key={type}
            value={type}
            className="h-10 mx-2 px-2 flex items-center">
            <div className="w-full flex items-center">
              <Icon className="flex-none mr-2 text-lg" />
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

export default memo(DataFieldTypeSelect);
