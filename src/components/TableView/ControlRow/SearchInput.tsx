import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { memo, useMemo, useRef } from 'react';
import { HiSearch, HiXCircle } from 'react-icons/hi';
import { useFormatMessage } from '../../hooks';
import styles from '../index.module.scss';

interface ISearchInputProps {
  onChange: (value: string) => void;
}

function SearchInput(props: ISearchInputProps) {
  const { onChange } = props;
  const f = useFormatMessage();
  const inputRef = useRef<HTMLInputElement>(null);

  const debounceChange = useMemo(
    () => debounce((value: string) => onChange(value), 500),
    [onChange]
  );
  const handleChange = () => {
    debounceChange(inputRef.current?.value || '');
  };
  const handleSearch = () => {
    inputRef.current?.focus();
  };
  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = '';
      debounceChange('');
    }
  };

  return (
    <div className={classNames('relative', styles.searchInput)}>
      <HiSearch
        className={classNames(
          'absolute left-3 top-3',
          'cursor-pointer text-lg'
        )}
        onClick={handleSearch}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder={f('dataView.search')}
        className={classNames(
          'input input-bordered',
          'w-80 h-10 pl-10 pr-9',
          'outline-none active:outline-none focus:outline-none'
        )}
        onChange={handleChange}
      />
      <HiXCircle
        className={classNames(
          'absolute right-2.5 top-2.5',
          'cursor-pointer text-xl',
          styles.action
        )}
        onClick={handleClear}
      />
    </div>
  );
}

export default memo(SearchInput);
