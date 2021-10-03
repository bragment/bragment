import { createContext } from 'react';
import DialogStore from './DialogStore';
import SettingStore from './SettingStore';
import UserStore from './UserStore';

const stores = {
  dialogStore: new DialogStore(),
  settingStore: new SettingStore(),
  userStore: new UserStore(),
};

export const AppContext = createContext(stores);

export default stores;
