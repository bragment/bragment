import { Modal, Tabs } from 'antd';
import { observer } from 'mobx-react';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../components/hooks';
import { ESignInDialogTabKey, ICurrentUser } from '../../stores/types';
import ForgotPasswordForm from './ForgotPasswordForm';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import styles from './index.module.scss';

function SignInDialog() {
  const f = useFormatMessage();
  const { current, setCurrent } = useUserStore();
  const {
    signInDialogCurrentTab,
    signInDialogVisible,
    setSignInDialogCurrentTab,
    setSignInDialogVisible,
  } = useDialogStore();

  const close = () => setSignInDialogVisible(false);

  const gotoSignIn = () =>
    setSignInDialogCurrentTab(ESignInDialogTabKey.SignIn);

  const gotoSignUp = () =>
    setSignInDialogCurrentTab(ESignInDialogTabKey.SignUp);

  const gotoForgotPassword = () =>
    setSignInDialogCurrentTab(ESignInDialogTabKey.ForgotPassword);

  const handleFinish = (user: ICurrentUser) => {
    setCurrent(user);
    close();
  };

  return (
    <Modal
      className={styles.wrap}
      visible={signInDialogVisible && !current}
      maskClosable={false}
      centered
      width={360}
      footer={null}
      onCancel={close}>
      <div className={styles.logo}>
        <div className="text-logo" />
      </div>
      <Tabs activeKey={signInDialogCurrentTab}>
        <Tabs.TabPane tab={f('signIn')} key={ESignInDialogTabKey.SignIn}>
          <SignInForm
            onFinish={handleFinish}
            gotoSignUp={gotoSignUp}
            gotoForgotPassword={gotoForgotPassword}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={f('signUp')}
          key={ESignInDialogTabKey.ForgotPassword}>
          <ForgotPasswordForm gotoSignIn={gotoSignIn} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={f('forgotPassword')}
          key={ESignInDialogTabKey.SignUp}>
          <SignUpForm onFinish={handleFinish} gotoSignIn={gotoSignIn} />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}

export default observer(SignInDialog);
