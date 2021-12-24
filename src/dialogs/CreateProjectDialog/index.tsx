import { Modal } from 'antd';
import { observer } from 'mobx-react';
import { useCallback, useEffect } from 'react';
import { useDialogStore, useProjectStore } from '../../components/hooks';
import { loadStandByUnsplashPhotos } from '../../stores/project/actions';
import CreateProjectForm from './CreateProjectForm';
import styles from './index.module.scss';

function CreateProjectDialog() {
  const { createProjectDialogVisible, setCreateProjectDialogVisible } =
    useDialogStore();
  const { setSelectedStandByBgData } = useProjectStore();
  const handleClose = () => setCreateProjectDialogVisible(false);
  const handleFinish = () => handleClose();

  const fetchUnsplashPhotos = useCallback(() => {
    loadStandByUnsplashPhotos()
      .then(() => setSelectedStandByBgData({ type: 'photo', index: 0 }))
      .catch(() => setSelectedStandByBgData(null));
  }, [setSelectedStandByBgData]);

  useEffect(() => {
    fetchUnsplashPhotos();
  }, [fetchUnsplashPhotos]);

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
