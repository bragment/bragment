export enum EToastType {
  Info = 'Info',
  Error = 'Error',
  Success = 'Success',
  Warning = 'Warning',
}

export interface IToast {
  content: string;
  duration: number;
  key: number | string;
  type: EToastType;
}
