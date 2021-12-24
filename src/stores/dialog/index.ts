import { action, makeAutoObservable } from 'mobx';
import { ESignInDialogTabKey } from '../types';

class DialogStore {
  public createProjectDialogVisible = false;
  public signInDialogCurrentTab = ESignInDialogTabKey.SIGN_IN;
  public signInDialogVisible = false;

  constructor() {
    makeAutoObservable(this, {
      // NOTE: the method will be called out of observable components.
      setSignInDialogVisible: action,
    });
  }

  public setCreateProjectDialogVisible = (visible: boolean) => {
    this.createProjectDialogVisible = visible;
  };

  public setSignInDialogCurrentTab = (tab: ESignInDialogTabKey) => {
    this.signInDialogCurrentTab = tab;
  };

  public setSignInDialogVisible = (
    visible: boolean,
    tab?: ESignInDialogTabKey
  ) => {
    this.signInDialogVisible = visible;
    if (tab) {
      this.signInDialogCurrentTab = tab;
    }
  };
}

export default new DialogStore();
