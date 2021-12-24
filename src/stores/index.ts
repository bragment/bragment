import { createContext } from 'react';
import dialog from './dialog';
import project from './project';
import setting from './setting';
import user from './user';

const stores = {
  dialog: dialog,
  project: project,
  setting: setting,
  user: user,
};

export const AppContext = createContext(stores);

export default stores;
