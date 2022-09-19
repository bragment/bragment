import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import Dialog from '../../components/Dialog';
import { useDialogStore, useFormatMessage } from '../../components/hooks';
import { IWorkspace } from '../../libs/client/types';
import { useNavigateWorkspaceInstancePage } from '../../routes/hooks';
import CreateWorkspaceForm from '../../routes/WorkspacePage/CreateWorkspaceView/CreateWorkspaceForm';

const DIALOG_ID = 'CREATE_WORKSPACE_DIALOG';

function CreateWorkspaceDialog() {
  const f = useFormatMessage();
  const navigate = useNavigateWorkspaceInstancePage();
  const { createWorkspaceDialogVisible, setCreateWorkspaceDialogVisible } =
    useDialogStore();

  const handleCancel = useCallback(() => {
    setCreateWorkspaceDialogVisible(false);
  }, [setCreateWorkspaceDialogVisible]);

  const handleFinish = useCallback(
    async (workspace: IWorkspace) => {
      setCreateWorkspaceDialogVisible(false);
      navigate(workspace._id);
    },
    [setCreateWorkspaceDialogVisible, navigate]
  );

  return (
    <Dialog
      id={DIALOG_ID}
      className="pb-16 overflow-visible"
      visible={createWorkspaceDialogVisible}
      onClose={handleCancel}>
      <div className={classNames('w-full h-full relative')}>
        <h3 className={classNames('text-base-content', 'text-lg font-bold')}>
          {f('workspace.createWorkspace')}
        </h3>
        <CreateWorkspaceForm onFinish={handleFinish} />
      </div>
    </Dialog>
  );
}

export default observer(CreateWorkspaceDialog);
