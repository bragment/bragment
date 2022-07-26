import { makeAutoObservable } from 'mobx';
import { EToastType, IToast } from '../types';

function generateToastKey() {
  return Date.now().toString() + Math.random().toFixed(2).slice(1);
}

class DialogStore {
  public createWorkspaceDialogVisible = false;
  public createProjectDialogVisible = false;
  public createDataModelDialogVisible = false;
  public toastList: IToast[] = [];

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

  public setCreateDataModelDialogVisible = (visible: boolean) => {
    this.createDataModelDialogVisible = visible;
  };

  public toggleCreateDataModelDialogVisible = () => {
    this.createDataModelDialogVisible = !this.createDataModelDialogVisible;
  };

  public setToastList = (list: IToast[]) => {
    this.toastList = list;
  };

  public addToast = (toast: Partial<IToast>) => {
    const {
      content = '',
      duration = 3,
      key = generateToastKey(),
      type = EToastType.Info,
    } = toast;
    this.setToastList([...this.toastList, { content, duration, key, type }]);
    setTimeout(
      () => this.setToastList(this.toastList.filter((el) => el.key !== key)),
      duration * 1000
    );
    return toast;
  };

  public toastError = (content: string) => {
    this.addToast({ content, type: EToastType.Error });
  };
  public toastInfo = (content: string) => {
    this.addToast({ content, type: EToastType.Info });
  };
  public toastSuccess = (content: string) => {
    this.addToast({ content, type: EToastType.Success });
  };
  public toastWarning = (content: string) => {
    this.addToast({ content, type: EToastType.Warning });
  };
}

export default new DialogStore();
