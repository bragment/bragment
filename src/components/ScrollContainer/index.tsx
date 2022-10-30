import classNames from 'classnames';
import {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars-2';
import './index.scss';

interface IScrollContainerProps extends ScrollbarProps {
  forceHide?: boolean;
  withShadow?: boolean;
  onScroll?: React.UIEventHandler<any>;
}

function ScrollContainer(
  props: IScrollContainerProps,
  ref: Ref<Scrollbars | null>
) {
  const {
    className,
    children,
    forceHide,
    withShadow,
    onScroll,
    ...otherProps
  } = props;
  const scrollBarRef = useRef<Scrollbars>(null);

  const updateScrollable = useCallback(() => {
    const scrollBar = scrollBarRef.current;
    const container = scrollBar?.container;
    if (scrollBar && container) {
      if (scrollBar.getScrollTop() > 0) {
        container.classList.add('top-scrollable');
      } else {
        container.classList.remove('top-scrollable');
      }
      if (scrollBar.getScrollLeft() > 0) {
        container.classList.add('left-scrollable');
      } else {
        container.classList.remove('left-scrollable');
      }
      if (
        scrollBar.getScrollTop() + scrollBar.getClientHeight() <
        scrollBar.getScrollHeight()
      ) {
        container.classList.add('bottom-scrollable');
      } else {
        container.classList.remove('bottom-scrollable');
      }
      if (
        scrollBar.getScrollLeft() + scrollBar.getClientWidth() <
        scrollBar.getScrollWidth()
      ) {
        container.classList.add('right-scrollable');
      } else {
        container.classList.remove('right-scrollable');
      }
    }
  }, []);

  const handleScroll = useCallback<React.UIEventHandler<any>>(
    (event) => {
      updateScrollable();
      if (onScroll) {
        onScroll(event);
      }
    },
    [updateScrollable, onScroll]
  );

  useImperativeHandle(ref, () => scrollBarRef.current, []);

  useEffect(() => updateScrollable());

  return (
    <Scrollbars
      {...otherProps}
      className={classNames(
        className,
        'scroll-container',
        forceHide && 'no-bars'
      )}
      ref={scrollBarRef}
      onScroll={handleScroll}>
      {withShadow && <div className="top-shadow" />}
      {withShadow && <div className="left-shadow" />}
      {children}
      {withShadow && <div className="right-shadow" />}
      {withShadow && <div className="bottom-shadow" />}
    </Scrollbars>
  );
}

export default memo(forwardRef(ScrollContainer));
