import { computed, makeAutoObservable, observable } from 'mobx';
import { defaultLanguage, messages } from '../../i18n';
import { ELanguage } from '../../i18n/types';

const APP_LANGUAGE = 'APP_LANGUAGE';
function getLocalAppLanguage() {
  const language = localStorage.getItem(APP_LANGUAGE) || navigator.language;
  // NOTE: Keys of ELanguage are uppercase. see `src/i18n/types.ts`
  const key = language.toUpperCase().replace(/-/g, '_');
  if (key in ELanguage) {
    return (ELanguage as { [key: string]: ELanguage })[key];
  }
  return defaultLanguage;
}
function setLocalAppLanguage(language: ELanguage) {
  return localStorage.setItem(APP_LANGUAGE, language);
}

class SettingStore {
  public language = getLocalAppLanguage();
  get localMessages() {
    return messages[this.language] || messages[defaultLanguage];
  }
  constructor() {
    makeAutoObservable(this, {
      language: observable,
      localMessages: computed,
    });
  }

  public setLanguage = (language: ELanguage) => {
    setLocalAppLanguage(language);
    this.language = language;
  };
}

export default new SettingStore();
