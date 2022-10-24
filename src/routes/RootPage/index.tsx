import { memo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import DialogContainer from '../../components/DialogContainer';
import { ERoutePath } from '../types';
import Navigator from './Navigator';

function RootPage() {
  const location = useLocation();

  // NOTE: default to workspace page
  if (location.pathname === ERoutePath.Root) {
    return <Navigate to={ERoutePath.Workspace} replace />;
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      <nav className="flex-none basis-16 order-3 md:basis-20 md:order-1">
        <Navigator />
      </nav>
      <div className="flex-auto order-2">
        <Outlet />
      </div>
      <DialogContainer />
    </div>
  );
}

export default memo(RootPage);
