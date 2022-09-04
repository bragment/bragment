import { lazy, memo, Suspense } from 'react';
import Skeleton from './ProjectInstanceView/Skeleton';

const ProjectInstanceView = lazy(() => import('./ProjectInstanceView'));

function ProjectInstanceViewSuspense() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ProjectInstanceView />
    </Suspense>
  );
}

export default memo(ProjectInstanceViewSuspense);
