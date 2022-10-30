import classNames from 'classnames';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { IProjectDataModel } from '../../../libs/client/types';
import { getProjectDataModelPath } from '../../helpers';

interface IDataModelMenuProps {
  projectId: string;
  models?: IProjectDataModel[];
}

function DataModelMenu(props: IDataModelMenuProps) {
  const { projectId, models } = props;

  const getActiveClassName = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? 'bg-base-content/10 pointer-events-none'
      : '[&>span]:!text-base-content [&>span]:!bg-transparent';

  return (
    <ul
      className={classNames(
        'menu',
        'p-4 px-0 py-0 [&>li]:my-1 [&>li]:w-full [&>li>a]:w-full',
        models?.length === 0 || 'p-2'
      )}>
      {models?.map((model) => (
        <li key={model._id}>
          <NavLink
            to={getProjectDataModelPath(projectId, model._id)}
            className={getActiveClassName}>
            <span
              className={classNames(
                'capitalize text-ellipsis overflow-hidden whitespace-nowrap',
                'text-transparent font-bold bg-clip-text bg-gradient-to-r from-orange-400 to-fuchsia-500'
              )}>
              {model.title}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default memo(DataModelMenu);
