import { baseRequest, mainServerApi } from './http';
import { IProject, IUser, IWorkspace } from './types';

export interface IUserProfile {
  user: IUser;
  workspaces: IWorkspace[];
  projects: IProject[];
}

export interface IUserSignInInput {
  username: string;
  password: string;
  isEmail?: false;
}

export interface IUserSignUpInput {
  username: string;
  password: string;
  email: string;
}

export interface IUserResetPasswordInput {
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

export function fetchProfile() {
  return baseRequest<IUserProfile>(mainServerApi, 'GET', '/user/profile');
}
