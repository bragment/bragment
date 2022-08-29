import classNames from 'classnames';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface IDropdown {
  toggle: React.ReactElement;
  content: React.ReactElement;
  className?: string;
  toggleClassName?: string;
  contentClassName?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

function Dropdown(props: IDropdown) {
  const {
    toggle,
    content,
    className,
    toggleClassName,
    contentClassName,
    onOpen,
    onClose,
  } = props;
  const [open, setOpen] = useState(false);
  const openedRef = useRef(false); // NOTE: use to skip first time
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);
  const divRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setOpen((value) => !value);
    const { activeElement } = document;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', (e) => {
        const { target } = e;
        if (target instanceof Element && !divRef.current?.contains(target)) {
          setOpen(false);
        }
      });
    }
  }, [open]);

  useLayoutEffect(() => {
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
  }, [onOpen, onClose]);

  useLayoutEffect(() => {
    if (open) {
      onOpenRef.current && onOpenRef.current();
      openedRef.current = true;
    } else {
      if (openedRef.current) {
        onCloseRef.current && onCloseRef.current();
      }
    }
  }, [open]);

  return (
    <div
      ref={divRef}
      className={classNames('dropdown', className, open && 'dropdown-open')}>
      <label
        tabIndex={0}
        className={classNames(toggleClassName)}
        onClick={handleClick}>
        {toggle}
      </label>
      <div
        tabIndex={0}
        className={classNames(
          'dropdown-content',
          contentClassName,
          !open && 'content-visibility-hidden'
        )}>
        {content}
      </div>
    </div>
  );
}

export default memo(Dropdown);
