import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import { useFormatMessage } from '../../components/hooks';
import { ILocalMessage } from '../../i18n/types';
import {
  EProjectVisibility,
  IProject,
  IProjectBackground,
} from '../../libs/client/types';
import { useCreateProjectMutation } from '../../libs/react-query';
import BackgroundDropdown from './BackgroundDropdown';

interface ICreateProjectFormProps {
  defaultWorkspaceId?: string;
  onFinish?: (project: IProject) => void;
}

function CreateProjectForm(props: ICreateProjectFormProps) {
  const { defaultWorkspaceId, onFinish } = props;
  const f = useFormatMessage();
  const [errorMessage, setErrorMessage] = useState<ILocalMessage | undefined>();
  const [background, setBackground] = useState<IProjectBackground>({});
  const mutation = useCreateProjectMutation();

  const handleBgChange = useCallback(
    (value: IProjectBackground) => setBackground(value),
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (mutation.isLoading) {
        return;
      }
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const fields = {
        title: formData.get('title')?.toString().trim() || '',
        description: formData.get('description')?.toString().trim() || '',
        workspace: defaultWorkspaceId,
        visibility: EProjectVisibility.Private,
        background,
      };

      try {
        const project = await mutation.mutateAsync(fields);
        if (onFinish) {
          onFinish(project);
          form.reset();
        }
      } catch (error: any) {
        // TODO: handle error
        setErrorMessage('common.networkError');
      }
    },
    [mutation, background, defaultWorkspaceId, onFinish]
  );

  return (
    <form
      className={classNames('form-control', 'space-y-4')}
      onSubmit={handleSubmit}>
      <label className={classNames('label text-error', 'pt-0 pb-0 h-6')}>
        {errorMessage && f(errorMessage)}
      </label>
      <div className="input-group">
        <input
          name="title"
          type="text"
          autoComplete="off"
          autoFocus
          required
          placeholder={f('project.title')}
          className={classNames('input input-bordered', 'w-full')}
        />
        <BackgroundDropdown onChange={handleBgChange} />
      </div>
      <input
        name="description"
        type="text"
        autoComplete="off"
        placeholder={f('project.description')}
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

export default memo(CreateProjectForm);
