import type enUS from './messages/en-US';
export const languages = {
  'en-US': 'English(US)',
  'zh-CN': '中文(简体)',
};

// NOTE: These keys of ELanguage should be uppercase.
export enum ELanguage {
  EN_US = 'en-US',
  ZH_CN = 'zh-CN',
}

export type ILocalMessages = typeof enUS;
