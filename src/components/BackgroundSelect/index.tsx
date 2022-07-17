import classNames from 'classnames';
import { memo, MouseEvent as ReactMouseEvent } from 'react';
import { HiOutlineCheck } from 'react-icons/hi';

export type IBackgroundOption =
  | { type: 'color'; color: string }
  | { type: 'photo'; image: string; color?: string };

export interface IBackgroundSelectProps {
  options: IBackgroundOption[];
  current: number;
  onChange: (index: number) => void;
}

function BackgroundSelect(props: IBackgroundSelectProps) {
  const { current, options, onChange } = props;

  const handleClick = (event: ReactMouseEvent) => {
    const { target } = event;
    const div =
      target instanceof Element
        ? target.closest('.text-primary-content')
        : null;

    if (
      !(div instanceof HTMLElement) ||
      !div.dataset ||
      div.dataset.index === undefined
    ) {
      return;
    }
    if (onChange) {
      const selected = div.dataset.selected;
      const index = parseInt(div.dataset.index, 10);
      const option = options[index];
      if (selected || index < 0 || !option) {
        onChange(-1);
      } else {
        onChange(index);
      }
    }
  };

  return (
    <div className={classNames('grid grid-cols-4 gap-4')} onClick={handleClick}>
      {options.map((option, index) => {
        const selected = index === current;
        let key;
        let backgroundColor;
        let backgroundImage;
        if (option.type === 'color') {
          key = option.color;
          backgroundColor = option.color;
        } else {
          key = option.image;
          backgroundColor = option.color;
          backgroundImage = `url(${option.image})`;
        }
        return (
          <div key={key} className={classNames('w-full h-10 cursor-pointer')}>
            <div
              className={classNames(
                'text-primary-content',
                'w-10 h-10 flex items-center justify-center rounded bg-cover bg-center bg-no-repeat hover:shadow-xl'
              )}
              data-index={index}
              data-selected={selected || undefined}
              style={{
                backgroundColor,
                backgroundImage,
              }}>
              {selected && <HiOutlineCheck className="text-2xl" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(BackgroundSelect);
