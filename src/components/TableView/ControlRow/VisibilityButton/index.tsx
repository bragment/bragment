import classNames from 'classnames';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiOutlineEye } from 'react-icons/hi';
import { IProjectDataField } from '../../../../libs/client/types';
import Dropdown from '../../../Dropdown';
import { useFormatMessage } from '../../../hooks';
import ScrollContainer from '../../../ScrollContainer';
import SortableList from '../../../SortableList';
import FieldItem from './FieldItem';

interface IVisibilityButtonProps {
  mainFieldId: string;
  modelFields: IProjectDataField[];
  visibleFieldIds: string[];
  count?: number;
  loading?: boolean;
  onChange: (fieldIds: string[]) => void;
  onClose?: () => void;
}

function initializeVisibleFieldRecord(visibleFieldIds: string[]) {
  return visibleFieldIds.reduce<Record<string, boolean>>((prev, el) => {
    prev[el] = true;
    return prev;
  }, {});
}

function initializeOrderingFieldList(
  modelFields: IProjectDataField[],
  visibleFieldIds: string[],
  mainFieldId: string
) {
  const record = modelFields.reduce<Record<string, IProjectDataField>>(
    (prev, el) => {
      prev[el._id] = el;
      return prev;
    },
    {}
  );
  const set = new Set(visibleFieldIds);
  return [
    ...visibleFieldIds.map((el) => record[el]),
    ...modelFields.filter((el) => !set.has(el._id)),
  ].filter((el) => el && el._id !== mainFieldId);
}

function VisibilityButton(props: IVisibilityButtonProps) {
  const {
    mainFieldId,
    modelFields,
    visibleFieldIds,
    count,
    loading,
    onChange,
    onClose,
  } = props;
  const f = useFormatMessage();
  const scrollBarsRef = useRef<Scrollbars>(null);
  const containerRef = useRef<HTMLDivElement>();
  const openedRef = useRef(false);
  const [visibleFieldRecord, setVisibleFieldRecord] = useState(
    initializeVisibleFieldRecord(visibleFieldIds)
  );
  // NOTE: orderingFieldList not contain mainField
  const [orderingFieldList, setOrderingFieldList] = useState(
    initializeOrderingFieldList(modelFields, visibleFieldIds, mainFieldId)
  );

  const updateVisibleFieldRecord = useCallback(
    (field: IProjectDataField, visible: boolean) => {
      setVisibleFieldRecord((record) => ({ ...record, [field._id]: visible }));
    },
    []
  );
  const renderItem = useCallback(
    (field: IProjectDataField) => (
      <FieldItem
        field={field}
        main={field._id === mainFieldId}
        visible={!!visibleFieldRecord[field._id]}
        onVisibleChange={updateVisibleFieldRecord}
      />
    ),
    [mainFieldId, visibleFieldRecord, updateVisibleFieldRecord]
  );
  const mainField = modelFields.find((el) => el._id === mainFieldId);
  const mainFieldItem = useMemo(
    () => mainField && renderItem(mainField),
    [mainField, renderItem]
  );

  const getItemId = useCallback((field: IProjectDataField) => {
    return field._id;
  }, []);

  const getItemDraggable = useCallback(
    (field: IProjectDataField) => {
      return field._id !== mainFieldId && visibleFieldRecord[field._id];
    },
    [mainFieldId, visibleFieldRecord]
  );

  const handleOrderingFieldListChange = (fields: IProjectDataField[]) => {
    setOrderingFieldList(fields);
  };

  const handleOpen = useCallback(() => {
    if (openedRef.current) {
      return;
    }
    openedRef.current = true;
    setVisibleFieldRecord(initializeVisibleFieldRecord(visibleFieldIds));
    setOrderingFieldList(
      initializeOrderingFieldList(modelFields, visibleFieldIds, mainFieldId)
    );
  }, [mainFieldId, modelFields, visibleFieldIds]);
  const handleClose = useCallback(() => {
    if (!openedRef.current) {
      return;
    }
    openedRef.current = false;
    onClose && onClose();
  }, [onClose]);

  useEffect(() => {
    containerRef.current = scrollBarsRef.current?.container;
  });

  useEffect(() => {
    if (openedRef.current) {
      const fieldIds = orderingFieldList
        .filter((el) => visibleFieldRecord[el._id])
        .map((el) => el._id);
      onChange((mainFieldId ? [mainFieldId] : []).concat(fieldIds));
    }
  }, [onChange, mainFieldId, orderingFieldList, visibleFieldRecord]);

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
          {!loading && <HiOutlineEye className="text-base" />}
          <span className="ml-2">
            {f('dataView.fieldVisibility')}
            {count !== undefined && ` (${count})`}
          </span>
        </button>
      }
      content={
        <div
          className={classNames(
            'bg-base-100 border-base-300',
            'w-64 px-0 py-2 border overflow-hidden rounded-box shadow'
          )}>
          <ScrollContainer
            ref={scrollBarsRef}
            autoHeight
            withShadow
            autoHeightMax={280}>
            <div className="px-2">{mainFieldItem}</div>
            <SortableList
              droppableId="SORTABLE_FIELD_LIST"
              containerRef={containerRef}
              listClassName="px-2"
              list={orderingFieldList}
              getItemId={getItemId}
              getItemDraggable={getItemDraggable}
              renderItem={renderItem}
              onChange={handleOrderingFieldListChange}
            />
          </ScrollContainer>
        </div>
      }
    />
  );
}

export default memo(VisibilityButton);
