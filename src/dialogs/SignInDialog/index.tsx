import { Modal, Tabs } from 'antd';
import { observer } from 'mobx-react';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../components/hooks';
import { ESignInDialogTabKey, ICurrentUser } from '../../stores/types';
import ForgotPasswordForm from './ForgotPasswordForm';
import styles from './index.module.scss';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

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
    setSignInDialogCurrentTab(ESignInDialogTabKey.SIGN_IN);

  const gotoSignUp = () =>
    setSignInDialogCurrentTab(ESignInDialogTabKey.SIGN_UP);

  const gotoForgotPassword = () =>
    setSignInDialogCurrentTab(ESignInDialogTabKey.FORGOT_PASSWORD);

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
        <Tabs.TabPane tab={f('signIn')} key={ESignInDialogTabKey.SIGN_IN}>
          <SignInForm
            onFinish={handleFinish}
            gotoSignUp={gotoSignUp}
            gotoForgotPassword={gotoForgotPassword}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={f('signUp')}
          key={ESignInDialogTabKey.FORGOT_PASSWORD}>
          <ForgotPasswordForm gotoSignIn={gotoSignIn} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={f('forgotPassword')}
          key={ESignInDialogTabKey.SIGN_UP}>
          <SignUpForm onFinish={handleFinish} gotoSignIn={gotoSignIn} />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}

export default observer(SignInDialog);
