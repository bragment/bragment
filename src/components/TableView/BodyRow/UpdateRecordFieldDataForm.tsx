import { memo } from 'react';
import { getFieldRenderer } from '../../../fields/renders';
import {
  IProjectDataField,
  IProjectDataRecord,
  IRecordFieldData,
} from '../../../libs/client/types';
import { useUpdateProjectDataRecordMutation } from '../../../libs/react-query';
import { useDialogStore, useFormatMessage } from '../../hooks';

interface IUpdateRecordFieldDataFormProps {
  projectId: string;
  recordId: string;
  field: IProjectDataField;
  data?: IRecordFieldData;
  onCancel?: () => void;
  onFinish?: (record?: IProjectDataRecord) => void;
}

function UpdateRecordFieldDataForm(props: IUpdateRecordFieldDataFormProps) {
  const { projectId, field, recordId, data, onCancel, onFinish } = props;
  const { toastError } = useDialogStore();
  const f = useFormatMessage();
  const { isLoading, mutateAsync } = useUpdateProjectDataRecordMutation();
  const renderer = getFieldRenderer(field.type);

  const onChange = async (value: string) => {
    if (isLoading) {
      return;
    }
    value = value.trim();
    if (value === data?.value) {
      if (onCancel) {
        onCancel();
      }
      return;
    }
    const fields = {
      projectId,
      recordId,
      data: {
        [field._id]: { value },
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="w-full form-control" onSubmit={handleSubmit}>
      {renderer &&
        renderer.renderTableCellEditing(field, data, {
          loading: isLoading,
          className: 'w-full',
          onCancel,
          onChange,
        })}
    </form>
  );
}

export default memo(UpdateRecordFieldDataForm);
