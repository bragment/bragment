import {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars-2';

interface IScrollContainerProps extends ScrollbarProps {
  className?: string;
  onScroll?: React.UIEventHandler<any>;
}

function ScrollContainer(
  props: IScrollContainerProps,
  ref: Ref<Scrollbars | null>
) {
  const { className = '', onScroll, ...otherProps } = props;
  const scrollBarRef = useRef<Scrollbars>(null);
  const [innerClassName, setInnerClassName] = useState(className);

  const updateScrollable = useCallback(() => {
    const scrollBar = scrollBarRef.current;
    if (scrollBar) {
      const classes = [className];
      if (scrollBar.getScrollTop() > 0) {
        classes.push('topScrollable');
      }
      if (
        scrollBar.getScrollTop() + scrollBar.getClientHeight() <
        scrollBar.getScrollHeight()
      ) {
        classes.push('bottomScrollable');
      }
      if (scrollBar.getScrollLeft() > 0) {
        classes.push('leftScrollable');
      }
      if (
        scrollBar.getScrollLeft() + scrollBar.getClientWidth() <
        scrollBar.getScrollWidth()
      ) {
        classes.push('rightScrollable');
      }
      setInnerClassName(classes.join(' '));
    }
  }, [className]);

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

  useEffect(() => updateScrollable(), [updateScrollable]);

  return (
    <Scrollbars
      {...otherProps}
      ref={scrollBarRef}
      className={innerClassName}
      onScroll={handleScroll}
    />
  );
}

export default memo(forwardRef(ScrollContainer));
