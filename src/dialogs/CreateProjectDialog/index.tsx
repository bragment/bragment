import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import {
  useDialogStore,
  useFormatMessage,
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
import './index.scss';

const DIALOG_ID = 'CREATE_PROJECT_DIALOG';

function CreateProjectDialog() {
  const f = useFormatMessage();
  const {
    createProjectDialogVisible,
    setCreateProjectDialogVisible,
    toggleCreateProjectDialogVisible,
  } = useDialogStore();
  const { workspaceId } = useParams<'workspaceId'>();
  const { myMainWorkspaceId } = useUserStore();
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

  return (
    <div
      className={classNames(
        !createProjectDialogVisible && 'content-visibility-hidden'
      )}>
      <input
        type="checkbox"
        className="modal-toggle"
        id={DIALOG_ID}
        checked={createProjectDialogVisible}
        onChange={toggleCreateProjectDialogVisible}
      />
      <label
        htmlFor={DIALOG_ID}
        className={classNames('modal', 'cursor-pointer')}>
        <label
          className={classNames('modal-box', 'relative pb-16 overflow-visible')}
          htmlFor="">
          <div
            className={classNames(
              'w-full h-full absolute top-0 left-0 z-0 rounded-2xl overflow-hidden',
              'project-dialog-background'
            )}>
            <ProgressiveBackground {...backgroundData} />
          </div>
          <div
            className={classNames(
              'w-full h-full relative z-1',
              'project-dialog-foreground'
            )}>
            <h3
              className={classNames(
                'text-primary-content',
                'text-lg font-bold'
              )}>
              {f('workspace.createProject')}
            </h3>
            <CreateProjectForm
              defaultWorkspaceId={workspaceId || myMainWorkspaceId}
              onFinish={handleFinish}
            />
          </div>
          <label
            htmlFor={DIALOG_ID}
            className={classNames(
              'btn btn-sm btn-circle',
              'absolute right-4 top-4 z-2'
            )}>
            <HiOutlineX className="text-lg" />
          </label>
        </label>
      </label>
    </div>
  );
}

export default observer(CreateProjectDialog);
