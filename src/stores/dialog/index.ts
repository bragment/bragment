import { makeAutoObservable } from 'mobx';

class DialogStore {
  public createWorkspaceDialogVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setCreateWorkspaceDialogVisible = (visible: boolean) => {
    this.createWorkspaceDialogVisible = visible;
  };
}

export default new DialogStore();
