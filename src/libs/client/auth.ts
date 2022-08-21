import { ELanguage } from '../../i18n/types';
import { baseRequest, mainServerApi } from './http';
import { IUser, IUserProfile } from './types';

interface IUserSignInInput {
  token: string;
  email: string;
  passcode: string;
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

export function githubLogin(input: { code: string }) {
  return baseRequest<IUser>(mainServerApi, 'POST', '/auth/github/login', input);
}

export function signOut() {
  return baseRequest<void>(mainServerApi, 'POST', '/auth/signOut');
}

export function requestPasswordReset(input: IUserResetPasswordInput) {
  return baseRequest<void>(mainServerApi, 'POST', '/auth/resetPassword', input);
}

export function requestEmailPasscode(query: {
  email: string;
  language: ELanguage;
}) {
  return baseRequest<{ token: string }>(
    mainServerApi,
    'GET',
    '/auth/passcode/email',
    query
  );
}
