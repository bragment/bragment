import classNames from 'classnames';
import { memo, useMemo } from 'react';
import { ILocalMessage } from '../../i18n/types';
import { EDataFieldType } from '../../libs/client/types';
import {
  getAllCategoryFieldRenderers,
  getCategoryMessageId,
} from '../../libs/fields';
import type FieldRendererBase from '../../libs/fields/renderers/FieldRendererBase';
import { useFormatMessage } from '../hooks';
import Select, { OptGroup, Option } from '../Select';

interface IDataFieldTypeSelectProps {
  className?: string;
  size?: 'sm';
  value?: EDataFieldType;
  onChange?: (value: EDataFieldType) => void;
  filter?: (field: FieldRendererBase) => boolean;
}

function DataFieldTypeSelect(props: IDataFieldTypeSelectProps) {
  const { className, size, value, onChange, filter } = props;
  const f = useFormatMessage();

  const allRendererGroups = useMemo(() => {
    const groups = getAllCategoryFieldRenderers();
    return filter
      ? groups.map((el) => ({
          ...el,
          renderers: el.renderers.filter(filter),
        }))
      : groups;
  }, [filter]);

  return (
    <Select
      className={classNames(className, size === 'sm' && 'select-sm')}
      dropdownClassName="py-2"
      showArrow={false}
      placeholder={<div className="w-full">{f('project.fieldType')}</div>}
      value={value}
      onChange={onChange}>
      {allRendererGroups
        .filter((el) => el.renderers.length)
        .map(({ category, renderers }) => (
          <OptGroup key={category} label={f(getCategoryMessageId(category))}>
            {renderers.map((renderer) => {
              const { type, Icon } = renderer;
              const title = f(renderer.getName() as ILocalMessage);
              return (
                <Option
                  key={type}
                  value={type}
                  className={classNames(
                    'mx-2 px-2 flex items-center',
                    size === 'sm' && 'option-sm'
                  )}>
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
          </OptGroup>
        ))}
    </Select>
  );
}

export default memo(DataFieldTypeSelect);
