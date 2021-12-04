import { memo } from 'react';
import CreateProjectDialog from '../../dialogs/CreateProjectDialog';
import SignInDialog from '../../dialogs/SignInDialog';

const DialogContainer = () => {
  return (
    <>
      <CreateProjectDialog />
      <SignInDialog />
    </>
  );
};

export default memo(DialogContainer);
