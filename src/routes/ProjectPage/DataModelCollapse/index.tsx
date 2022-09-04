import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useLayoutEffect, useState } from 'react';
import { HiOutlineDatabase, HiPlus } from 'react-icons/hi';
import { useMatch } from 'react-router-dom';
import { useFormatMessage } from '../../../components/hooks';
import { IProject } from '../../../libs/client/types';
import { getProjectInstancePath } from '../../helpers';
import { useNavigateProjectDataModelPage } from '../../hooks';
import CreateDataModelForm from './CreateDataModelForm';
import DataModelMenu from './DataModelMenu';

import styles from './index.module.scss';

const TOGGLE_ID = 'DATA_MODEL_LIST_TOGGLE';

interface IDataModelCollapseProps {
  projectId: string;
  modelId: string;
  project?: IProject;
}

function DataModelCollapse(props: IDataModelCollapseProps) {
  const { projectId, modelId, project } = props;
  const f = useFormatMessage();
  const navigate = useNavigateProjectDataModelPage();
  const isProjectPath = useMatch(getProjectInstancePath(projectId));
  const models = project?.models?.slice().reverse();
  const [checked, setChecked] = useState(true);
  const [creating, setCreating] = useState(false);

  const handleCheckboxChange = () => {
    setChecked((old) => !old);
  };
  const handleButtonClick = () => {
    setChecked(true);
    setCreating(true);
  };
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

  useLayoutEffect(() => {
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
        id={TOGGLE_ID}
        type="checkbox"
        className="peer"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={TOGGLE_ID}
        className={classNames(
          'collapse-title',
          'h-16 leading-8 text-lg font-medium text-ellipsis whitespace-nowrap'
        )}>
        <HiOutlineDatabase className="inline-block text-xl text-warning align-middle mr-1" />
        <span className="align-middle">{f('project.model')}</span>
      </label>
      <div className="collapse-content bg-base-100">
        <button
          aria-label={f('project.createModel')}
          className={classNames('btn btn-ghost top-2 right-2', 'absolute')}
          onClick={handleButtonClick}>
          <HiPlus className="text-xl" />
        </button>
        {creating && (
          <div
            className={classNames('mx-3 mt-1 mb-3', styles.modelFormWrapper)}>
            <CreateDataModelForm
              singleInput
              projectId={projectId}
              onCancel={handleFormCancel}
              onFinish={handleFormFinish}
            />
          </div>
        )}
        <DataModelMenu projectId={projectId} models={models} />
      </div>
    </div>
  );
}

export default observer(DataModelCollapse);
