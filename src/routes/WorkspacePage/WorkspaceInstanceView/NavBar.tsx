import classNames from 'classnames';
import { observer } from 'mobx-react';
import {
  HiDotsVertical,
  HiOutlineOfficeBuilding,
  HiOutlinePlus,
} from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../../components/hooks';
import WorkspaceAvatar from '../../../components/WorkspaceAvatar';
import {
  useMyWorkspaceListQuery,
  useUpdateMyDataMutation,
  useWorkspaceQuery,
} from '../../../libs/react-query';
import WorkspaceMenu from './WorkspaceMenu';

interface INavBarProps {
  className?: string;
  prefix?: React.ReactNode;
}

function NavBar(props: INavBarProps) {
  const { className, prefix } = props;
  const f = useFormatMessage();
  const { isLoading, mutateAsync } = useUpdateMyDataMutation();
  const { me, myMainWorkspaceId, updateMe } = useUserStore();
  const { setCreateWorkspaceDialogVisible, toastError } = useDialogStore();
  const { workspaceId = '' } = useParams();
  const { data: workspaces } = useMyWorkspaceListQuery(!!me);
  const { data: workspace } = useWorkspaceQuery(
    workspaceId,
    !!(me && workspaceId)
  );
  const title = workspace ? (
    <>
      <WorkspaceAvatar title={workspace.title} className="mr-3" />
      {workspace.title}
    </>
  ) : (
    <div
      className={classNames(
        'bg-base-content',
        'w-48 h-7 rounded animate-pulse'
      )}
    />
  );

  const handleCreateWorkspace = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as Element;
    const button = target.closest('button');
    button?.blur();
    setCreateWorkspaceDialogVisible(true);
  };

  const handleSetMainWorkspace = async () => {
    if (isLoading) {
      return;
    }
    try {
      const user = await mutateAsync({
        mainWorkspace: workspaceId,
      });
      updateMe(user);
    } catch (error) {
      // TODO: handle request error
      toastError(f('common.networkError'));
    }
  };

  return (
    <header className={classNames('navbar', 'gap-3 z-30', className)}>
      <div className="flex-none">{prefix}</div>
      <div className="flex-auto font-bold text-xl capitalize">{title}</div>
      <div className="flex-none">
        <div className={classNames('dropdown dropdown-end')}>
          <label tabIndex={0} className="btn btn-square btn-ghost">
            <HiDotsVertical className="text-xl" />
          </label>
          <div
            tabIndex={0}
            className={classNames(
              'dropdown-content rounded-box border-base-300 bg-base-100',
              'w-56 mt-1 p-2 border shadow'
            )}>
            {workspaceId && workspaceId !== myMainWorkspaceId && (
              <button
                className={classNames(
                  'btn btn-ghost',
                  'w-full mb-2 justify-start',
                  isLoading && 'active loading'
                )}
                onClick={handleSetMainWorkspace}>
                <HiOutlineOfficeBuilding className="text-lg mr-2" />
                {f('workspace.setAsMainWorkspace')}
              </button>
            )}
            {workspaces && workspaces.length < 3 && (
              <button
                className={classNames('btn btn-ghost', 'w-full justify-start')}
                onClick={handleCreateWorkspace}>
                <HiOutlinePlus className="text-lg mr-2" />
                {f('workspace.createWorkspace')}
              </button>
            )}
            {workspaces && <WorkspaceMenu workspaces={workspaces} />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default observer(NavBar);
