import { memo } from 'react';
import CreateProjectDialog from '../../dialogs/CreateProjectDialog';
import CreateWorkspaceDialog from '../../dialogs/CreateWorkspaceDialog';
import GlobalToast from '../../dialogs/GlobalToast';

const DialogContainer = () => {
  return (
    <>
      <CreateWorkspaceDialog />
      <CreateProjectDialog />
      <GlobalToast />
    </>
  );
};

export default memo(DialogContainer);
