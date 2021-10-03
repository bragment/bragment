import { ELanguage, ILocalMessages } from '../types';
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

const messages: Record<ELanguage, ILocalMessages> = {
  [ELanguage.EN_US]: { ...enUS },
  [ELanguage.ZH_CN]: { ...zhCN },
};

export default messages;
