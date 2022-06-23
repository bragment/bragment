import { createContext } from 'react';
import setting from './setting';
import user from './user';

const stores = {
  setting,
  user,
};

export const AppContext = createContext(stores);

export default stores;
