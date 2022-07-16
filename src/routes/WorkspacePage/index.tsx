import { memo } from 'react';
import { Outlet } from 'react-router-dom';

function WorkspacePage() {
  return <Outlet />;
}

export default memo(WorkspacePage);
