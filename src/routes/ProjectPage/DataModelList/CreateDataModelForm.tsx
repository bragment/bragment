import classNames from 'classnames';
import { memo, useCallback, useRef } from 'react';
import { useFormatMessage } from '../../../components/hooks';
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
        // TODO: handle error
      }
    },
    [projectId, mutation, onFinish]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (composingRef.current) {
        return;
      }
      if (event.key === 'Escape' && onCancel) {
        onCancel();
      }
    },
    [onCancel]
  );

  const handleBlur = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

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

export default memo(CreateDataModelForm);
