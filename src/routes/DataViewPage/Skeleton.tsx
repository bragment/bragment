import classNames from 'classnames';
import { memo } from 'react';

function Skeleton() {
  return (
    <div className="w-full px-6 py-4">
      <div
        className={classNames(
          'bg-primary-content',
          'w-1/2 h-8 rounded animate-pulse'
        )}
      />
      <div
        className={classNames(
          'bg-primary-content',
          'w-full h-8 mt-4 rounded animate-pulse'
        )}
      />
      <div
        className={classNames(
          'bg-primary-content',
          'w-full h-32 mt-4 rounded animate-pulse'
        )}
      />
      <div
        className={classNames(
          'bg-primary-content',
          'w-full h-8 mt-4 rounded animate-pulse'
        )}
      />
    </div>
  );
}

export default memo(Skeleton);
