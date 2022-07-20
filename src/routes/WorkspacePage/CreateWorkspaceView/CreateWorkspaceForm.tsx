import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import { useFormatMessage } from '../../../components/hooks';
import { ILocalMessage } from '../../../i18n/types';
import { IWorkspace } from '../../../libs/client/types';
import { useCreateWorkspaceMutation } from '../../../libs/react-query';

interface ICreateWorkspaceFormProps {
  onFinish?: (workspace: IWorkspace) => void;
}

function CreateWorkspaceForm(props: ICreateWorkspaceFormProps) {
  const { onFinish } = props;
  const f = useFormatMessage();
  const [errorMessage, setErrorMessage] = useState<ILocalMessage | undefined>();
  const mutation = useCreateWorkspaceMutation();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (mutation.isLoading) {
        return;
      }
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const fields = {
        title: formData.get('title')?.toString() || '',
      };
      try {
        const workspace = await mutation.mutateAsync(fields);
        if (onFinish) {
          onFinish(workspace);
          form.reset();
        }
      } catch (error: any) {
        // TODO: handle error
        setErrorMessage('common.networkError');
      }
    },
    [mutation, onFinish]
  );

  return (
    <form
      className={classNames('form-control', 'space-y-4')}
      onSubmit={handleSubmit}>
      <label className={classNames('label text-error', 'pt-0 pb-0 h-6')}>
        {errorMessage && f(errorMessage)}
      </label>
      <input
        name="title"
        type="text"
        autoComplete="off"
        autoFocus
        required
        placeholder={f('workspace.title')}
        className={classNames('input input-bordered', 'w-full')}
      />
      <button
        type="submit"
        className={classNames(
          'btn btn-primary',
          'w-full',
          mutation.isLoading && 'loading'
        )}>
        {f('common.confirm')}
      </button>
    </form>
  );
}

export default memo(CreateWorkspaceForm);
