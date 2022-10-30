import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { HiOutlineFolder, HiOutlineUsers, HiSelector } from 'react-icons/hi';
import { NavLink, useParams } from 'react-router-dom';
import {
  useDialogStore,
  useFormatMessage,
  useUserStore,
} from '../../../components/hooks';
import WorkspaceAvatar from '../../../components/WorkspaceAvatar';
import { IWorkspace } from '../../../libs/client/types';
import { useMyWorkspaceListQuery } from '../../../libs/react-query';
import {
  getWorkspaceMemberListPath,
  getWorkspaceProjectListPath,
} from '../../helpers';

function Aside() {
  const f = useFormatMessage();
  const { workspaceId = '' } = useParams();
  const { toastInfo } = useDialogStore();
  const { me } = useUserStore();
  const { data: workspaces, isLoading } = useMyWorkspaceListQuery(!!me);
  const [workspace, setWorkspace] = useState<IWorkspace | null>(null);
  const title = isLoading ? (
    <>
      <div
        className={classNames(
          'bg-base-content/60',
          'w-8 h-8 mr-3 rounded-md animate-pulse'
        )}
      />
      <div
        className={classNames(
          'bg-base-content/60',
          'w-40 h-6 rounded animate-pulse'
        )}
      />
    </>
  ) : (
    <>
      <WorkspaceAvatar title={workspace?.title} className="mr-3" />
      {workspace?.title}
    </>
  );

  const toastUnderConstruction = () => {
    toastInfo(f('common.underConstruction'));
  };

  const showDropdownMenu = () => {
    // TODO: show workspace menu
    toastUnderConstruction();
  };

  const getActiveClassName = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? 'bg-base-content/10 pointer-events-none'
      : '[&>span]:!text-base-content [&>span]:!bg-transparent';

  useEffect(() => {
    setWorkspace(workspaces?.find((el) => el._id === workspaceId) || null);
  }, [workspaceId, workspaces]);

  return (
    <aside className={classNames('bg-base-200 text-base-content', 'w-80')}>
      <header className="p-3">
        <div className={classNames('bg-base-100', 'rounded-lg px-4')}>
          <div className="h-16 flex items-center">
            <div className="flex-1 flex items-center text-xl font-bold">
              {title}
            </div>
            <div className="flex-none">
              <button
                className="btn btn-square btn-ghost btn-sm"
                onClick={showDropdownMenu}>
                <HiSelector className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <ul
          className={classNames(
            'menu',
            'p-4 py-2 px-5 [&>li]:my-1 [&>li]:w-full [&>li>a]:w-full'
          )}>
          <li>
            <NavLink
              to={getWorkspaceProjectListPath(workspaceId)}
              className={getActiveClassName}>
              <HiOutlineFolder className="text-xl text-purple-600" />
              <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-violet-500 to-rose-500">
                {f('workspace.projectList')}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={getWorkspaceMemberListPath(workspaceId)}
              className={getActiveClassName}>
              <HiOutlineUsers className="text-xl text-green-600" />
              <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">
                {f('workspace.memberList')}
              </span>
            </NavLink>
          </li>
        </ul>
      </main>
    </aside>
  );
}

export default observer(Aside);
