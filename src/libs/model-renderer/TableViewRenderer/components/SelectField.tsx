import classNames from 'classnames';
import { observer } from 'mobx-react';
import AbstractFieldRenderer from '../../AbstractViewRenderer/AbstractFieldRenderer';
import MultipleSelectControl from '../../controls/MultipleSelectControl';
import SingleSelectControl from '../../controls/SingleSelectControl';
import { ICurrentFieldProps, ICurrentViewStore } from '../types';

interface ISelectFieldProps extends ICurrentFieldProps {
  singleValue?: boolean;
  renderer: AbstractFieldRenderer<ICurrentViewStore, ICurrentFieldProps>;
}

function SelectField(props: ISelectFieldProps) {
  const {
    data,
    renderer,
    active,
    editing,
    loading,
    singleValue,
    onCancel,
    onChange,
  } = props;
  const value = (data?.value || '').toString();
  const activeOrEditing = active || editing;

  if (singleValue) {
    return (
      <SingleSelectControl
        bordered={false}
        className={classNames(
          'w-full [&_input]:!ring-0',
          'h-[38px] min-h-[38px]',
          !activeOrEditing && 'pointer-events-none'
        )}
        allowClear={activeOrEditing}
        defaultValue={value}
        loading={loading}
        options={renderer.options}
        onChange={onChange}
        onCancel={onCancel}
      />
    );
  }

  return (
    <MultipleSelectControl
      bordered={false}
      className={classNames(
        'w-full [&_input]:!ring-0',
        'min-h-[38px] [&_.rc-select-selection-overflow]:py-[2px] [&_.rc-select-selection-overflow]:min-h-[38px]',
        activeOrEditing ? 'removable' : 'pointer-events-none'
      )}
      singleLine={!activeOrEditing}
      defaultValue={value}
      loading={loading}
      options={renderer.options}
      onChange={onChange}
      onCancel={onCancel}
    />
  );
}

export default observer(SelectField);
