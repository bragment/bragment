import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import { observer } from 'mobx-react';
import Dropdown from 'rc-dropdown';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiOutlineEye, HiOutlinePlus } from 'react-icons/hi';
import CreateDataFieldDropdown from '../../../../../../../components/CreateDataFieldDropdown';
import { useFormatMessage } from '../../../../../../../components/hooks';
import ScrollContainer from '../../../../../../../components/ScrollContainer';
import SortableList from '../../../../../../../components/SortableList';
import { IDragDropListProps } from '../../../../../../../components/SortableList/DragDropList';
import { stopEventPropagation } from '../../../../../../../utils';
import { IProject, IProjectDataField } from '../../../../../../client/types';
import { useUpdateProjectDataViewMutation } from '../../../../../../react-query';
import { convertToFieldVisibility } from '../../../../../helpers';
import { ICurrentViewRenderer } from '../../../../types';
import FieldItem from './FieldItem';

interface IVisibilityButtonProps {
  modelFields: IProjectDataField[];
  renderer: ICurrentViewRenderer;
  onCreateDataFieldFinish?: (project: IProject) => void;
}

function initializeVisibleFieldRecord(fieldOrder: string[]) {
  return fieldOrder.reduce<Record<string, boolean>>((prev, el) => {
    prev[el] = true;
    return prev;
  }, {});
}

function initializeOrderingFieldList(
  modelFields: IProjectDataField[],
  fieldOrder: string[],
  mainFieldId?: string
) {
  const record = modelFields.reduce<Record<string, IProjectDataField>>(
    (prev, el) => {
      prev[el._id] = el;
      return prev;
    },
    {}
  );
  const set = new Set(fieldOrder);
  return [
    ...fieldOrder.map((el) => record[el]),
    ...modelFields.filter((el) => !set.has(el._id)),
  ].filter((el) => el && el._id !== mainFieldId);
}

function VisibilityButton(props: IVisibilityButtonProps) {
  const { modelFields, onCreateDataFieldFinish, renderer } = props;
  const f = useFormatMessage();
  const scrollBarsRef = useRef<Scrollbars>(null);
  const dropdownRef = useRef<IRCDropdownRef>(null);
  const createDataFieldDropdownTriggerRef = useRef<HTMLDivElement>(null);

  const {
    fieldOrder,
    mainFieldId,
    unobservable,
    getViewById,
    setFieldOrder,
    setFieldVisibility,
  } = renderer.commonStore;
  const { projectId, modelId, viewId } = unobservable;
  const [visibleFieldRecord, setVisibleFieldRecord] = useState(
    initializeVisibleFieldRecord(fieldOrder)
  );
  // NOTE: orderingFieldList not contain mainField
  const [orderingFieldList, setOrderingFieldList] = useState(
    initializeOrderingFieldList(modelFields, fieldOrder, mainFieldId)
  );
  const count = fieldOrder.length;

  const { isLoading, mutateAsync } = useUpdateProjectDataViewMutation();
  const updateVisibleFields = useCallback(
    (visibleFields: string[]) => {
      const view = getViewById(viewId);
      if (view && !isEqual(visibleFields, view.visibleFields)) {
        mutateAsync({ projectId, viewId: view._id, visibleFields });
      }
    },
    [getViewById, mutateAsync, projectId, viewId]
  );

  const updateVisibleFieldRecord = useCallback(
    (field: IProjectDataField, visible: boolean) => {
      setVisibleFieldRecord((record) => {
        let total = 0;
        for (const key in record) {
          total += record[key] ? 1 : 0;
        }
        if (total <= 1 && visible === false) {
          return record;
        }
        return { ...record, [field._id]: visible };
      });
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
        setVisibleFieldRecord(initializeVisibleFieldRecord(fieldOrder));
        setOrderingFieldList(
          initializeOrderingFieldList(modelFields, fieldOrder, mainFieldId)
        );
        scrollBarsRef.current?.scrollToTop();
      } else {
        updateVisibleFields(fieldOrder);
      }
    },
    [updateVisibleFields, mainFieldId, modelFields, fieldOrder]
  );

  const handleAddField = () => {
    // TODO: should add field inside
    dropdownRef.current?.close();
    createDataFieldDropdownTriggerRef.current?.click();
  };

  useEffect(() => {
    if (dropdownRef.current?.state?.popupVisible) {
      let fieldIds = orderingFieldList
        .filter((el) => visibleFieldRecord[el._id])
        .map((el) => el._id);
      fieldIds = (mainFieldId ? [mainFieldId] : []).concat(fieldIds);
      setFieldOrder(fieldIds);
      setFieldVisibility(
        convertToFieldVisibility(
          modelFields.map((el) => el._id),
          fieldIds
        )
      );
    }
  }, [
    setFieldOrder,
    setFieldVisibility,
    modelFields,
    mainFieldId,
    orderingFieldList,
    visibleFieldRecord,
  ]);

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
              withVerticalShadow
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
                  'h-10 justify-start'
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
            isLoading && 'loading'
          )}>
          {!isLoading && <HiOutlineEye className="text-base" />}
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

export default observer(VisibilityButton);
