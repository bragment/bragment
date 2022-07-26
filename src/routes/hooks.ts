import { useCallback } from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import {
  getProjectDataModelPath,
  getProjectDataViewPath,
  getProjectInstancePath,
  getWorkspaceInstancePath,
} from './helpers';

export function useNavigateWorkspaceInstancePage() {
  const navigate = useNavigate();
  return useCallback(
    (id: string, options?: NavigateOptions) => {
      navigate(getWorkspaceInstancePath(id), options);
    },
    [navigate]
  );
}

export function useNavigateProjectInstancePage() {
  const navigate = useNavigate();
  return useCallback(
    (id: string, options?: NavigateOptions) => {
      navigate(getProjectInstancePath(id), options);
    },
    [navigate]
  );
}

export function useNavigateProjectDataModelPage() {
  const navigate = useNavigate();
  return useCallback(
    (projectId: string, modelId: string, options?: NavigateOptions) => {
      navigate(getProjectDataModelPath(projectId, modelId), options);
    },
    [navigate]
  );
}

export function useNavigateProjectViewPage() {
  const navigate = useNavigate();
  return useCallback(
    (
      projectId: string,
      modelId: string,
      viewId: string,
      options?: NavigateOptions
    ) => {
      navigate(getProjectDataViewPath(projectId, modelId, viewId), options);
    },
    [navigate]
  );
}
