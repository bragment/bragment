import { lazy, memo, Suspense } from 'react';
import Skeleton from './Skeleton';

const DataView = lazy(() => import('./index'));

function DataModelViewSuspense() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DataView />
    </Suspense>
  );
}

export default memo(DataModelViewSuspense);
