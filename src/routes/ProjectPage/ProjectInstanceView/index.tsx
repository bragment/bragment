import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { HiLogin, HiLogout } from 'react-icons/hi';
import { Outlet } from 'react-router-dom';
import DataModelList from '../DataModelList';
import NavBar from './NavBar';
import styles from './index.module.scss';

function ProjectInstanceView() {
  const [checked, setChecked] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const handleCheckboxChange = useCallback(() => setChecked((old) => !old), []);
  useEffect(() => {
    setExpanded(checked);
  }, [checked]);

  return (
    <div className={classNames('w-full h-full flex', styles.wrapper)}>
      <aside
        className={classNames(
          'bg-base-200 text-base-content',
          'flex-none relative',
          expanded ? 'w-80' : 'w-0'
        )}>
        <Scrollbars autoHide style={{ overflowX: 'hidden' }}>
          <NavBar
            className={classNames(
              'bg-base-200 text-base-content',
              'sticky top-0'
            )}
          />
          <div className="p-4">
            <DataModelList />
          </div>
        </Scrollbars>
        <label
          className={classNames(
            'btn btn-ghost swap swap-rotate',
            'absolute top-2 -right-16 z-20 text-xl'
          )}>
          <input
            type="checkbox"
            defaultChecked={expanded}
            onChange={handleCheckboxChange}
          />
          <HiLogin className={classNames('swap-on')} />
          <HiLogout className={classNames('swap-off')} />
        </label>
      </aside>
      <main
        className={classNames('bg-base-100 text-base-content', 'flex-auto')}>
        <Scrollbars autoHide>
          <Outlet />
        </Scrollbars>
      </main>
    </div>
  );
}

export default observer(ProjectInstanceView);
