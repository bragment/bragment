import classNames from 'classnames';
import Select from 'rc-select';
import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import AnimateSpin from '../../../components/AnimateSpin';
import { disableScrollContainerByChildElement } from '../../utils';
import { IControlProps } from '../types';

interface ISingleSelectControlProps extends IControlProps {
  allowClear?: boolean;
  defaultValue?: string;
  options?: React.ReactNode;
}

function SingleSelectControl(props: ISingleSelectControlProps) {
  const {
    allowClear,
    className,
    bordered,
    defaultValue,
    loading,
    onCancel,
    onChange,
    options,
  } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleDropdownVisibleChange = useCallback((visible: boolean) => {
    setDropdownVisible(visible);
  }, []);
  const handleSelect = useCallback(
    (value = '') => {
      if (onChange && value !== defaultValue) {
        return onChange(value);
      }
      if (onCancel) {
        return onCancel();
      }
    },
    [defaultValue, onChange, onCancel]
  );

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
        allowClear={allowClear}
        className={classNames(
          'select select-ghost',
          bordered && 'select-bordered',
          className
        )}
        dropdownClassName="[&>div]:p-1"
        defaultValue={defaultValue}
        showArrow={false}
        onBlur={onCancel}
        onSelect={handleSelect}
        onClear={handleSelect}
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

export default memo(SingleSelectControl);
