import { message } from 'antd';
import type { PrimitiveType } from 'intl-messageformat';
import { useCallback, useContext } from 'react';
import { useIntl } from 'react-intl';
import type { ILocalMessage } from '../i18n/types';
import { parseApiErrorMessage } from '../libs/client';
import { EApiErrorMessage, IApiError } from '../libs/client/types';
import { useAuthSignOutMutation } from '../libs/react-query';
import { AppContext } from '../stores';

export function useAppContext() {
  return useContext(AppContext);
}

export function useDialogStore() {
  return useContext(AppContext).dialog;
}

export function useProjectStore() {
  return useContext(AppContext).project;
}

export function useSettingStore() {
  return useContext(AppContext).setting;
}

export function useUserStore() {
  return useContext(AppContext).user;
}

export function useFormatMessage(): (
  id: ILocalMessage,
  values?: Record<string, PrimitiveType>
) => string {
  const intl = useIntl();
  return useCallback(
    (id, values) => intl.formatMessage({ id }, values),
    [intl]
  );
}

export function useAuthSignOut() {
  const singOutMutation = useAuthSignOutMutation();
  const { setMe } = useUserStore();
  return useCallback(() => {
    setMe(null);
    singOutMutation.mutate();
  }, [setMe, singOutMutation]);
}

export function useHandleServerApiError() {
  const userSignOut = useAuthSignOut();
  const f = useFormatMessage();
  return useCallback(
    (error: IApiError) => {
      switch (parseApiErrorMessage(error)) {
        case EApiErrorMessage.Unauthorized:
        case EApiErrorMessage.InvalidPassword:
          userSignOut();
          break;
        default:
          message.destroy();
          message.error(f('networkError'));
      }
    },
    [f, userSignOut]
  );
}
