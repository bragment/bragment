import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useFormatMessage, useUserStore } from '../../components/hooks';
import CreateWorkspaceForm from '../../dialogs/CreateWorkspaceDialog/CreateWorkspaceForm';
import { IWorkspace } from '../../libs/client/types';
import { useUserUpdateMutation } from '../../libs/react-query';
import { ERoutePath } from '../types';
import styles from './index.module.scss';

function CreateWorkspaceView() {
  const f = useFormatMessage();
  const { updateCurrent: updateCurrentUser } = useUserStore();
  const userUpdateMutation = useUserUpdateMutation();
  const navigate = useNavigate();

  const handleFinish = async (workspace: IWorkspace) => {
    const mainWorkspace = workspace._id;
    navigate(ERoutePath.Workspace, { replace: true });
    const user = await userUpdateMutation.mutateAsync({ mainWorkspace });
    updateCurrentUser(user);
  };

  return (
    <div className={styles.createWorkspaceView}>
      <div className={styles.body}>
        <Typography.Title level={2}>
          {f('createYourWorkspace')}
        </Typography.Title>
        <CreateWorkspaceForm onFinish={handleFinish} />
      </div>
    </div>
  );
}

export default observer(CreateWorkspaceView);
