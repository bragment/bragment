import classNames from 'classnames';
import { memo, useRef, useState } from 'react';
import AnimateSpin from '../../../components/AnimateSpin';
import { IControlProps } from '../types';

interface ITextAreaControlProps extends IControlProps {
  autoFocus?: boolean;
  defaultValue: string;
  name?: string;
  singleLine?: boolean;
}

function TextAreaControl(props: ITextAreaControlProps) {
  const {
    autoFocus,
    className,
    bordered,
    defaultValue,
    loading,
    name,
    singleLine,
    onCancel,
    onChange,
  } = props;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (key === 'Escape') {
      inputRef.current?.blur();
      return;
    }

    if (key === 'Enter') {
      if (event.shiftKey && !singleLine) {
        return;
      }
      if (onChange) {
        event.preventDefault();
        event.stopPropagation();
        onChange(inputRef.current?.value || '');
      }
    }
  };

  return (
    <div
      className={classNames(
        'w-full relative',
        loading && 'pointer-events-none'
      )}>
      <div
        className={classNames(
          'inline-block max-w-full h-fit py-2',
          'pointer-events-none invisible'
        )}>
        {value.split('\n').map((el, i) => (
          <div
            key={i}
            className={classNames('whitespace-normal break-words', className)}>
            {el
              .replace(/ ( +)/g, (match) => ' '.padEnd(match.length, '.'))
              .replace(/ $/, '.') || '.'}
          </div>
        ))}
      </div>
      <textarea
        ref={inputRef}
        name={name}
        className={classNames(
          'textarea',
          'absolute top-0 left-0 w-full h-full',
          'min-h-0 block resize-none text-base bg-transparent',
          bordered === true && 'textarea-bordered',
          bordered === false && 'border-0 no-shadow',
          className
        )}
        autoFocus={autoFocus}
        autoComplete="off"
        defaultValue={defaultValue}
        onBlur={onCancel}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      {loading && (
        <AnimateSpin
          className="absolute top-0 bottom-0 right-2 w-4 h-auto text-base"
          bgColorClassName="bg-base-100"
        />
      )}
    </div>
  );
}

export default memo(TextAreaControl);
