import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { observer } from 'mobx-react';
import { useMemo, useState } from 'react';
import { useFormatMessage } from '../../components/hooks';
import { IProject } from '../../libs/client/types';
import { useCreateProjectDataModelMutation } from '../../libs/react-query';

interface ICreateDataModelFormData {
  projectId: string;
  title: string;
}

interface ICreateDataModelFormProps {
  projectId: string;
  onFinish: (project: IProject) => void;
  onCancel: () => void;
}

function CreateDataModelForm(props: ICreateDataModelFormProps) {
  const { projectId, onFinish, onCancel } = props;
  const [submitting, setSubmitting] = useState(false);
  const createMutation = useCreateProjectDataModelMutation();
  const [form] = Form.useForm<ICreateDataModelFormData>();
  const initialFormValues = useMemo<ICreateDataModelFormData>(
    () => ({
      projectId,
      title: '',
    }),
    [projectId]
  );

  const f = useFormatMessage();

  const handleSubmit = async () => {
    const fields = await form.validateFields();
    fields.title = fields.title.trim();
    if (submitting || !fields.title || !fields.projectId) {
      return;
    }
    setSubmitting(true);
    try {
      const project = await createMutation.mutateAsync(fields);
      if (onFinish) {
        onFinish(project);
      }
    } catch (error) {
      // TODO: handle error
    } finally {
      setSubmitting(false);
    }
  };

  const handleBlur = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Form
      name="CreateProjectDataModelForm"
      form={form}
      initialValues={initialFormValues}>
      <Form.Item hidden name="projectId">
        <input />
      </Form.Item>
      <Form.Item name="title">
        <Input
          autoFocus
          suffix={createMutation.isLoading ? <LoadingOutlined /> : undefined}
          placeholder={f('dataModelTitle')}
          onPressEnter={handleSubmit}
          onBlur={handleBlur}
        />
      </Form.Item>
    </Form>
  );
}

export default observer(CreateDataModelForm);
