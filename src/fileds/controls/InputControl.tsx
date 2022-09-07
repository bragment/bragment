import classNames from 'classnames';
import { memo, useRef } from 'react';

interface IInputControlProps {
  type: string;
  defaultValue: string;
  className?: string;
  onCancel?: () => void;
  onChange?: (value: string) => void;
}

function InputControl(props: IInputControlProps) {
  const { type, defaultValue, className, onCancel, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      inputRef.current?.blur();
    }
    if (event.key === 'Enter' && onChange) {
      onChange(inputRef.current?.value || '');
    }
  };

  return (
    <input
      ref={inputRef}
      type={type}
      className={classNames(
        'input input-bordered',
        'w-full h-10 text-base outline-none active:outline-none focus:outline-none',
        className
      )}
      autoFocus
      autoComplete="off"
      defaultValue={defaultValue}
      onBlur={onCancel}
      onKeyDown={handleKeyDown}
    />
  );
}

export default memo(InputControl);
