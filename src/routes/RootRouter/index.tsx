import { memo } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AuthPage from '../AuthPage';
import ForgotPasswordForm from '../AuthPage/ForgotPasswordForm';
import SignInForm from '../AuthPage/SignInForm';
import SignUpForm from '../AuthPage/SignUpForm';
import HomePage from '../HomePage';
import RootPage from '../RootPage';
import SettingPage from '../SettingPage';
import { ERoutePath, ERoutePathName } from '../types';
import WorkspacePage from '../WorkspacePage';
import CreateWorkspaceView from '../WorkspacePage/CreateWorkspaceView';
import WorkspaceInstanceView from '../WorkspacePage/WorkspaceInstanceView';
import AuthGuard from './AuthGuard';

function RootRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path={ERoutePathName.Auth} element={<AuthPage />}>
          <Route path={ERoutePathName.SignIn} element={<SignInForm />} />
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
          <Route path={ERoutePathName.Workspace} element={<WorkspacePage />}>
            <Route
              path={ERoutePathName.Create}
              element={<CreateWorkspaceView />}
            />
            <Route
              path={ERoutePathName.WorkspaceId}
              element={<WorkspaceInstanceView />}
            />
          </Route>
          <Route path={ERoutePathName.Setting} element={<SettingPage />} />
          {/* <Route path={ERoutePathName.Project}>
            <Route path={ERoutePathName.Id} element={<ProjectPage />} />
          </Route> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default memo(RootRouter);
