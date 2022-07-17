import classNames from 'classnames';
import { memo } from 'react';

function ProjectItemSkeleton() {
  return (
    <div
      className={classNames(
        'card bg-base-100',
        'w-full h-[7rem] cursor-pointer hover:shadow-xl image-full'
      )}>
      <figure />
      <div className={classNames('card-body', 'h-full p-4')}>
        <h2 className="card-title">
          <div
            className={classNames(
              'bg-primary-content',
              'w-3/4 h-7 rounded animate-pulse'
            )}
          />
        </h2>
      </div>
    </div>
  );
}

export default memo(ProjectItemSkeleton);
