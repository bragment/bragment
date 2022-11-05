import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiOutlineEye, HiOutlinePlus } from 'react-icons/hi';
import { IProject, IProjectDataField } from '../../../../libs/client/types';
import { stopEventPropagation } from '../../../../utils';
import CreateDataFieldDropdown from '../../../CreateDataFieldDropdown';
import { useFormatMessage } from '../../../hooks';
import ScrollContainer from '../../../ScrollContainer';
import SortableList from '../../../SortableList';
import { IDragDropListProps } from '../../../SortableList/DragDropList';
import FieldItem from './FieldItem';

interface IVisibilityButtonProps {
  projectId: string;
  modelId: string;
  modelFields: IProjectDataField[];
  visibleFieldIds: string[];
  mainFieldId?: string;
  count?: number;
  loading?: boolean;
  onChange: (fieldIds: string[]) => void;
  onClose?: () => void;
  onCreateDataFieldFinish?: (project: IProject) => void;
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
  mainFieldId?: string
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
    projectId,
    modelId,
    mainFieldId,
    modelFields,
    visibleFieldIds,
    count,
    loading,
    onChange,
    onClose,
    onCreateDataFieldFinish,
  } = props;
  const f = useFormatMessage();
  const scrollBarsRef = useRef<Scrollbars>(null);
  const dropdownRef = useRef<IRCDropdownRef>(null);
  const createDataFieldDropdownTriggerRef = useRef<HTMLDivElement>(null);
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
  const renderItem: IDragDropListProps<IProjectDataField>['renderItem'] =
    useCallback(
      (field, _index, dragHandleProps) => (
        <FieldItem
          field={field}
          main={field._id === mainFieldId}
          visible={!!visibleFieldRecord[field._id]}
          dragHandleProps={dragHandleProps}
          onVisibleChange={updateVisibleFieldRecord}
        />
      ),
      [mainFieldId, visibleFieldRecord, updateVisibleFieldRecord]
    );
  const mainField = modelFields.find((el) => el._id === mainFieldId);
  const mainFieldItem = useMemo(
    () => mainField && renderItem(mainField, 0, null),
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

  const handleOrderingFieldListChange = useCallback(
    (fields: IProjectDataField[]) => {
      setOrderingFieldList(fields);
    },
    [setOrderingFieldList]
  );

  const handleVisibleChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        setVisibleFieldRecord(initializeVisibleFieldRecord(visibleFieldIds));
        setOrderingFieldList(
          initializeOrderingFieldList(modelFields, visibleFieldIds, mainFieldId)
        );
        scrollBarsRef.current?.scrollToTop();
      } else {
        onClose && onClose();
      }
    },
    [onClose, mainFieldId, modelFields, visibleFieldIds]
  );

  const handleAddField = () => {
    // TODO: should add field inside
    dropdownRef.current?.close();
    createDataFieldDropdownTriggerRef.current?.click();
  };

  useEffect(() => {
    if (dropdownRef.current?.state.popupVisible) {
      const fieldIds = orderingFieldList
        .filter((el) => visibleFieldRecord[el._id])
        .map((el) => el._id);
      onChange((mainFieldId ? [mainFieldId] : []).concat(fieldIds));
    }
  }, [onChange, mainFieldId, orderingFieldList, visibleFieldRecord]);

  return (
    <div className="relative">
      <CreateDataFieldDropdown
        projectId={projectId}
        modelId={modelId}
        existingFields={modelFields}
        onFinish={onCreateDataFieldFinish}>
        <div
          ref={createDataFieldDropdownTriggerRef}
          className="absolute w-full h-10 my-1 top-0 left-0 z-0"
        />
      </CreateDataFieldDropdown>
      <Dropdown
        ref={dropdownRef}
        trigger="click"
        onVisibleChange={handleVisibleChange}
        overlay={
          <div
            className={classNames(
              'bg-base-100 border-base-300',
              'w-64 px-0 py-2 border overflow-hidden rounded-xl shadow'
            )}
            onClick={stopEventPropagation}>
            <ScrollContainer
              ref={scrollBarsRef}
              autoHeight
              withShadow
              autoHeightMax={280}>
              <div className="px-2">{mainFieldItem}</div>
              <SortableList
                customDragHandle
                droppableId="SORTABLE_FIELD_LIST"
                listClassName="px-2"
                list={orderingFieldList}
                getItemId={getItemId}
                getItemDraggable={getItemDraggable}
                renderItem={renderItem}
                onChange={handleOrderingFieldListChange}
              />
            </ScrollContainer>
            <div className="w-full px-2">
              <button
                className={classNames(
                  'btn btn-sm btn-ghost',
                  'w-full h-10 justify-start'
                )}
                onClick={handleAddField}>
                <HiOutlinePlus className="text-base mr-2" />
                {f('dataView.addField')}
              </button>
            </div>
          </div>
        }>
        <button
          className={classNames(
            'btn btn-sm btn-ghost max-md:btn-square',
            '!h-10 max-md:!w-10',
            'relative z-10', // NOTE: cover the toggle of CreateDataFieldDropdown
            loading && 'loading'
          )}>
          {!loading && <HiOutlineEye className="text-base" />}
          <span className="ml-2 hidden md:block">
            {f('dataView.fieldVisibility')}
          </span>
          {!!count && (
            <div className={classNames('badge', 'ml-2 hidden md:inline-flex')}>
              {count}
            </div>
          )}
        </button>
      </Dropdown>
    </div>
  );
}

export default memo(VisibilityButton);
