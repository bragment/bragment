import { Modal } from 'antd';
import { observer } from 'mobx-react';
import { useDialogStore } from '../../components/hooks';
import CreateProjectForm from './CreateProjectForm';
import styles from './index.module.scss';

function CreateProjectDialog() {
  const { createProjectDialogVisible, setCreateProjectDialogVisible } =
    useDialogStore();
  const handleClose = () => setCreateProjectDialogVisible(false);
  const handleFinish = () => handleClose();

  return (
    <Modal
      className={styles.wrapper}
      centered
      footer={null}
      maskClosable={false}
      visible={createProjectDialogVisible}
      onCancel={handleClose}>
      <CreateProjectForm onFinish={handleFinish} />
    </Modal>
  );
}

export default observer(CreateProjectDialog);
