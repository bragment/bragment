import classNames from 'classnames';
import Select, { BaseSelectRef } from 'rc-select';
import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import AnimateSpin from '../../../components/AnimateSpin';
import { disableScrollContainerByChildElement } from '../../utils';
import { IControlProps } from '../types';

const SEPARATOR = ',';

interface IMultipleSelectControlProps extends IControlProps {
  options?: React.ReactNode;
  defaultValue: string;
  singleLine?: boolean;
}

function MultipleSelectControl(props: IMultipleSelectControlProps) {
  const {
    className,
    bordered,
    singleLine,
    loading,
    onCancel,
    onChange,
    options,
  } = props;
  const defaultValue = props.defaultValue
    ? props.defaultValue.split(SEPARATOR)
    : [];
  const valueRef = useRef(defaultValue);
  const selectRef = useRef<BaseSelectRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const saveChange = useCallback(() => {
    const value = valueRef.current.join(SEPARATOR);
    if (onChange && value !== props.defaultValue) {
      return onChange(value);
    }
    if (onCancel) {
      return onCancel();
    }
  }, [props.defaultValue, onChange, onCancel]);

  const handleDropdownVisibleChange = useCallback(
    (visible: boolean) => {
      setDropdownVisible(visible);
      if (!visible) {
        saveChange();
      }
    },
    [saveChange]
  );

  const handleChange = useCallback((value: string[]) => {
    valueRef.current = value;
  }, []);

  useLayoutEffect(() => {
    if (dropdownVisible) {
      return disableScrollContainerByChildElement(wrapperRef.current);
    }
  }, [dropdownVisible]);

  return (
    <div
      ref={wrapperRef}
      className={classNames(
        'w-full',
        loading && 'relative pointer-events-none'
      )}>
      <Select
        ref={selectRef}
        mode="multiple"
        className={classNames(
          bordered && 'select-bordered',
          singleLine && '[&_.rc-select-selection-overflow]:!flex-nowrap',
          className
        )}
        dropdownClassName="[&>div]:p-1"
        showArrow={false}
        maxTagCount={singleLine ? 'responsive' : undefined}
        defaultValue={defaultValue}
        onChange={handleChange}
        onDropdownVisibleChange={handleDropdownVisibleChange}>
        {options}
      </Select>
      {loading && (
        <AnimateSpin
          className="absolute top-0 bottom-0 right-2 w-4 h-auto text-base"
          bgColorClassName="bg-base-100"
        />
      )}
    </div>
  );
}

export default memo(MultipleSelectControl);
