import { memo } from 'react';
import SignInDialog from '../../dialogs/SignInDialog';

const DialogContainer = () => {
  return (
    <>
      <SignInDialog />
    </>
  );
};

export default memo(DialogContainer);
