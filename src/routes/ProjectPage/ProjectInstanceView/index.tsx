import classNames from 'classnames';
import { memo, useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { setProjectFields } from '../../../libs/fields';
import {
  useProjectDataRecordListQuery,
  useProjectQuery,
} from '../../../libs/react-query';
import {
  getProjectDataModelEmptyPath,
  getProjectDataModelPath,
  getProjectInstancePath,
} from '../../helpers';
import Aside from './Aside';
import { TOGGLE_ID } from './types';

function ProjectInstanceView() {
  const { projectId = '' } = useParams();
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLInputElement>(null);
  const { data: project } = useProjectQuery(projectId, true, true);
  const models = project?.models;
  // NOTE: prefetch for data view
  useProjectDataRecordListQuery(projectId, true, true);

  useEffect(() => {
    setProjectFields(project?.fields || []);
  }, [project]);

  useEffect(() => {
    if (toggleRef.current?.value) {
      toggleRef.current.checked = false;
    }
  }, [pathname]);

  if (
    (pathname === getProjectDataModelEmptyPath(projectId) ||
      pathname === getProjectInstancePath(projectId)) &&
    models?.length
  ) {
    const firstModel = models[0];
    return (
      <Navigate
        to={getProjectDataModelPath(projectId, firstModel._id)}
        replace
      />
    );
  }

  if (
    pathname !== getProjectDataModelEmptyPath(projectId) &&
    models?.length === 0
  ) {
    return <Navigate to={getProjectDataModelEmptyPath(projectId)} replace />;
  }

  return (
    <div className={classNames('drawer drawer-mobile', 'w-full h-full')}>
      <input
        ref={toggleRef}
        id={TOGGLE_ID}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content bg-base-100 text-base-content">
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor={TOGGLE_ID} className="drawer-overlay" />
        <Aside />
      </div>
    </div>
  );
}

export default memo(ProjectInstanceView);
