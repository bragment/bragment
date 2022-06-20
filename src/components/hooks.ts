import { ApolloError } from '@apollo/client';
import { message } from 'antd';
import type { PrimitiveType } from 'intl-messageformat';
import { useCallback, useContext } from 'react';
import { useIntl } from 'react-intl';
import { convertToGlobalId, getGraphqlErrorCode } from '../api/apollo';
import { EParseErrorCode } from '../api/parse';
import {
  EClassName,
  useGetProjectAllItemsLazyQuery,
  useGetProjectAllItemsQuery,
  useGetProjectColumnQuery,
  useGetProjectItemQuery,
  useGetProjectLazyQuery,
  useGetProjectQuery,
  useGetProjectViewQuery,
} from '../graphql';
import type { ILocalMessages } from '../i18n/types';
import { parseApiErrorMessage } from '../libs/client';
import { EApiErrorMessage, IApiError } from '../libs/client/types';
import { useUserSignOutMutation } from '../libs/react-query';
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
  id: keyof ILocalMessages,
  values?: Record<string, PrimitiveType>
) => string {
  const intl = useIntl();
  return useCallback(
    (id, values) => intl.formatMessage({ id }, values),
    [intl]
  );
}

export function useGetProject(objectId: string) {
  return useGetProjectQuery({
    variables: { id: convertToGlobalId(EClassName.Project, objectId) },
  });
}
export function useGetProjectLazy(objectId: string) {
  return useGetProjectLazyQuery({
    variables: { id: convertToGlobalId(EClassName.Project, objectId) },
  });
}

export function useGetProjectAllItems(objectId: string) {
  return useGetProjectAllItemsQuery({
    variables: { id: convertToGlobalId(EClassName.Project, objectId) },
  });
}
export function useGetProjectAllItemsLazy(objectId: string) {
  return useGetProjectAllItemsLazyQuery({
    variables: { id: convertToGlobalId(EClassName.Project, objectId) },
  });
}

export function useGetProjectView(objectId: string) {
  return useGetProjectViewQuery({
    variables: { id: convertToGlobalId(EClassName.ProjectView, objectId) },
  });
}

export function useGetProjectColumn(objectId: string) {
  return useGetProjectColumnQuery({
    variables: { id: convertToGlobalId(EClassName.ProjectColumn, objectId) },
  });
}

export function useGetProjectItem(objectId: string) {
  return useGetProjectItemQuery({
    variables: { id: convertToGlobalId(EClassName.ProjectItem, objectId) },
  });
}

export function useUserSignOut() {
  const singOutMutation = useUserSignOutMutation();
  const { setCurrent } = useUserStore();
  return useCallback(() => {
    setCurrent(null);
    singOutMutation.mutate();
  }, [setCurrent, singOutMutation]);
}

export function useHandleServerApiError() {
  const userSignOut = useUserSignOut();
  const f = useFormatMessage();
  return useCallback(
    (error: IApiError) => {
      switch (parseApiErrorMessage(error)) {
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

export function useHandleGraphqlError() {
  const userSignOut = useUserSignOut();
  const f = useFormatMessage();
  return useCallback(
    (error: ApolloError) => {
      const errorCode = getGraphqlErrorCode(error);
      switch (errorCode) {
        case EParseErrorCode.InvalidSessionToken:
          userSignOut();
          break;
        case EParseErrorCode.ConnectionFailed:
        default:
          message.destroy();
          message.error(f('networkError'));
      }
    },
    [userSignOut, f]
  );
}
