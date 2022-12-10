import { ColumnFilter } from '@tanstack/react-table';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import Dropdown from 'rc-dropdown';
import { memo, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiOutlineFilter, HiOutlinePlus } from 'react-icons/hi';
import {
  useFormatMessage,
  useNestedState,
} from '../../../../../../../components/hooks';
import ScrollContainer from '../../../../../../../components/ScrollContainer';
import { stopEventPropagation } from '../../../../../../../utils';
import {
  EDataFilterConjunction,
  EDataFilterOperator,
  IDataFilter,
  IProjectDataField,
} from '../../../../../../client/types';
import { useUpdateProjectDataViewMutation } from '../../../../../../react-query';
import { ICurrentViewRenderer } from '../../../../types';
import FieldItem, { IInnerFilter } from './FieldItem';

interface IFilterButtonProps {
  modelFields: IProjectDataField[];
  renderer: ICurrentViewRenderer;
}

function initializeInnerFilterList(
  modelFields: IProjectDataField[],
  filters: ColumnFilter[]
): IInnerFilter[] {
  const record = modelFields.reduce<Record<string, IProjectDataField>>(
    (prev, el) => {
      prev[el._id] = el;
      return prev;
    },
    {}
  );
  return filters
    .map((el) => ({
      ...((el.value || {}) as IInnerFilter),
      field: record[el.id],
    }))
    .filter((el) => !!el.field);
}

function initializeOtherFieldList(
  modelFields: IProjectDataField[],
  visibleFieldIds: string[],
  filterIds: string[]
) {
  const visibilitySet = new Set(visibleFieldIds);
  const sortingSet = new Set(filterIds);
  return modelFields.filter(
    (el) => visibilitySet.has(el._id) && !sortingSet.has(el._id)
  );
}

function FilterButton(props: IFilterButtonProps) {
  const { modelFields, renderer } = props;
  const f = useFormatMessage();
  const scrollBarsRef = useRef<Scrollbars>(null);
  const dropdownRef = useRef<IRCDropdownRef>(null);

  const {
    fieldFilters,
    fieldOrder,
    getViewById,
    setFieldFilters,
    unobservable,
  } = renderer.commonStore;
  const { projectId, viewId } = unobservable;
  const [innerFilterList, setInnerFilterList] = useNestedState(
    initializeInnerFilterList(modelFields, fieldFilters)
  );
  const [otherFieldList, setOtherFieldList] = useNestedState(
    initializeOtherFieldList(
      modelFields,
      fieldOrder,
      fieldFilters.map((el) => el.id)
    )
  );
  const count = innerFilterList.length;

  const { isLoading, mutateAsync } = useUpdateProjectDataViewMutation();
  const updateFilters = useCallback(
    (filters: IDataFilter[]) => {
      const view = getViewById(viewId);
      if (
        view &&
        !isEqual(
          filters,
          view.filters?.map(({ field, conjunction, operand, operator }) => ({
            field,
            conjunction,
            operand,
            operator,
          }))
        )
      ) {
        mutateAsync({ projectId, viewId, filters });
      }
    },
    [getViewById, mutateAsync, projectId, viewId]
  );

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
        setInnerFilterList(
          initializeInnerFilterList(modelFields, fieldFilters)
        );
        scrollBarsRef.current?.scrollToTop();
      } else {
        updateFilters(
          innerFilterList.map((el) => ({ ...el, field: el.field._id }))
        );
      }
    },
    [
      updateFilters,
      setInnerFilterList,
      modelFields,
      fieldFilters,
      innerFilterList,
    ]
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
      initializeOtherFieldList(
        modelFields,
        fieldOrder,
        innerFilterList.map((el) => el.field._id)
      )
    );
  }, [setOtherFieldList, modelFields, fieldOrder, innerFilterList]);

  useEffect(() => {
    if (dropdownRef.current?.state.popupVisible) {
      setFieldFilters(
        innerFilterList.map(({ field, ...others }) => ({
          id: field._id,
          value: others,
        }))
      );
    }
  }, [setFieldFilters, innerFilterList]);

  return (
    <Dropdown
      ref={dropdownRef}
      trigger="click"
      onVisibleChange={handleVisibleChange}
      overlay={
        <div
          className={classNames(
            'bg-base-100 border-base-300',
            'w-96 px-0 py-2 border overflow-hidden rounded-xl shadow'
          )}
          onClick={stopEventPropagation}
          onKeyDown={stopEventPropagation}>
          <ScrollContainer
            ref={scrollBarsRef}
            autoHeight
            withVerticalShadow
            autoHeightMax={280}>
            <ul className="px-2">{innerFilterList.map(renderItem)}</ul>
          </ScrollContainer>
          {!!otherFieldList.length && (
            <div className="w-full px-2">
              <button
                className={classNames(
                  'btn btn-sm btn-ghost',
                  'h-10 justify-start'
                )}
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
          isLoading && 'loading'
        )}>
        {!isLoading && <HiOutlineFilter className="text-base" />}
        <div className="ml-2 hidden md:block">{f('dataView.filter')}</div>
        {!!count && (
          <div className={classNames('badge', 'ml-2 hidden md:inline-flex')}>
            {count}
          </div>
        )}
      </button>
    </Dropdown>
  );
}

export default memo(FilterButton);
