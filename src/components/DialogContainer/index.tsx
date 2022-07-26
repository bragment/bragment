import { memo } from 'react';
import CreateDataModelDialog from '../../dialogs/CreateDataModelDialog';
import CreateProjectDialog from '../../dialogs/CreateProjectDialog';
import CreateWorkspaceDialog from '../../dialogs/CreateWorkspaceDialog';
import GlobalToast from '../../dialogs/GlobalToast';

const DialogContainer = () => {
  return (
    <>
      <CreateWorkspaceDialog />
      <CreateProjectDialog />
      <CreateDataModelDialog />
      <GlobalToast />
    </>
  );
};

export default memo(DialogContainer);
