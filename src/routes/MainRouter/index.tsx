import { memo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalToast from '../../dialogs/GlobalToast';
import AuthPage from '../AuthPage';
import ForgotPasswordForm from '../AuthPage/ForgotPasswordForm';
import GithubForm from '../AuthPage/GithubForm';
import SignInForm from '../AuthPage/SignInForm';
import SignUpForm from '../AuthPage/SignUpForm';
import DataModelPage from '../DataModelPage';
import DataViewPage from '../DataViewPage';
import HomePage from '../HomePage';
import ProjectPage from '../ProjectPage';
import ProjectInstanceView from '../ProjectPage/ProjectInstanceView';
import DefaultView from '../ProjectPage/ProjectInstanceView/DefaultView';
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
    <BrowserRouter>
      <Routes>
        <Route path={ERoutePathName.Auth} element={<AuthPage />}>
          <Route path={ERoutePathName.SignIn} element={<SignInForm />} />
          <Route path={ERoutePathName.Github} element={<GithubForm />} />
          <Route path={ERoutePathName.SignUp} element={<SignUpForm />} />
          <Route
            path={ERoutePathName.ForgotPassword}
            element={<ForgotPasswordForm />}
          />
        </Route>
        <Route
          path={ERoutePath.Root}
          element={
            <AuthGuard>
              <RootPage />
            </AuthGuard>
          }>
          <Route index element={<HomePage />} />
          <Route path={ERoutePathName.Setting} element={<SettingPage />} />
          <Route path={ERoutePathName.Workspace} element={<WorkspacePage />}>
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
              element={<ProjectInstanceView />}>
              <Route index element={<DefaultView />} />
              <Route path={ERoutePathName.ModelId} element={<DataModelPage />}>
                <Route
                  path={ERoutePathName.ViewId}
                  element={<DataViewPage />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <GlobalToast />
    </BrowserRouter>
  );
}

export default memo(RootRouter);
