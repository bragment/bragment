import classNames from 'classnames';
import { memo } from 'react';
import AnimateSpin from '../../../../../../components/AnimateSpin';
import {
  useDialogStore,
  useFormatMessage,
} from '../../../../../../components/hooks';
import { IProject, IProjectDataField } from '../../../../../client/types';
import { useUpdateProjectDataFieldMutation } from '../../../../../react-query';

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
  const { isLoading, mutateAsync } = useUpdateProjectDataFieldMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) {
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
      const record = await mutateAsync(data);
      if (onFinish) {
        onFinish(record);
      }
    } catch (error: any) {
      // TODO: handle request error
      toastError(f('common.networkError'));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && onCancel) {
      onCancel();
    }
  };

  return (
    <form
      className={classNames(
        'form-control',
        isLoading && 'relative pointer-events-none'
      )}
      onSubmit={handleSubmit}>
      <input
        className={classNames(
          'input no-shadow',
          'w-full h-10 pl-[37px] pr-3 text-base bg-transparent'
        )}
        name="title"
        autoComplete="off"
        autoFocus
        defaultValue={title}
        onBlur={onCancel}
        onKeyDown={handleKeyDown}
      />
      {isLoading && (
        <AnimateSpin
          className="absolute top-1 right-2 bottom-1 w-6 h-auto text-base"
          bgColorClassName="bg-base-100"
        />
      )}
    </form>
  );
}

export default memo(UpdateDataFieldTitleForm);
