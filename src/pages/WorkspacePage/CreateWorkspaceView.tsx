import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { useFormatMessage, useUserStore } from '../../components/hooks';
import CreateWorkspaceForm from '../../dialogs/CreateWorkspaceDialog/CreateWorkspaceForm';
import { IWorkspace } from '../../libs/client/types';
import { useUserUpdateMutation } from '../../libs/react-query';
import styles from './index.module.scss';

function CreateWorkspaceView() {
  const f = useFormatMessage();
  const { setMainWorkspaceId } = useUserStore();
  const userUpdateMutation = useUserUpdateMutation();

  const handleFinish = async (workspace: IWorkspace) => {
    const mainWorkspace = workspace._id;
    setMainWorkspaceId(mainWorkspace);
    await userUpdateMutation.mutateAsync({ mainWorkspace });
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
