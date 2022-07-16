import { baseRequest, mainServerApi } from './http';
import { IUserProfile } from './types';

interface IUserSignInInput {
  username: string;
  password: string;
  isEmail?: boolean;
  remember?: boolean;
}

interface IUserSignUpInput {
  username: string;
  password: string;
  email: string;
}

interface IUserResetPasswordInput {
  email: string;
}

export function signUp(input: IUserSignUpInput) {
  return baseRequest<IUserProfile>(
    mainServerApi,
    'POST',
    '/auth/signUp',
    input
  );
}

export function signIn(input: IUserSignInInput) {
  return baseRequest<IUserProfile>(
    mainServerApi,
    'POST',
    '/auth/signIn',
    input
  );
}

export function signOut() {
  return baseRequest<void>(mainServerApi, 'POST', '/auth/signOut');
}

export function requestPasswordReset(input: IUserResetPasswordInput) {
  return baseRequest<void>(mainServerApi, 'POST', '/auth/resetPassword', input);
}
