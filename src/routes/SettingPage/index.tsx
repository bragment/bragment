import classNames from 'classnames';
import { memo } from 'react';

function SettingPage() {
  return (
    <div className={classNames('bg-base-200', 'w-full h-full')}>
      <div className="text-base-content">setting page</div>
    </div>
  );
}

export default memo(SettingPage);
