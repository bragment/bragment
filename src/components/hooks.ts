import type { PrimitiveType } from 'intl-messageformat';
import { useCallback, useContext } from 'react';
import { useIntl } from 'react-intl';
import { convertToGlobalId } from '../api/apollo';
import {
  EClassName,
  useGetProjectAllItemsQuery,
  useGetProjectColumnQuery,
  useGetProjectItemQuery,
  useGetProjectQuery,
  useGetProjectViewQuery,
} from '../graphql';
import type { ILocalMessages } from '../i18n/types';
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

export function useGetProjectAllItems(objectId: string) {
  return useGetProjectAllItemsQuery({
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
