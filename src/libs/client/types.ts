import type { AxiosError } from 'axios';

export interface IApiErrorResponseData {
  message: EApiErrorMessage;
  errors: string[];
  statusCode: number;
}

export type IApiError = AxiosError<IApiErrorResponseData>;

export enum EApiErrorMessage {
  // NOTE: for user
  GithubEmailTaken = 'GitHub Email Taken',
  InvalidEmail = 'Invalid Email',
  InvalidGithubCode = 'Invalid GitHub Code',
  InvalidPasscode = 'Invalid Passcode',
  Unauthorized = 'Unauthorized',
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
  githubId: string;
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
  fields: IProjectDataField[];
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

export enum EDataFieldType {
  DateTime = 'DATE_TIME',
  MultiLineText = 'MULTI_LINE_TEXT',
  Number = 'NUMBER',
  SingleLineText = 'SINGLE_LINE_TEXT',
  HttpLink = 'HTTP_LINK',
}

export interface IProjectDataModel {
  _id: string;
  title: string;
  mainField: string;
  createdAt: string;
}

export interface IProjectDataView {
  _id: string;
  model: string;
  title: string;
  type: EDataViewType;
  hiddenFields: string[];
  createdAt: string;
}

export interface IProjectDataField {
  _id: string;
  model: string;
  title: string;
  type: EDataFieldType;
}

export interface IRecordFieldData {
  value: string;
  updatedBy?: string;
}

export interface IProjectDataRecord {
  _id: string;
  project: string;
  model: string;
  data: Record<string, IRecordFieldData>;
}
