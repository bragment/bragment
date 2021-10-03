import Parse from 'parse';

export function initializeParse() {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  Parse.initialize(process.env.APP_ID!);
  Parse.serverURL = process.env.SERVER_URL!;
}

export * from './user';
