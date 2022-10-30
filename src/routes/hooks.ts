import { useCallback } from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';

export function useNavigateToPage() {
  const navigate = useNavigate();
  return useCallback(
    (path: string, options?: NavigateOptions) => {
      navigate(path, options);
    },
    [navigate]
  );
}
