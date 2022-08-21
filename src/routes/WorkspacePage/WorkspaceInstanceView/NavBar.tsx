import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
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
  const mutation = useUpdateMyDataMutation();
  const { me, myMainWorkspaceId, updateMe } = useUserStore();
  const { setCreateWorkspaceDialogVisible, toastError } = useDialogStore();
  const { workspaceId = '' } = useParams();
  const { data: allWorkspaces } = useMyWorkspaceListQuery(!!me);
  const otherWorkspaces = allWorkspaces?.filter((el) => el._id !== workspaceId);
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

  const handleCreateWorkspace = useCallback(() => {
    setCreateWorkspaceDialogVisible(true);
  }, [setCreateWorkspaceDialogVisible]);

  const handleSetMainWorkspace = useCallback(async () => {
    if (mutation.isLoading) {
      return;
    }
    try {
      const user = await mutation.mutateAsync({
        mainWorkspace: workspaceId,
      });
      updateMe(user);
    } catch (error) {
      // TODO: handle request error
      toastError(f('common.networkError'));
    }
  }, [mutation, workspaceId, f, toastError, updateMe]);

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
                  'btn btn-secondary',
                  'w-full mb-2',
                  mutation.isLoading && 'active loading'
                )}
                onClick={handleSetMainWorkspace}>
                {f('workspace.setAsMainWorkspace')}
              </button>
            )}
            <button
              className={classNames('btn', 'w-full')}
              onClick={handleCreateWorkspace}>
              {f('workspace.createWorkspace')}
            </button>
            {!!otherWorkspaces?.length && (
              <WorkspaceMenu workspaces={otherWorkspaces} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default observer(NavBar);
