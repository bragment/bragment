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

export interface IUserUpdateInput {
  mainWorkspace: string;
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

export function updateMyData(input: IUserUpdateInput) {
  return baseRequest<Partial<IUser>>(mainServerApi, 'PUT', '/my', input);
}

export function fetchMyProfile() {
  return baseRequest<IUserProfile>(mainServerApi, 'GET', '/my/profile');
}

export function fetchMyWorkspaces() {
  return baseRequest<IWorkspace[]>(mainServerApi, 'GET', '/my/workspaces');
}
