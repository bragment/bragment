import { ColumnSort } from '@tanstack/react-table';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import { observer } from 'mobx-react';
import Dropdown from 'rc-dropdown';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiOutlinePlus, HiOutlineSwitchVertical } from 'react-icons/hi';
import {
  useFormatMessage,
  useNestedState,
} from '../../../../../../../components/hooks';
import ScrollContainer from '../../../../../../../components/ScrollContainer';
import SortableList from '../../../../../../../components/SortableList';
import { IDragDropListProps } from '../../../../../../../components/SortableList/DragDropList';
import { stopEventPropagation } from '../../../../../../../utils';
import { IDataSorter, IProjectDataField } from '../../../../../../client/types';
import { useUpdateProjectDataViewMutation } from '../../../../../../react-query';
import { ICurrentViewRenderer } from '../../../../types';

import FieldItem, { IInnerSorter } from './FieldItem';

interface ISortingButtonProps {
  modelFields: IProjectDataField[];
  renderer: ICurrentViewRenderer;
}

function initializeInnerSorterList(
  modelFields: IProjectDataField[],
  sorting: ColumnSort[]
): IInnerSorter[] {
  const record = modelFields.reduce<Record<string, IProjectDataField>>(
    (prev, el) => {
      prev[el._id] = el;
      return prev;
    },
    {}
  );
  return sorting
    .map((el) => ({ field: record[el.id], descending: el.desc }))
    .filter((el) => !!el.field);
}

function initializeOtherFieldList(
  modelFields: IProjectDataField[],
  visibleFieldIds: string[],
  sortingIds: string[]
) {
  const visibilitySet = new Set(visibleFieldIds);
  const sortingSet = new Set(sortingIds);
  return modelFields.filter(
    (el) => visibilitySet.has(el._id) && !sortingSet.has(el._id)
  );
}

function SortingButton(props: ISortingButtonProps) {
  const { modelFields, renderer } = props;
  const f = useFormatMessage();
  const scrollBarsRef = useRef<Scrollbars>(null);
  const dropdownRef = useRef<IRCDropdownRef>(null);

  const {
    fieldOrder,
    fieldSorting,
    getViewById,
    setFieldSorting,
    unobservable,
  } = renderer.commonStore;
  const { projectId, viewId } = unobservable;
  const [innerSorterList, setInnerSorterList] = useNestedState(
    initializeInnerSorterList(modelFields, fieldSorting)
  );
  const [otherFieldList, setOtherFieldList] = useNestedState(
    initializeOtherFieldList(
      modelFields,
      fieldOrder,
      fieldSorting.map((el) => el.id)
    )
  );
  const count = innerSorterList.length;

  const { isLoading, mutateAsync } = useUpdateProjectDataViewMutation();
  const updateSorters = useCallback(
    (sorters: IDataSorter[]) => {
      const view = getViewById(viewId);
      if (
        view &&
        !isEqual(
          sorters,
          view.sorters?.map(({ field, descending }) => ({ field, descending }))
        )
      ) {
        mutateAsync({ projectId, viewId, sorters });
      }
    },
    [getViewById, mutateAsync, projectId, viewId]
  );

  const updateInnerSorterList = useCallback(
    (index: number, sorter?: IInnerSorter) => {
      if (sorter) {
        setInnerSorterList((list) =>
          list.map((el, i) => (i === index ? sorter : el))
        );
      } else {
        setInnerSorterList((list) => list.filter((_, i) => i !== index));
      }
    },
    [setInnerSorterList]
  );
  const renderItem: IDragDropListProps<IInnerSorter>['renderItem'] =
    useCallback(
      ({ field, descending }, index, dragHandleProps) => (
        <FieldItem
          index={index}
          field={field}
          descending={descending}
          otherFields={otherFieldList}
          dragHandleProps={dragHandleProps}
          onChange={updateInnerSorterList}
          onDelete={updateInnerSorterList}
        />
      ),
      [updateInnerSorterList, otherFieldList]
    );

  const getItemId = useCallback((sorter: IInnerSorter) => {
    return sorter.field._id;
  }, []);

  const getItemDraggable = useCallback(() => {
    return true;
  }, []);

  const handleInnerSorterListChange = useCallback(
    (list: IInnerSorter[]) => {
      setInnerSorterList(list);
    },
    [setInnerSorterList]
  );

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        setInnerSorterList(
          initializeInnerSorterList(modelFields, fieldSorting)
        );
        scrollBarsRef.current?.scrollToTop();
      } else {
        updateSorters(
          fieldSorting.map((el) => ({ field: el.id, descending: el.desc }))
        );
      }
    },
    [updateSorters, setInnerSorterList, modelFields, fieldSorting]
  );

  const handleAddSorter = useCallback(() => {
    const field = otherFieldList[0];
    if (field) {
      setInnerSorterList((list) => [...list, { field, descending: false }]);
    }
    requestAnimationFrame(() => {
      scrollBarsRef.current?.scrollToBottom();
    });
  }, [setInnerSorterList, otherFieldList]);

  useLayoutEffect(() => {
    setOtherFieldList(
      initializeOtherFieldList(
        modelFields,
        fieldOrder,
        innerSorterList.map((el) => el.field._id)
      )
    );
  }, [setOtherFieldList, modelFields, fieldOrder, innerSorterList]);

  useEffect(() => {
    if (dropdownRef.current?.state?.popupVisible) {
      setFieldSorting(
        innerSorterList.map((el) => ({
          id: el.field._id,
          desc: el.descending,
        }))
      );
    }
  }, [setFieldSorting, innerSorterList]);

  return (
    <Dropdown
      ref={dropdownRef}
      trigger="click"
      onVisibleChange={handleVisibleChange}
      overlay={
        <div
          className={classNames(
            'bg-base-100 border-base-300',
            'w-80 px-0 py-2 border overflow-hidden rounded-xl shadow'
          )}
          onClick={stopEventPropagation}>
          <ScrollContainer
            ref={scrollBarsRef}
            autoHeight
            withVerticalShadow
            autoHeightMax={280}>
            <SortableList
              customDragHandle
              droppableId="SORTABLE_FIELD_LIST"
              listClassName="px-2"
              list={innerSorterList}
              getItemId={getItemId}
              getItemDraggable={getItemDraggable}
              renderItem={renderItem}
              onChange={handleInnerSorterListChange}
            />
          </ScrollContainer>
          {!!otherFieldList.length && (
            <div className="w-full px-2">
              <button
                className={classNames(
                  'btn btn-sm btn-ghost',
                  'h-10 justify-start'
                )}
                onClick={handleAddSorter}>
                <HiOutlinePlus className="text-base mr-2" />
                {f('dataView.addSorter')}
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
        {!isLoading && <HiOutlineSwitchVertical className="text-base" />}
        <span className="ml-2 hidden md:block">{f('dataView.sorting')}</span>
        {!!count && (
          <div className={classNames('badge', 'ml-2 hidden md:inline-flex')}>
            {count}
          </div>
        )}
      </button>
    </Dropdown>
  );
}

export default observer(SortingButton);
