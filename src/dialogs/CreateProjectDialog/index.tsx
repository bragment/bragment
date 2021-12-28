import { Modal } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo } from 'react';
import {
  getMainColor,
  getMainImageUrl,
  getSmallImageUrl,
  getThumbImageUrl,
} from '../../api/unsplash/helpers';
import { useDialogStore, useProjectStore } from '../../components/hooks';
import ProgressiveBackground, {
  IProgressiveBackgroundProps,
} from '../../components/ProgressiveBackground';
import {
  loadStandByUnsplashPhotos,
  resetSelectedUnsplashPhoto,
} from '../../stores/project/actions';
import CreateProjectForm from './CreateProjectForm';
import styles from './index.module.scss';

function CreateProjectDialog() {
  const { createProjectDialogVisible, setCreateProjectDialogVisible } =
    useDialogStore();
  const {
    selectedBuiltinColor,
    selectedUnsplashPhoto,
    setSelectedBuiltinColor,
    setSelectedUnsplashPhoto,
  } = useProjectStore();
  const handleClose = () => setCreateProjectDialogVisible(false);
  const handleFinish = async () => {
    handleClose();
    setSelectedBuiltinColor(null);
    await fetchUnsplashPhotos();
  };

  const fetchUnsplashPhotos = useCallback(
    () =>
      loadStandByUnsplashPhotos()
        .then(() => resetSelectedUnsplashPhoto())
        .catch(() => setSelectedUnsplashPhoto(null)),
    [setSelectedUnsplashPhoto]
  );

  useEffect(() => {
    fetchUnsplashPhotos();
  }, [fetchUnsplashPhotos]);

  const backgroundData = useMemo(() => {
    const data: IProgressiveBackgroundProps = {};
    if (selectedBuiltinColor) {
      data.color = selectedBuiltinColor;
    } else if (selectedUnsplashPhoto) {
      data.color = getMainColor(selectedUnsplashPhoto);
      data.image = getSmallImageUrl(getMainImageUrl(selectedUnsplashPhoto));
      data.placeholder = getThumbImageUrl(
        getMainImageUrl(selectedUnsplashPhoto)
      );
    }
    return data;
  }, [selectedBuiltinColor, selectedUnsplashPhoto]);
  const hasBackground = !!backgroundData.image || !!backgroundData.color;

  return (
    <Modal
      className={classNames(
        styles.wrapper,
        hasBackground && styles.withoutContentBackground
      )}
      centered
      footer={null}
      maskClosable={false}
      visible={createProjectDialogVisible}
      onCancel={handleClose}>
      <ProgressiveBackground {...backgroundData} />
      <div className={styles.foreground}>
        <CreateProjectForm onFinish={handleFinish} />
      </div>
    </Modal>
  );
}

export default observer(CreateProjectDialog);
