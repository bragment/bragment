import { ERoutePath, ERoutePathName } from './types';

export function getWorkspaceInstancePath(id: string) {
  return ERoutePath.WorkspaceInstance.replace(ERoutePathName.WorkspaceId, id);
}

export function getProjectInstancePath(id: string) {
  return ERoutePath.ProjectInstance.replace(ERoutePathName.ProjectId, id);
}

export function getProjectDataModelPath(projectId: string, modelId: string) {
  return ERoutePath.ProjectDataModel.replace(
    ERoutePathName.ProjectId,
    projectId
  ).replace(ERoutePathName.ModelId, modelId);
}
