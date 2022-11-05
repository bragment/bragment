import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import { memo, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiOutlinePlus, HiOutlineSwitchVertical } from 'react-icons/hi';
import { IDataSorter, IProjectDataField } from '../../../../libs/client/types';
import { stopEventPropagation } from '../../../../utils';
import { useFormatMessage, useNestedState } from '../../../hooks';
import ScrollContainer from '../../../ScrollContainer';
import SortableList from '../../../SortableList';
import { IDragDropListProps } from '../../../SortableList/DragDropList';
import FieldItem, { IInnerSorter } from './FieldItem';

interface ISortingButtonProps {
  modelFields: IProjectDataField[];
  visibleFieldIds: string[];
  sorters: IDataSorter[];
  loading?: boolean;
  onChange: (sorters: IDataSorter[]) => void;
  onClose?: () => void;
}

function initializeInnerSorterList(
  modelFields: IProjectDataField[],
  sorters: IDataSorter[]
) {
  const record = modelFields.reduce<Record<string, IProjectDataField>>(
    (prev, el) => {
      prev[el._id] = el;
      return prev;
    },
    {}
  );
  return sorters
    .map((el) => ({ ...el, field: record[el.field] }))
    .filter((el) => !!el.field);
}

function initializeOtherFieldList(
  modelFields: IProjectDataField[],
  visibleFieldIds: string[],
  sorters: IDataSorter[] | IInnerSorter[]
) {
  const visibilitySet = new Set(visibleFieldIds);
  const sortingSet = new Set(
    sorters.map((el) =>
      typeof el.field === 'string' ? el.field : el.field._id
    )
  );
  return modelFields.filter(
    (el) => visibilitySet.has(el._id) && !sortingSet.has(el._id)
  );
}

function SortingButton(props: ISortingButtonProps) {
  const { modelFields, visibleFieldIds, sorters, loading, onChange, onClose } =
    props;
  const f = useFormatMessage();
  const scrollBarsRef = useRef<Scrollbars>(null);
  const dropdownRef = useRef<IRCDropdownRef>(null);
  const [innerSorterList, setInnerSorterList] = useNestedState(
    initializeInnerSorterList(modelFields, sorters)
  );
  const [otherFieldList, setOtherFieldList] = useNestedState(
    initializeOtherFieldList(modelFields, visibleFieldIds, sorters)
  );
  const count = innerSorterList.length;

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
        setInnerSorterList(initializeInnerSorterList(modelFields, sorters));
        scrollBarsRef.current?.scrollToTop();
      } else {
        onClose && onClose();
      }
    },
    [onClose, setInnerSorterList, modelFields, sorters]
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
      initializeOtherFieldList(modelFields, visibleFieldIds, innerSorterList)
    );
  }, [setOtherFieldList, modelFields, visibleFieldIds, innerSorterList]);

  useEffect(() => {
    if (dropdownRef.current?.state.popupVisible) {
      const list = innerSorterList.map((el) => ({
        ...el,
        field: el.field._id,
      }));
      onChange(list);
    }
  }, [onChange, innerSorterList]);

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
            withShadow
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
                  'w-full h-10 justify-start'
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
          loading && 'loading'
        )}>
        {!loading && <HiOutlineSwitchVertical className="text-base" />}
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

export default memo(SortingButton);
