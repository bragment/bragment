import { Button, Checkbox, Form, Input } from 'antd';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { resetFormFieldError, setFormFieldError } from '../../api/antd/helpers';
import { EUserErrorCode, signIn } from '../../api/parse';
import { useFormatMessage } from '../../components/hooks';
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
  const f = useFormatMessage();

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    resetFormFieldError(form, ['username', 'password']);
    try {
      const fields = form.getFieldsValue();
      const user = await signIn(fields.username, fields.password);
      onFinish(user);
      form.resetFields();
    } catch (error) {
      switch (error.code) {
        case EUserErrorCode.PASSWORD_INVALID:
          setFormFieldError(form, 'username', f('invalidUsernameOrPassword'));
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
          className={classnames('primary-input', 'large-input-without-affix')}
          placeholder={f('usernameOrEmail')}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: f('requiredPassword') }]}>
        <Input.Password
          className={classnames(
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
