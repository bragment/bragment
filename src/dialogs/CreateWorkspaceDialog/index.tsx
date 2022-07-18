import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDialogStore, useFormatMessage } from '../../components/hooks';
import { IWorkspace } from '../../libs/client/types';
import { ERoutePath } from '../../routes/types';
import CreateWorkspaceForm from '../../routes/WorkspacePage/CreateWorkspaceForm';

const DIALOG_ID = 'CREATE_WORKSPACE_DIALOG';

function CreateWorkspaceDialog() {
  const f = useFormatMessage();
  const navigate = useNavigate();
  const {
    createWorkspaceDialogVisible,
    setCreateWorkspaceDialogVisible,
    toggleCreateWorkspaceDialogVisible,
  } = useDialogStore();

  const handleFinish = useCallback(
    async (workspace: IWorkspace) => {
      setCreateWorkspaceDialogVisible(false);
      navigate(ERoutePath.Workspace + '/' + workspace._id, { replace: true });
    },
    [setCreateWorkspaceDialogVisible, navigate]
  );

  return (
    <div
      className={classNames(
        !createWorkspaceDialogVisible && 'content-visibility-hidden'
      )}>
      <input
        type="checkbox"
        className="modal-toggle"
        id={DIALOG_ID}
        checked={createWorkspaceDialogVisible}
        onChange={toggleCreateWorkspaceDialogVisible}
      />
      <label
        htmlFor={DIALOG_ID}
        className={classNames('modal', 'cursor-pointer')}>
        <label
          className={classNames('modal-box', 'relative pb-16 overflow-visible')}
          htmlFor="">
          <div className={classNames('w-full h-full relative z-1')}>
            <h3
              className={classNames(
                'text-primary-content',
                'text-lg font-bold'
              )}>
              {f('workspace.createWorkspace')}
            </h3>
            <CreateWorkspaceForm onFinish={handleFinish} />
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

export default observer(CreateWorkspaceDialog);
