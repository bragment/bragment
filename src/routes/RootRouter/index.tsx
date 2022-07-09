import { memo } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage';
import MainLayout from '../MainLayout';
import ProjectPage from '../ProjectPage';
import SettingPage from '../SettingPage';
import SignInPage from '../SignInPage';
import { ERoutePath, ERoutePathName } from '../types';
import WorkspacePage from '../WorkspacePage';
import CreateWorkspaceView from '../WorkspacePage/CreateWorkspaceView';
import CurrentWorkspaceView from '../WorkspacePage/CurrentWorkspaceView';
import AuthGuard from './AuthGuard';

function RootRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path={ERoutePath.SignIn} element={<SignInPage />} />
        <Route
          path={ERoutePath.Root}
          element={
            <AuthGuard>
              <MainLayout />
            </AuthGuard>
          }>
          <Route index element={<HomePage />} />
          <Route path={ERoutePathName.Workspace}>
            <Route index element={<WorkspacePage />} />
            <Route
              path={ERoutePathName.Create}
              element={<CreateWorkspaceView />}
            />
            <Route
              path={ERoutePathName.Id}
              element={<CurrentWorkspaceView />}
            />
          </Route>
          <Route path={ERoutePathName.Setting} element={<SettingPage />} />
          <Route path={ERoutePathName.Project}>
            <Route path={ERoutePathName.Id} element={<ProjectPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default memo(RootRouter);
