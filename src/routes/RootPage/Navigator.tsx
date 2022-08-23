import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';
import { HiCog, HiHome, HiUserGroup } from 'react-icons/hi';
import { NavLink, useParams } from 'react-router-dom';
import { useFormatMessage, useUserStore } from '../../components/hooks';
import UserAvatar from '../../components/UserAvatar';
import WorkspaceAvatar from '../../components/WorkspaceAvatar';
import { IWorkspace } from '../../libs/client/types';
import {
  useMyWorkspaceListQuery,
  useProjectQuery,
} from '../../libs/react-query';
import { getWorkspaceInstancePath } from '../helpers';
import { ERoutePath, ERoutePathName } from '../types';

function Navigator() {
  const f = useFormatMessage();
  const { me, myMainWorkspaceId } = useUserStore();
  const { data: workspaces } = useMyWorkspaceListQuery(!!me);
  const [mainWorkspace, setMainWorkspace] = useState<IWorkspace | null>(null);
  const { projectId = '' } = useParams();
  const { data: project } = useProjectQuery(projectId, !!(me && projectId));

  const getActiveClassName = useCallback(
    ({ isActive }: { isActive: boolean }) => classNames(isActive && 'active'),
    []
  );

  const getWorkspaceActiveClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      classNames(
        'px-3.5 py-2.5',
        (isActive ||
          (mainWorkspace?._id &&
            mainWorkspace._id ===
              ((project?.workspace as IWorkspace)?._id ||
                project?.workspace))) &&
          'active'
      ),
    [project, mainWorkspace]
  );

  const workspaceLink = mainWorkspace ? (
    <NavLink
      to={getWorkspaceInstancePath(mainWorkspace._id)}
      className={getWorkspaceActiveClassName}>
      <WorkspaceAvatar title={mainWorkspace.title} className="w-7 text-lg" />
    </NavLink>
  ) : (
    <NavLink to={ERoutePath.WorkspaceCreate} className={getActiveClassName}>
      <HiUserGroup className="text-2xl" />
    </NavLink>
  );

  useEffect(() => {
    const main = me
      ? workspaces?.find((workspace) => workspace._id === myMainWorkspaceId)
      : undefined;
    setMainWorkspace(main || null);
  }, [me, workspaces, myMainWorkspaceId]);

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
            'p-3 space-x-4 md:space-x-0 md:space-y-4'
          )}>
          <li>
            <NavLink
              aria-label={f('common.home')}
              to={ERoutePathName.Home}
              className={getActiveClassName}>
              <HiHome className="text-2xl" />
            </NavLink>
          </li>
          <li>{workspaceLink}</li>
          <li>
            <NavLink
              aria-label={f('common.setting')}
              to={ERoutePathName.Setting}
              className={getActiveClassName}>
              <HiCog className="text-2xl" />
            </NavLink>
          </li>
        </ul>
        <div className="flex-auto hidden md:block" />
        <UserAvatar
          className={classNames(
            'dropdown-end dropdown-left md:dropdown-right',
            'flex ml-4 md:ml-0'
          )}
          menuClassName="-translate-y-9"
        />
      </div>
    </div>
  );
}

export default observer(Navigator);
