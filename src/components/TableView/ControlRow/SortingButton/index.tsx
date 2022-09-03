import classNames from 'classnames';
import { memo, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiOutlinePlus, HiOutlineSwitchVertical } from 'react-icons/hi';
import {
  IProjectDataField,
  IProjectDataSorter,
} from '../../../../libs/client/types';
import Dropdown from '../../../Dropdown';
import { useFormatMessage, useNestedState } from '../../../hooks';
import ScrollContainer from '../../../ScrollContainer';
import SortableList from '../../../SortableList';
import FieldItem from './FieldItem';

interface IInnerSorter {
  field: IProjectDataField;
  descending: boolean;
}

interface ISortingButtonProps {
  modelFields: IProjectDataField[];
  visibleFieldIds: string[];
  sorters: IProjectDataSorter[];
  loading?: boolean;
  onChange: (sorters: IProjectDataSorter[]) => void;
  onClose?: () => void;
}

function initializeInnerSorterList(
  modelFields: IProjectDataField[],
  sorters: IProjectDataSorter[]
) {
  const record = modelFields.reduce<Record<string, IProjectDataField>>(
    (prev, el) => {
      prev[el._id] = el;
      return prev;
    },
    {}
  );
  return sorters
    .map((el) => ({ field: record[el.field], descending: el.descending }))
    .filter((el) => !!el.field);
}

function initializeOtherFieldList(
  modelFields: IProjectDataField[],
  visibleFieldIds: string[],
  sorters: IProjectDataSorter[] | IInnerSorter[]
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
  const containerRef = useRef<HTMLDivElement>();
  const openedRef = useRef(false);
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
  const renderItem = useCallback(
    ({ field, descending }: IInnerSorter, index: number) => (
      <FieldItem
        index={index}
        field={field}
        descending={descending}
        otherFields={otherFieldList}
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

  const handleInnerSorterListChange = (list: IInnerSorter[]) => {
    setInnerSorterList(list);
  };

  const handleOpen = useCallback(() => {
    if (openedRef.current) {
      return;
    }
    openedRef.current = true;
    setInnerSorterList(initializeInnerSorterList(modelFields, sorters));
  }, [setInnerSorterList, modelFields, sorters]);

  const handleClose = useCallback(() => {
    if (!openedRef.current) {
      return;
    }
    openedRef.current = false;
    onClose && onClose();
  }, [onClose]);

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
    containerRef.current = scrollBarsRef.current?.container;
  });

  useEffect(() => {
    if (openedRef.current) {
      const list = innerSorterList.map((el) => ({
        field: el.field._id,
        descending: el.descending,
      }));
      onChange(list);
    }
  }, [onChange, innerSorterList]);

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
          {!loading && <HiOutlineSwitchVertical className="text-base" />}
          <span className="ml-2">
            {f('dataView.sorting')}
            {!!count && ` (${count})`}
          </span>
        </button>
      }
      content={
        <div
          className={classNames(
            'bg-base-100 border-base-300',
            'w-80 px-0 py-2 border overflow-hidden rounded-box shadow'
          )}>
          <ScrollContainer
            ref={scrollBarsRef}
            autoHeight
            withShadow
            autoHeightMax={280}>
            <SortableList
              droppableId="SORTABLE_FIELD_LIST"
              containerRef={containerRef}
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
                className={classNames('btn btn-ghost', 'w-full justify-start')}
                onClick={handleAddSorter}>
                <HiOutlinePlus className="text-base mr-2" />
                {f('dataView.addSorter')}
              </button>
            </div>
          )}
        </div>
      }
    />
  );
}

export default memo(SortingButton);
