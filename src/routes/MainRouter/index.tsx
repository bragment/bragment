import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HashRouter, Route, Routes } from 'react-router-dom';
import GlobalToast from '../../dialogs/GlobalToast';
import AuthPage from '../AuthPage';
import GithubForm from '../AuthPage/GithubForm';
import SignInForm from '../AuthPage/SignInForm';
import HomePage from '../HomePage';
import ProjectPage from '../ProjectPage';
import DataModelView from '../ProjectPage/DataModelView';
import DataViewSuspense from '../ProjectPage/DataViewSuspense';
import ProjectEmptyView from '../ProjectPage/ProjectEmptyView';
import ProjectInstanceViewSuspense from '../ProjectPage/ProjectInstanceViewSuspense';
import RootPage from '../RootPage';
import SettingPage from '../SettingPage';
import { ERoutePath, ERoutePathName } from '../types';
import WorkspacePage from '../WorkspacePage';
import CreateWorkspaceView from '../WorkspacePage/CreateWorkspaceView';
import ProjectListView from '../WorkspacePage/ProjectListView';
import WorkspaceInstanceView from '../WorkspacePage/WorkspaceInstanceView';
import AuthGuard from './AuthGuard';

function RootRouter() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            // TODO: handle query error
            <div>
              There was an error!{' '}
              <button onClick={() => resetErrorBoundary()}>Try again</button>
              <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
            </div>
          )}
          onReset={reset}>
          <HashRouter>
            <Routes>
              <Route path={ERoutePathName.Auth} element={<AuthPage />}>
                <Route path={ERoutePathName.SignIn} element={<SignInForm />} />
                <Route path={ERoutePathName.Github} element={<GithubForm />} />
              </Route>
              <Route
                path={ERoutePath.Root}
                element={
                  <AuthGuard>
                    <RootPage />
                  </AuthGuard>
                }>
                <Route index element={<HomePage />} />
                <Route
                  path={ERoutePathName.Setting}
                  element={<SettingPage />}
                />
                <Route
                  path={ERoutePathName.Workspace}
                  element={<WorkspacePage />}>
                  <Route
                    path={ERoutePathName.Create}
                    element={<CreateWorkspaceView />}
                  />
                  <Route
                    path={ERoutePathName.WorkspaceId}
                    element={<WorkspaceInstanceView />}>
                    <Route index element={<ProjectListView />} />
                  </Route>
                </Route>
                <Route path={ERoutePathName.Project} element={<ProjectPage />}>
                  <Route
                    path={ERoutePathName.ProjectId}
                    element={<ProjectInstanceViewSuspense />}>
                    <Route index element={<ProjectEmptyView />} />
                    <Route
                      path={ERoutePathName.ModelId}
                      element={<DataModelView />}>
                      <Route
                        path={ERoutePathName.ViewId}
                        element={<DataViewSuspense />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Routes>
            <GlobalToast />
          </HashRouter>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default memo(RootRouter);
