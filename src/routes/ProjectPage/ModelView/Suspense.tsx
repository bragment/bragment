import { lazy, memo, Suspense } from 'react';
import Skeleton from './Skeleton';

const ModelView = lazy(() => import('./index'));

function ModelViewSuspense() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ModelView />
    </Suspense>
  );
}

export default memo(ModelViewSuspense);
