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
  workspace: string | IWorkspace;
  owner: IMember;
  models: IProjectDataModel[];
  views: IProjectDataView[];
  fields: IProjectDataField[];
  forms: IProjectDataForm[];
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
  Date = 'DATE',
  HttpLink = 'HTTP_LINK',
  Image = 'IMAGE',
  MultipleLineText = 'MULTIPLE_LINE_TEXT',
  MultipleSelect = 'MULTIPLE_SELECT',
  Number = 'NUMBER',
  Plain = 'PLAIN',
  Resolver = 'RESOLVER',
  SingleLineText = 'SINGLE_LINE_TEXT',
  SingleSelect = 'SINGLE_SELECT',
}

export enum EDataFilterOperator {
  Contain = 'CONTAIN',
  Equal = 'EQUAL',
}

export enum EDataFilterConjunction {
  And = 'AND',
  Or = 'OR',
}

export interface IDataFilter {
  field: string;
  operator: EDataFilterOperator;
  operand: string;
  conjunction: EDataFilterConjunction;
}

export interface IDataSorter {
  field: string;
  descending: boolean;
}

export interface IDataFormItem {
  field: string;
  label: string;
  defaultValue: string;
  required?: boolean;
}
export enum EDataFormItemKey {
  field = 'field',
  label = 'label',
  defaultValue = 'defaultValue',
  required = 'required',
}

export interface IDataFieldOption {
  _id: string;
  title: string;
  color: string;
}

export type IRecordFieldAnyData = any;
export interface IMetadata {
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  keywords?: string[];
  language?: string;
  type?: string;
  url?: string;
  provider?: string;
}
export interface IRecordFieldData extends IRecordFieldAnyData {
  value: string;
  updatedBy?: string;
  mime?: string;
  metadata?: IMetadata;
  unreached?: Record<string, boolean>;
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
  createdAt: string;
  filters?: IDataFilter[];
  sorters?: IDataSorter[];
  visibleFields?: string[];
}

export interface IProjectDataField {
  _id: string;
  model: string;
  title: string;
  type: EDataFieldType;
  asType?: EDataFieldType;
  relatedField?: string;
  subPath?: string;
  options?: IDataFieldOption[];
}

export interface IProjectDataForm {
  _id: string;
  model: string;
  title: string;
  items: IDataFormItem[];
  banner?: string;
  description?: string;
}

export interface IProjectDataRecord {
  _id: string;
  project: string;
  model: string;
  data: Record<string, IRecordFieldData>;
  updatedAt: string;
}
