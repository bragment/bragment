import classNames from 'classnames';
import React, { memo, useState } from 'react';

interface IAutoSizeTextAreaProps {
  name?: string;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  withFocusedBorder?: boolean;
  withoutOutline?: boolean;
}

function AutoSizeTextArea(props: IAutoSizeTextAreaProps) {
  const {
    name,
    className,
    defaultValue = '',
    placeholder = '',
    withoutOutline,
    withFocusedBorder,
  } = props;
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="relative inline-block max-w-full leading-[0]">
      <div
        className={classNames(
          'inline-block max-w-full h-fit border py-2',
          'overflow-hidden text-ellipsis whitespace-nowrap',
          'pointer-events-none invisible'
        )}>
        {(value || placeholder).split('\n').map((el, i) => (
          <div
            key={i}
            className={classNames(
              'whitespace-normal break-words',
              className || 'px-4 text-sm leading-7'
            )}>
            {el
              .replace(/ ( +)/g, (match) => ' '.padEnd(match.length, '.'))
              .replace(/ $/, '.') || '.'}
          </div>
        ))}
      </div>
      <textarea
        name={name}
        className={classNames(
          'textarea textarea-bordered resize-none',
          'absolute top-0 left-0 w-full h-full min-h-0',
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

export default memo(AutoSizeTextArea);
