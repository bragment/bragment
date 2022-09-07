import classNames from 'classnames';
import { memo, useRef, useState } from 'react';

interface ITextAreaControlProps {
  defaultValue: string;
  className?: string;
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
  const { defaultValue, className, onCancel, onChange } = props;
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
    <textarea
      ref={inputRef}
      style={{ height }}
      className={classNames(
        'textarea textarea-bordered',
        'w-full min-h-0 resize-none text-base outline-none active:outline-none focus:outline-none',
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

export default memo(TextAreaControl);
