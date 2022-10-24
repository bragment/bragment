import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { HiCog, HiHome } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { useFormatMessage } from '../../components/hooks';
import UserAvatar from '../../components/UserAvatar';
import { ERoutePathName } from '../types';

function Navigator() {
  const f = useFormatMessage();

  const getActiveClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      classNames(isActive && 'active pointer-events-none'),
    []
  );

  return (
    <div
      className={classNames(
        'bg-base-300',
        'w-full h-full flex flex-col items-center'
      )}>
      <div className="w-14 h-14 grow-0 mt-10 hidden md:block">
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
              to={ERoutePathName.Workspace}
              className={getActiveClassName}>
              <HiHome className="text-2xl" />
            </NavLink>
          </li>
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
