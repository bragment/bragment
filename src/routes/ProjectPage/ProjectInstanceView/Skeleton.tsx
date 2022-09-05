import classNames from 'classnames';
import { memo } from 'react';
import DataViewSkeleton from '../DataView/Skeleton';

function Skeleton() {
  return (
    <div className="w-full h-full flex">
      <aside
        className={classNames(
          'bg-base-200',
          'w-80 flex-none border-r border-base-300'
        )}>
        <header className={classNames('navbar bg-base-200', 'p-4')}>
          <div className="flex-auto">
            <div
              className={classNames(
                'bg-base-content',
                'w-48 h-7 rounded animate-pulse'
              )}
            />
          </div>
        </header>
        <div className="p-4">
          <div className="h-16 p-4">
            <div
              className={classNames(
                'bg-base-content',
                'w-full h-full rounded animate-pulse'
              )}
            />
          </div>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div className="h-12 px-4 py-3" key={i}>
                <div
                  className={classNames(
                    'bg-base-content',
                    'w-3/5 h-full rounded animate-pulse'
                  )}
                />
              </div>
            ))}
        </div>
      </aside>
      <main className={classNames('bg-base-100', 'flex-auto')}>
        <header className={classNames('navbar bg-base-200', 'px-6')}>
          <div>
            <div
              className={classNames(
                'bg-base-content',
                'w-48 h-7 rounded animate-pulse'
              )}
            />
          </div>
          <div className="flex-none ml-6">
            <div
              className={classNames(
                'bg-base-content',
                'w-20 h-10 rounded animate-pulse'
              )}
            />
          </div>
          <div className="flex-none ml-6">
            <div
              className={classNames(
                'bg-base-content',
                'w-20 h-10 rounded animate-pulse'
              )}
            />
          </div>
          <div className="flex-none ml-6">
            <div
              className={classNames(
                'bg-base-content',
                'w-20 h-10 rounded animate-pulse'
              )}
            />
          </div>
        </header>
        <DataViewSkeleton />
      </main>
    </div>
  );
}

export default memo(Skeleton);
