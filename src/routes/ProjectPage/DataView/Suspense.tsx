import { lazy, memo, Suspense } from 'react';
import Skeleton from './Skeleton';

const DataView = lazy(() => import('./index'));

function DataViewSuspense() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DataView />
    </Suspense>
  );
}

export default memo(DataViewSuspense);
