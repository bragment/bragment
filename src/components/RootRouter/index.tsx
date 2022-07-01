import { memo } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import SettingPage from '../../pages/SettingPage';
import SignInPage from '../../pages/SignInPage';
import WorkspacePage from '../../pages/WorkspacePage';
import MainLayout from '../MainLayout';
import { ERoutePath } from '../types';
import AnimatedRoutes from './AnimatedRoutes';
import AuthGuard from './AuthGuard';

function RootRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path={ERoutePath.SignIn} element={<SignInPage />} />
        <Route
          element={
            <AuthGuard>
              <MainLayout />
            </AuthGuard>
          }>
          <Route
            path={ERoutePath.Any}
            element={
              <AnimatedRoutes>
                <Route
                  path={ERoutePath.Workspace}
                  element={<WorkspacePage />}
                />
                <Route path={ERoutePath.Setting} element={<SettingPage />} />
                <Route path={ERoutePath.Home} element={<HomePage />} />
              </AnimatedRoutes>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default memo(RootRouter);
