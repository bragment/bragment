import { ILocalMessage } from '../i18n/types';

export enum EFieldCategory {
  Basic = 'BASIC',
  Builtin = 'BUILTIN',
  Advanced = 'ADVANCED',
}

export interface IResolvablePath {
  name: ILocalMessage;
  value: string;
}
