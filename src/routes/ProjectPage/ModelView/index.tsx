import { memo } from 'react';
import { Outlet } from 'react-router-dom';

function ModelView() {
  return <Outlet />;
}

export default memo(ModelView);
