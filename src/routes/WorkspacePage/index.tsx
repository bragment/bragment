import { memo } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import { useMyWorkspaceListQuery } from '../../libs/react-query';
import { getWorkspaceInstancePath } from '../helpers';
import { ERoutePath } from '../types';

function WorkspacePage() {
  const { workspaceId = '' } = useParams();
  const { me } = useUserStore();
  const { data: workspaces } = useMyWorkspaceListQuery(!!me);

  if (workspaces?.length === 0) {
    return <Navigate to={ERoutePath.WorkspaceCreate} replace />;
  }
  if (workspaces?.length && !workspaceId) {
    const workspace = workspaces[0];
    return <Navigate to={getWorkspaceInstancePath(workspace._id)} replace />;
  }

  return <Outlet />;
}

export default memo(WorkspacePage);
