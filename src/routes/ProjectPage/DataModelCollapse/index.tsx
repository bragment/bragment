import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePlus,
} from 'react-icons/hi';
import { useMatch } from 'react-router-dom';
import { useFormatMessage } from '../../../components/hooks';
import { IProject, IProjectDataModel } from '../../../libs/client/types';
import { getProjectInstancePath } from '../../helpers';
import { useNavigateProjectDataModelPage } from '../../hooks';
import CreateDataModelForm from './CreateDataModelForm';
import DataModelMenu from './DataModelMenu';

import styles from './index.module.scss';

const TOGGLE_ID = 'DATA_MODEL_COLLAPSE_TOGGLE';

interface IDataModelCollapseProps {
  projectId: string;
  selectedModelId: string;
  models?: IProjectDataModel[];
}

function DataModelCollapse(props: IDataModelCollapseProps) {
  const { projectId, selectedModelId, models = [] } = props;
  const f = useFormatMessage();
  const navigate = useNavigateProjectDataModelPage();
  const isProjectPath = useMatch(getProjectInstancePath(projectId));
  const [checked, setChecked] = useState(true);
  const [creating, setCreating] = useState(false);

  const handleCheckboxChange = () => {
    setChecked((old) => !old);
  };
  const handleButtonClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  useEffect(() => {
    if (isProjectPath && !selectedModelId && models?.length) {
      navigate(projectId, models[0]._id, {
        replace: true,
      });
    }
  }, [navigate, isProjectPath, projectId, selectedModelId, models]);

  return (
    <div className="collapse">
      <input
        id={TOGGLE_ID}
        type="checkbox"
        className="peer min-h-fit"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={TOGGLE_ID}
        className={classNames(
          'collapse-title',
          'h-8 min-h-fit p-0 pl-4 pr-12',
          'text-base-content/40 hover:text-base-content/70',
          'flex items-center justify-between'
        )}>
        <div className="text-sm leading-8 font-medium">
          {f('project.model')}
        </div>
        <div
          className={classNames(
            'text-lg flex items-center',
            !models.length && 'invisible'
          )}>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => undefined}
            />
            <HiOutlineChevronUp className="swap-on" />
            <HiOutlineChevronDown className="swap-off" />
          </label>
        </div>
      </label>
      <div className={classNames('collapse-content', 'p-0 pb-0')}>
        <div
          className={classNames(
            'text-base-content/40 text-lg top-0 right-4',
            'h-8 flex items-center',
            'absolute z-10 cursor-pointer hover:text-base-content/70'
          )}
          onClick={handleButtonClick}>
          <HiOutlinePlus aria-label={f('project.createModel')} />
        </div>
        {creating && (
          <div
            className={classNames(
              'mx-1 my-2 [&_input]:font-bold',
              styles.modelFormWrapper
            )}>
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
