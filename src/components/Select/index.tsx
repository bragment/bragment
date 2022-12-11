import SelectBase, {
  OptGroup as OptGroupBase,
  Option as OptionBase,
  SelectProps,
} from 'rc-select';
import { memo, useCallback, useRef } from 'react';
import { setScrollContainerDisabledByChildElement } from '../../libs/utils';

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
      setScrollContainerDisabledByChildElement(domRef.current, openRef.current);
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
