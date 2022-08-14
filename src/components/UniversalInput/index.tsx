import classNames from 'classnames';
import React, { memo, useCallback, useRef } from 'react';

interface IUniversalInputProps {
  name: string;
  defaultValue: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onEnter?: () => void;
}

function UniversalInput(props: IUniversalInputProps) {
  const { name, defaultValue, onBlur, onChange, onEnter } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(() => {
    const input = inputRef.current;
    if (input && onChange) {
      onChange(input.value);
    }
  }, [onChange]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        inputRef.current?.blur();
      }
      if (event.key === 'Enter' && onEnter) {
        onEnter();
      }
    },
    [onEnter]
  );

  return (
    <input
      ref={inputRef}
      name={name}
      className={classNames(
        'input input-bordered',
        'w-full h-10 text-base outline-none active:outline-none focus:outline-none'
      )}
      autoFocus
      autoComplete="off"
      type="text"
      defaultValue={defaultValue}
      onBlur={onBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default memo(UniversalInput);
