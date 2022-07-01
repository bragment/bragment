import { memo } from 'react';
import CreateWorkspaceDialog from '../../dialogs/CreateWorkspaceDialog';

const DialogContainer = () => {
  return (
    <>
      <CreateWorkspaceDialog />
    </>
  );
};

export default memo(DialogContainer);
