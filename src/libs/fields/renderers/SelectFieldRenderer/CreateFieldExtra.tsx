import classNames from 'classnames';
import debounce from 'lodash/debounce';
import {
  forwardRef,
  memo,
  MouseEventHandler,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { HiPlus } from 'react-icons/hi';
import { useFormatMessage } from '../../../../components/hooks';
import { getAvailableTitle } from '../../../../utils';
import { IDataFieldOption } from '../../../client/types';
import { ICreateFieldExtraProps, ICreateFieldExtraRef } from '../../types';
import OptionList from './OptionList';

const MAX_OPTION_COUNT = 30;

function CreateFieldExtra(
  _props: ICreateFieldExtraProps,
  ref: Ref<ICreateFieldExtraRef>
) {
  const f = useFormatMessage();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [options, setOptions] = useState<IDataFieldOption[]>([]);
  const handleButtonClick = useMemo(
    () =>
      debounce<MouseEventHandler<HTMLButtonElement>>((event) => {
        const { target } = event;
        const div =
          target instanceof Element
            ? target.closest('.scroll-container>div')
            : null;
        if (div) {
          requestAnimationFrame(() =>
            requestAnimationFrame(() =>
              div.scrollTo({ top: div.scrollHeight, behavior: 'smooth' })
            )
          );
        }
        setOptions((list) => [
          ...list,
          {
            // NOTE: backend will replace the _id which starts with '#'
            _id: `#${Date.now()}_${list.length}`,
            title: getAvailableTitle(
              f('dataField.option'),
              list?.map((el) => el.title)
            ),
            color: '',
          },
        ]);
      }, 60),
    [f]
  );

  const handleChange = useCallback((list: IDataFieldOption[]) => {
    setOptions(list);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      getExtraData: () => {
        return { options };
      },
    }),
    [options]
  );

  useEffect(() => {
    if (options.length < 1) {
      buttonRef.current?.click();
    }
  }, [options]);

  return (
    <div>
      <div className="divider my-0" />
      <OptionList options={options} onChange={handleChange} />
      {options.length < MAX_OPTION_COUNT && (
        <button
          ref={buttonRef}
          type="button"
          className={classNames('btn btn-ghost btn-sm', 'mt-2 ml-[50px]')}
          onClick={handleButtonClick}>
          <HiPlus className="mr-2" />
          {f('dataField.addOption')}
        </button>
      )}
    </div>
  );
}

export default memo(forwardRef(CreateFieldExtra));
