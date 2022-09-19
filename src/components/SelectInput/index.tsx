import classNames from 'classnames';
import { memo, useLayoutEffect, useRef, useState } from 'react';
import Dropdown, { IDropdownRef } from '../Dropdown';
import ScrollContainer from '../ScrollContainer';

export interface ISelectInputOption {
  value: string;
  content: string;
  node?: React.ReactNode;
}

export interface ISelectInputProps {
  name?: string;
  className?: string;
  selectClassName?: string;
  selectedClassName?: string;
  contentClassName?: string;
  optionClassName?: string;
  defaultValue?: string;
  value?: string;
  options?: ISelectInputOption[];
  withMask?: boolean;
  gapSize?: number;
  getOptions?: () => ISelectInputOption[];
  getSelectedOption?: () => ISelectInputOption;
  onChange?: (value: string) => void;
}

function SelectInput(props: ISelectInputProps) {
  const {
    name,
    className,
    selectClassName,
    selectedClassName,
    contentClassName,
    optionClassName,
    defaultValue,
    value,
    options,
    withMask,
    gapSize = 0,
    getOptions,
    getSelectedOption,
    onChange,
  } = props;

  const dropdownRef = useRef<IDropdownRef>(null);
  const controlledRef = useRef(value !== undefined);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  const innerOptions = getOptions ? getOptions() : options;
  const selectedOption = getSelectedOption
    ? getSelectedOption()
    : options?.find((option) => option.value === selectedValue);
  const selectedNode = selectedOption?.node;
  const selectedContent = selectedOption?.content;

  const handleClick = (event: React.MouseEvent<Element>) => {
    const li = (event.target as Element).closest<HTMLSpanElement>('li');
    const newValue = li?.dataset.value;
    if (
      !newValue ||
      !innerOptions?.some((option) => option.value === newValue)
    ) {
      return;
    }
    dropdownRef.current?.close();
    if (!controlledRef.current) {
      setSelectedValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  useLayoutEffect(() => {
    if (controlledRef.current) {
      setSelectedValue(value);
    }
  }, [value]);

  return (
    <Dropdown
      ref={dropdownRef}
      withMask={withMask}
      className={classNames(className)}
      toggleClassName="relative"
      toggle={
        <>
          <div className="absolute top-0 left-0 w-full h-full pl-4 pr-10 flex items-center pointer-events-none">
            {selectedNode || selectedContent}
          </div>
          <input type="hidden" name={name} value={selectedValue} />
          <select
            className={classNames(
              'select select-bordered w-full',
              selectClassName
            )}
          />
        </>
      }
      contentClassName={classNames('w-full', contentClassName)}
      content={
        <div
          className={classNames(
            'bg-base-100 border-base-300',
            'w-full px-0 py-2 border overflow-hidden rounded-box shadow'
          )}>
          <ScrollContainer autoHeight withShadow autoHeightMax={280}>
            <ul role="listbox" className="px-2" onClick={handleClick}>
              {innerOptions?.map((option, index) => {
                const selected = option.value === selectedValue;
                return (
                  <li
                    key={option.value}
                    className={classNames(
                      'w-full px-2 py-3 rounded-lg',
                      'flex items-center',
                      index && `mt-${gapSize}`,
                      optionClassName,
                      selected
                        ? 'bg-primary text-primary-content'
                        : 'cursor-pointer hover:bg-base-content/10',
                      selected && selectedClassName
                    )}
                    role="option"
                    aria-selected
                    data-value={option.value}>
                    {option.node || option.content}
                  </li>
                );
              })}
            </ul>
          </ScrollContainer>
        </div>
      }
    />
  );
}

export default memo(SelectInput);
