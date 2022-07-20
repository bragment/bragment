import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { useFormatMessage } from '../../../components/hooks';
import CreateDataModelForm from './CreateDataModelForm';
import DataModelMenu from './DataModelMenu';

import styles from './index.module.scss';

function DataModelList() {
  const f = useFormatMessage();
  const { projectId = '' } = useParams();
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
  const handleFormFinish = useCallback(() => {
    setCreating(false);
  }, []);

  return (
    <div
      className={classNames(
        'collapse collapse-arrow border-base-300 bg-base-100 rounded-box',
        'border',
        styles.collapse
      )}>
      <input
        type="checkbox"
        className="peer"
        defaultChecked={checked}
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
          <div className={classNames('mx-3 my-1', styles.modelFormWrapper)}>
            <CreateDataModelForm
              projectId={projectId}
              onCancel={handleFormCancel}
              onFinish={handleFormFinish}
            />
          </div>
        )}
        <DataModelMenu />
      </div>
    </div>
  );
}

export default memo(DataModelList);
