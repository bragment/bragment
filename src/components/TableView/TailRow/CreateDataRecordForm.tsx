import classNames from 'classnames';
import React, {
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
  IProjectDataField,
  IProjectDataRecord,
} from '../../../libs/client/types';
import { useCreateProjectDataRecordMutation } from '../../../libs/react-query';
import { useDialogStore, useFormatMessage } from '../../hooks';

export interface ICreateDataRecordFormRef {
  focus: () => void;
}

export interface ICreateDataRecordFormProps {
  projectId: string;
  modelId: string;
  mainField: IProjectDataField;
  onFinish?: (record: IProjectDataRecord) => void;
  onLoadingChange?: (loading: boolean) => void;
}

function CreateDataRecordForm(
  props: ICreateDataRecordFormProps,
  ref: Ref<ICreateDataRecordFormRef>
) {
  const { projectId, modelId, mainField, onFinish, onLoadingChange } = props;
  const f = useFormatMessage();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toastError } = useDialogStore();
  const mutation = useCreateProjectDataRecordMutation();
  const [data, setData] = useState<Record<string, { value: string }>>({});

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (mutation.isLoading) {
        return;
      }
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const fields = {
        projectId: formData.get('projectId')?.toString().trim() || '',
        project: formData.get('project')?.toString().trim() || '',
        model: formData.get('model')?.toString().trim() || '',
        data,
      };

      try {
        const record = await mutation.mutateAsync(fields);
        if (onFinish) {
          onFinish(record);
        }
        form.reset();
        setData({});
      } catch (error: any) {
        // TODO: handle request error
        toastError(f('common.networkError'));
      }
    },
    [mutation, data, onFinish, f, toastError]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const { name, value } = target;
      setData((oldData) => {
        return {
          ...oldData,
          [name]: { value },
        };
      });
    },
    []
  );

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(mutation.isLoading);
    }
  }, [mutation.isLoading, onLoadingChange]);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }),
    []
  );

  return (
    <form
      className={classNames(
        'form-control',
        mutation.isLoading && 'pointer-events-none'
      )}
      onSubmit={handleSubmit}>
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="project" value={projectId} />
      <input type="hidden" name="model" value={modelId} />
      <input
        ref={inputRef}
        type="text"
        name={mainField._id}
        autoComplete="off"
        required
        placeholder={f('project.addData')}
        value={data[mainField._id]?.value || ''}
        onChange={handleInputChange}
        className={classNames(
          'input',
          'w-full h-10 bg-transparent outline-none active:outline-none focus:outline-none'
        )}
      />
    </form>
  );
}

export default memo(forwardRef(CreateDataRecordForm));
