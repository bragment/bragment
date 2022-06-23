import type { PrimitiveType } from 'intl-messageformat';
import { useCallback, useContext } from 'react';
import { useIntl } from 'react-intl';
import type { ILocalMessages } from '../i18n/messages';
import { AppContext } from '../stores';

export function useAppContext() {
  return useContext(AppContext);
}

export function useSettingStore() {
  return useContext(AppContext).settingStore;
}

export function useFormatMessage(): (
  id: keyof ILocalMessages,
  values?: Record<string, PrimitiveType>
) => string {
  const intl = useIntl();
  return useCallback(
    (id, values) => intl.formatMessage({ id }, values),
    [intl]
  );
}
