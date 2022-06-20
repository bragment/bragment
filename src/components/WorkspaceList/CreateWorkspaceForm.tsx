import { Form, Input } from 'antd';
import { memo, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useCreateWorkspaceMutation } from '../../libs/react-query';
import { useFormatMessage } from '../hooks';
import styles from './index.module.scss';

export interface ICreateWorkspaceFormProps {
  onFinish?: () => void;
  onCancel?: () => void;
}

interface ICreateWorkspaceFormData {
  title: string;
  project: { link: string };
  itemOrder: string[];
}

function CreateWorkspaceForm(props: ICreateWorkspaceFormProps) {
  const { onCancel, onFinish } = props;
  const f = useFormatMessage();
  const [form] = Form.useForm<ICreateWorkspaceFormData>();
  const initialFormValues = {
    title: '',
  };
  const mutation = useCreateWorkspaceMutation();

  const handleSubmit = async () => {
    const fields = form.getFieldsValue();
    const title = fields.title.trim();
    if (!title) {
      if (onCancel) {
        onCancel();
      }
      return;
    }
    await mutation.mutateAsync({ title });
    if (onFinish) {
      onFinish();
    }
  };

  const handleInputBlur = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      if (onCancel) {
        onCancel();
      }
    }
  };

  return (
    <Form
      name="CreateWorkspaceForm"
      form={form}
      className={styles.formWrapper}
      initialValues={initialFormValues}>
      <Form.Item name="title">
        <Input
          autoFocus
          autoComplete="off"
          className="middle-input-without-affix"
          placeholder={f('inputColumnTitle')}
          onBlur={handleInputBlur}
          onPressEnter={handleSubmit}
          onKeyDown={handleInputKeyDown}
        />
      </Form.Item>
    </Form>
  );
}

export default memo(CreateWorkspaceForm);
