import classNames from 'classnames';
import { memo } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import ScrollContainer from '../../../components/ScrollContainer';
import {
  getWorkspaceInstancePath,
  getWorkspaceProjectListPath,
} from '../../helpers';
import Aside from './Aside';
import Header from './Header';
import { TOGGLE_ID } from './types';

function WorkspaceInstanceView() {
  const { pathname } = useLocation();
  const { workspaceId = '' } = useParams();

  if (pathname === getWorkspaceInstancePath(workspaceId)) {
    return <Navigate to={getWorkspaceProjectListPath(workspaceId)} replace />;
  }

  return (
    <div className={classNames('drawer drawer-mobile', 'w-full h-full')}>
      <input id={TOGGLE_ID} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100 text-base-content">
        <ScrollContainer className="group" autoHide>
          <Header />
          <main>
            <Outlet />
          </main>
        </ScrollContainer>
      </div>
      <div className="drawer-side">
        <label htmlFor={TOGGLE_ID} className="drawer-overlay" />
        <Aside />
      </div>
    </div>
  );
}

export default memo(WorkspaceInstanceView);
