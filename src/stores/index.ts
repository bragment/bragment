import { createContext } from 'react';
import DialogStore from './DialogStore';
import ProjectStore from './ProjectStore';
import SettingStore from './SettingStore';
import UserStore from './UserStore';

const stores = {
  dialogStore: new DialogStore(),
  projectStore: new ProjectStore(),
  settingStore: new SettingStore(),
  userStore: new UserStore(),
};

export const AppContext = createContext(stores);

export default stores;
