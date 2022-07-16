import classNames from 'classnames';
import { memo } from 'react';

function HomePage() {
  return (
    <div className={classNames('bg-base-200', 'w-full h-full')}>
      <div className="text-base-content">home page</div>
    </div>
  );
}

export default memo(HomePage);
