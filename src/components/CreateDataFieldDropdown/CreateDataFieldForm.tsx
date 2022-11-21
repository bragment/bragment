import classNames from 'classnames';
import {
  forwardRef,
  memo,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  EDataFieldType,
  IProject,
  IProjectDataField,
} from '../../libs/client/types';
import { getDefaultFieldType, getFieldRenderer } from '../../libs/fields';
import FieldRendererBase from '../../libs/fields/renderers/FieldRendererBase';
import { ICreateFieldExtraRef } from '../../libs/fields/types';
import { useCreateProjectDataFieldMutation } from '../../libs/react-query';
import { getAvailableTitle } from '../../utils';
import DataFieldTypeSelect from '../DataFieldTypeSelect';
import { useDialogStore, useFormatMessage } from '../hooks';

interface ICreateDataFieldFormProps {
  projectId: string;
  modelId: string;
  existingFields?: IProjectDataField[];
  fieldFilter?: (field: FieldRendererBase) => boolean;
  onFinish?: (project: IProject) => void;
}

export interface ICreateDataFieldFormRef {
  submit: () => Promise<void>;
}

function CreateDataFieldForm(
  props: ICreateDataFieldFormProps,
  ref: Ref<ICreateDataFieldFormRef>
) {
  const { projectId, modelId, existingFields, fieldFilter, onFinish } = props;
  const f = useFormatMessage();
  const formRef = useRef<HTMLFormElement>(null);
  const extraRef = useRef<ICreateFieldExtraRef>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [fieldType, setFieldType] = useState(getDefaultFieldType());
  const { toastError } = useDialogStore();
  const { isLoading, mutateAsync } = useCreateProjectDataFieldMutation();

  const renderer = getFieldRenderer(fieldType);
  const extra = renderer?.renderCreateFieldExtra({ existingFields }, extraRef);

  const handleFieldTypeChange = useCallback((type: EDataFieldType) => {
    setFieldType(type);
  }, []);

  const handleSubmit = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      const form = formRef.current;
      if (isLoading || !form) {
        return;
      }
      const formData = new FormData(form);
      const entries = Array.from(formData.entries());
      const extraData = extraRef.current?.getExtraData();
      const data = {
        ...entries.reduce<any>((prev, [key, value]) => {
          prev[key] = value;
          return prev;
        }, {}),
        ...extraData,
        projectId: formData.get('projectId')?.toString().trim() || '',
        model: formData.get('model')?.toString().trim() || '',
        title: formData.get('title')?.toString().trim() || '',
        type: formData.get('type')?.toString() as EDataFieldType,
      };
      if (existingFields?.some((el) => el.title === data.title)) {
        toastError(f('project.existingFieldTitle'));
        titleInputRef.current?.focus();
        return;
      }
      try {
        const project = await mutateAsync(data);
        if (onFinish) {
          onFinish(project);
        }
        form.reset();
        setFieldType(getDefaultFieldType());
      } catch (error: any) {
        toastError(f('common.networkError'));
      }
    },
    [f, mutateAsync, onFinish, toastError, existingFields, isLoading]
  );

  useImperativeHandle(
    ref,
    () => ({
      submit: handleSubmit,
    }),
    [handleSubmit]
  );

  useEffect(() => {
    if (!titleInputRef.current || titleInputRef.current.value) {
      return;
    }
    titleInputRef.current.value = getAvailableTitle(
      f('project.field'),
      existingFields?.map((el) => el.title)
    );
  }, [f, existingFields]);

  return (
    <form
      ref={formRef}
      className={classNames('form-control', 'space-y-4')}
      onSubmit={handleSubmit}>
      <input name="projectId" type="hidden" value={projectId} />
      <input name="model" type="hidden" value={modelId} />
      <input name="type" type="hidden" value={fieldType} />
      <input
        ref={titleInputRef}
        name="title"
        type="text"
        autoComplete="off"
        autoFocus
        required
        placeholder={f('project.fieldTitle')}
        className={classNames('input input-bordered', 'w-full')}
      />
      <DataFieldTypeSelect
        value={fieldType}
        filter={fieldFilter}
        onChange={handleFieldTypeChange}
      />
      {extra}
    </form>
  );
}

export default memo(forwardRef(CreateDataFieldForm));
