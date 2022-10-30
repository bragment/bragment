import { ErrorBoundary } from '@sentry/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { memo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalToast from '../../dialogs/GlobalToast';
import AuthPage from '../AuthPage';
import GithubForm from '../AuthPage/GithubForm';
import SignInForm from '../AuthPage/SignInForm';
import ErrorPage from '../ErrorPage';
import ProjectPage from '../ProjectPage';
import DataModelView from '../ProjectPage/DataModelView';
import DataModelEmptyPrompt from '../ProjectPage/DataModelView/EmptyPrompt';
import DataViewSuspense from '../ProjectPage/DataViewSuspense';
import ProjectInstanceViewSuspense from '../ProjectPage/ProjectInstanceView/Suspense';
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
          showDialog
          onReset={reset}
          fallback={(errorData) => <ErrorPage {...errorData} />}>
          <BrowserRouter>
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
                    <Route
                      path={ERoutePathName.ProjectList}
                      element={<ProjectListView />}
                    />
                  </Route>
                </Route>
                <Route path={ERoutePathName.Project} element={<ProjectPage />}>
                  <Route
                    path={ERoutePathName.ProjectId}
                    element={<ProjectInstanceViewSuspense />}>
                    <Route path={ERoutePathName.Model}>
                      <Route
                        path={ERoutePathName.Empty}
                        element={<DataModelEmptyPrompt />}
                      />
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
              </Route>
            </Routes>
            <GlobalToast />
          </BrowserRouter>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default memo(RootRouter);
