import { clsx } from 'clsx';
import { memo, useMemo } from 'react';
import { useFormatMessage } from '../hooks';
import {
  fieldCategoryMessageIdRecord,
  fieldTypeMessageIdRecord,
} from './types';
import { EDataFieldType } from '@/libs/client/types';
import { getAllCategoryFieldRenderers } from '@/libs/core/field-renderers';
import {
  EFieldCategory,
  IFieldRenderer,
} from '@/libs/core/field-renderers/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/libs/radix-ui/select';

interface IDataFieldTypeSelectProps {
  className?: string;
  size?: 'sm';
  value?: EDataFieldType;
  onChange?: (value: EDataFieldType) => void;
  filter?: (field: IFieldRenderer) => boolean;
}

export function getCategoryMessageId(category: EFieldCategory) {
  return fieldCategoryMessageIdRecord[category];
}

export function getFieldTypeMessageId(fieldType: EDataFieldType) {
  return fieldTypeMessageIdRecord[fieldType];
}

function DataFieldTypeSelect(props: IDataFieldTypeSelectProps) {
  const { className, value, onChange, filter } = props;
  const f = useFormatMessage();

  const allRendererGroups = useMemo(() => {
    const groups = getAllCategoryFieldRenderers();
    return (
      filter
        ? groups.map((el) => ({
            ...el,
            renderers: el.renderers.filter(filter),
          }))
        : groups
    ).filter((el) => el.renderers.length);
  }, [filter]);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={clsx(className)}>
        <SelectValue placeholder={f('dataField.selectAFieldType')} />
      </SelectTrigger>
      <SelectContent>
        {allRendererGroups.map(({ category, renderers }) => (
          <SelectGroup key={category}>
            <SelectLabel>{f(getCategoryMessageId(category))}</SelectLabel>
            {renderers.map(({ Icon, type }) => (
              <SelectItem key={type} value={type}>
                <div className="max-w-full flex flex-row gap-1 items-center">
                  {Icon && <Icon className="flex-none" />}
                  <div className="flex-auto overflow-hidden text-ellipsis whitespace-nowrap">
                    {f(getFieldTypeMessageId(type))}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

export default memo(DataFieldTypeSelect);
