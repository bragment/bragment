import { lazy, memo, Suspense } from 'react';
import Skeleton from './Skeleton';

const DataModelView = lazy(() => import('./index'));

function DataModelViewSuspense() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DataModelView />
    </Suspense>
  );
}

export default memo(DataModelViewSuspense);
