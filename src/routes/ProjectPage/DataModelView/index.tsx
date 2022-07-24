import classNames from 'classnames';
import { observer } from 'mobx-react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function DataModelView() {
  return (
    <div className={classNames('w-full h-full')}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default observer(DataModelView);
