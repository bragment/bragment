import clsx from 'clsx';
import { observer } from 'mobx-react';
import { Navigate, Outlet } from 'react-router-dom';
import { ERoutePath } from '../types';
import { getTheRoutePathBeforeSignIn } from './helpers';
import { useUserStore } from '@/components/hooks';
import { ScrollArea } from '@/libs/radix-ui/scroll-area';

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
    <ScrollArea
      className="h-full"
      viewportClassName="[&>div:first-child]:h-full"
      vertical>
      <div
        className={clsx(
          'bg-base-200 text-base-content',
          'h-full min-h-[36rem] flex items-center justify-center'
        )}>
        <div className={clsx('card bg-base-100', 'w-96 mx-3 shadow-xl')}>
          <div className="h-36 px-12 py-12 pb-0">
            <div className={clsx('logo-text-mark', 'w-full h-full')} />
          </div>
          <div className={clsx('card-body', 'px-8 pb-16 pt-0')}>
            <Outlet />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default observer(AuthPage);
