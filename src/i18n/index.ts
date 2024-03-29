import { IntlMessageFormat } from 'intl-messageformat';
import allMessages from './messages';
import { ELanguage, ILocalMessage } from './types';

export const messages = allMessages;
export const defaultLanguage = ELanguage.EN_US;
export const defaultLocalMessages = messages[defaultLanguage];

export function formatMessage(
  language: ELanguage,
  id: ILocalMessage,
  values?: any
) {
  const localMessages = messages[language];
  const text = new IntlMessageFormat(localMessages[id]).format(values);
  return (text || id).toString();
}
