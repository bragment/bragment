import { memo } from 'react';
import CreateDataModelDialog from '../../dialogs/CreateDataModelDialog';
import CreateProjectDialog from '../../dialogs/CreateProjectDialog';
import CreateWorkspaceDialog from '../../dialogs/CreateWorkspaceDialog';

function DialogContainer() {
  return (
    <>
      <CreateWorkspaceDialog />
      <CreateProjectDialog />
      <CreateDataModelDialog />
    </>
  );
}

export default memo(DialogContainer);
