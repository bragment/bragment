import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useUserStore } from '../../../components/hooks';
import { useProjectQuery } from '../../../libs/react-query';
import { getProjectDataModelPath } from '../../helpers';

function DataModelList() {
  const { me } = useUserStore();
  const { projectId = '' } = useParams();
  const { data: project, isError } = useProjectQuery(
    projectId,
    !!(me && projectId)
  );

  const getActiveClassName = useCallback(
    ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : undefined),
    []
  );

  return (
    <ul className={classNames('menu rounded-box', 'p-2 pt-0')}>
      {!isError && !project
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
        : project?.models?.reverse().map((model) => (
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

export default observer(DataModelList);
