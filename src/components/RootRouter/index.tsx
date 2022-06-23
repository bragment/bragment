import { lazy, memo, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../MainLayout';
import AnimatedRoutes from './AnimatedRoutes';
import { ERoutePath } from './types';

const HomePage = lazy(() => import('../../pages/HomePage'));
const SettingPage = lazy(() => import('../../pages/SettingPage'));

function RootRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/*"
            element={
              <AnimatedRoutes>
                <Route
                  path={ERoutePath.Setting}
                  element={
                    <Suspense fallback={<div />}>
                      <SettingPage />
                    </Suspense>
                  }
                />
                <Route
                  path={ERoutePath.Home}
                  element={
                    <Suspense fallback={<div />}>
                      <HomePage />
                    </Suspense>
                  }
                />
              </AnimatedRoutes>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default memo(RootRouter);
