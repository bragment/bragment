import { lazy, memo, Suspense } from 'react';
import Skeleton from './DataView/Skeleton';

const DataView = lazy(() => import('./DataView'));

function DataViewSuspense() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DataView />
    </Suspense>
  );
}

export default memo(DataViewSuspense);
