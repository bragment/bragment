import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useHandleServerApiError, useUserStore } from '../../components/hooks';
import { useMyProfileQuery } from '../../libs/react-query';
import { setTheRoutePathBeforeSignIn } from '../AuthPage/helpers';
import { ERoutePath } from '../types';

interface IAuthGuardProps {
  children: JSX.Element;
}

function AuthGuard(props: IAuthGuardProps) {
  const { children } = props;
  const { setMe, signedIn } = useUserStore();
  const { data, error } = useMyProfileQuery(signedIn);
  const location = useLocation();
  const handleServerApiError = useHandleServerApiError();

  useEffect(() => {
    if (error) {
      handleServerApiError(error);
    }
  }, [error, handleServerApiError]);

  useEffect(() => {
    if (data) {
      setMe(data.user);
    }
  }, [data, setMe]);

  if (!signedIn) {
    setTheRoutePathBeforeSignIn(
      [location.pathname, location.search, location.hash].join('')
    );
    return <Navigate to={ERoutePath.AuthSignIn} replace />;
  }

  return children;
}

export default observer(AuthGuard);
