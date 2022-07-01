import { Button, Form, Input } from 'antd';
import classNames from 'classnames';
import { memo, useState } from 'react';
import { useFormatMessage } from '../../components/hooks';
import { resetFormFieldError, setFormFieldError } from '../../libs/antd';
import { parseApiErrorMessage } from '../../libs/client';
import { EApiErrorMessage, IUser } from '../../libs/client/types';
import { useUserSignUpMutation } from '../../libs/react-query';

interface ISignUpFormData {
  email: string;
  password: string;
  username: string;
}

interface ISignUpFormProps {
  onFinish: (user: IUser) => void;
  gotoSignIn?: () => void;
}

function SignUpForm(props: ISignUpFormProps) {
  const { onFinish, gotoSignIn } = props;
  const [form] = Form.useForm<ISignUpFormData>();
  const [submitting, setSubmitting] = useState(false);
  const f = useFormatMessage();
  const signUpMutation = useUserSignUpMutation();
  const handleSubmit = async () => {
    if (submitting) {
      return;
    }

    setSubmitting(true);
    resetFormFieldError(form, ['email', 'username', 'password']);
    try {
      const fields = form.getFieldsValue();
      const { user } = await signUpMutation.mutateAsync(fields);
      onFinish(user);
      form.resetFields();
    } catch (error: any) {
      switch (parseApiErrorMessage(error)) {
        case EApiErrorMessage.UsernameTaken:
          setFormFieldError(form, 'username', f('existingUsername'));
          break;
        case EApiErrorMessage.EmailTaken:
          setFormFieldError(form, 'email', f('existingEmail'));
          break;
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
          autoComplete="off"
          className={classNames('secondary-input', 'large-input-without-affix')}
          size="large"
          placeholder={f('username')}
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: f('requiredEmail') }]}>
        <Input
          autoComplete="off"
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
