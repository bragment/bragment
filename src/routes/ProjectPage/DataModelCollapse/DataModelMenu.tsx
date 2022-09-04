import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { IProjectDataModel } from '../../../libs/client/types';
import { getProjectDataModelPath } from '../../helpers';

interface IDataModelMenuProps {
  projectId: string;
  models?: IProjectDataModel[];
}

function DataModelMenu(props: IDataModelMenuProps) {
  const { projectId, models } = props;

  const getActiveClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      classNames(
        'inline-block w-full text-ellipsis overflow-hidden whitespace-nowrap',
        isActive && 'active',
        isActive && 'pointer-events-none'
      ),
    []
  );

  return (
    <ul
      className={classNames(
        'menu rounded-box',
        'pt-0',
        models?.length === 0 || 'p-2'
      )}>
      {models?.map((model) => (
        <li key={model._id}>
          <NavLink
            to={getProjectDataModelPath(projectId, model._id)}
            className={getActiveClassName}>
            {model.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default memo(DataModelMenu);
