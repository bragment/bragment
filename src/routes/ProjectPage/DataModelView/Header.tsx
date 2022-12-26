import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect } from 'react';
import { HiMenu, HiPlus } from 'react-icons/hi';
import { useMatch, useParams } from 'react-router-dom';
import AnimatePing from '../../../components/AnimatePing';
import CreateDataViewDropdown from '../../../components/CreateDataViewDropdown';
import { useFormatMessage, useUserStore } from '../../../components/hooks';
import { IProject } from '../../../libs/client/types';
import { useProjectQuery } from '../../../libs/react-query';
import { getProjectDataModelPath, getProjectDataViewPath } from '../../helpers';
import { useNavigateToPage } from '../../hooks';
import { TOGGLE_ID } from '../ProjectInstanceView/types';

function Header() {
  const f = useFormatMessage();
  const navigateTo = useNavigateToPage();
  const { me } = useUserStore();
  const { projectId = '', modelId = '', viewId = '' } = useParams();
  const isProjectModelPath = useMatch(
    getProjectDataModelPath(projectId, modelId)
  );
  const { data: project } = useProjectQuery(projectId, !!(me && projectId));
  const views = project?.views.filter((el) => el.model === modelId);
  const view = views?.find((el) => el._id === viewId);
  const noViews = views?.length === 0;

  const handleCreateViewFinish = useCallback(
    (data: IProject) => {
      const newView = data.views[0];
      if (newView) {
        navigateTo(getProjectDataViewPath(projectId, modelId, newView._id));
      }
    },
    [navigateTo, projectId, modelId]
  );

  useEffect(() => {
    if (isProjectModelPath && !viewId && views?.length) {
      navigateTo(getProjectDataViewPath(projectId, modelId, views[0]._id), {
        replace: true,
      });
    }
  }, [navigateTo, isProjectModelPath, projectId, modelId, viewId, views]);

  return (
    <header
      className={classNames(
        'bg-base-100 text-base-content',
        'w-full h-16',
        'shadow-sm'
      )}>
      <div className="flex items-center h-16 p-3">
        <div className="flex-none mr-3 lg:hidden">
          <label
            htmlFor={TOGGLE_ID}
            className={classNames(
              'btn btn-ghost btn-square',
              'w-10 h-10 min-h-fit'
            )}>
            <HiMenu className="text-xl" />
          </label>
        </div>
        {view && (
          <div
            className={classNames(
              'flex-auto',
              'capitalize font-bold text-lg lg:pl-3',
              'overflow-hidden text-ellipsis whitespace-nowrap'
            )}>
            {view.title}
          </div>
        )}
        {noViews && (
          <AnimatePing ping={noViews}>
            <CreateDataViewDropdown
              projectId={projectId}
              modelId={modelId}
              existingViews={views}
              onFinish={handleCreateViewFinish}>
              <button className={classNames('btn', 'h-10 min-h-fit')}>
                <HiPlus className="text-xl mr-3" />
                {f('project.addView')}
              </button>
            </CreateDataViewDropdown>
          </AnimatePing>
        )}
      </div>
    </header>
  );
}

export default observer(Header);
