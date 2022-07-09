import { Button, Form, Input } from 'antd';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { useFormatMessage } from '../../components/hooks';
import styles from './index.module.scss';

interface IForgotPasswordFormData {
  email: string;
}

interface IForgotPasswordFormProps {
  gotoSignIn?: () => void;
}

function ForgotPasswordForm(props: IForgotPasswordFormProps) {
  const { gotoSignIn } = props;
  const [form] = Form.useForm<IForgotPasswordFormData>();
  const [submitting, setSubmitting] = useState(false);
  const f = useFormatMessage();

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    try {
      // TODO: request reset password
    } catch (error) {
      // TODO: handle error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: f('requiredEmail') }]}>
        <Input
          className={classnames('primary-input', 'email-input')}
          placeholder={f('email')}
          size="large"
        />
      </Form.Item>
      <Form.Item />
      <Form.Item>
        <Button
          className={classnames('primary-button', styles.sendEmailButton)}
          size="large"
          type="primary"
          htmlType="submit"
          loading={submitting}
          block>
          {f('sendPasswordResetEmail')}
        </Button>
      </Form.Item>
      <Form.Item>
        <Button className="primary-link" type="link" block onClick={gotoSignIn}>
          {f('backToSignIn')}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default observer(ForgotPasswordForm);
