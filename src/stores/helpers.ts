import { autorun } from 'mobx';
import { getCachedCurrentUser } from '../libs/client';
import { ESignInDialogTabKey } from './types';
import stores from './index';

export function initializeStores() {
  const { dialog, user } = stores;
  user.setCurrent(getCachedCurrentUser());
  autorun(() => {
    // NOTE: the following store methods should be marked as actions.
    if (user.current) {
      dialog.setSignInDialogVisible(false);
    } else {
      dialog.setSignInDialogVisible(true, ESignInDialogTabKey.SignIn);
    }
  });
}
