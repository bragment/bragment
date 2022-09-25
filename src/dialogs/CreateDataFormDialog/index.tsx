import {
  DragDropContext,
  OnBeforeDragStartResponder,
  OnDragEndResponder,
} from '@hello-pangea/dnd';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import Dialog from '../../components/Dialog';
import { useDialogStore, useFormatMessage } from '../../components/hooks';
import ScrollContainer from '../../components/ScrollContainer';
import { IProjectDataField, IProjectDataForm } from '../../libs/client/types';
import {
  useCreateProjectDataFormMutation,
  useUpdateProjectDataFormMutation,
} from '../../libs/react-query';
import CreateForm, {
  FORM_ITEM_LIST_ID,
  ICreateFormRef,
  IInnerDataFormItem,
} from './CreateForm';
import FieldList, { USABLE_FIELD_LIST_ID } from './FieldList';

const DIALOG_ID = 'CREATE_DATA_FORM_DIALOG';

function initializeUsableFields(
  modelFields: IProjectDataField[],
  formItems: IInnerDataFormItem[]
) {
  const set = new Set(formItems.map((el) => el.field._id));
  return modelFields.filter((el) => !set.has(el._id));
}

export function initializeFormItems(
  modelFields: IProjectDataField[],
  visibleFieldIds?: string[],
  modelForm?: IProjectDataForm
) {
  const record: Record<string, IProjectDataField> = {};
  modelFields.forEach((el) => (record[el._id] = el));
  if (modelForm) {
    return modelForm.items
      .filter((el) => !!record[el.field])
      .map((el) => ({
        ...el,
        field: record[el.field],
      }));
  }
  let visibleFields: IProjectDataField[] = [];
  if (visibleFieldIds && visibleFieldIds.length > 0) {
    visibleFields = visibleFieldIds
      .map((id) => record[id])
      .filter((el) => !!el);
  }
  return (visibleFields.length ? visibleFields : modelFields).map((el) =>
    generateFormItem(el)
  );
}

export function generateFormItem(field: IProjectDataField) {
  return {
    field: field,
    label: field.title,
    required: false,
    defaultValue: '',
  };
}

function CreateDataFormDialog() {
  const f = useFormatMessage();
  const {
    createDataFormDialogVisible,
    createDataFormDialogOptions,
    setCreateDataFormDialogVisible,
  } = useDialogStore();
  const createFormRef = useRef<ICreateFormRef>(null);
  const leftSideScrollBarsRef = useRef<Scrollbars>(null);
  const rightSideScrollBarsRef = useRef<Scrollbars>(null);
  const offsetDiffRef = useRef({ x: 0, y: 0 });

  const { isLoading: isCreating, mutateAsync: createAsync } =
    useCreateProjectDataFormMutation();
  const { isLoading: isUpdating, mutateAsync: updateAsync } =
    useUpdateProjectDataFormMutation();
  const projectId = createDataFormDialogOptions?.projectId;
  const modelId = createDataFormDialogOptions?.modelId;
  const existingForms = createDataFormDialogOptions?.existingForms;
  const modelForm = createDataFormDialogOptions?.modelForm;
  const editing = createDataFormDialogOptions?.editing;
  const [modelFields, setModelFields] = useState(
    createDataFormDialogOptions?.modelFields || []
  );
  const [formItems, setFormItems] = useState<IInnerDataFormItem[]>([]);
  const [usableFields, setUsableFields] = useState<IProjectDataField[]>([]);

  const handleCancel = useCallback(() => {
    setCreateDataFormDialogVisible(false);
  }, [setCreateDataFormDialogVisible]);

  const handleBeforeDragStart: OnBeforeDragStartResponder = useCallback(
    (start) => {
      let container: HTMLDivElement | undefined;
      if (start.source.droppableId === USABLE_FIELD_LIST_ID) {
        container = leftSideScrollBarsRef.current?.container;
      }
      if (start.source.droppableId === FORM_ITEM_LIST_ID) {
        container = rightSideScrollBarsRef.current?.container;
      }
      if (container) {
        const cRect = container.getClientRects()[0];
        offsetDiffRef.current = {
          x: cRect.x + container.scrollLeft - container.offsetLeft,
          y: cRect.y + container.scrollTop - container.offsetTop,
        };
      }
    },
    []
  );

  const handleDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const { destination, source, draggableId } = result;
      if (!destination) {
        return;
      }
      const fromIndex = source.index;
      const toIndex = destination.index;
      if (destination.droppableId === source.droppableId) {
        if (fromIndex === toIndex) {
          return;
        }
        setFormItems((items) => {
          const newItems = items.slice(0);
          const item = newItems.splice(fromIndex, 1);
          newItems.splice(toIndex, 0, ...item);
          return newItems;
        });
      } else {
        setUsableFields((fields) => {
          return fields.filter((el) => el._id !== draggableId);
        });
        setFormItems((items) => {
          const newItems = items.slice(0);
          const field = modelFields.find((el) => el._id === draggableId);
          if (!field) {
            return items;
          }
          newItems.splice(toIndex, 0, generateFormItem(field));
          return newItems;
        });
      }
    },
    [modelFields]
  );

  const handleItemListChange = useCallback(
    (items: IInnerDataFormItem[]) => {
      setFormItems(items);
      setUsableFields(initializeUsableFields(modelFields, items));
    },
    [modelFields]
  );

  const handleSave = async () => {
    if (isCreating || isUpdating || !projectId) {
      return;
    }
    const data = createFormRef.current?.getData();
    if (data) {
      await (editing && modelForm
        ? updateAsync({ projectId, formId: modelForm._id, ...data })
        : createAsync({
            projectId,
            ...data,
          }));
      setCreateDataFormDialogVisible(false);
    }
  };

  useLayoutEffect(() => {
    if (createDataFormDialogVisible) {
      const _modelFields = createDataFormDialogOptions?.modelFields || [];
      const _visibleFieldIds = createDataFormDialogOptions?.visibleFieldIds;
      const _modelForm = createDataFormDialogOptions?.modelForm;
      const _formItems = initializeFormItems(
        _modelFields,
        _visibleFieldIds,
        _modelForm
      );
      setModelFields(_modelFields);
      setFormItems(_formItems);
      setUsableFields(initializeUsableFields(_modelFields, _formItems));
    } else {
      setFormItems([]);
      setUsableFields([]);
    }
  }, [createDataFormDialogVisible, createDataFormDialogOptions]);

  return (
    <Dialog
      id={DIALOG_ID}
      className="w-11/12 max-w-5xl p-0"
      visible={createDataFormDialogVisible}
      onClose={handleCancel}>
      <div className={classNames('w-full h-full relative')}>
        <h3
          className={classNames(
            'text-base-content',
            'p-[1.125rem] text-lg font-bold'
          )}>
          {f(editing ? 'project.editForm' : 'project.createForm')}
        </h3>
        <div
          style={{ height: 'calc(100vh - 16.25rem)' }}
          className={classNames(
            'border-base-200',
            'border-t border-b',
            'flex flex-row'
          )}>
          <DragDropContext
            onBeforeDragStart={handleBeforeDragStart}
            onDragEnd={handleDragEnd}>
            <div
              className={classNames(
                'border-base-200',
                'flex-none w-56 border-r'
              )}>
              <ScrollContainer ref={leftSideScrollBarsRef}>
                <FieldList
                  offsetDiffRef={offsetDiffRef}
                  fields={usableFields}
                />
                {usableFields.length === 0 && (
                  <div className="text-base text-center text-base-content/50">
                    {f('dataForm.allFieldsUsed')}
                  </div>
                )}
              </ScrollContainer>
            </div>
            <div className={classNames('flex-auto')}>
              <ScrollContainer ref={rightSideScrollBarsRef}>
                {modelId && (
                  <CreateForm
                    ref={createFormRef}
                    modelId={modelForm?.model || modelId}
                    offsetDiffRef={offsetDiffRef}
                    items={formItems}
                    existingForms={existingForms}
                    title={modelForm?.title}
                    onItemListChange={handleItemListChange}
                  />
                )}
              </ScrollContainer>
            </div>
          </DragDropContext>
        </div>
      </div>
      <div className={classNames('modal-action', 'mt-0 py-4 px-8')}>
        <button
          className={classNames(
            'btn btn-primary',
            (isCreating || isUpdating) && 'loading'
          )}
          onClick={handleSave}>
          {f('common.save')}
        </button>
      </div>
    </Dialog>
  );
}

export default observer(CreateDataFormDialog);
