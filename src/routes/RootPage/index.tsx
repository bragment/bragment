import { memo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ERoutePath } from '../types';

function RootPage() {
  const { pathname } = useLocation();

  // NOTE: default to workspace page
  if (pathname === ERoutePath.Root) {
    return <Navigate to={ERoutePath.Workspace} replace />;
  }

  return <Outlet />;
}

export default memo(RootPage);
