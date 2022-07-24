export enum EToastType {
  Info = 'INFO',
  Error = 'ERROR',
  Success = 'SUCCESS',
  Warning = 'WARNING',
}

export interface IToast {
  content: string;
  duration: number;
  key: number | string;
  type: EToastType;
}
