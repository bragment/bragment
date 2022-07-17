import classNames from 'classnames';
import { observer } from 'mobx-react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiMenu, HiViewGrid } from 'react-icons/hi';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useFormatMessage } from '../../components/hooks';
import { getWorkspaceInstancePath } from '../helpers';
import NavBar from './NavBar';

const TOGGLE_ID = 'WORKSPACE_INSTANCE_VIEW_TOGGLE';

function WorkspaceInstanceView() {
  const f = useFormatMessage();
  const { workspaceId = '' } = useParams();

  return (
    <div className={classNames('drawer drawer-mobile', 'w-full h-full')}>
      <input id={TOGGLE_ID} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100 text-base-content">
        <Scrollbars autoHide>
          <NavBar
            className={classNames(
              'bg-base-200 text-base-content',
              'sticky top-0 md:hidden'
            )}
            prefix={
              <label htmlFor={TOGGLE_ID} className="btn btn-ghost">
                <HiMenu className="text-xl" />
              </label>
            }
          />
          <section className="">
            <Outlet />
          </section>
        </Scrollbars>
      </div>
      <div className={classNames('drawer-side')}>
        <label htmlFor={TOGGLE_ID} className="drawer-overlay" />
        <aside className={classNames('bg-base-200 text-base-content', 'w-80')}>
          <NavBar className="hidden md:flex" />
          <ul className={classNames('menu', 'm-4  p-2')}>
            <li>
              <NavLink
                to={getWorkspaceInstancePath(workspaceId)}
                className={({ isActive }) => (isActive ? 'active' : undefined)}>
                <HiViewGrid className="text-lg" />
                {f('workspace.projectList')}
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default observer(WorkspaceInstanceView);
