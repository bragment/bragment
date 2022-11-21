import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import { memo, MouseEventHandler, useCallback, useState } from 'react';
import { builtinColors } from './types';

interface IColorSelectProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorSelect(props: IColorSelectProps) {
  const { className, value, onChange } = props;
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleItemClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      const { currentTarget } = event;
      const color = currentTarget.dataset.value;
      if (color) {
        onChange(color);
      }
    },
    [onChange]
  );

  return (
    <Dropdown
      trigger="click"
      overlay={
        <div>
          {/* NOTE: mask */}
          <div className="fixed bg-transparent top-0 bottom-0 left-0 right-0" />
          {/* NOTE: content */}
          <div
            className={classNames(
              'bg-base-100/60 border-base-content/20 backdrop-blur-xl',
              'border rounded-lg shadow-lg',
              'p-3'
            )}>
            {dropdownVisible && (
              <div className="grid grid-cols-10 gap-3">
                {builtinColors.map((color) => (
                  <div
                    className="h-5 w-5 rounded cursor-pointer"
                    style={{ backgroundColor: color }}
                    data-value={color}
                    onClick={handleItemClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      }
      onVisibleChange={setDropdownVisible}>
      <div
        className={classNames(
          'w-5 h-5 rounded',
          'cursor-pointer border-white/20 border-2',
          className
        )}
        style={{ backgroundColor: value }}
      />
    </Dropdown>
  );
}

export default memo(ColorSelect);
