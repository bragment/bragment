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

  public toggleCreateWorkspaceDialogVisible = () => {
    this.createWorkspaceDialogVisible = !this.createWorkspaceDialogVisible;
  };

  public setCreateProjectDialogVisible = (visible: boolean) => {
    this.createProjectDialogVisible = visible;
  };

  public toggleCreateProjectDialogVisible = () => {
    this.createProjectDialogVisible = !this.createProjectDialogVisible;
  };
}

export default new DialogStore();
