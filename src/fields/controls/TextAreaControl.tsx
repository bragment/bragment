import classNames from 'classnames';
import { memo, useRef, useState } from 'react';
import AnimateSpin from '../../components/AnimateSpin';

interface ITextAreaControlProps {
  defaultValue: string;
  name?: string;
  className?: string;
  autoFocus?: boolean;
  loading?: boolean;
  onCancel?: () => void;
  onChange?: (value: string) => void;
}

const MAX_LINE = 5;
const LINE_HEIGHT = 24;
const MIN_HEIGHT = 40;
const MAX_HEIGHT = MIN_HEIGHT + LINE_HEIGHT * (MAX_LINE - 1);

function calculateTextLine(text: string) {
  return text.split('\n').length;
}

function calculateTextAreaHeight(text: string) {
  const line = calculateTextLine(text);
  return Math.max(
    MIN_HEIGHT,
    MIN_HEIGHT + LINE_HEIGHT * (Math.min(MAX_LINE, line) - 1)
  );
}

function TextAreaControl(props: ITextAreaControlProps) {
  const {
    defaultValue,
    name,
    className,
    autoFocus,
    loading,
    onCancel,
    onChange,
  } = props;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState(calculateTextAreaHeight(defaultValue));

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key, target } = event;
    if (key === 'Escape') {
      inputRef.current?.blur();
      return;
    }
    if (key === 'Backspace') {
      if (target instanceof HTMLTextAreaElement) {
        requestAnimationFrame(() =>
          setHeight(calculateTextAreaHeight(target.value))
        );
      }
      return;
    }
    if (key === 'Enter') {
      if (event.shiftKey) {
        if (height < MAX_HEIGHT) {
          setHeight((current) => current + LINE_HEIGHT);
        }
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
        'w-full',
        loading && 'relative pointer-events-none'
      )}>
      <textarea
        ref={inputRef}
        name={name}
        style={{ height }}
        className={classNames(
          'textarea no-shadow',
          'min-h-0 block resize-none text-base bg-transparent',
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
          className="absolute top-[1px] bottom-[7px] right-3 w-4 h-auto text-base"
          bgColorClassName="bg-base-100"
        />
      )}
    </div>
  );
}

export default memo(TextAreaControl);
