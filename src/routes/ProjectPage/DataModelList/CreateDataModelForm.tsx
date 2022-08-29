import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import { useDialogStore, useFormatMessage } from '../../../components/hooks';
import { ILocalMessage } from '../../../i18n/types';
import { IProject } from '../../../libs/client/types';
import { useCreateProjectDataModelMutation } from '../../../libs/react-query';

interface ICreateDataModelFormProps {
  singleInput?: boolean;
  projectId: string;
  onFinish?: (project: IProject) => void;
  onCancel?: () => void;
}

function CreateDataModelForm(props: ICreateDataModelFormProps) {
  const { singleInput, projectId, onFinish, onCancel } = props;
  const f = useFormatMessage();
  const composingRef = useRef(false);
  const { toastError } = useDialogStore();
  const [errorMessage, setErrorMessage] = useState<ILocalMessage | undefined>();
  const { isLoading, mutateAsync } = useCreateProjectDataModelMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const fields = {
      title: formData.get('title')?.toString() || '',
      projectId,
    };
    try {
      const project = await mutateAsync(fields);
      if (onFinish) {
        onFinish(project);
        form.reset();
      }
    } catch (error) {
      // TODO: handle request error
      if (singleInput) {
        toastError(f('common.networkError'));
      } else {
        setErrorMessage('common.networkError');
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isLoading || composingRef.current) {
      return;
    }
    if (event.key === 'Escape' && singleInput && onCancel) {
      onCancel();
    }
  };

  const handleBlur = () => {
    if (!isLoading && singleInput && onCancel) {
      onCancel();
    }
  };

  const handleCompositionStart = () => (composingRef.current = true);
  const handleCompositionEnd = () => (composingRef.current = false);

  return (
    <form
      className={classNames(
        'form-control',
        'space-y-4',
        singleInput && 'form-single-input',
        isLoading && 'loading'
      )}
      onSubmit={handleSubmit}>
      {!singleInput && (
        <label className={classNames('label text-error', 'pt-0 pb-0 h-6')}>
          {errorMessage && f(errorMessage)}
        </label>
      )}
      <input
        name="title"
        type="text"
        autoComplete="off"
        autoFocus
        required
        placeholder={f('project.modelTitle')}
        className={classNames('input input-bordered', 'w-full text-md')}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      {!singleInput && (
        <button
          type="submit"
          className={classNames(
            'btn btn-primary',
            'w-full',
            isLoading && 'loading'
          )}>
          {f('common.confirm')}
        </button>
      )}
    </form>
  );
}

export default observer(CreateDataModelForm);
