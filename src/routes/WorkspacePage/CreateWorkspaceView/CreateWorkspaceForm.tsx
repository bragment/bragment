import classNames from 'classnames';
import { memo, useState } from 'react';
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
  const { isLoading, mutateAsync } = useCreateWorkspaceMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const fields = {
      title: formData.get('title')?.toString() || '',
    };
    try {
      const workspace = await mutateAsync(fields);
      if (onFinish) {
        onFinish(workspace);
        form.reset();
      }
    } catch (error: any) {
      // TODO: handle request error
      setErrorMessage('common.networkError');
    }
  };

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
          isLoading && 'loading'
        )}>
        {f('common.confirm')}
      </button>
    </form>
  );
}

export default memo(CreateWorkspaceForm);
