import { lazy, memo, Suspense } from 'react';
import Skeleton from './Skeleton';

const ProjectInstanceView = lazy(() => import('./index'));

function ProjectInstanceViewSuspense() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ProjectInstanceView />
    </Suspense>
  );
}

export default memo(ProjectInstanceViewSuspense);
