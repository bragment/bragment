import { ERoutePath, ERoutePathName } from './types';

export function getWorkspaceInstancePath(id: string) {
  return ERoutePath.WorkspaceInstance.replace(ERoutePathName.WorkspaceId, id);
}
