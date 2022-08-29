import classNames from 'classnames';
import { memo, useCallback, useRef } from 'react';
import { IProjectDataRecord } from '../../../libs/client/types';
import { useUpdateProjectDataRecordMutation } from '../../../libs/react-query';
import { useDialogStore, useFormatMessage } from '../../hooks';
import UniversalInput from '../../UniversalInput';

interface IUpdateRecordFieldDataFormProps {
  projectId: string;
  fieldId: string;
  recordId: string;
  defaultValue: string;
  onCancel?: () => void;
  onFinish?: (record?: IProjectDataRecord) => void;
}

function UpdateRecordFieldDataForm(props: IUpdateRecordFieldDataFormProps) {
  const { projectId, fieldId, recordId, defaultValue, onCancel, onFinish } =
    props;
  const { toastError } = useDialogStore();
  const f = useFormatMessage();
  const { isLoading, mutateAsync } = useUpdateProjectDataRecordMutation();
  const valueRef = useRef(defaultValue);

  const handleChange = useCallback((value: string) => {
    valueRef.current = value;
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    const value = valueRef.current.trim();
    if (value === defaultValue) {
      if (onCancel) {
        onCancel();
      }
      return;
    }
    const fields = {
      projectId,
      recordId,
      data: {
        [fieldId]: { value },
      },
    };
    try {
      const record = await mutateAsync(fields);
      if (onFinish) {
        onFinish(record);
      }
    } catch (error: any) {
      // TODO: handle request error
      toastError(f('common.networkError'));
    }
  };

  return (
    <form
      className={classNames(
        'form-control form-single-input',
        isLoading && 'loading'
      )}
      onSubmit={handleSubmit}>
      <UniversalInput
        name={fieldId}
        defaultValue={defaultValue}
        className="pr-8"
        onBlur={onCancel}
        onChange={handleChange}
      />
    </form>
  );
}

export default memo(UpdateRecordFieldDataForm);
