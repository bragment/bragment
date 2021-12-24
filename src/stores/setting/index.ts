import { computed, makeAutoObservable, observable } from 'mobx';
import { defaultLanguage, messages } from '../../i18n';
import { ELanguage } from '../../i18n/types';

const APP_LANGUAGE = 'APP_LANGUAGE';
function getLocalAppLanguage() {
  const language =
    window.localStorage.getItem(APP_LANGUAGE) || navigator.language;
  if (language.toUpperCase().replace(/-/g, '_') in ELanguage) {
    return language as ELanguage;
  }
  return defaultLanguage;
}
function setLocalAppLanguage(language: ELanguage) {
  return window.localStorage.setItem(APP_LANGUAGE, language);
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
