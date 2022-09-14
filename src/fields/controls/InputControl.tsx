import classNames from 'classnames';
import { memo, useRef } from 'react';
import AnimateSpin from '../../components/AnimateSpin';

interface IInputControlProps {
  type: string;
  defaultValue: string;
  name?: string;
  className?: string;
  autoFocus?: boolean;
  loading?: boolean;
  onCancel?: () => void;
  onChange?: (value: string) => void;
}

function InputControl(props: IInputControlProps) {
  const {
    type,
    defaultValue,
    name,
    className,
    autoFocus,
    loading,
    onCancel,
    onChange,
  } = props;
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
    <div
      className={classNames(
        'w-full',
        loading && 'relative pointer-events-none'
      )}>
      <input
        ref={inputRef}
        type={type}
        name={name}
        className={classNames(
          'input input-bordered',
          'h-10 text-base outline-none active:outline-none focus:outline-none',
          className
        )}
        autoFocus={autoFocus}
        autoComplete="off"
        defaultValue={defaultValue}
        onBlur={onCancel}
        onKeyDown={handleKeyDown}
      />
      {loading && (
        <AnimateSpin
          className="absolute top-1 right-2 bottom-1 w-6 h-auto text-base"
          bgColorClassName="bg-base-100"
        />
      )}
    </div>
  );
}

export default memo(InputControl);
