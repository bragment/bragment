import type { getCurrentUser } from '../api/parse';

export type ICurrentUser = NonNullable<ReturnType<typeof getCurrentUser>>;

export enum ESignInDialogTabKey {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export enum ERoutePath {
  HOME = '/',
  SETTING = '/setting',
}

export interface IPhoto {
  image: string;
  color?: string;
}

export type IBackground = Partial<IPhoto>;

export interface ISelectedStandByBgData {
  type: string;
  index: number;
}
