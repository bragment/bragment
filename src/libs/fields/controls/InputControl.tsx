import classNames from 'classnames';
import { memo, useRef } from 'react';
import AnimateSpin from '../../../components/AnimateSpin';
import { IEditingTableBodyCellProps } from '../types';

interface IInputControlProps extends IEditingTableBodyCellProps {
  type: string;
  defaultValue: string;
  name?: string;
  autoFocus?: boolean;
}

function InputControl(props: IInputControlProps) {
  const {
    type,
    defaultValue,
    name,
    className,
    autoFocus,
    loading,
    bordered,
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
          'input',
          bordered === true && 'input-bordered',
          bordered === false && 'border-0 no-shadow',
          'h-10 text-base bg-transparent',
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
