import classNames from 'classnames';
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export interface IDropdownRef {
  close: () => void;
  open: () => void;
  toggle: () => void;
}

interface IDropdownProps {
  toggle: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  toggleClassName?: string;
  contentClassName?: string;
  externalToggleRef?: React.RefObject<HTMLElement>;
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
    externalToggleRef,
    withMask = false,
    onOpen,
    onClose,
  } = props;
  const [open, setOpen] = useState(false);
  const openedRef = useRef(false); // NOTE: use to skip first time
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);
  const divRef = useRef<HTMLDivElement>(null);
  const handleClick = useCallback(() => {
    setOpen((value) => !value);
    const { activeElement } = document;
    if (open && activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }, [open]);
  const handleMaskClick = () => {
    setOpen(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      close: () => setOpen(false),
      open: () => setOpen(true),
      toggle: handleClick,
    }),
    [handleClick]
  );

  useEffect(() => {
    if (open) {
      const handleMouseDown = (e: MouseEvent) => {
        const { target } = e;
        if (target instanceof Element && !divRef.current?.contains(target)) {
          if (externalToggleRef?.current?.contains(target)) {
            return;
          }
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleMouseDown);
      return () => document.removeEventListener('mousedown', handleMouseDown);
    }
  }, [open, externalToggleRef]);

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
