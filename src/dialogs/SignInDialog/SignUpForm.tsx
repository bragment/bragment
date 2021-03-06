import { Button, Form, Input } from 'antd';
import classNames from 'classnames';
import { memo, useState } from 'react';
import { resetFormFieldError, setFormFieldError } from '../../api/antd';
import { EParseErrorCode, signUp } from '../../api/parse';
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
    } catch (error: any) {
      switch (error.code) {
        case EParseErrorCode.UsernameTaken:
          setFormFieldError(form, 'username', f('existingUsername'));
          break;
        case EParseErrorCode.EmailTaken:
          setFormFieldError(form, 'email', f('existingEmail'));
          break;
        case EParseErrorCode.ConnectionFailed:
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
          autoComplete="username"
          className={classNames('secondary-input', 'large-input-without-affix')}
          size="large"
          placeholder={f('username')}
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: f('requiredEmail') }]}>
        <Input
          className={classNames('secondary-input', 'large-input-without-affix')}
          size="large"
          placeholder={f('email')}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: f('requiredPassword') }]}>
        <Input.Password
          autoComplete="new-password"
          className={classNames(
            'secondary-input',
            'large-input-with-only-suffix'
          )}
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
