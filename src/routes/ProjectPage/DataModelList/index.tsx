import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { useMatch, useParams } from 'react-router-dom';
import { useFormatMessage, useUserStore } from '../../../components/hooks';
import { IProject } from '../../../libs/client/types';
import { useProjectQuery } from '../../../libs/react-query';
import { getProjectInstancePath } from '../../helpers';
import { useNavigateProjectModelPage } from '../../hooks';
import CreateDataModelForm from './CreateDataModelForm';
import DataModelMenu from './DataModelMenu';

import styles from './index.module.scss';

function DataModelList() {
  const f = useFormatMessage();
  const navigate = useNavigateProjectModelPage();
  const { me } = useUserStore();
  const { projectId = '', modelId = '' } = useParams();
  const isProjectPath = useMatch(getProjectInstancePath(projectId));
  const { data: project, isError } = useProjectQuery(
    projectId,
    !!(me && projectId)
  );
  const models = project?.models?.slice().reverse();
  const [checked, setChecked] = useState(true);
  const [creating, setCreating] = useState(false);

  const handleCheckboxChange = useCallback(() => {
    setChecked((old) => !old);
  }, []);
  const handleButtonClick = useCallback(() => {
    setChecked(true);
    setCreating(true);
  }, []);
  const handleFormCancel = useCallback(() => {
    setCreating(false);
  }, []);
  const handleFormFinish = useCallback(
    (data: IProject) => {
      const model = data.models[0];
      setCreating(false);
      if (model) {
        navigate(projectId, model._id);
      }
    },
    [navigate, projectId]
  );

  useEffect(() => {
    if (isProjectPath && !modelId && models?.length) {
      navigate(projectId, models[0]._id, {
        replace: true,
      });
    }
  }, [navigate, isProjectPath, projectId, modelId, models]);

  return (
    <div
      className={classNames(
        'collapse collapse-arrow rounded-box',
        'border border-base-300 bg-base-100',
        styles.collapse
      )}>
      <input
        type="checkbox"
        className="peer"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <div
        className={classNames(
          'collapse-title',
          'h-16 leading-8 text-lg font-medium'
        )}>
        {f('project.dataModel')}
      </div>
      <div className="collapse-content bg-base-100">
        <button
          className={classNames('btn btn-ghost top-2 right-2', 'absolute')}
          onClick={handleButtonClick}>
          <HiPlus className="text-xl" />
        </button>
        {creating && (
          <div
            className={classNames('mx-3 mt-1 mb-3', styles.modelFormWrapper)}>
            <CreateDataModelForm
              projectId={projectId}
              onCancel={handleFormCancel}
              onFinish={handleFormFinish}
            />
          </div>
        )}
        <DataModelMenu loading={!isError && !project} models={models} />
      </div>
    </div>
  );
}

export default observer(DataModelList);
