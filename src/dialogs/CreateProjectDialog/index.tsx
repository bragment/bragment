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
import {
  useDialogStore,
  useProjectStore,
  useUserStore,
} from '../../components/hooks';
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
  const { currentPersonalWorkspace } = useUserStore();
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
    const bg: IProgressiveBackgroundProps = {};
    if (selectedBuiltinColor) {
      bg.color = selectedBuiltinColor;
    } else if (selectedUnsplashPhoto) {
      bg.color = getMainColor(selectedUnsplashPhoto);
      bg.image = getSmallImageUrl(getMainImageUrl(selectedUnsplashPhoto));
      bg.placeholder = getThumbImageUrl(getMainImageUrl(selectedUnsplashPhoto));
    }
    return bg;
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
        <CreateProjectForm
          defaultWorkspace={currentPersonalWorkspace}
          onFinish={handleFinish}
        />
      </div>
    </Modal>
  );
}

export default observer(CreateProjectDialog);
