import { Modal } from 'antd';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../components/hooks';
import { ERoutePath } from '../../components/types';
import { IWorkspace } from '../../libs/client/types';
import CreateWorkspaceForm from './CreateWorkspaceForm';

function CreateProjectDialog() {
  const f = useFormatMessage();
  const { setMainWorkspaceId } = useUserStore();
  const navigate = useNavigate();
  const { createWorkspaceDialogVisible, setCreateWorkspaceDialogVisible } =
    useDialogStore();

  const handleClose = () => {
    setCreateWorkspaceDialogVisible(false);
  };
  const handleFinish = async (workspace: IWorkspace) => {
    setCreateWorkspaceDialogVisible(false);
    setMainWorkspaceId(workspace._id);
    navigate(ERoutePath.Workspace);
  };

  return (
    <Modal
      centered
      title={f('createYourWorkspace')}
      footer={null}
      maskClosable={false}
      visible={createWorkspaceDialogVisible}
      onCancel={handleClose}>
      <CreateWorkspaceForm onFinish={handleFinish} />
    </Modal>
  );
}

export default observer(CreateProjectDialog);
