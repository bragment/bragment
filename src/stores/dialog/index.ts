import { makeAutoObservable } from 'mobx';

class DialogStore {
  public createWorkspaceDialogVisible = false;
  public createProjectDialogVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setCreateWorkspaceDialogVisible = (visible: boolean) => {
    this.createWorkspaceDialogVisible = visible;
  };

  public setCreateProjectDialogVisible = (visible: boolean) => {
    this.createProjectDialogVisible = visible;
  };
}

export default new DialogStore();
