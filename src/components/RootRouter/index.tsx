import { memo } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import SettingPage from '../../pages/SettingPage';
import SignInPage from '../../pages/SignInPage';
import MainLayout from '../MainLayout';
import AnimatedRoutes from './AnimatedRoutes';
import AuthGuard from './AuthGuard';
import { ERoutePath } from './types';

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
