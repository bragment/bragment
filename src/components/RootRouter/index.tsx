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
                <Route path={ERoutePath.Setting} element={<SettingPage />} />
                <Route path={ERoutePath.Home} element={<HomePage />} />
              </AnimatedRoutes>
            }
          />
          <Route path={ERoutePath.Project} element={<ProjectPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default memo(RootRouter);
