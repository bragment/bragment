import { FormOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import classnames from 'classnames';
import { memo, useMemo, useState } from 'react';
import { useFormatMessage } from '../../components/hooks';
import styles from './index.module.scss';

interface ICreateProjectFormData {
  title: string;
}

interface ICreateProjectFormProps {
  onFinish?: () => void;
}

function CreateProjectForm(props: ICreateProjectFormProps) {
  const f = useFormatMessage();
  const [form] = Form.useForm<ICreateProjectFormData>();
  const [submitting, setSubmitting] = useState(false);
  const initialFormValues = useMemo<ICreateProjectFormData>(
    () => ({
      title: '',
    }),
    []
  );

  const handleSubmit = () => {
    // const fields = form.getFieldsValue();
    setSubmitting(true);
    setSubmitting(false);
  };

  return (
    <Form form={form} initialValues={initialFormValues}>
      <Form.Item
        required
        name="title"
        rules={[{ required: true, message: f('requiredProjectTitle') }]}>
        <Input
          autoComplete="off"
          autoFocus
          bordered={false}
          className={classnames(
            styles.fieldInput,
            'middle-input-with-prefix-and-suffix'
          )}
          prefix={<FormOutlined />}
          placeholder={f('projectTitle')}
          size="middle"
        />
      </Form.Item>
      <Form.Item className={styles.formActions}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          loading={submitting}
          size="middle">
          {f('createProject')}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(CreateProjectForm);
