import classNames from 'classnames';
import Select, { Option } from 'rc-select';
import {
  ChangeEventHandler,
  memo,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { IDataFieldOption } from '../../client/types';

interface ISingleSelectControlProps {
  options?: IDataFieldOption[];
  onCancel?: () => void;
}

function SingleSelectControl(props: ISingleSelectControlProps) {
  const { options = [], onCancel } = props;
  const [keyword, setKeyword] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.target === event.currentTarget && onCancel) {
        onCancel();
      }
    },
    [onCancel]
  );

  const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setKeyword(event.currentTarget.value),
    []
  );

  const dropdownRender = useCallback(
    (menu: ReactElement) => {
      return (
        <>
          <div className="">
            <input
              autoFocus
              placeholder={'搜索或创建'}
              className="input input-sm  w-full h-10"
              value={keyword}
              onChange={handleInputChange}
            />
          </div>
          <div className="border-base-content/10 border-t border-b-0 my-3" />
          {menu}
        </>
      );
    },
    [handleInputChange, keyword]
  );

  useEffect(() => {
    setFilteredOptions(() =>
      options.filter((el) => el.title?.includes(keyword))
    );
  }, [options, keyword]);

  useLayoutEffect(() => {
    const wrapperDom = wrapperRef.current;
    const scrollContainer =
      wrapperDom instanceof HTMLElement
        ? (wrapperDom.closest('.scroll-container') as HTMLElement)
        : undefined;
    const scrollDom = scrollContainer?.firstElementChild;
    scrollDom?.classList.add('disabled-scroll');
    return () => {
      scrollDom?.classList.remove('disabled-scroll');
    };
  }, []);

  return (
    <div ref={wrapperRef} className="px-1">
      <Select
        open
        mode="multiple"
        showArrow={false}
        className={classNames(
          '[&_.rc-select-selection-overflow]:min-h-[38px] [&_.rc-select-selection-item-remove]:hidden flex items-end'
        )}
        dropdownClassName="p-3"
        dropdownRender={dropdownRender}
        onClick={handleClick}
        onChange={() => setFilteredOptions((value) => [...value])}>
        {filteredOptions.map((option) => (
          <Option
            key={option._id}
            value={option._id}
            className={classNames('p-2 flex items-center')}>
            <div className="flex items-center">
              <div className="badge badge-outline">{option.title}</div>
            </div>
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default memo(SingleSelectControl);
