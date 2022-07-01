import { Button, Form, Input } from 'antd';
import { memo, useMemo } from 'react';
import { useFormatMessage } from '../../components/hooks';
import { IWorkspace } from '../../libs/client/types';
import { useCreateWorkspaceMutation } from '../../libs/react-query';

interface ICreateWorkspaceFormData {
  title: string;
}

interface ICreateWorkspaceFormProps {
  onFinish?: (workspace: IWorkspace) => void;
}

function CreateWorkspaceForm(props: ICreateWorkspaceFormProps) {
  const { onFinish } = props;
  const f = useFormatMessage();
  const mutation = useCreateWorkspaceMutation();
  const [form] = Form.useForm<ICreateWorkspaceFormData>();
  const initialFormValues = useMemo<ICreateWorkspaceFormData>(
    () => ({
      title: '',
    }),
    []
  );

  const handleSubmit = async (fields: ICreateWorkspaceFormData) => {
    const title = fields.title.trim();
    if (!title) {
      return;
    }
    const workspace = await mutation.mutateAsync({ title });
    if (onFinish) {
      onFinish(workspace);
    }
  };

  return (
    <Form
      name="CreateWorkspaceForm"
      form={form}
      initialValues={initialFormValues}
      onFinish={handleSubmit}>
      <Form.Item
        required
        name="title"
        rules={[{ required: true, message: f('requiredWorkspaceTitle') }]}>
        <Input size="large" placeholder={f('workspaceTitle')} />
      </Form.Item>
      <Form.Item>
        <Button
          block
          htmlType="submit"
          size="large"
          type="primary"
          loading={mutation.isLoading}>
          {f('confirm')}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(CreateWorkspaceForm);
