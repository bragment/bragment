import { ELanguage, ILocalMessages } from '../types';
import enUS from './en-US';
import zhCN from './zh-CN';

const messages: Record<ELanguage, ILocalMessages> = {
  [ELanguage.EN_US]: { ...enUS },
  [ELanguage.ZH_CN]: { ...zhCN },
};

export default messages;
