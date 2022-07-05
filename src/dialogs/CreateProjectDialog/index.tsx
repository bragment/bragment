import { Modal } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  useDialogStore,
  useProjectStore,
  useUserStore,
} from '../../components/hooks';
import ProgressiveBackground, {
  IProgressiveBackgroundProps,
} from '../../components/ProgressiveBackground';
import {
  getMainColor,
  getMainImageUrl,
  getSmallImageUrl,
  getThumbImageUrl,
} from '../../libs/unsplash';
import {
  loadStandByUnsplashPhotos,
  resetSelectedUnsplashPhoto,
} from '../../stores/project/actions';
import CreateProjectForm from './CreateProjectForm';
import styles from './index.module.scss';

function CreateProjectDialog() {
  const { createProjectDialogVisible, setCreateProjectDialogVisible } =
    useDialogStore();
  const { targetWorkspaceId, mainWorkspaceId } = useUserStore();
  const {
    selectedBuiltinColor,
    selectedUnsplashPhoto,
    setSelectedBuiltinColor,
    setSelectedUnsplashPhoto,
  } = useProjectStore();
  const hasFetchedRef = useRef(false);
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
    if (createProjectDialogVisible && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchUnsplashPhotos();
    }
  }, [createProjectDialogVisible, fetchUnsplashPhotos]);

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
          defaultWorkspaceId={targetWorkspaceId || mainWorkspaceId}
          onFinish={handleFinish}
        />
      </div>
    </Modal>
  );
}

export default observer(CreateProjectDialog);
