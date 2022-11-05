import classNames from 'classnames';
import { memo } from 'react';
import DataViewSkeleton from '../DataView/Skeleton';

function Skeleton() {
  return (
    <div className="w-full h-full flex">
      <aside
        className={classNames(
          'bg-base-200',
          'w-80 flex-none',
          'hidden',
          'lg:block'
        )}>
        <header className={classNames('navbar bg-base-200', 'p-3')}>
          <div className="flex-auto">
            <div
              className={classNames(
                'bg-base-content/60',
                'w-full p-4 rounded-box animate-pulse'
              )}>
              <p className="h-9" />
            </div>
          </div>
        </header>
        <div className="p-4">
          <div className="pt-1 px-2">
            <div
              className={classNames(
                'bg-base-content/60',
                'w-full h-6 rounded animate-pulse'
              )}
            />
          </div>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div className="px-4 py-2 mt-2" key={i}>
                <div
                  className={classNames(
                    'bg-base-content/60',
                    'w-full h-8 rounded animate-pulse'
                  )}
                />
              </div>
            ))}
        </div>
      </aside>
      <main className={classNames('bg-base-100', 'flex-auto')}>
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
        <DataViewSkeleton />
      </main>
    </div>
  );
}

export default memo(Skeleton);
