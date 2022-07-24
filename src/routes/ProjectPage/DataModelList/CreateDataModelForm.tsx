import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useRef } from 'react';
import { useDialogStore, useFormatMessage } from '../../../components/hooks';
import { IProject } from '../../../libs/client/types';
import { useCreateProjectDataModelMutation } from '../../../libs/react-query';

interface ICreateDataModelFormProps {
  projectId: string;
  onFinish?: (project: IProject) => void;
  onCancel?: () => void;
}

function CreateDataModelForm(props: ICreateDataModelFormProps) {
  const { projectId, onFinish, onCancel } = props;
  const composingRef = useRef(false);
  const { toastError } = useDialogStore();
  const mutation = useCreateProjectDataModelMutation();

  const f = useFormatMessage();

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
        projectId,
      };
      try {
        const project = await mutation.mutateAsync(fields);
        if (onFinish) {
          onFinish(project);
          form.reset();
        }
      } catch (error) {
        // TODO: handle request error
        toastError(f('common.networkError'));
      }
    },
    [projectId, mutation, f, onFinish, toastError]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (mutation.isLoading || composingRef.current) {
        return;
      }
      if (event.key === 'Escape' && onCancel) {
        onCancel();
      }
    },
    [mutation, onCancel]
  );

  const handleBlur = useCallback(() => {
    if (!mutation.isLoading && onCancel) {
      onCancel();
    }
  }, [mutation, onCancel]);

  const handleCompositionStart = useCallback(
    () => (composingRef.current = true),
    []
  );
  const handleCompositionEnd = useCallback(
    () => (composingRef.current = false),
    []
  );

  return (
    <form
      className={classNames(
        'form-control',
        'space-y-4',
        'form-single-input',
        mutation.isLoading && 'loading'
      )}
      onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        autoComplete="off"
        autoFocus
        required
        placeholder={f('project.dataModelTitle')}
        className={classNames('input input-bordered', 'w-full text-md')}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </form>
  );
}

export default observer(CreateDataModelForm);
