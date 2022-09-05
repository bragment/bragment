import classNames from 'classnames';
import { memo, useRef } from 'react';
import { IProject, IProjectDataField } from '../../libs/client/types';
import Dropdown, { IDropdownRef } from '../Dropdown';
import { useFormatMessage } from '../hooks';
import CreateDataFieldForm from './CreateDataFieldForm';

interface ICreateDataFieldButtonProps {
  projectId: string;
  modelId: string;
  children?: React.ReactNode;
  className?: string;
  existingFields?: IProjectDataField[];
  onFinish?: (project: IProject) => void;
}

function CreateDataFieldButton(props: ICreateDataFieldButtonProps) {
  const { projectId, modelId, className, children, existingFields, onFinish } =
    props;
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
      className={classNames('dropdown-end', className)}
      toggle={children}
      content={
        <div
          tabIndex={0}
          className={classNames(
            'border-base-300 bg-base-100',
            'w-80 mt-1 p-6 pb-16 border rounded-box shadow'
          )}>
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
      }
    />
  );
}

export default memo(CreateDataFieldButton);
