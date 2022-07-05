import { memo } from 'react';
import CreateProjectDialog from '../../dialogs/CreateProjectDialog';
import CreateWorkspaceDialog from '../../dialogs/CreateWorkspaceDialog';

const DialogContainer = () => {
  return (
    <>
      <CreateWorkspaceDialog />
      <CreateProjectDialog />
    </>
  );
};

export default memo(DialogContainer);
