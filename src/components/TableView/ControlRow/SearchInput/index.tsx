import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { memo, useMemo, useRef, useState } from 'react';
import { HiSearch, HiXCircle } from 'react-icons/hi';
import { useFormatMessage } from '../../../hooks';

interface ISearchInputProps {
  onChange: (value: string) => void;
}

function SearchInput(props: ISearchInputProps) {
  const { onChange } = props;
  const f = useFormatMessage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [actionVisible, setActionVisible] = useState(false);

  const updateActionVisible = () =>
    setActionVisible(
      !!inputRef.current &&
        !!inputRef.current.value &&
        inputRef.current === document.activeElement
    );
  const debounceChange = useMemo(
    () => debounce((value: string) => onChange(value), 500),
    [onChange]
  );
  const handleChange = () => {
    const value = inputRef.current?.value || '';
    debounceChange(value);
    setActionVisible(!!value);
  };
  const handleFocus = () => {
    setTimeout(updateActionVisible, 600);
  };
  const handleBlur = () => {
    setTimeout(updateActionVisible, 60);
  };
  const handleSearch = () => {
    inputRef.current?.focus();
  };
  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
      debounceChange('');
      setActionVisible(false);
    }
  };

  return (
    <div className="relative w-10 h-10 z-10">
      <div
        className={classNames(
          'bg-base-100',
          'absolute top-0 right-0',
          'w-10',
          'focus-within:w-72 sm-md:!w-72 mmd-lg:!w-72 xl:!w-72',
          '[&:focus-within>.action]:flex sm-md:[&>.action]:!flex mmd-lg:[&>.action]:!flex xl:[&>.action]:!flex'
        )}>
        <div
          className={classNames(
            'absolute left-0 top-0',
            'h-10 px-3 flex items-center',
            'text-lg',
            'pointer-events-none'
          )}
          onMouseDown={handleSearch}>
          <HiSearch />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={f('common.search')}
          className={classNames(
            'input input-sm input-bordered',
            'outline-none active:outline-none focus:outline-none',
            'h-10 pl-10',
            'w-full pr-0',
            'focus:pr-9 sm-md:pr-9 mmd-lg:!pr-9 xl:!pr-9'
          )}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {actionVisible && (
          <div
            tabIndex={-1}
            className={classNames(
              'absolute right-2.5 top-2.5',
              'cursor-pointer text-xl',
              'action hidden items-center'
            )}
            onClick={handleClear}>
            <HiXCircle />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SearchInput);
