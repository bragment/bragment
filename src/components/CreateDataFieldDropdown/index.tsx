import classNames from 'classnames';
import Dropdown from 'rc-dropdown';
import React, { memo, useCallback, useRef, useState } from 'react';
import { IProject, IProjectDataField } from '../../libs/client/types';
import { stopEventPropagation } from '../../utils';
import { useFormatMessage } from '../hooks';
import ScrollContainer from '../ScrollContainer';
import CreateDataFieldForm, {
  ICreateDataFieldFormRef,
} from './CreateDataFieldForm';

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
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<IDropdownRef>(null);
  const formRef = useRef<ICreateDataFieldFormRef>(null);

  const handleFinish = useCallback(
    async (project: IProject) => {
      if (onFinish) {
        onFinish(project);
      }
      dropdownRef.current?.close();
    },
    [onFinish]
  );

  const handleCreateFieldClick = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    formRef.current?.submit().finally(() => setLoading(false));
  };

  return (
    <Dropdown
      ref={dropdownRef}
      trigger="click"
      overlay={
        <div
          className={classNames(
            'bg-base-100 border-base-300',
            'w-80 px-0 py-4 border overflow-hidden rounded-box shadow'
          )}
          onClick={stopEventPropagation}
          onKeyDown={stopEventPropagation}>
          <h3
            className={classNames(
              'text-base-content',
              'px-6 mb-4 text-lg font-bold'
            )}>
            {f('dataView.addField')}
          </h3>
          <ScrollContainer autoHeight withShadow autoHeightMax={280}>
            <div className="w-full px-6">
              <CreateDataFieldForm
                ref={formRef}
                projectId={projectId}
                modelId={modelId}
                existingFields={existingFields}
                onFinish={handleFinish}
              />
            </div>
          </ScrollContainer>
          <div className="w-full px-6 mt-4">
            <button
              className={classNames(
                'btn btn-primary btn-block',
                loading && 'loading'
              )}
              onClick={handleCreateFieldClick}>
              {f('common.confirm')}
            </button>
          </div>
        </div>
      }>
      {children}
    </Dropdown>
  );
}

export default memo(CreateDataFieldDropdown);
