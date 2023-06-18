import clsx from 'clsx';
import { memo, useEffect, useMemo, useRef } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import Aside from './Aside';
import Header from './Header';
import { TOGGLE_ID } from './types';
import { IModelViewGroup } from '@/components/DataViewSwitcher/types';
import { IProjectDataView } from '@/libs/client/types';
import { setProjectFields } from '@/libs/fields';
import {
  useProjectDataRecordListQuery,
  useProjectQuery,
} from '@/libs/react-query';
import {
  getProjectDataModelEmptyPath,
  getProjectDataViewPath,
  getProjectInstancePath,
} from '@/routes/helpers';

function ProjectInstanceView() {
  const { projectId = '' } = useParams();
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLInputElement>(null);
  const { data: project } = useProjectQuery(projectId, true, true);
  const models = project?.models;
  const views = project?.views;
  const modelViewGroups = useMemo<IModelViewGroup[]>(() => {
    const record = views?.reduce<Record<string, IProjectDataView[]>>(
      (prev, view) => {
        const id = view.model;
        if (!prev[id]) {
          prev[id] = [];
        }
        prev[id].push(view);
        return prev;
      },
      {}
    );
    return (
      models?.map((model) => ({
        model,
        views: record ? record[model._id] ?? [] : [],
      })) ?? []
    );
  }, [models, views]);
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
    views?.length
  ) {
    const firstView = views[0];
    return (
      <Navigate
        to={getProjectDataViewPath(projectId, firstView.model, firstView._id)}
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
    <div className={clsx('drawer lg:drawer-open', 'w-full h-full')}>
      <input
        ref={toggleRef}
        id={TOGGLE_ID}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content bg-base-100 text-base-content">
        <main className="w-full h-full flex flex-col">
          <div className="flex-none">
            <Header modelViewGroups={modelViewGroups} />
          </div>
          <div className="flex-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor={TOGGLE_ID} className="drawer-overlay" />
        <Aside modelViewGroups={modelViewGroups} />
      </div>
    </div>
  );
}

export default memo(ProjectInstanceView);
