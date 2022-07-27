import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function DataModelPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-none">
        <NavBar />
      </div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default memo(DataModelPage);
