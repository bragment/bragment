import clsx from 'clsx';
import React, {
  forwardRef,
  memo,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { scrollToTableHeader } from './helpers';
import DataFieldTypeSelect from '@/components/DataFieldTypeSelect';
import { defaultFieldType } from '@/components/DataFieldTypeSelect/types';
import { useDialogStore, useFormatMessage } from '@/components/hooks';
import { EDataViewType } from '@/libs/client/types';
import {
  ICreateFieldFormProps,
  ICreateFieldFormRef,
} from '@/libs/core/view-renderers/types';
import { useCreateProjectDataFieldMutation } from '@/libs/react-query';
import { getAvailableTitle } from '@/utils';

function CreateFieldForm(
  { project, model, view, onFinish, onLoadingChange }: ICreateFieldFormProps,
  ref: Ref<ICreateFieldFormRef>
) {
  const projectId = project._id;
  const modelId = model._id;
  const existingFields = project.fields.filter((el) => el.model === modelId);

  const f = useFormatMessage();
  const formRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [fieldType, setFieldType] = useState(defaultFieldType);
  const { isLoading, mutateAsync } = useCreateProjectDataFieldMutation();
  const { toastError } = useDialogStore();

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const form = formRef.current;
    if (isLoading || !form) {
      return;
    }
    const formData = new FormData(form);
    const entries = Array.from(formData.entries());
    const data = {
      ...entries.reduce<any>((prev, [key, value]) => {
        prev[key] = value;
        return prev;
      }, {}),
      projectId: formData.get('projectId')?.toString().trim() || '',
      model: formData.get('model')?.toString().trim() || '',
      title: formData.get('title')?.toString().trim() || '',
      type: formData.get('type')?.toString(),
    };
    if (existingFields?.some((el) => el.title === data.title)) {
      toastError(f('project.existingFieldTitle'));
      titleInputRef.current?.focus();
      return;
    }
    try {
      const updated = await mutateAsync(data);
      const newField = updated.fields[0];
      if (onFinish) {
        onFinish(updated);
      }

      // NOTE: reset form
      form.reset();
      setFieldType(defaultFieldType);

      // NOTE: scroll to new column
      if (view.type === EDataViewType.Table) {
        scrollToTableHeader(newField._id);
      }
    } catch (error: any) {
      toastError(f('common.networkError'));
    }
  };

  useImperativeHandle(ref, () => ({
    focus: () => titleInputRef.current?.focus(),
    submit: handleSubmit,
  }));

  useEffect(() => {
    if (!titleInputRef.current || titleInputRef.current.value) {
      return;
    }
    titleInputRef.current.value = getAvailableTitle(
      f('project.field'),
      existingFields?.map((el) => el.title)
    );
  }, [f, existingFields]);

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isLoading);
    }
  }, [isLoading, onLoadingChange]);

  return (
    <form
      ref={formRef}
      className={clsx('form-control gap-3', isLoading && 'pointer-events-none')}
      onSubmit={handleSubmit}>
      <input name="projectId" type="hidden" value={projectId} />
      <input name="model" type="hidden" value={modelId} />
      <input name="type" type="hidden" value={fieldType} />
      <DataFieldTypeSelect value={fieldType} onChange={setFieldType} />
      <input
        ref={titleInputRef}
        name="title"
        type="text"
        autoComplete="off"
        autoFocus
        required
        placeholder={f('project.fieldTitle')}
        className={clsx('input input-bordered', 'w-full')}
      />
      <button className={clsx('btn btn-full')}>
        {isLoading && <span className="loading loading-spinner" />}
        {f('dataView.addField')}
      </button>
    </form>
  );
}

export default memo(forwardRef(CreateFieldForm));
