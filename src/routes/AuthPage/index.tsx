import classNames from 'classnames';
import { observer } from 'mobx-react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import ScrollContainer from '../../components/ScrollContainer';
import { ERoutePath } from '../types';
import { getTheRoutePathBeforeSignIn } from './helpers';

function AuthPage() {
  const { signedIn } = useUserStore();

  if (signedIn) {
    return (
      <Navigate
        to={getTheRoutePathBeforeSignIn(true) || ERoutePath.Root}
        replace
      />
    );
  }
  return (
    <ScrollContainer autoHide>
      <div
        className={classNames(
          'bg-base-200 text-base-content',
          'h-full min-h-[36rem] flex items-center justify-center'
        )}>
        <div className={classNames('card bg-base-100', 'w-96 mx-3 shadow-xl')}>
          <div className="h-36 px-12 py-12 pb-0">
            <div className={classNames('logo-text-mark', 'w-full h-full')} />
          </div>
          <div className={classNames('card-body', 'px-8 pb-16 pt-0')}>
            <Outlet />
          </div>
        </div>
      </div>
    </ScrollContainer>
  );
}

export default observer(AuthPage);
