import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Dialog from '../../components/Dialog';
import {
  useDialogStore,
  useFormatMessage,
  useProjectStore,
  useUserStore,
} from '../../components/hooks';
import ProgressiveBackground, {
  IProgressiveBackgroundProps,
} from '../../components/ProgressiveImage/Background';
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

const DIALOG_ID = 'CREATE_PROJECT_DIALOG';

function CreateProjectDialog() {
  const f = useFormatMessage();
  const { createProjectDialogVisible, setCreateProjectDialogVisible } =
    useDialogStore();
  const { workspaceId } = useParams<'workspaceId'>();
  const { myMainWorkspaceId } = useUserStore();
  const {
    selectedBuiltinColor,
    selectedUnsplashPhoto,
    setSelectedBuiltinColor,
    setSelectedUnsplashPhoto,
  } = useProjectStore();
  const hasFetchedRef = useRef(false);

  const fetchUnsplashPhotos = useCallback(
    () =>
      loadStandByUnsplashPhotos()
        .then(() => resetSelectedUnsplashPhoto())
        .catch(() => setSelectedUnsplashPhoto(null)),
    [setSelectedUnsplashPhoto]
  );

  const handleCancel = useCallback(() => {
    setCreateProjectDialogVisible(false);
  }, [setCreateProjectDialogVisible]);

  const handleFinish = useCallback(async () => {
    setCreateProjectDialogVisible(false);
    setSelectedBuiltinColor(null);
    await fetchUnsplashPhotos();
  }, [
    fetchUnsplashPhotos,
    setCreateProjectDialogVisible,
    setSelectedBuiltinColor,
  ]);

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

  return (
    <Dialog
      id={DIALOG_ID}
      className="pb-16 overflow-visible"
      visible={createProjectDialogVisible}
      onClose={handleCancel}>
      <div
        className={classNames(
          'w-full h-full absolute top-0 left-0 z-0 rounded-2xl overflow-hidden',
          styles.background
        )}>
        <ProgressiveBackground {...backgroundData} />
      </div>
      <div
        className={classNames(
          'w-full h-full relative',
          'project-dialog-foreground'
        )}>
        <h3 className={classNames('text-primary-content', 'text-lg font-bold')}>
          {f('workspace.createProject')}
        </h3>
        <CreateProjectForm
          defaultWorkspaceId={workspaceId || myMainWorkspaceId}
          onFinish={handleFinish}
        />
      </div>
    </Dialog>
  );
}

export default observer(CreateProjectDialog);
