import { Card, Tabs } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { useFormatMessage, useUserStore } from '../../components/hooks';
import { IUser } from '../../libs/client/types';
import ForgotPasswordForm from './ForgotPasswordForm';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import styles from './index.module.scss';

enum ETabKey {
  SignIn = 'SIGN_IN',
  SignUp = 'SIGN_UP',
  ForgotPassword = 'FORGOT_PASSWORD',
}

function SignInPage() {
  const f = useFormatMessage();
  const location = useLocation();
  const navigate = useNavigate();
  const { current, setCurrent } = useUserStore();
  const currentUserRef = useRef(current);
  const [tabKey, setTabKey] = useState(ETabKey.SignIn);

  const gotoSignIn = () => setTabKey(ETabKey.SignIn);
  const gotoSignUp = () => setTabKey(ETabKey.SignUp);
  const gotoForgotPassword = () => setTabKey(ETabKey.ForgotPassword);

  const handleFinish = (user: IUser) => {
    setCurrent(user);
  };

  useEffect(() => {
    if (currentUserRef.current !== current && current) {
      const locationState = location.state as { from?: Location };
      const from = locationState?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
    currentUserRef.current = current;
  }, [current, location, navigate]);

  return (
    <Scrollbars autoHide>
      <div className={styles.wrapper}>
        <Card className={styles.body} hoverable={false}>
          <div className={styles.logo}>
            <div className="text-mark" />
          </div>
          <Tabs activeKey={tabKey}>
            <Tabs.TabPane tab={f('signIn')} key={ETabKey.SignIn}>
              <SignInForm
                onFinish={handleFinish}
                gotoSignUp={gotoSignUp}
                gotoForgotPassword={gotoForgotPassword}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={f('signUp')} key={ETabKey.SignUp}>
              <SignUpForm onFinish={handleFinish} gotoSignIn={gotoSignIn} />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={f('forgotPassword')}
              key={ETabKey.ForgotPassword}>
              <ForgotPasswordForm gotoSignIn={gotoSignIn} />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    </Scrollbars>
  );
}

export default observer(SignInPage);
