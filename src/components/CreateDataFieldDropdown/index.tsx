import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import React, { memo, useRef } from 'react';
import { IProject, IProjectDataField } from '../../libs/client/types';
import { stopEventPropagation } from '../../utils';
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
  const dropdownRef = useRef<IDropdownRef>(null);

  const handleFinish = async (project: IProject) => {
    if (onFinish) {
      onFinish(project);
    }
    dropdownRef.current?.close();
  };

  return (
    <Dropdown
      ref={dropdownRef}
      trigger="click"
      overlay={
        <div
          className={classNames(
            'border-base-300 bg-base-100',
            'w-80 p-6 pb-16 border rounded-box shadow'
          )}
          onClick={stopEventPropagation}
          onKeyDown={stopEventPropagation}>
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
