import { observer } from 'mobx-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../hooks';
import { ERoutePath } from '../types';

interface IAuthGuardProps {
  children: JSX.Element;
}

function AuthGuard(props: IAuthGuardProps) {
  const { children } = props;
  const { signedIn } = useUserStore();
  const location = useLocation();

  return signedIn ? (
    children
  ) : (
    <Navigate to={ERoutePath.SignIn} state={{ from: location }} replace />
  );
}

export default observer(AuthGuard);
