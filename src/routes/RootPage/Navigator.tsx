import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { HiCog, HiHome, HiUserGroup } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { useUserStore } from '../../components/hooks';
import UserAvatar from '../../components/UserAvatar';
import { IWorkspace } from '../../libs/client/types';
import { useCurrentWorkspaceListQuery } from '../../libs/react-query';
import { getWorkspaceInstancePath } from '../helpers';
import { ERoutePath, ERoutePathName } from '../types';

function Navigator() {
  const { current: currentUser, mainWorkspaceId } = useUserStore();
  const { data: workspaces } = useCurrentWorkspaceListQuery(!!currentUser);
  const [mainWorkspace, setMainWorkspace] = useState<IWorkspace | null>(null);

  useEffect(() => {
    const main = currentUser
      ? workspaces?.find((workspace) => workspace._id === mainWorkspaceId)
      : undefined;
    setMainWorkspace(main || null);
  }, [currentUser, workspaces, mainWorkspaceId]);

  const workspaceLink = mainWorkspace ? (
    <NavLink
      to={getWorkspaceInstancePath(mainWorkspace._id)}
      className={({ isActive }) => (isActive ? 'active' : undefined)}>
      <HiUserGroup />
    </NavLink>
  ) : (
    <NavLink
      to={ERoutePath.WorkspaceCreate}
      className={({ isActive }) => (isActive ? 'active' : undefined)}>
      <HiUserGroup />
    </NavLink>
  );

  return (
    <div
      className={classNames(
        'bg-base-300',
        'w-full h-full flex flex-col items-center'
      )}>
      <div className="w-14 h-14 grow-0 mt-6 hidden md:block">
        <div className="logo-feature-mark" />
      </div>
      <div className="flex-auto flex items-center justify-center md:flex-col md:py-8">
        <ul
          className={classNames(
            'menu menu-horizontal md:menu-vertical',
            'p-3 text-xl space-x-4 md:space-x-0 md:space-y-4'
          )}>
          <li>
            <NavLink
              to={ERoutePathName.Home}
              className={({ isActive }) => (isActive ? 'active' : undefined)}>
              <HiHome />
            </NavLink>
          </li>
          <li>{workspaceLink}</li>
          <li>
            <NavLink
              to={ERoutePathName.Setting}
              className={({ isActive }) => (isActive ? 'active' : undefined)}>
              <HiCog />
            </NavLink>
          </li>
        </ul>
        <div className="flex-auto hidden md:block" />
        <UserAvatar
          className={classNames(
            'dropdown-end dropdown-left md:dropdown-right',
            'ml-4 md:ml-0'
          )}
          menuClassName="-translate-y-9"
        />
      </div>
    </div>
  );
}

export default observer(Navigator);
