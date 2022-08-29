import type { PrimitiveType } from 'intl-messageformat';
import isEqual from 'lodash/isEqual';
import { useCallback, useContext, useState } from 'react';
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

export function useNestedState<S>(
  initialState: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [state, _setState] = useState(initialState);
  const setState: typeof _setState = useCallback((arg) => {
    if (arg instanceof Function) {
      return _setState(arg);
    } else {
      return _setState((oldValue) => {
        return isEqual(oldValue, arg) ? oldValue : arg;
      });
    }
  }, []);
  return [state, setState];
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
  const { toastError } = useDialogStore();
  const f = useFormatMessage();
  return useCallback(
    (error: IApiError) => {
      switch (parseApiErrorMessage(error)) {
        case EApiErrorMessage.Unauthorized:
        case EApiErrorMessage.InvalidPasscode:
          userSignOut();
          break;
        default:
          toastError(f('common.networkError'));
          break;
      }
    },
    [f, toastError, userSignOut]
  );
}
