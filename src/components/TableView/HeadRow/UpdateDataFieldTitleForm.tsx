import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { IProject, IProjectDataField } from '../../../libs/client/types';
import { useUpdateProjectDataFieldMutation } from '../../../libs/react-query';
import { useDialogStore, useFormatMessage } from '../../hooks';

interface IUpdateDataFieldTitleFormProps {
  projectId: string;
  fieldId: string;
  title: string;
  existingFields?: IProjectDataField[];
  onCancel?: () => void;
  onFinish?: (project?: IProject) => void;
}

function UpdateDataFieldTitleForm(props: IUpdateDataFieldTitleFormProps) {
  const { projectId, fieldId, title, existingFields, onCancel, onFinish } =
    props;
  const { toastError } = useDialogStore();
  const f = useFormatMessage();
  const mutation = useUpdateProjectDataFieldMutation();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (mutation.isLoading) {
        return;
      }
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const data = {
        projectId,
        fieldId,
        title: formData.get('title')?.toString().trim() || '',
      };
      if (title === data.title) {
        if (onCancel) {
          onCancel();
        }
        return;
      }
      if (
        existingFields?.some(
          (el) => el.title === data.title && el._id !== fieldId
        )
      ) {
        toastError(f('project.existingFieldTitle'));
        return;
      }
      try {
        const record = await mutation.mutateAsync(data);
        if (onFinish) {
          onFinish(record);
        }
      } catch (error: any) {
        // TODO: handle request error
        toastError(f('common.networkError'));
      }
    },
    [
      mutation,
      projectId,
      fieldId,
      title,
      existingFields,
      onCancel,
      onFinish,
      f,
      toastError,
    ]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && onCancel) {
        onCancel();
      }
    },
    [onCancel]
  );

  return (
    <form
      className={classNames(
        'form-control form-single-input',
        mutation.isLoading && 'loading'
      )}
      onSubmit={handleSubmit}>
      <input
        className={classNames(
          'input input-bordered',
          'w-full h-10 pl-[2.625rem] pr-8 text-base outline-none active:outline-none focus:outline-none'
        )}
        name="title"
        autoComplete="off"
        autoFocus
        defaultValue={title}
        onBlur={onCancel}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}

export default memo(UpdateDataFieldTitleForm);
