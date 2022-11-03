import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import { memo, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiOutlineFilter, HiOutlinePlus } from 'react-icons/hi';
import {
  EDataFilterConjunction,
  EDataFilterOperator,
  IDataFilter,
  IProjectDataField,
} from '../../../../libs/client/types';
import { stopEventPropagation } from '../../../../utils';
import { useFormatMessage, useNestedState } from '../../../hooks';
import ScrollContainer from '../../../ScrollContainer';
import FieldItem, { IInnerFilter } from './FieldItem';

interface IFilterButtonProps {
  modelFields: IProjectDataField[];
  visibleFieldIds: string[];
  filters: IDataFilter[];
  loading?: boolean;
  onChange: (filters: IDataFilter[]) => void;
  onClose?: () => void;
}

function initializeInnerFilterList(
  modelFields: IProjectDataField[],
  filters: IDataFilter[]
) {
  const record = modelFields.reduce<Record<string, IProjectDataField>>(
    (prev, el) => {
      prev[el._id] = el;
      return prev;
    },
    {}
  );
  return filters
    .map((el) => ({ ...el, field: record[el.field] }))
    .filter((el) => !!el.field);
}

function initializeOtherFieldList(
  modelFields: IProjectDataField[],
  visibleFieldIds: string[],
  filters: IDataFilter[] | IInnerFilter[]
) {
  const visibilitySet = new Set(visibleFieldIds);
  const sortingSet = new Set(
    filters.map((el) =>
      typeof el.field === 'string' ? el.field : el.field._id
    )
  );
  return modelFields.filter(
    (el) => visibilitySet.has(el._id) && !sortingSet.has(el._id)
  );
}

function FilterButton(props: IFilterButtonProps) {
  const { modelFields, visibleFieldIds, filters, loading, onChange, onClose } =
    props;
  const f = useFormatMessage();
  const scrollBarsRef = useRef<Scrollbars>(null);
  const dropdownRef = useRef<IDropdownRef>(null);
  const [innerFilterList, setInnerFilterList] = useNestedState(
    initializeInnerFilterList(modelFields, filters)
  );
  const [otherFieldList, setOtherFieldList] = useNestedState(
    initializeOtherFieldList(modelFields, visibleFieldIds, filters)
  );
  const count = innerFilterList.length;

  const updateInnerFilterList = useCallback(
    (index: number, filter?: IInnerFilter) => {
      if (filter) {
        setInnerFilterList((list) =>
          list.map((el, i) => (i === index ? filter : el))
        );
      } else {
        setInnerFilterList((list) => list.filter((_, i) => i !== index));
      }
    },
    [setInnerFilterList]
  );
  const renderItem = useCallback(
    (
      { field, operator, operand, conjunction }: IInnerFilter,
      index: number
    ) => (
      <FieldItem
        key={field._id}
        index={index}
        field={field}
        operator={operator}
        operand={operand}
        conjunction={conjunction}
        otherFields={otherFieldList}
        onChange={updateInnerFilterList}
        onDelete={updateInnerFilterList}
      />
    ),
    [updateInnerFilterList, otherFieldList]
  );

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        setInnerFilterList(initializeInnerFilterList(modelFields, filters));
        scrollBarsRef.current?.scrollToTop();
      } else {
        onClose && onClose();
      }
    },
    [onClose, setInnerFilterList, modelFields, filters]
  );

  const handleAddFilter = useCallback(() => {
    const field = otherFieldList[0];
    if (field) {
      setInnerFilterList((list) => [
        ...list,
        {
          field,
          operator: EDataFilterOperator.Contain,
          operand: '',
          conjunction: EDataFilterConjunction.And,
        },
      ]);
    }
    requestAnimationFrame(() => {
      scrollBarsRef.current?.scrollToBottom();
    });
  }, [setInnerFilterList, otherFieldList]);

  useLayoutEffect(() => {
    setOtherFieldList(
      initializeOtherFieldList(modelFields, visibleFieldIds, innerFilterList)
    );
  }, [setOtherFieldList, modelFields, visibleFieldIds, innerFilterList]);

  useEffect(() => {
    if (dropdownRef.current?.state.popupVisible) {
      const list = innerFilterList.map((el) => ({
        ...el,
        field: el.field._id,
      }));
      onChange(list);
    }
  }, [onChange, innerFilterList]);

  return (
    <Dropdown
      ref={dropdownRef}
      trigger="click"
      onVisibleChange={handleVisibleChange}
      overlay={
        <div
          className={classNames(
            'bg-base-100 border-base-300',
            'w-96 px-0 py-2 border overflow-hidden rounded-box shadow'
          )}
          onClick={stopEventPropagation}
          onKeyDown={stopEventPropagation}>
          <ScrollContainer
            ref={scrollBarsRef}
            autoHeight
            withShadow
            autoHeightMax={280}>
            <ul className="px-2">{innerFilterList.map(renderItem)}</ul>
          </ScrollContainer>
          {!!otherFieldList.length && (
            <div className="w-full px-2">
              <button
                className={classNames('btn btn-ghost', 'w-full justify-start')}
                onClick={handleAddFilter}>
                <HiOutlinePlus className="text-base mr-2" />
                {f('dataView.addFilter')}
              </button>
            </div>
          )}
        </div>
      }>
      <button
        className={classNames(
          'btn btn-sm btn-ghost max-md:btn-square',
          '!h-10 max-md:!w-10',
          loading && 'loading'
        )}>
        {!loading && <HiOutlineFilter className="text-base" />}
        <div className="ml-2 hidden md:block">{f('dataView.filter')}</div>
        {!!count && <div className="badge ml-2 hidden md:block">{count}</div>}
      </button>
    </Dropdown>
  );
}

export default memo(FilterButton);
