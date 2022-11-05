import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { HiPlus } from 'react-icons/hi';
import AnimatePing from '../../../components/AnimatePing';
import CreateDataFieldDropdown from '../../../components/CreateDataFieldDropdown';
import { useFormatMessage } from '../../../components/hooks';
import FieldRendererBase from '../../../fields/renderers/FieldRendererBase';
import { EFieldCategory } from '../../../fields/types';
import { IProject } from '../../../libs/client/types';
import { useUpdateProjectDataModelMutation } from '../../../libs/react-query';

interface INoFieldPromptProps {
  projectId: string;
  modelId: string;
}

function NoFieldPrompt(props: INoFieldPromptProps) {
  const { projectId, modelId } = props;
  const f = useFormatMessage();
  const { mutate } = useUpdateProjectDataModelMutation();
  const fieldFilter = useCallback(
    (field: FieldRendererBase) => field.category === EFieldCategory.Basic,
    []
  );
  const handleCreateDataFieldFinish = useCallback(
    (data: IProject) => {
      const field = data.fields[0];
      mutate({
        projectId: data._id,
        modelId: field.model,
        mainField: field._id,
      });
    },
    [mutate]
  );

  return (
    <div className="py-3 px-6">
      <AnimatePing ping>
        <CreateDataFieldDropdown
          projectId={projectId}
          modelId={modelId}
          fieldFilter={fieldFilter}
          onFinish={handleCreateDataFieldFinish}>
          <button className={classNames('btn', 'h-10 min-h-fit')}>
            <HiPlus className="text-xl mr-3" />
            {f('dataView.addField')}
          </button>
        </CreateDataFieldDropdown>
      </AnimatePing>
    </div>
  );
}
export default memo(NoFieldPrompt);
