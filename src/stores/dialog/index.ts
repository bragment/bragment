import { makeAutoObservable } from 'mobx';
import { IProjectDataField, IProjectDataForm } from '../../libs/client/types';
import { EToastType, IToast } from '../types';

function generateToastKey() {
  return Date.now().toString() + Math.random().toFixed(2).slice(1);
}

interface ICreateDataFormDialogOptions {
  projectId: string;
  modelId: string;
  mainFieldId: string;
  modelFields: IProjectDataField[];
  visibleFieldIds?: string[];
  existingForms?: IProjectDataForm[];
}

class DialogStore {
  public createWorkspaceDialogVisible = false;
  public createProjectDialogVisible = false;
  public createDataModelDialogVisible = false;
  public createDataFormDialogVisible = false;
  public createDataFormDialogOptions: ICreateDataFormDialogOptions | null =
    null;
  public toastList: IToast[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setCreateWorkspaceDialogVisible = (visible: boolean) => {
    this.createWorkspaceDialogVisible = visible;
  };

  public setCreateProjectDialogVisible = (visible: boolean) => {
    this.createProjectDialogVisible = visible;
  };

  public setCreateDataModelDialogVisible = (visible: boolean) => {
    this.createDataModelDialogVisible = visible;
  };

  public setCreateDataFormDialogVisible = (
    visible: boolean,
    options: ICreateDataFormDialogOptions | null = null
  ) => {
    this.createDataFormDialogVisible = visible;
    this.createDataFormDialogOptions = options ? { ...options } : options;
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
