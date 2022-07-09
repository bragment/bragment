import { Layout } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import { IWorkspace } from '../../libs/client/types';
import { useCurrentWorkspaceListQuery } from '../../libs/react-query';
import { ERoutePath } from '../types';
import MainView from './MainView';
import SideView from './SideView';
import styles from './index.module.scss';

function CurrentWorkspaceView() {
  const navigate = useNavigate();
  const params = useParams();
  const { current: currentUser, mainWorkspaceId } = useUserStore();
  const { data: workspaces } = useCurrentWorkspaceListQuery(!!currentUser);
  const [targetWorkspace, setTargetWorkspace] = useState<IWorkspace | null>(
    null
  );

  useEffect(() => {
    if (params.id) {
      return setTargetWorkspace(
        workspaces?.find((workspace) => workspace._id === params.id) || null
      );
    }
    if (workspaces?.length === 0) {
      return navigate(ERoutePath.WorkspaceCreate);
    }
    return setTargetWorkspace(
      workspaces?.find((workspace) => workspace._id === mainWorkspaceId) ||
        workspaces?.slice(0, 1).pop() ||
        null
    );
  }, [navigate, params, currentUser, workspaces, mainWorkspaceId]);

  if (targetWorkspace) {
    return (
      <Layout className={styles.wrapper}>
        <SideView workspace={targetWorkspace} />
        <MainView workspace={targetWorkspace} />
      </Layout>
    );
  }
  return null;
}

export default observer(CurrentWorkspaceView);
