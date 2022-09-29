import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import { memo, useRef } from 'react';
import { IProject, IProjectDataField } from '../../libs/client/types';
import { useFormatMessage } from '../hooks';
import CreateDataFieldForm from './CreateDataFieldForm';

interface ICreateDataFieldButtonProps {
  projectId: string;
  modelId: string;
  children: React.ReactElement;
  existingFields?: IProjectDataField[];
  onFinish?: (project: IProject) => void;
}

function CreateDataFieldDropdown(props: ICreateDataFieldButtonProps) {
  const { projectId, modelId, children, existingFields, onFinish } = props;
  const f = useFormatMessage();
  const dropdownRef = useRef<{ close: () => void }>(null);

  const handleFinish = async (project: IProject) => {
    if (onFinish) {
      onFinish(project);
    }
    dropdownRef.current?.close();
  };

  const handleClick: React.MouseEventHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <Dropdown
      ref={dropdownRef}
      trigger="click"
      overlayClassName="[&.rc-dropdown-hidden>div]:content-hidden"
      overlay={
        <div
          className={classNames(
            'border-base-300 bg-base-100',
            'w-80 p-6 pb-16 border rounded-box shadow'
          )}
          onClick={handleClick}>
          <div>
            <h3
              className={classNames('text-base-content', 'text-lg font-bold')}>
              {f('dataView.addField')}
            </h3>
            <CreateDataFieldForm
              projectId={projectId}
              modelId={modelId}
              existingFields={existingFields}
              onFinish={handleFinish}
            />
          </div>
        </div>
      }>
      {children}
    </Dropdown>
  );
}

export default memo(CreateDataFieldDropdown);
