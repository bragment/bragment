import classNames from 'classnames';
import { memo } from 'react';
import { IProject, IProjectDataField } from '../../libs/client/types';
import Dropdown from './Dropdown';

interface ICreateDataViewButtonProps {
  projectId: string;
  modelId: string;
  children?: React.ReactNode;
  className?: string;
  existingFields?: IProjectDataField[];
  onFinish?: (project: IProject) => void;
}

function CreateDataViewButton(props: ICreateDataViewButtonProps) {
  const { projectId, modelId, className, children, existingFields, onFinish } =
    props;

  return (
    <div className={classNames('dropdown dropdown-end', className)}>
      <label tabIndex={0} className="btn btn-ghost btn-sm">
        {children}
      </label>
      <Dropdown
        projectId={projectId}
        modelId={modelId}
        existingFields={existingFields}
        onFinish={onFinish}
      />
    </div>
  );
}

export default memo(CreateDataViewButton);
