import { memo, useMemo } from 'react';
import { getAllFieldRenderers } from '../../fields/renders';
import { EDataFieldType } from '../../libs/client/types';
import { useFormatMessage } from '../hooks';
import SelectInput, {
  ISelectInputOption,
  ISelectInputProps,
} from '../SelectInput';

interface IDataFieldTypeSelectProps {
  defaultValue?: EDataFieldType;
  onChange?: (value: EDataFieldType) => void;
}

function DataFieldTypeSelect(props: IDataFieldTypeSelectProps) {
  const renderers = useMemo(() => getAllFieldRenderers(), []);
  const firstRenderer = renderers[0];
  const f = useFormatMessage();
  const { defaultValue = firstRenderer?.type, onChange } = props;

  const options = useMemo<ISelectInputOption[]>(
    () =>
      renderers.map((renderer) => {
        const { type, Icon } = renderer;
        const title = f(renderer.getNameAsMessageId());
        return {
          value: type,
          content: title,
          node: (
            <div className="w-full flex items-center">
              <Icon className="flex-none mr-2 text-lg" />
              <div
                className="flex-auto text-ellipsis overflow-hidden whitespace-nowrap"
                title={title}>
                {title}
              </div>
            </div>
          ),
        };
      }),
    [f, renderers]
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
