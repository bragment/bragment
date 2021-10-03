import { Button, Form, Input } from 'antd';
import classnames from 'classnames';
import { memo, useState } from 'react';
import { resetFormFieldError, setFormFieldError } from '../../api/antd/helpers';
import { EUserErrorCode, signUp } from '../../api/parse';
import { useFormatMessage } from '../../components/hooks';
import { ICurrentUser } from '../../stores/types';

interface ISignUpFormData {
  email: string;
  password: string;
  username: string;
}

interface ISignUpFormProps {
  onFinish: (user: ICurrentUser) => void;
  gotoSignIn?: () => void;
}

function SignUpForm(props: ISignUpFormProps) {
  const { onFinish, gotoSignIn } = props;
  const [form] = Form.useForm<ISignUpFormData>();
  const [submitting, setSubmitting] = useState(false);
  const f = useFormatMessage();
  const handleSubmit = async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);
    resetFormFieldError(form, ['email', 'username', 'password']);
    try {
      const fields = form.getFieldsValue();
      const user = await signUp(fields.username, fields.password, fields.email);
      onFinish(user);
      form.resetFields();
    } catch (error) {
      switch (error.code) {
        case EUserErrorCode.USERNAME_EXISTS:
          setFormFieldError(form, 'username', f('existingUsername'));
          break;
        case EUserErrorCode.EMAIL_EXISTS:
          setFormFieldError(form, 'email', f('existingEmail'));
          break;
        case EUserErrorCode.INTERNET_DISCONNECTED:
        default:
          setFormFieldError(form, 'username', f('networkError'));
          break;
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: f('requiredUsername') }]}>
        <Input
          className={classnames('secondary-input', 'username-input')}
          size="large"
          placeholder={f('username')}
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: f('requiredEmail') }]}>
        <Input
          className={classnames('secondary-input', 'email-input')}
          size="large"
          placeholder={f('email')}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: f('requiredPassword') }]}>
        <Input.Password
          className={classnames('secondary-input', 'password-input')}
          size="large"
          placeholder={f('password')}
        />
      </Form.Item>
      <Form.Item>
        <Button
          className="secondary-button"
          size="large"
          type="primary"
          htmlType="submit"
          loading={submitting}
          block>
          {f('signUp')}
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          className="secondary-link"
          type="link"
          block
          onClick={gotoSignIn}>
          {f('haveAnAccount')}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(SignUpForm);
