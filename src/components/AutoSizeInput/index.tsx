import classNames from 'classnames';
import React, { memo, useState } from 'react';

interface IAutoSizeInputProps {
  name?: string;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  withFocusedBorder?: boolean;
  withoutOutline?: boolean;
}

function AutoSizeInput(props: IAutoSizeInputProps) {
  const {
    name,
    className,
    defaultValue = '',
    placeholder = '',
    withoutOutline,
    withFocusedBorder,
  } = props;
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="relative inline-block max-w-full">
      <div
        className={classNames(
          'inline-block max-w-full border pointer-events-none invisible',
          'overflow-hidden text-ellipsis whitespace-nowrap',
          className || 'h-12 px-4 text-sm'
        )}>
        {value || placeholder}
      </div>
      <input
        name={name}
        className={classNames(
          'input input-bordered',
          'absolute top-0 left-0 w-full',
          withFocusedBorder &&
            'focus:border-base-content/20 border-transparent',
          withoutOutline &&
            'outline-none active:outline-none focus:outline-none',
          className
        )}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default memo(AutoSizeInput);
