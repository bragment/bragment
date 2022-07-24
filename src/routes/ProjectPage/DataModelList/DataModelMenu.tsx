import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { IProjectDataModel } from '../../../libs/client/types';
import { getProjectDataModelPath } from '../../helpers';

interface IDataModelMenuProps {
  models?: IProjectDataModel[];
  loading: boolean;
}

function DataModelMenu(props: IDataModelMenuProps) {
  const { models, loading } = props;
  const { projectId = '' } = useParams();

  const getActiveClassName = useCallback(
    ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : undefined),
    []
  );

  return (
    <ul
      className={classNames(
        'menu rounded-box',
        'pt-0',
        models?.length === 0 || 'p-2'
      )}>
      {loading
        ? Array(3)
            .fill(0)
            .map((_, i) => (
              <li key={i}>
                <div className="px-4 py-3">
                  <div
                    className={classNames(
                      'bg-base-content',
                      'w-32 h-6 rounded animate-pulse'
                    )}
                  />
                </div>
              </li>
            ))
        : models?.map((model) => (
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
