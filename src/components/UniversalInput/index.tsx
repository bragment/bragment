import classNames from 'classnames';
import { memo, useRef } from 'react';

interface IUniversalInputProps {
  name: string;
  defaultValue: string;
  className?: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onEnter?: () => void;
}

function UniversalInput(props: IUniversalInputProps) {
  const { name, defaultValue, className, onBlur, onChange, onEnter } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    const input = inputRef.current;
    if (input && onChange) {
      onChange(input.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      inputRef.current?.blur();
    }
    if (event.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  return (
    <input
      ref={inputRef}
      name={name}
      className={classNames(
        'input input-bordered',
        'w-full h-10 text-base outline-none active:outline-none focus:outline-none',
        className
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
