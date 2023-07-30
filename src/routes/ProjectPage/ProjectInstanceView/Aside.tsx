import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import { HiPlus } from 'react-icons/hi2';
import { NavLink, useParams } from 'react-router-dom';
import { IModelViewGroup } from '@/components/DataViewSwitcher/types';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '@/components/hooks';
import { IProject, IWorkspace } from '@/libs/client/types';
import { ScrollArea } from '@/libs/radix-ui/scroll-area';
import { useProjectQuery } from '@/libs/react-query';
import { getSmallImageUrl } from '@/libs/unsplash';
import {
  getProjectDataViewPath,
  getWorkspaceProjectListPath,
} from '@/routes/helpers';

function Aside(props: { modelViewGroups: IModelViewGroup[] }) {
  const { modelViewGroups } = props;
  const { projectId = '' } = useParams();
  const mainRef = useRef<HTMLElement>(null);
  const f = useFormatMessage();
  const { me } = useUserStore();
  const { setCreateDataModelDialogVisible } = useDialogStore();
  const { data: project } = useProjectQuery(projectId, !!me);
  const title = project?.title;
  const workspaceTitle = (project?.workspace as IWorkspace)?.title;
  const workspaceId = (project?.workspace as IWorkspace)?._id;
  const { image, color } =
    project?.background ?? ({} as IProject['background']);
  const [imageVisible, setImageVisible] = useState(!!image);
  const handleImageError = () => {
    setImageVisible(false);
  };
  const showCreateDataModelDialog = () => setCreateDataModelDialogVisible(true);

  return (
    <aside className={clsx('bg-base-200', 'h-full w-80')}>
      <ScrollArea
        className="w-full h-full"
        viewportClassName="[&[data-top-scrollable]>div>header]:border-b"
        verticalBarClassName="z-30"
        vertical>
        <header
          className={clsx(
            'bg-base-200 bg-opacity-70 backdrop-blur border-base-content/10',
            'sticky top-0 z-10',
            'h-36 p-3',
            'transition-all duration-100'
          )}>
          <div className="rounded-box overflow-hidden">
            <div
              className={clsx(
                'card image-full bg-base-100',
                'w-full h-auto',
                'z-10 rounded-box before:!rounded-none'
              )}>
              <figure
                style={{ backgroundColor: !imageVisible ? color : undefined }}>
                {imageVisible && (
                  <img
                    className={clsx('h-full w-full absolute object-center')}
                    src={image ? getSmallImageUrl(image) : undefined}
                    alt=""
                    loading="eager"
                    decoding="auto"
                    onError={handleImageError}
                  />
                )}
              </figure>
              <div className={clsx('card-body', 'h-full px-6 py-4')}>
                <div className="flex flex-col items-start">
                  <div className="capitalize text-neutral-content text-2xl font-semibold">
                    {title}
                  </div>
                  {workspaceTitle && (
                    <NavLink
                      className="link capitalize text-neutral-content/60 text-sm font-normal"
                      to={getWorkspaceProjectListPath(workspaceId)}>
                      {workspaceTitle}
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              'text-base-content/70',
              'w-full h-12 px-4',
              'absolute left-0 bottom-0',
              'flex items-center'
            )}>
            <div className="flex-auto text-sm font-semibold pl-2">
              {f('project.model')}
            </div>
            <div className="flex-none">
              <button
                className="btn btn-ghost btn-square btn-sm text-lg"
                onClick={showCreateDataModelDialog}>
                <HiPlus />
              </button>
            </div>
          </div>
        </header>
        <main ref={mainRef} className="w-80 px-5">
          <ul className="menu bg-base-200 rounded-box">
            {modelViewGroups.map((group) => (
              <li className="w-full" key={group.model._id}>
                {group.views && group.views.length > 0 ? (
                  <details className="w-full" key={group.model._id} open>
                    <summary className="w-full">
                      <div className="w-54 overflow-hidden capitalize text-ellipsis whitespace-nowrap">
                        {group.model.title}
                      </div>
                    </summary>
                    <ul>
                      {group.views.map((view) => (
                        <li key={view._id}>
                          <NavLink
                            className="w-60 overflow-hidden capitalize text-ellipsis whitespace-nowrap"
                            to={getProjectDataViewPath(
                              projectId,
                              group.model._id,
                              view._id
                            )}>
                            {view.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <div className="w-full">
                    <div className="w-60 overflow-hidden capitalize text-ellipsis whitespace-nowrap">
                      {group.model.title}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </main>
      </ScrollArea>
    </aside>
  );
}

export default observer(Aside);
