import type { AxiosError } from 'axios';

export interface IApiErrorResponseData {
  message: EApiErrorMessage;
  errors: string[];
  statusCode: number;
}

export type IApiError = AxiosError<IApiErrorResponseData>;

export enum EApiErrorMessage {
  // NOTE: for user
  Unauthorized = 'Unauthorized',
  UsernameTaken = 'Username Taken',
  EmailTaken = 'Email Taken',
  UsernameAndEmailTaken = 'Username and Email Taken',
  InvalidPassword = 'Invalid Password',
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  mainWorkspace?: string;
}

export interface IUserProfile {
  user: IUser;
  workspaces: IWorkspace[];
  projects: IProject[];
}

export interface IMember {
  users: string[];
}

export interface IWorkspace {
  _id: string;
  title: string;
  owner: IMember;
}

export interface IProject {
  _id: string;
  title: string;
  background: IProjectBackground;
  visibility: EProjectVisibility;
  workspace: string;
  owner: IMember;
  models: IProjectDataModel[];
  views: IProjectDataView[];
}

export interface IProjectBackground {
  image?: string;
  color?: string;
}

export enum EProjectVisibility {
  Public = 'PUBLIC',
  Protected = 'PROTECTED',
  Private = 'PRIVATE',
}

export enum EDataViewType {
  List = 'LIST',
  Board = 'BOARD',
  Table = 'TABLE',
  Gallery = 'GALLERY',
}

export interface IProjectDataModel {
  _id: string;
  title: string;
  createdAt: string;
}

export interface IProjectDataView {
  _id: string;
  model: string;
  title: string;
  type: EDataViewType;
  createdAt: string;
}
