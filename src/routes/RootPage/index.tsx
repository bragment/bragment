import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import DialogContainer from '../../components/DialogContainer';
import Navigator from './Navigator';

function RootPage() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col md:flex-row">
        <nav className="flex-none basis-16 order-3 md:basis-20 md:order-1">
          <Navigator />
        </nav>
        <div className="flex-auto order-2">
          <Outlet />
        </div>
      </div>
      <DialogContainer />
    </>
  );
}

export default memo(RootPage);
