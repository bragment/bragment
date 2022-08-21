import { observer } from 'mobx-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import { setTheRoutePathBeforeSignIn } from '../AuthPage/helpers';
import { ERoutePath } from '../types';

interface IAuthGuardProps {
  children: JSX.Element;
}

function AuthGuard(props: IAuthGuardProps) {
  const { children } = props;
  const { signedIn } = useUserStore();
  const location = useLocation();

  if (!signedIn) {
    setTheRoutePathBeforeSignIn(
      [location.pathname, location.search, location.hash].join('')
    );
    return <Navigate to={ERoutePath.AuthSignIn} replace />;
  }

  return children;
}

export default observer(AuthGuard);
