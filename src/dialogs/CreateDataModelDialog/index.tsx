import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Dialog from '../../components/Dialog';
import { useDialogStore, useFormatMessage } from '../../components/hooks';
import { IProject } from '../../libs/client/types';
import { getProjectDataModelPath } from '../../routes/helpers';
import { useNavigateToPage } from '../../routes/hooks';
import CreateDataModelForm from './CreateDataModelForm';

const DIALOG_ID = 'CREATE_DATA_MODEL_DIALOG';

function CreateDataModelDialog() {
  const f = useFormatMessage();
  const { projectId = '' } = useParams();
  const navigateTo = useNavigateToPage();
  const { createDataModelDialogVisible, setCreateDataModelDialogVisible } =
    useDialogStore();

  const handleCancel = useCallback(() => {
    setCreateDataModelDialogVisible(false);
  }, [setCreateDataModelDialogVisible]);

  const handleFinish = useCallback(
    async (project: IProject) => {
      setCreateDataModelDialogVisible(false);
      const model = project.models[0];
      navigateTo(getProjectDataModelPath(projectId, model._id), {
        replace: true,
      });
    },
    [projectId, setCreateDataModelDialogVisible, navigateTo]
  );

  return (
    <Dialog
      id={DIALOG_ID}
      className="pb-16 overflow-visible"
      visible={createDataModelDialogVisible}
      onClose={handleCancel}>
      <div className={classNames('w-full h-full relative')}>
        <h3 className={classNames('text-base-content', 'text-lg font-bold')}>
          {f('project.createModel')}
        </h3>
        <CreateDataModelForm
          singleInput={false}
          projectId={projectId}
          onFinish={handleFinish}
        />
      </div>
    </Dialog>
  );
}

export default observer(CreateDataModelDialog);
