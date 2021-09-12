import { createContext } from 'react';
import SettingStore from './SettingStore';

const stores = {
  settingStore: new SettingStore(),
};

export const AppContext = createContext(stores);

export default stores;
