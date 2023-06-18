import { memo } from 'react';
// import { Outlet } from 'react-router-dom';
import Header from './Header';

function DataModelView() {
  return (
    <main className="w-full h-full flex flex-col">
      <div className="flex-none">
        <Header />
      </div>
      <div className="flex-auto">{/* <Outlet /> */}</div>
    </main>
  );
}

export default memo(DataModelView);
