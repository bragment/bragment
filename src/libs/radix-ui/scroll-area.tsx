import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as React from 'react';

import { cn, updateElementScrollable } from './utils';

type ScrollAreaComponent = React.ForwardRefExoticComponent<
  {
    vertical?: boolean;
    horizontal?: boolean;
    horizontalBarClassName?: string;
    verticalBarClassName?: string;
    thumbClassName?: string;
    viewportClassName?: string;
  } & ScrollAreaPrimitive.ScrollAreaProps &
    React.RefAttributes<HTMLDivElement>
>;
const ScrollArea = React.forwardRef<
  React.ElementRef<ScrollAreaComponent>,
  React.ComponentPropsWithoutRef<ScrollAreaComponent>
>(
  (
    {
      className,
      children,
      horizontal,
      vertical,
      horizontalBarClassName,
      verticalBarClassName,
      thumbClassName,
      viewportClassName,
      ...props
    },
    ref
  ) => {
    const viewportRef = React.useRef<HTMLDivElement>(null);
    const handleScroll = React.useCallback(() => {
      if (viewportRef.current) {
        updateElementScrollable(viewportRef.current);
      }
    }, []);
    React.useEffect(() => {
      if (viewportRef.current) {
        updateElementScrollable(viewportRef.current);
      }
    });

    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        {...props}>
        <ScrollAreaPrimitive.Viewport
          ref={viewportRef}
          onScroll={handleScroll}
          className={cn('h-full w-full rounded-[inherit]', viewportClassName)}>
          {children}
        </ScrollAreaPrimitive.Viewport>
        {horizontal && (
          <ScrollBar
            orientation="horizontal"
            className={horizontalBarClassName}
            thumbClassName={thumbClassName}
          />
        )}
        {vertical && (
          <ScrollBar
            orientation="vertical"
            className={verticalBarClassName}
            thumbClassName={thumbClassName}
          />
        )}
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  }
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

type ScrollBarComponent = React.ForwardRefExoticComponent<
  {
    thumbClassName?: string;
  } & ScrollAreaPrimitive.ScrollAreaScrollbarProps &
    React.RefAttributes<HTMLDivElement>
>;
const ScrollBar = React.forwardRef<
  React.ElementRef<ScrollBarComponent>,
  React.ComponentPropsWithoutRef<ScrollBarComponent>
>(({ className, orientation = 'vertical', thumbClassName, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-px',
      orientation === 'horizontal' &&
        'h-2.5 border-t border-t-transparent p-px',
      className
    )}
    {...props}>
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        'relative flex-1 rounded-full',
        'bg-neutral-content',
        thumbClassName
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
