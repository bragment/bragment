import { memo } from 'react';
import CreateDataFormDialog from '../../dialogs/CreateDataFormDialog';
import CreateDataModelDialog from '../../dialogs/CreateDataModelDialog';
import CreateProjectDialog from '../../dialogs/CreateProjectDialog';
import CreateWorkspaceDialog from '../../dialogs/CreateWorkspaceDialog';

function DialogContainer() {
  return (
    <>
      <CreateWorkspaceDialog />
      <CreateProjectDialog />
      <CreateDataModelDialog />
      <CreateDataFormDialog />
    </>
  );
}

export default memo(DialogContainer);
