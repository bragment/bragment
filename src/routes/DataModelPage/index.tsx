import classNames from 'classnames';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function DataModelPage() {
  return (
    <div className={classNames('w-full h-full')}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default memo(DataModelPage);
