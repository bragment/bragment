import { memo, useMemo } from 'react';
import { EDataFieldType } from '../../libs/client/types';
import { useFormatMessage } from '../hooks';
import SelectInput, {
  ISelectInputOption,
  ISelectInputProps,
} from '../SelectInput';
import { dataFieldTypes } from './config';

interface IDataFieldTypeSelectProps {
  defaultValue?: EDataFieldType;
  onChange?: (value: EDataFieldType) => void;
}

function DataFieldTypeSelect(props: IDataFieldTypeSelectProps) {
  const f = useFormatMessage();
  const { defaultValue, onChange } = props;

  const options = useMemo<ISelectInputOption[]>(
    () =>
      dataFieldTypes.map(({ type, title, Icon }) => ({
        value: type,
        content: f(title),
        node: (
          <>
            <Icon className="mr-3 text-lg opacity-70" />
            {f(title)}
          </>
        ),
      })),
    [f]
  );

  return (
    <SelectInput
      name="type"
      defaultValue={defaultValue}
      options={options}
      onChange={onChange as ISelectInputProps['onChange']}
    />
  );
}

export default memo(DataFieldTypeSelect);
