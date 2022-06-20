import type { IUser } from '../libs/client/types';

export type ICurrentUser = IUser;

export enum ESignInDialogTabKey {
  SignIn = 'SIGN_IN',
  SignUp = 'SIGN_UP',
  ForgotPassword = 'FORGOT_PASSWORD',
}

export enum ERoutePath {
  Home = '/',
  Setting = '/setting',
  Project = '/project/:objectId',
}
