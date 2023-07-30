import classNames from 'classnames';
import { memo } from 'react';

function Skeleton() {
  return (
    <header className={classNames('navbar', 'px-6')}>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div className="flex-none mr-6" key={i}>
            <div
              className={classNames(
                'bg-base-content/60',
                'w-24 h-10 rounded animate-pulse'
              )}
            />
          </div>
        ))}
    </header>
  );
}

export default memo(Skeleton);
