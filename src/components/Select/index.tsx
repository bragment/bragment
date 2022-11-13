import SelectBase, {
  OptGroup as OptGroupBase,
  Option as OptionBase,
  SelectProps,
} from 'rc-select';
import { memo, useCallback, useRef } from 'react';

export const OptGroup = OptGroupBase;
export const Option = OptionBase;

function Select(props: SelectProps) {
  const domRef = useRef<HTMLElement>();
  const openRef = useRef(false);

  const getPopupContainer = useCallback((dom: any) => {
    domRef.current = dom;
    return document.body;
  }, []);

  const handleDropdownVisibleChange = useCallback((open: boolean) => {
    openRef.current = open;
    requestAnimationFrame(() => {
      const dom = domRef.current;
      const visible = openRef.current;
      const scrollContainer =
        dom instanceof HTMLElement
          ? (dom.closest('.scroll-container') as HTMLDivElement)
          : undefined;
      const div = scrollContainer?.firstElementChild;
      if (div instanceof HTMLDivElement) {
        if (visible) {
          div.classList.add('disabled-scroll');
        } else {
          div.classList.remove('disabled-scroll');
        }
      }
    });
  }, []);

  return (
    <SelectBase
      onDropdownVisibleChange={handleDropdownVisibleChange}
      getPopupContainer={getPopupContainer}
      {...props}
    />
  );
}

export default memo(Select);
