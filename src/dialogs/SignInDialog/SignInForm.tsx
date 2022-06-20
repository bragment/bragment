import { Button, Checkbox, Form, Input } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { resetFormFieldError, setFormFieldError } from '../../api/antd';
import { useFormatMessage } from '../../components/hooks';
import { parseApiErrorMessage } from '../../libs/client';
import { EApiErrorMessage } from '../../libs/client/types';
import { useUserSignInMutation } from '../../libs/react-query';
import { ICurrentUser } from '../../stores/types';

interface ISignInFormData {
  username: string;
  password: string;
}

interface ISignInFormProps {
  onFinish: (user: ICurrentUser) => void;
  gotoSignUp?: () => void;
  gotoForgotPassword?: () => void;
}

function SignInForm(props: ISignInFormProps) {
  const { onFinish, gotoSignUp, gotoForgotPassword } = props;
  const [form] = Form.useForm<ISignInFormData>();
  const [submitting, setSubmitting] = useState(false);
  const signInMutation = useUserSignInMutation();
  const f = useFormatMessage();

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    resetFormFieldError(form, ['username', 'password']);
    try {
      const fields = form.getFieldsValue();
      const { user } = await signInMutation.mutateAsync(fields);
      onFinish(user);
      form.resetFields();
    } catch (error: any) {
      switch (parseApiErrorMessage(error)) {
        case EApiErrorMessage.InvalidPassword:
          setFormFieldError(form, 'username', f('invalidUsernameOrPassword'));
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
          autoComplete="username"
          className={classNames('primary-input', 'large-input-without-affix')}
          placeholder={f('usernameOrEmail')}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: f('requiredPassword') }]}>
        <Input.Password
          autoComplete="current-password"
          className={classNames(
            'primary-input',
            'large-input-with-only-suffix'
          )}
          size="large"
          placeholder={f('password')}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>{f('rememberMe')}</Checkbox>
        </Form.Item>
        <Button
          style={{ float: 'right', height: 'auto', padding: 0 }}
          type="link"
          onClick={gotoForgotPassword}>
          {f('forgotPassword')}
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          className="primary-button"
          size="large"
          type="primary"
          htmlType="submit"
          loading={submitting}
          block>
          {f('signIn')}
        </Button>
      </Form.Item>
      <Form.Item>
        <Button className="primary-link" type="link" block onClick={gotoSignUp}>
          {f('notHaveAnAccount')}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default observer(SignInForm);
