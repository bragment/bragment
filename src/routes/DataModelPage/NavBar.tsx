import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useRef } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import { IProject } from '../../libs/client/types';
import { useProjectQuery } from '../../libs/react-query';
import { getProjectDataModelPath } from '../helpers';
import { useNavigateProjectViewPage } from '../hooks';
import CreateDataViewButton from './CreateDataViewButton';
import DataViewTabs from './DataViewTabs';
import styles from './index.module.scss';

function WorkspaceInstanceView() {
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

  const handleCreateFinish = useCallback(
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
    <header
      className={classNames(
        'navbar bg-base-200 border-base-300',
        'h-16 py-0 gap-3 z-30'
      )}>
      <div className="flex-none font-bold text-xl capitalize pl-[4.5rem]">
        {title}
      </div>
      <div
        ref={tabsWrapperRef}
        className={classNames(
          'h-16 basis-auto grow-0 shrink overflow-x-scroll whitespace-nowrap',
          styles.tabsWrapper
        )}>
        <span className="inline-block from-base-200 pointer-events-none sticky top-0 left-0 h-16 w-8 bg-gradient-to-r to-transparent z-10" />
        <DataViewTabs views={views} />
        <span className="inline-block from-base-200 pointer-events-none sticky top-0 right-0 h-16 w-8 bg-gradient-to-l to-transparent" />
      </div>
      {isOwner && (
        <div className="flex-none">
          <CreateDataViewButton
            existingView={views}
            onFinish={handleCreateFinish}
          />
        </div>
      )}
    </header>
  );
}

export default observer(WorkspaceInstanceView);
