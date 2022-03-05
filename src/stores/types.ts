import type { getCurrentUser } from '../api/parse';

export type ICurrentUser = NonNullable<ReturnType<typeof getCurrentUser>>;

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
