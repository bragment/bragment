import Select, { Option } from 'rc-select';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import DataFieldSelect from '../../../components/DataFieldSelect';
import DataFieldTypeSelect from '../../../components/DataFieldTypeSelect';
import { useFormatMessage } from '../../../components/hooks';
import { EDataFieldType, IProjectDataField } from '../../../libs/client/types';
import { EFieldCategory } from '../../types';
import {
  checkIfFieldResolvable,
  getDefaultFieldType,
  getResolvablePaths,
} from '../../utils';

interface ICreateFieldExtraProps {
  existingFields?: IProjectDataField[];
}

function CreateFieldExtra(props: ICreateFieldExtraProps) {
  const { existingFields } = props;
  const f = useFormatMessage();
  const relatableFields = useMemo(
    () => existingFields?.filter((el) => checkIfFieldResolvable(el.type)) || [],
    [existingFields]
  );
  const [relatedField, setRelatedField] = useState(relatableFields[0]?._id);
  const [resolvablePaths, setResolvablePaths] = useState(
    getResolvablePaths(relatableFields[0]?.type)
  );
  const [subPath, setSubPath] = useState(resolvablePaths[0]?.value);
  const [asType, setAsType] = useState(getDefaultFieldType());

  const handleRelatedFieldIdChange = useCallback(
    (fieldId: string) => {
      setRelatedField(fieldId);
      const field = relatableFields.find((el) => el._id === fieldId);
      field && setResolvablePaths(getResolvablePaths(field.type));
    },
    [relatableFields]
  );

  const handleSubPathChange = useCallback((path: string) => {
    setSubPath(path);
  }, []);

  const handleAsTypeChange = useCallback((type: EDataFieldType) => {
    setAsType(type);
  }, []);

  useEffect(() => {
    setSubPath(resolvablePaths[0]?.value);
  }, [resolvablePaths]);

  return (
    <div>
      <div className="divider my-0" />
      <input type="hidden" name="relatedField" value={relatedField} />
      <input type="hidden" name="subPath" value={subPath} />
      <input type="hidden" name="asType" value={asType} />
      <label className="label">
        <span className="label-text">{f('dataField.resolve')}</span>
      </label>
      <DataFieldSelect
        className="w-full"
        fields={relatableFields}
        value={relatedField}
        onChange={handleRelatedFieldIdChange}
      />
      <label className="label">
        <span className="label-text">{f('dataField.path')}</span>
      </label>
      <Select
        className="w-full"
        dropdownClassName="py-2"
        showArrow={false}
        dropdownMatchSelectWidth={240}
        placeholder={<div className="w-full">{f('project.fieldType')}</div>}
        value={subPath}
        onChange={handleSubPathChange}>
        {resolvablePaths.map(({ name, value }) => (
          <Option
            key={value}
            value={value}
            className="mx-2 px-2 flex items-center">
            <div className="w-full flex items-center">
              <div
                className="flex-auto text-ellipsis overflow-hidden whitespace-nowrap"
                title={f(name)}>
                {f(name)}
              </div>
            </div>
          </Option>
        ))}
      </Select>
      <label className="label">
        <span className="label-text">{f('dataField.asType')}</span>
      </label>
      <DataFieldTypeSelect
        className="w-full"
        filter={(el) => el.category === EFieldCategory.Basic}
        value={asType}
        onChange={handleAsTypeChange}
      />
    </div>
  );
}

export default memo(CreateFieldExtra);
