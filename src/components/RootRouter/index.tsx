import { memo } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import ProjectPage from '../../pages/ProjectPage';
import SettingPage from '../../pages/SettingPage';
import { ERoutePath } from '../../stores/types';
import MainLayout from '../MainLayout';
import AnimatedRoutes from './AnimatedRoutes';

function RootRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/*"
            element={
              <AnimatedRoutes>
                <Route path={ERoutePath.SETTING} element={<SettingPage />} />
                <Route path={ERoutePath.HOME} element={<HomePage />} />
              </AnimatedRoutes>
            }
          />
          <Route path={ERoutePath.PROJECT} element={<ProjectPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default memo(RootRouter);
