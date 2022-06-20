import type { AxiosError } from 'axios';

export interface IApiErrorResponseData {
  message: EApiErrorMessage;
  errors: string[];
  statusCode: number;
}

export type IApiError = AxiosError<IApiErrorResponseData>;

export enum EApiErrorMessage {
  // NOTE: for user
  UsernameTaken = 'Username Taken',
  EmailTaken = 'Email Taken',
  UsernameAndEmailTaken = 'Username and Email Taken',
  InvalidPassword = 'Invalid Password',
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface IWorkspace {
  _id: string;
  title: string;
}

export interface IProject {
  _id: string;
  title: string;
}
