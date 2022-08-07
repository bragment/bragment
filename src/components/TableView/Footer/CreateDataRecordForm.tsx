import classNames from 'classnames';
import React, { memo, useCallback, useState } from 'react';
import {
  IProjectDataField,
  IProjectDataRecord,
} from '../../../libs/client/types';
import { useCreateProjectDataRecordMutation } from '../../../libs/react-query';
import { useDialogStore, useFormatMessage } from '../../hooks';

export interface ICreateDataRecordFormProps {
  projectId: string;
  modelId: string;
  mainField: IProjectDataField;
  onFinish?: (record: IProjectDataRecord) => void;
}

function CreateDataRecordForm(props: ICreateDataRecordFormProps) {
  const { projectId, modelId, mainField, onFinish } = props;
  const f = useFormatMessage();
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

  return (
    <form
      className={classNames(
        'form-control',
        'form-single-input',
        mutation.isLoading && 'loading'
      )}
      onSubmit={handleSubmit}>
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="project" value={projectId} />
      <input type="hidden" name="model" value={modelId} />
      <input
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

export default memo(CreateDataRecordForm);
