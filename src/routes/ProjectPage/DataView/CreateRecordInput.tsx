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
import { scrollToTableBodyRow } from './helpers';
import { useDialogStore, useFormatMessage } from '@/components/hooks';
import { EDataViewType } from '@/libs/client/types';
import {
  ICreateRecordInputProps,
  ICreateRecordInputRef,
} from '@/libs/core/view-renderers/types';
import { useCreateProjectDataRecordMutation } from '@/libs/react-query';

function CreateRecordInput(
  { project, model, view, onFinish, onLoadingChange }: ICreateRecordInputProps,
  ref: Ref<ICreateRecordInputRef>
) {
  const projectId = project._id;
  const modelId = model._id;
  const mainFieldId = model.mainField;
  const mainField = project.fields.find((el) => el._id === mainFieldId);

  const f = useFormatMessage();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toastError } = useDialogStore();
  const { isLoading, mutateAsync } = useCreateProjectDataRecordMutation();
  const [data, setData] = useState<Record<string, { value: string }>>({});
  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const form = formRef.current;
    if (isLoading || !form) {
      return;
    }
    const formData = new FormData(form);
    const fields = {
      projectId: formData.get('projectId')?.toString().trim() || '',
      project: formData.get('project')?.toString().trim() || '',
      model: formData.get('model')?.toString().trim() || '',
      data,
    };

    try {
      const newRecord = await mutateAsync(fields);
      if (onFinish) {
        onFinish(newRecord);
      }
      // NOTE: reset form
      form.reset();
      setData({});

      // TODO: scroll to new record
      if (view.type === EDataViewType.Table) {
        scrollToTableBodyRow(newRecord._id);
      }
    } catch (error: any) {
      // TODO: handle request error
      toastError(f('common.networkError'));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    setData((oldData) => {
      return {
        ...oldData,
        [name]: { value },
      };
    });
  };

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    submit: handleSubmit,
  }));

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isLoading);
    }
  }, [isLoading, onLoadingChange]);

  return (
    <form
      ref={formRef}
      className={clsx('form-control', isLoading && 'pointer-events-none')}
      onSubmit={handleSubmit}>
      <input name="projectId" type="hidden" value={projectId} />
      <input type="hidden" name="project" value={projectId} />
      <input name="model" type="hidden" value={modelId} />
      <input
        ref={inputRef}
        className={clsx(
          'input input-sm text-base-content',
          'w-full text-sm font-normal',
          'outline outline-0 focus:outline-2 focus:outline-offset-[-1px] focus:outline-secondary no-shadow'
        )}
        required
        name={mainFieldId}
        placeholder={f('dataView.enterAFieldToAddNewRow', {
          field: mainField?.title,
        })}
        value={data[mainFieldId]?.value || ''}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default memo(forwardRef(CreateRecordInput));
