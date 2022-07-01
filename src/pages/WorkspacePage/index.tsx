import { Layout } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useUserStore } from '../../components/hooks';
import { IWorkspace } from '../../libs/client/types';
import { useCurrentWorkspaceListQuery } from '../../libs/react-query';
import CreateWorkspaceView from './CreateWorkspaceView';
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
    const target =
      workspaces?.find((workspace) => workspace._id === targetWorkspaceId) ||
      workspaces?.find((workspace) => workspace._id === mainWorkspaceId) ||
      workspaces?.slice(0, 1).pop();
    setTargetWorkspace(target || null);
  }, [workspaces, mainWorkspaceId, targetWorkspaceId]);

  return (
    <Scrollbars autoHide>
      {shouldCreateWorkspace ? (
        <CreateWorkspaceView />
      ) : (
        targetWorkspace && (
          <Layout>
            <SideView workspace={targetWorkspace} />
          </Layout>
        )
      )}
    </Scrollbars>
  );
}

export default observer(WorkspacePage);
