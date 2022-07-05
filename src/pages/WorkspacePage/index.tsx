import { Layout } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../components/hooks';
import { IWorkspace } from '../../libs/client/types';
import { useCurrentWorkspaceListQuery } from '../../libs/react-query';
import CreateWorkspaceView from './CreateWorkspaceView';
import MainView from './MainView';
import SideView from './SideView';

function WorkspacePage() {
  const {
    current: currentUser,
    mainWorkspaceId,
    targetWorkspaceId,
  } = useUserStore();
  const { data: workspaces } = useCurrentWorkspaceListQuery(!!currentUser);
  const shouldCreateWorkspace = workspaces?.length === 0;
  const [targetWorkspace, setTargetWorkspace] = useState<IWorkspace | null>(
    null
  );

  useEffect(() => {
    const target = currentUser
      ? workspaces?.find((workspace) => workspace._id === targetWorkspaceId) ||
        workspaces?.find((workspace) => workspace._id === mainWorkspaceId) ||
        workspaces?.slice(0, 1).pop()
      : undefined;
    setTargetWorkspace(target || null);
  }, [currentUser, workspaces, mainWorkspaceId, targetWorkspaceId]);

  return shouldCreateWorkspace ? (
    <CreateWorkspaceView />
  ) : (
    targetWorkspace && (
      <Layout>
        <SideView workspace={targetWorkspace} />
        <MainView workspace={targetWorkspace} />
      </Layout>
    )
  );
}

export default observer(WorkspacePage);
