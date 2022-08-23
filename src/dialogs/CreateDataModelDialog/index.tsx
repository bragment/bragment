import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { useDialogStore, useFormatMessage } from '../../components/hooks';
import { IProject } from '../../libs/client/types';
import { useNavigateProjectDataModelPage } from '../../routes/hooks';
import CreateDataModelForm from '../../routes/ProjectPage/DataModelList/CreateDataModelForm';

const DIALOG_ID = 'CREATE_DATA_MODEL_DIALOG';

function CreateDataModelDialog() {
  const f = useFormatMessage();
  const { projectId = '' } = useParams();
  const navigate = useNavigateProjectDataModelPage();
  const {
    createDataModelDialogVisible,
    setCreateDataModelDialogVisible,
    toggleCreateDataModelDialogVisible,
  } = useDialogStore();

  const handleFinish = useCallback(
    async (project: IProject) => {
      setCreateDataModelDialogVisible(false);
      const model = project.models[0];
      navigate(projectId, model._id, { replace: true });
    },
    [projectId, setCreateDataModelDialogVisible, navigate]
  );

  return (
    <div
      className={classNames(
        !createDataModelDialogVisible && 'content-visibility-hidden'
      )}>
      <input
        type="checkbox"
        className="modal-toggle"
        id={DIALOG_ID}
        checked={createDataModelDialogVisible}
        onChange={toggleCreateDataModelDialogVisible}
      />
      <label
        htmlFor={DIALOG_ID}
        className={classNames('modal', 'cursor-pointer')}>
        <label
          className={classNames('modal-box', 'relative pb-16 overflow-visible')}
          htmlFor="">
          <div className={classNames('w-full h-full relative z-1')}>
            <h3
              className={classNames('text-base-content', 'text-lg font-bold')}>
              {f('project.createModel')}
            </h3>
            <CreateDataModelForm
              singleInput={false}
              projectId={projectId}
              onFinish={handleFinish}
            />
          </div>
          <label
            htmlFor={DIALOG_ID}
            className={classNames(
              'btn btn-sm btn-circle',
              'absolute right-4 top-4 z-2'
            )}>
            <HiOutlineX className="text-lg" />
          </label>
        </label>
      </label>
    </div>
  );
}

export default observer(CreateDataModelDialog);
