import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import { ILocalMessage } from '../../i18n/types';
import {
  EDataFieldType,
  IProject,
  IProjectDataField,
} from '../../libs/client/types';
import { useCreateProjectDataFieldMutation } from '../../libs/react-query';
import DataFieldTypeSelect from '../DataFieldTypeSelect';
import { useFormatMessage } from '../hooks';

export interface ICreateDataFieldFormProps {
  projectId: string;
  modelId: string;
  existingFields?: IProjectDataField[];
  onFinish?: (project: IProject) => void;
}

function CreateDataFieldForm(props: ICreateDataFieldFormProps) {
  const { projectId, modelId, existingFields, onFinish } = props;
  const f = useFormatMessage();
  const [errorMessage, setErrorMessage] = useState<ILocalMessage | undefined>();
  const mutation = useCreateProjectDataFieldMutation();

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
        model: formData.get('model')?.toString().trim() || '',
        title: formData.get('title')?.toString().trim() || '',
        type: formData.get('type')?.toString() as EDataFieldType,
      };
      if (existingFields?.some((el) => el.title === fields.title)) {
        setErrorMessage('project.existingFieldTitle');
        return;
      }
      try {
        const project = await mutation.mutateAsync(fields);
        if (onFinish) {
          onFinish(project);
        }
        form.reset();
        setErrorMessage(undefined);
      } catch (error: any) {
        setErrorMessage('common.networkError');
      }
    },
    [mutation, existingFields, onFinish]
  );

  return (
    <form
      className={classNames('form-control', 'space-y-4')}
      onSubmit={handleSubmit}>
      <label className={classNames('label text-error', 'pt-0 pb-0 h-6')}>
        {errorMessage && f(errorMessage)}
      </label>
      <input name="projectId" type="hidden" value={projectId} />
      <input name="model" type="hidden" value={modelId} />
      <DataFieldTypeSelect defaultValue={EDataFieldType.SingleLineText} />
      <input
        name="title"
        type="text"
        autoComplete="off"
        autoFocus
        required
        placeholder={f('project.fieldTitle')}
        className={classNames('input input-bordered', 'w-full')}
      />
      <button
        type="submit"
        className={classNames(
          'btn btn-primary btn-block',
          mutation.isLoading && 'loading'
        )}>
        {f('common.confirm')}
      </button>
    </form>
  );
}

export default memo(CreateDataFieldForm);
