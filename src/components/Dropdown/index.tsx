import classNames from 'classnames';
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export interface IDropdownRef {
  close: () => void;
}

interface IDropdownProps {
  toggle: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  toggleClassName?: string;
  contentClassName?: string;
  withMask?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

function Dropdown(props: IDropdownProps, ref: React.Ref<IDropdownRef>) {
  const {
    toggle,
    content,
    className,
    toggleClassName,
    contentClassName,
    withMask,
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
    if (open && activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };
  const handleMaskClick = () => {
    setOpen(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      close: () => setOpen(false),
    }),
    []
  );

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
      {open && withMask && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0"
          onClick={handleMaskClick}
        />
      )}
      <label
        tabIndex={0}
        className={classNames(toggleClassName)}
        onClick={handleClick}>
        {toggle}
      </label>
      {open && (
        <div
          tabIndex={0}
          className={classNames('dropdown-content', contentClassName)}>
          {content}
        </div>
      )}
    </div>
  );
}

export default memo(forwardRef(Dropdown));
