import classNames from 'classnames';
import { observer } from 'mobx-react';
import { HiMenu, HiPlus, HiSearch } from 'react-icons/hi';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useDialogStore, useFormatMessage } from '../../../components/hooks';
import ScrollContainer from '../../../components/ScrollContainer';
import {
  getWorkspaceInstancePath,
  getWorkspaceProjectListPath,
} from '../../helpers';
import Aside from './Aside';

const TOGGLE_ID = 'WORKSPACE_INSTANCE_VIEW_TOGGLE';

function WorkspaceInstanceView() {
  const f = useFormatMessage();
  const { pathname } = useLocation();
  const { workspaceId = '' } = useParams();
  const { setCreateProjectDialogVisible } = useDialogStore();

  if (pathname === getWorkspaceInstancePath(workspaceId)) {
    return <Navigate to={getWorkspaceProjectListPath(workspaceId)} replace />;
  }

  return (
    <div className={classNames('drawer drawer-mobile', 'w-full h-full')}>
      <input id={TOGGLE_ID} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100 text-base-content">
        <ScrollContainer
          className="[&.top-scrollable_header]:shadow-sm"
          autoHide>
          <header
            className={classNames(
              'bg-base-100 text-base-content',
              'sticky top-0 z-30',
              'w-full h-16 flex justify-center',
              'bg-opacity-70 backdrop-blur transition-all duration-100'
            )}>
            <div className="navbar p-3">
              <div className="flex-none mr-3 lg:hidden">
                <label
                  htmlFor={TOGGLE_ID}
                  className={classNames(
                    'btn btn-ghost btn-square',
                    'w-10 h-10 min-h-fit'
                  )}>
                  <HiMenu className="text-xl" />
                </label>
              </div>
              <div className="flex-1">
                <div className="relative flex items-center w-full max-w-xs [&:focus-within>:last-child]:invisible">
                  <input
                    className={classNames(
                      'input input-bordered',
                      'w-full h-10 pl-10'
                    )}
                    placeholder={f('common.search')}
                  />
                  <HiSearch className="absolute left-3 text-xl text-base-content/60 pointer-events-none" />
                  <div className="absolute right-3 flex items-center text-base-content/60 pointer-events-none">
                    <div className="w-6 h-8 bg-gradient-to-l from-base-100 to-transparent" />
                    <div className="w-auto bg-base-100">
                      <kbd className="kbd kbd-sm">⌘</kbd> +{' '}
                      <kbd className="kbd kbd-sm">K</kbd>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-none ml-3">
                <button
                  className={classNames(
                    'btn btn-ghost btn-square',
                    'w-10 h-10 min-h-fit'
                  )}
                  onClick={() => setCreateProjectDialogVisible(true)}>
                  <HiPlus className="text-xl" />
                </button>
              </div>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
          <div className="from-base-100 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent" />
        </ScrollContainer>
      </div>
      <div className="drawer-side">
        <label htmlFor={TOGGLE_ID} className="drawer-overlay" />
        <Aside />
      </div>
    </div>
  );
}

export default observer(WorkspaceInstanceView);
