import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useRef } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useMatch, useParams } from 'react-router-dom';
import AnimatePing from '../../components/AnimatePing';
import CreateDataViewButton from '../../components/CreateDataViewButton';
import { useFormatMessage, useUserStore } from '../../components/hooks';
import { IProject } from '../../libs/client/types';
import { useProjectQuery } from '../../libs/react-query';
import { getProjectDataModelPath } from '../helpers';
import { useNavigateProjectViewPage } from '../hooks';
import DataViewTabs from './DataViewTabs';
import styles from './index.module.scss';

function WorkspaceInstanceView() {
  const f = useFormatMessage();
  const navigate = useNavigateProjectViewPage();
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const { me } = useUserStore();
  const { projectId = '', modelId = '', viewId = '' } = useParams();
  const isProjectModelPath = useMatch(
    getProjectDataModelPath(projectId, modelId)
  );
  const { data: project } = useProjectQuery(projectId, !!(me && projectId));
  const model = project?.models.find((el) => el._id === modelId);
  const views = project?.views.filter((el) => el.model === modelId);
  const title = model ? (
    model.title
  ) : (
    <div
      className={classNames(
        'bg-base-content',
        'w-48 h-7 rounded animate-pulse'
      )}
    />
  );
  // TODO: or be workspace owner
  const isOwner = !!project?.owner.users.includes(me?._id || '');

  const handleCreateViewFinish = useCallback(
    (data: IProject) => {
      const view = data.views[0];
      const div = tabsWrapperRef.current;
      if (div) {
        setTimeout(() => (div.scrollLeft = div.scrollWidth + div.clientWidth));
      }
      if (view) {
        navigate(projectId, modelId, view._id);
      }
    },
    [navigate, projectId, modelId]
  );

  useEffect(() => {
    if (isProjectModelPath && !viewId && views?.length) {
      navigate(projectId, modelId, views[0]._id, {
        replace: true,
      });
    }
  }, [navigate, isProjectModelPath, projectId, modelId, viewId, views]);

  return (
    <header className={classNames('navbar bg-base-200', 'h-16 py-0')}>
      <div
        className={classNames(
          'border-base-200 border-r-2 z-10', // FIXED: safari sticky issue
          'flex-none h-full font-bold text-xl capitalize pr-3 pl-[4.5rem]'
        )}>
        <div className="max-w-[12rem] text-ellipsis overflow-hidden">
          {title}
        </div>
      </div>
      <div
        ref={tabsWrapperRef}
        className={classNames(
          'h-16 basis-auto grow-0 shrink overflow-x-scroll whitespace-nowrap',
          styles.tabsWrapper
        )}>
        <div className="inline-block from-base-200 pointer-events-none sticky top-0 left-0 h-16 w-8 bg-gradient-to-r to-transparent z-10" />
        {views?.length === 0 ? (
          <div
            className={classNames('inline-block', 'text-base-content-opacity')}>
            {f('project.noViews')}
          </div>
        ) : (
          <DataViewTabs views={views} />
        )}
        <div className="inline-block from-base-200 pointer-events-none sticky top-0 right-0 h-16 w-8 bg-gradient-to-l to-transparent" />
      </div>
      {isOwner && (
        <div className="flex-none h-full pl-3">
          <AnimatePing ping={views?.length === 0}>
            <CreateDataViewButton
              projectId={projectId}
              modelId={modelId}
              existingViews={views}
              className={styles.createViewButton}
              onFinish={handleCreateViewFinish}>
              <HiOutlinePlus className="text-xl mr-2" />
              {f('project.addView')}
            </CreateDataViewButton>
          </AnimatePing>
        </div>
      )}
    </header>
  );
}

export default observer(WorkspaceInstanceView);
