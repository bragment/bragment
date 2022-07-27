import classNames from 'classnames';
import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';

export interface ISelectInputOption {
  value: string;
  content: string;
  node?: JSX.Element;
}

export interface ISelectInputProps {
  name?: string;
  className?: string;
  defaultValue?: string;
  value?: string;
  options?: ISelectInputOption[];
  onChange?: (value: string) => void;
}

function SelectInput(props: ISelectInputProps) {
  const { name, className, defaultValue, value, options, onChange } = props;
  const controlledRef = useRef(value !== undefined);
  const ulRef = useRef<HTMLUListElement>(null);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  const selectedOption = options?.find(
    (option) => option.value === selectedValue
  );
  const selectedNode = selectedOption?.node;
  const selectedContent = selectedOption?.content;

  const handleClick = useCallback(
    (event: React.MouseEvent<Element>) => {
      const span = (event.target as Element).closest<HTMLSpanElement>(
        'span.action'
      );
      const newValue = span?.dataset.value;
      if (!newValue || !options?.some((option) => option.value === newValue)) {
        return;
      }
      const dropdownParent =
        ulRef.current?.parentElement?.closest<HTMLUListElement>(
          '.dropdown-content'
        );
      if (dropdownParent) {
        dropdownParent.focus();
      } else {
        ulRef.current?.blur();
      }

      if (!controlledRef.current) {
        setSelectedValue(newValue);
      }
      if (onChange) {
        onChange(newValue);
      }
    },
    [options, onChange]
  );

  useLayoutEffect(() => {
    if (controlledRef.current) {
      setSelectedValue(value);
    }
  }, [value]);

  return (
    <div className={classNames('dropdown dropdown-end w-full', className)}>
      <label tabIndex={0} className="related">
        <div className="absolute top-0 left-0 w-full h-full pl-4 pr-10 flex items-center pointer-events-none">
          {selectedNode || selectedContent}
        </div>
        <input type="hidden" name={name} value={selectedValue} />
        <select className="select select-bordered w-full" />
      </label>
      <ul
        ref={ulRef}
        tabIndex={0}
        className={classNames(
          'dropdown-content menu border-base-300 bg-base-100 rounded-box',
          'w-full mt-1 p-2 border shadow'
        )}
        onClick={handleClick}>
        {options?.map((option) => (
          <li key={option.value}>
            <span
              className={classNames(
                'gap-0',
                'action',
                option.value === selectedValue && 'active checked'
              )}
              data-value={option.value}>
              {option.node}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(SelectInput);
