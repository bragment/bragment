import classNames from 'classnames';
import { memo } from 'react';

function Skeleton() {
  return (
    <div className={classNames('border-base-300', 'w-full px-6 py-0 border-t')}>
      <div className="w-full h-12 py-1">
        <div
          className={classNames(
            'bg-base-content',
            'w-1/2 h-full rounded animate-pulse'
          )}
        />
      </div>
      <div className="w-full h-12 py-3">
        <div
          className={classNames(
            'bg-base-content',
            'w-full h-full rounded animate-pulse'
          )}
        />
      </div>
      <div
        className={classNames(
          'bg-base-content',
          'w-full h-36 rounded animate-pulse'
        )}
      />
      <div className="w-full h-12 py-3">
        <div
          className={classNames(
            'bg-base-content',
            'w-full h-full rounded animate-pulse'
          )}
        />
      </div>
    </div>
  );
}

export default memo(Skeleton);
