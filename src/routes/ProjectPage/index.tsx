import { memo } from 'react';
import { Outlet } from 'react-router-dom';

function ProjectPage() {
  return <Outlet />;
}

export default memo(ProjectPage);
