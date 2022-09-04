import classNames from 'classnames';
import { observer } from 'mobx-react';
import { HiFolder, HiMenu } from 'react-icons/hi';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useFormatMessage } from '../../../components/hooks';
import ScrollContainer from '../../../components/ScrollContainer';
import { getWorkspaceInstancePath } from '../../helpers';
import Header from './Header';

const TOGGLE_ID = 'WORKSPACE_INSTANCE_VIEW_TOGGLE';

function WorkspaceInstanceView() {
  const f = useFormatMessage();
  const { workspaceId = '' } = useParams();

  return (
    <div className={classNames('drawer drawer-mobile', 'w-full h-full')}>
      <input id={TOGGLE_ID} type="checkbox" className="drawer-toggle" />
      <label
        htmlFor={TOGGLE_ID}
        className="drawer-content bg-base-100 text-base-content">
        <ScrollContainer autoHide>
          <Header
            className={classNames(
              'bg-base-200 text-base-content',
              'sticky top-0 md:hidden'
            )}
            suffix={
              <label htmlFor={TOGGLE_ID} className="btn btn-ghost">
                <HiMenu className="text-xl" />
              </label>
            }
          />
          <main>
            <Outlet />
          </main>
          <div className="from-base-100 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent" />
        </ScrollContainer>
      </label>
      <div className="drawer-side">
        <label htmlFor={TOGGLE_ID} className="drawer-overlay" />
        <aside className={classNames('bg-base-200 text-base-content', 'w-80')}>
          <Header className="hidden md:flex" />
          <ul className={classNames('menu', 'm-4 p-2')}>
            <li>
              <NavLink
                to={getWorkspaceInstancePath(workspaceId)}
                className={({ isActive }) => (isActive ? 'active' : undefined)}>
                <HiFolder className="text-lg" />
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
