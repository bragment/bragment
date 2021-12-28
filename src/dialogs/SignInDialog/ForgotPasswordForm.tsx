import { Button, Form, Input } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { resetFormFieldError, setFormFieldError } from '../../api/antd/helpers';
import { EUserErrorCode, requestPasswordReset } from '../../api/parse';
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
    resetFormFieldError(form, ['email']);
    try {
      const fields = form.getFieldsValue();
      // TODO: should fixed emailAdapter in parse server
      await requestPasswordReset(fields.email);
      // TODO: should show email sent message
    } catch (error) {
      switch (error.code) {
        case EUserErrorCode.PASSWORD_INVALID:
          setFormFieldError(form, 'email', f('invalidUsernameOrPassword'));
          break;
        case EUserErrorCode.INTERNET_DISCONNECTED:
        default:
          setFormFieldError(form, 'email', f('networkError'));
          break;
      }
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
          className={classNames('primary-input', 'large-input-without-affix')}
          placeholder={f('email')}
          size="large"
        />
      </Form.Item>
      <Form.Item />
      <Form.Item>
        <Button
          className={classNames('primary-button', styles.sendEmailButton)}
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
