import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiMenu, HiPlus } from 'react-icons/hi';
import { NavLink, useMatch, useParams } from 'react-router-dom';
import AnimatePing from '../../../components/AnimatePing';
import CreateDataViewDropdown from '../../../components/CreateDataViewDropdown';
import { useFormatMessage, useUserStore } from '../../../components/hooks';
import ScrollContainer from '../../../components/ScrollContainer';
import { IProject, IProjectDataView } from '../../../libs/client/types';
import { useProjectQuery } from '../../../libs/react-query';
import { getViewRenderer } from '../../../libs/views';
import { getProjectDataModelPath, getProjectDataViewPath } from '../../helpers';
import { useNavigateToPage } from '../../hooks';
import { TOGGLE_ID } from '../ProjectInstanceView/types';

function WorkspaceInstanceView() {
  const f = useFormatMessage();
  const navigateTo = useNavigateToPage();
  const scrollBarRef = useRef<Scrollbars>(null);
  const { me } = useUserStore();
  const { projectId = '', modelId = '', viewId = '' } = useParams();
  const isProjectModelPath = useMatch(
    getProjectDataModelPath(projectId, modelId)
  );
  const { data: project } = useProjectQuery(projectId, !!(me && projectId));
  const views = project?.views.filter((el) => el.model === modelId);
  const noViews = views?.length === 0;

  const renderViewTabs = (_views?: IProjectDataView[]) => {
    const getActiveClassName = ({ isActive }: { isActive: boolean }) =>
      classNames(
        'h-10 pl-3 pr-4 flex items-center',
        'font-bold text-base-content/50 hover:text-base-content',
        'group relative view-tab',
        isActive && 'active pointer-events-none'
      );
    return _views?.map((view) => {
      const Icon = getViewRenderer(view.type)?.Icon;
      return (
        <NavLink
          key={view._id}
          to={getProjectDataViewPath(projectId, modelId, view._id)}
          className={getActiveClassName}>
          {Icon && (
            <Icon
              className={classNames(
                'text-xl mr-2',
                'group-[&.active]:text-sky-500'
              )}
            />
          )}
          <span
            className={classNames(
              'capitalize text-ellipsis overflow-hidden whitespace-nowrap',
              'from-sky-500 to-fuchsia-500',
              'group-[&.active]:!text-transparent group-[&.active]:bg-clip-text group-[&.active]:bg-gradient-to-r'
            )}>
            {view.title}
          </span>
          <div
            className={classNames(
              'absolute left-1 right-1 -bottom-2 border-b-4 border-transparent pointer-events-none',
              'group-[&.view-tab:hover]:border-base-content/50 group-[&.active]:!border-secondary'
            )}
          />
        </NavLink>
      );
    });
  };

  const handleCreateViewFinish = useCallback(
    (data: IProject) => {
      const view = data.views[0];
      const scrollBar = scrollBarRef.current;
      if (scrollBar) {
        setTimeout(() => scrollBar.scrollToRight());
      }
      if (view) {
        navigateTo(getProjectDataViewPath(projectId, modelId, view._id));
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
      <ScrollContainer
        ref={scrollBarRef}
        className="group [&>div:first-child]:flex [&>div:first-child]:flex-nowrap [&>div:first-child]:items-center"
        forceHide>
        <div
          className={classNames(
            'flex-none sticky left-0 z-10',
            'flex items-center',
            'group-[.left-scrollable]:shadow-sm'
          )}>
          <div className="h-16 px-3 flex items-center bg-base-100 bg-opacity-70 backdrop-blur">
            <label
              htmlFor={TOGGLE_ID}
              className={classNames(
                'btn btn-ghost btn-square',
                'w-10 h-10 min-h-fit lg:hidden'
              )}>
              <HiMenu className="text-xl" />
            </label>
          </div>
        </div>
        {renderViewTabs(views)}
        <div
          className={classNames(
            'flex-none sticky right-0 z-10',
            'flex items-center',
            'group-[.right-scrollable]:shadow-sm'
          )}>
          <div
            className={classNames(
              'h-16 flex items-center bg-base-100 bg-opacity-70 backdrop-blur',
              !noViews && 'px-3'
            )}>
            <AnimatePing ping={noViews}>
              <CreateDataViewDropdown
                projectId={projectId}
                modelId={modelId}
                existingViews={views}
                onFinish={handleCreateViewFinish}>
                {noViews ? (
                  <button className={classNames('btn', 'h-10 min-h-fit')}>
                    <HiPlus className="text-xl mr-3" />
                    {f('project.addView')}
                  </button>
                ) : (
                  <button
                    className={classNames(
                      'btn btn-ghost btn-square',
                      'w-10 h-10 min-h-fit'
                    )}>
                    <HiPlus className="text-xl" />
                  </button>
                )}
              </CreateDataViewDropdown>
            </AnimatePing>
          </div>
        </div>
      </ScrollContainer>
    </header>
  );
}

export default observer(WorkspaceInstanceView);
