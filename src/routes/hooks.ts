import { useCallback } from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import { getProjectInstancePath, getWorkspaceInstancePath } from './helpers';

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
