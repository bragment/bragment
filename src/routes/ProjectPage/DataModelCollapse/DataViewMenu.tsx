import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { IProjectDataView } from '../../../libs/client/types';
import { getProjectDataViewPath } from '../../helpers';

interface IDataViewMenuProps {
  projectId: string;
  views: IProjectDataView[];
}

function DataViewMenu(props: IDataViewMenuProps) {
  const { projectId, views } = props;

  const getActiveClassName = useCallback(
    ({ isActive }: { isActive: boolean }): string =>
      isActive
        ? 'pl-6 bg-base-content/10 pointer-events-none'
        : 'pl-6 [&>span]:!text-base-content [&>span]:!bg-transparent',
    []
  );

  return (
    <ul
      className={classNames(
        'menu',
        'p-4 px-0 py-0 [&>li]:my-1 [&>li]:w-full [&>li>a]:w-full'
      )}>
      {views.map((view) => (
        <li key={view._id}>
          <NavLink
            to={getProjectDataViewPath(projectId, view.model, view._id)}
            className={getActiveClassName}>
            <span
              className={classNames(
                'capitalize text-ellipsis overflow-hidden whitespace-nowrap',
                'text-transparent font-semibold bg-clip-text bg-gradient-to-r from-orange-400 to-fuchsia-500'
              )}>
              {view.title}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default memo(DataViewMenu);
