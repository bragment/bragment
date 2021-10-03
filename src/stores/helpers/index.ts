import { autorun } from 'mobx';
import { getCurrentUser } from '../../api/parse';
import stores from '../index';
import { ESignInDialogTabKey } from '../types';

export function initializeStores() {
  const { dialogStore, userStore } = stores;
  userStore.setCurrent(getCurrentUser());

  autorun(() => {
    // NOTE: the following store methods should be marked as actions.
    if (userStore.current) {
      dialogStore.setSignInDialogVisible(false);
    } else {
      dialogStore.setSignInDialogVisible(true, ESignInDialogTabKey.SIGN_IN);
    }
  });
}
