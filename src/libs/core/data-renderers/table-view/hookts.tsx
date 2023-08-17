import { isEqual } from 'lodash';
import { useCallback, useState } from 'react';

export function useDeepState<S>(
  initialState: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [state, _setState] = useState(initialState);
  const setState: typeof _setState = useCallback(
    (arg) =>
      _setState((old) => {
        const data = arg instanceof Function ? arg(old) : arg;
        return isEqual(old, data) ? old : data;
      }),
    []
  );
  return [state, setState];
}
