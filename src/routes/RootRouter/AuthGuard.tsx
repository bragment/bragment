import { observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import { ERoutePath } from '../types';

interface IAuthGuardProps {
  children: JSX.Element;
}

function AuthGuard(props: IAuthGuardProps) {
  const { children } = props;
  const { signedIn } = useUserStore();

  if (!signedIn) {
    return <Navigate to={ERoutePath.AuthSignIn} replace />;
  }

  return children;
}

export default observer(AuthGuard);
