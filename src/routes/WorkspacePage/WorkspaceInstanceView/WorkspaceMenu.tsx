import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import WorkspaceAvatar from '../../../components/WorkspaceAvatar';
import { IWorkspace } from '../../../libs/client/types';
import { getWorkspaceInstancePath } from '../../helpers';
import styles from './index.module.scss';

interface IWorkspaceMenuProps {
  workspaces: IWorkspace[];
}

function WorkspaceMenu(props: IWorkspaceMenuProps) {
  const { workspaces } = props;

  const getActiveClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      classNames(
        'w-full',
        isActive && 'active',
        isActive && 'pointer-events-none',
        isActive && styles.active
      ),
    []
  );

  const handleClick = useCallback(() => {
    const el = document.activeElement;
    if (el instanceof HTMLElement) {
      el.blur();
    }
  }, []);

  return (
    <ul
      className={classNames(
        'menu rounded-box',
        'w-full p-0',
        styles.workspaceMenu
      )}
      onClick={handleClick}>
      {workspaces?.map((workspace) => (
        <li className="mt-2" key={workspace._id}>
          <NavLink
            className={getActiveClassName}
            to={getWorkspaceInstancePath(workspace._id)}>
            <div className="w-full flex items-center">
              <WorkspaceAvatar
                title={workspace.title}
                className="flex-none w-6 mr-2 text-base"
              />
              <span className="flex-auto overflow-hidden text-ellipsis whitespace-nowrap font-bold text-lg">
                {workspace.title}
              </span>
              <span
                className={classNames(
                  'flex-none ml-4 text-xl text-accent',
                  styles.switchTo
                )}>
                <HiOutlineSwitchHorizontal />
              </span>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default observer(WorkspaceMenu);
