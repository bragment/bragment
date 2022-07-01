import { createContext } from 'react';
import dialog from './dialog';
import setting from './setting';
import user from './user';

const stores = {
  dialog,
  setting,
  user,
};

export const AppContext = createContext(stores);
export default stores;
