import classNames from 'classnames';
import React, {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import AutoSizeTextArea from '../../components/AutoSizeTextArea';
import { useFormatMessage } from '../../components/hooks';
import DragDropList, {
  IDragDropListProps,
} from '../../components/SortableList/DragDropList';
import {
  IDataFormItem,
  IProjectDataField,
  IProjectDataForm,
} from '../../libs/client/types';
import { getAvailableTitle } from '../../utils';
import FormItem, { SEPARATOR } from './FromItem';

export type IInnerDataFormItem = Omit<IDataFormItem, 'field'> & {
  field: IProjectDataField;
};

interface ICreateFormProps {
  modelId: string;
  offsetDiffRef: IDragDropListProps<IInnerDataFormItem>['offsetDiffRef'];
  items: IInnerDataFormItem[];
  existingForms?: IProjectDataForm[];
  title?: string;
  onItemListChange?: (items: IInnerDataFormItem[]) => void;
}

export interface ICreateFormRef {
  getData: () => IProjectDataForm | undefined;
}

export const FORM_ITEM_LIST_ID = 'FORM_ITEM_LIST';

function CreateForm(props: ICreateFormProps, ref: Ref<ICreateFormRef>) {
  const {
    modelId,
    offsetDiffRef,
    items,
    existingForms,
    title,
    onItemListChange,
  } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const f = useFormatMessage();

  const getItemId = useCallback((item: IInnerDataFormItem) => {
    return item.field._id;
  }, []);

  const removeItemByFieldId = useMemo(() => {
    if (items.length > 1) {
      return (fieldId: string) => {
        if (onItemListChange) {
          onItemListChange(items.filter((el) => el.field._id !== fieldId));
        }
      };
    }
    return undefined;
  }, [items, onItemListChange]);

  const renderItem: IDragDropListProps<IInnerDataFormItem>['renderItem'] =
    useCallback(
      (item, index, dragHandleProps) => {
        return (
          <FormItem
            dragHandleProps={dragHandleProps}
            className={classNames('pl-2 pr-10 pt-0 pb-4 rounded-lg')}
            index={index}
            key={item.field._id}
            field={item.field}
            label={item.label}
            defaultValue={item.defaultValue}
            required={item.required}
            onRemove={removeItemByFieldId}
          />
        );
      },
      [removeItemByFieldId]
    );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  useImperativeHandle(
    ref,
    () => ({
      getData: () => {
        const form = formRef.current;
        if (!form) {
          return;
        }
        const formData = new FormData(form);
        const entries = Array.from(formData.entries());
        const data: any = {};
        const itemMap = new Map<string, IDataFormItem>();
        entries.forEach(([key, value]) => {
          const [fieldId, name] = key.split(SEPARATOR);
          if (name) {
            let item: any = itemMap.get(fieldId);
            if (!item) {
              item = {};
              itemMap.set(fieldId, item);
            }
            item[name] = value;
          } else {
            data[key] = value;
          }
        });
        data.items = Array.from(itemMap.values());
        return data as IProjectDataForm;
      },
    }),
    []
  );

  return (
    <form className="form-control" ref={formRef} onSubmit={handleSubmit}>
      <input type="hidden" name="model" value={modelId} />
      <div className="px-4 py-6 flex justify-center w-full">
        <AutoSizeTextArea
          name="title"
          className="px-4 text-3xl font-bold"
          placeholder={f('project.formTitle')}
          defaultValue={
            title !== undefined
              ? title
              : getAvailableTitle(
                  f('project.newForm'),
                  existingForms?.map((el) => el.title)
                )
          }
          withFocusedBorder
          withoutOutline
        />
      </div>
      <DragDropList
        customDragHandle
        droppableId={FORM_ITEM_LIST_ID}
        offsetDiffRef={offsetDiffRef}
        listClassName="p-4"
        itemClassName="rounded-lg"
        list={items}
        getItemId={getItemId}
        renderItem={renderItem}
      />
      <br />
    </form>
  );
}

export default memo(forwardRef(CreateForm));
