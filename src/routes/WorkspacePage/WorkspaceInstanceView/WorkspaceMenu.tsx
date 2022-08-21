import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import WorkspaceAvatar from '../../../components/WorkspaceAvatar';
import { IWorkspace } from '../../../libs/client/types';
import { getWorkspaceInstancePath } from '../../helpers';

interface IWorkspaceMenuProps {
  workspaces: IWorkspace[];
}

function WorkspaceMenu(props: IWorkspaceMenuProps) {
  const { workspaces } = props;

  const getListItemClassName = useCallback(() => 'pl-2', []);

  return (
    <ul className={classNames('menu rounded-box', 'w-full p-0')}>
      {workspaces?.map((workspace) => (
        <li className="mt-2" key={workspace._id}>
          <NavLink
            to={getWorkspaceInstancePath(workspace._id)}
            className={getListItemClassName}>
            <div className="w-full flex items-center">
              <span className="flex-none mr-2 text-xl text-accent">
                <HiSwitchHorizontal />
              </span>
              <WorkspaceAvatar
                title={workspace.title}
                className="flex-none w-6 mr-2 text-base"
              />
              <span className="flex-auto overflow-hidden text-ellipsis whitespace-nowrap font-bold text-lg">
                {workspace.title}
              </span>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default observer(WorkspaceMenu);
