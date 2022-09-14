import classNames from 'classnames';
import { memo, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiOutlineFilter, HiOutlinePlus } from 'react-icons/hi';
import {
  EDataFilterConjunction,
  EDataFilterOperator,
  IDataFilter,
  IProjectDataField,
} from '../../../../libs/client/types';
import Dropdown from '../../../Dropdown';
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
  const openedRef = useRef(false);
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

  const handleOpen = useCallback(() => {
    if (openedRef.current) {
      return;
    }
    openedRef.current = true;
    setInnerFilterList(initializeInnerFilterList(modelFields, filters));
  }, [setInnerFilterList, modelFields, filters]);

  const handleClose = useCallback(() => {
    if (!openedRef.current) {
      return;
    }
    openedRef.current = false;
    onClose && onClose();
  }, [onClose]);

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
    if (openedRef.current) {
      const list = innerFilterList.map((el) => ({
        ...el,
        field: el.field._id,
      }));
      onChange(list);
    }
  }, [onChange, innerFilterList]);

  return (
    <Dropdown
      className="dropdown-end"
      onOpen={handleOpen}
      onClose={handleClose}
      toggle={
        <button
          className={classNames(
            'btn btn-sm',
            'h-10 my-1',
            loading && 'loading'
          )}>
          {!loading && <HiOutlineFilter className="text-base" />}
          <span className="ml-2">
            {f('dataView.filter')}
            {!!count && ` (${count})`}
          </span>
        </button>
      }
      content={
        <div
          className={classNames(
            'bg-base-100 border-base-300',
            'w-96 px-0 py-2 border overflow-hidden rounded-box shadow'
          )}>
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
      }
    />
  );
}

export default memo(FilterButton);
