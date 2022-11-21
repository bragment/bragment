import classNames from 'classnames';
import { observer } from 'mobx-react';
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react';
import AnimateSpin from '../../../components/AnimateSpin';
import { useDialogStore, useFormatMessage } from '../../../components/hooks';
import PrimaryButton from '../../../components/PrimaryButton';
import { ILocalMessage } from '../../../i18n/types';
import { IProject } from '../../../libs/client/types';
import { useCreateProjectDataModelMutation } from '../../../libs/react-query';

interface ICreateDataModelFormProps {
  singleInput?: boolean;
  projectId: string;
  onFinish?: (project: IProject) => void;
  onCancel?: () => void;
}

export interface ICreateDataModelFormRef {
  focus: () => void;
}

function CreateDataModelForm(
  props: ICreateDataModelFormProps,
  ref: Ref<ICreateDataModelFormRef>
) {
  const { singleInput, projectId, onFinish, onCancel } = props;
  const f = useFormatMessage();
  const inputRef = useRef<HTMLInputElement>(null);
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
      setTimeout(() => {
        if (!inputRef.current || inputRef.current !== document.activeElement) {
          onCancel();
        }
      }, 20);
    }
  };

  const handleCompositionStart = () => (composingRef.current = true);
  const handleCompositionEnd = () => (composingRef.current = false);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  return (
    <form
      className={classNames(
        'form-control',
        'relative space-y-4',
        isLoading && 'loading pointer-events-none'
      )}
      onSubmit={handleSubmit}>
      {!singleInput && (
        <label className={classNames('label text-error', 'pt-0 pb-0 h-6')}>
          {errorMessage && f(errorMessage)}
        </label>
      )}
      <input
        ref={inputRef}
        name="title"
        type="text"
        autoComplete="off"
        autoFocus
        required
        placeholder={f('project.modelTitle')}
        className={classNames(
          'input input-bordered',
          'w-full text-md',
          singleInput && '!pr-9'
        )}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      {singleInput && isLoading && (
        <AnimateSpin
          className="absolute top-2 right-2 w-6 h-auto text-base text-base-content/50"
          bgColorClassName="bg-base-100"
        />
      )}
      {!singleInput && (
        <PrimaryButton
          type="submit"
          className={classNames('btn-block', isLoading && 'loading')}
          fromColor="from-orange-400"
          toColor="to-fuchsia-500">
          {f('common.confirm')}
        </PrimaryButton>
      )}
    </form>
  );
}

export default observer(forwardRef(CreateDataModelForm));
