import clsx from 'clsx';
import { MenuIcon } from 'lucide-react';
import { memo, useEffect, useRef } from 'react';
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useFormatMessage } from '@/components/hooks';
import WorkspaceSwitcher from '@/components/WorkspaceSwitcher';
import { ScrollArea } from '@/libs/radix-ui/scroll-area';
import {
  getWorkspaceInstancePath,
  getWorkspaceMemberListPath,
  getWorkspaceProjectListPath,
} from '@/routes/helpers';

const TOGGLE_ID = 'WORKSPACE_INSTANCE_VIEW_DRAWER_sTOGGLE';

function WorkspaceInstanceView() {
  const f = useFormatMessage();
  const { pathname } = useLocation();
  const { workspaceId = '' } = useParams();
  const toggleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (toggleRef.current?.value) {
      toggleRef.current.checked = false;
    }
  }, [pathname]);

  if (pathname === getWorkspaceInstancePath(workspaceId)) {
    return <Navigate to={getWorkspaceProjectListPath(workspaceId)} replace />;
  }

  return (
    <div className={clsx('drawer', 'w-full h-full')}>
      <input
        ref={toggleRef}
        id={TOGGLE_ID}
        type="checkbox"
        className="drawer-toggle"
      />
      <div
        className={clsx(
          'drawer-content bg-base-100 text-base-content',
          'h-screen z-0'
        )}>
        <ScrollArea
          className="h-full w-full"
          viewportClassName="[&[data-top-scrollable]>div>header]:border-b"
          verticalBarClassName="z-30"
          vertical>
          <header
            className={clsx(
              'bg-base-100 text-base-content border-base-content/10',
              'sticky top-0 z-20',
              'bg-opacity-70 backdrop-blur transition-all duration-100'
            )}>
            <div className="navbar">
              <div className="flex-none lg:hidden">
                <label htmlFor={TOGGLE_ID} className="btn btn-square btn-ghost">
                  <MenuIcon className="w-6 h-6" />
                </label>
              </div>
              <div className="flex-none px-2 lg:px-4">
                <WorkspaceSwitcher />
              </div>
              <div className="flex-1 hidden lg:block">
                <ul
                  className={clsx(
                    'menu menu-horizontal',
                    'py-0',
                    '[&>li>a]:!bg-transparent [&>li>a]:text-lg [&>li>a]:font-semibold',
                    '[&>li>a]:text-base-content/50 [&>li>a:hover:not(.active)]:text-base-content/75 [&>li>a.active]:!text-base-content'
                  )}>
                  <li>
                    <NavLink to={getWorkspaceProjectListPath(workspaceId)}>
                      {f('workspace.projects')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={getWorkspaceMemberListPath(workspaceId)}>
                      {f('workspace.members')}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <main className="px-2 z-10">
            <Outlet />
          </main>
        </ScrollArea>
      </div>
      <div className="drawer-side z-10">
        <label htmlFor={TOGGLE_ID} className="drawer-overlay" />
        <ul className="menu p-4 w-80 h-full bg-base-200">
          <li>
            <NavLink to={getWorkspaceProjectListPath(workspaceId)}>
              {f('workspace.projects')}
            </NavLink>
          </li>
          <li>
            <NavLink to={getWorkspaceMemberListPath(workspaceId)}>
              {f('workspace.members')}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(WorkspaceInstanceView);
