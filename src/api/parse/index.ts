import Parse from 'parse';
import { getServerURL } from '../utils';

export function initializeParse() {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  Parse.initialize(process.env.APP_ID!);
  Parse.serverURL = getServerURL();
}

export * from './user';
export * from './types';
