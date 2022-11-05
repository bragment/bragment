import classNames from 'classnames';
import { memo } from 'react';

function Skeleton() {
  return (
    <div className="w-full px-6">
      <div className="w-full h-16 py-3">
        <div
          className={classNames(
            'bg-base-content/60',
            'w-1/2 h-10 rounded animate-pulse'
          )}
        />
      </div>
      <div className="w-full h-12 py-3">
        <div
          className={classNames(
            'bg-base-content/60',
            'w-full h-full rounded animate-pulse'
          )}
        />
      </div>
      <div
        className={classNames(
          'bg-base-content/60',
          'w-full h-48 rounded animate-pulse'
        )}
      />
      <div className="w-full h-12 py-3">
        <div
          className={classNames(
            'bg-base-content/60',
            'w-full h-full rounded animate-pulse'
          )}
        />
      </div>
    </div>
  );
}

export default memo(Skeleton);
