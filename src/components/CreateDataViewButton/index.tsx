import classNames from 'classnames';
import { memo } from 'react';
import Dropdown, { IDropdownProps } from './Dropdown';

interface ICreateDataViewButtonProps extends IDropdownProps {
  children?: React.ReactNode;
  className?: string;
}

function CreateDataViewButton(props: ICreateDataViewButtonProps) {
  const { projectId, modelId, className, children, existingViews, onFinish } =
    props;

  return (
    <div className={classNames('dropdown dropdown-end', className)}>
      <label tabIndex={0} className={classNames('btn btn-sm', 'h-10')}>
        {children}
      </label>
      <Dropdown
        projectId={projectId}
        modelId={modelId}
        existingViews={existingViews}
        onFinish={onFinish}
      />
    </div>
  );
}

export default memo(CreateDataViewButton);
