import classNames from 'classnames';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
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
  const { data: workspaces } = useMyWorkspaceListQuery(!!me);
  const [workspace, setWorkspace] = useState<IWorkspace | null>(
    workspaces?.find((el) => el._id === workspaceId) || null
  );

  const toastUnderConstruction = (e: React.SyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    toastInfo(f('common.underConstruction'));
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
              <WorkspaceAvatar title={workspace?.title} className="mr-3" />
              {workspace?.title}
            </div>
            <div className="flex-none">
              <button
                className="btn btn-square btn-ghost btn-sm"
                onClick={toastUnderConstruction}>
                <HiSelector className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <ul className={classNames('menu', 'p-4 py-2 px-5 [&>li]:m-1')}>
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
                {f('workspace.projectList')}
              </span>
            </NavLink>
          </li>
        </ul>
      </main>
    </aside>
  );
}

export default observer(Aside);
