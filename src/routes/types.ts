export enum ERoutePathName {
  Any = '*',
  Setting = 'setting',
  Workspace = 'workspace',
  Project = 'project',
  Create = 'create',
  Id = ':id',
}

export enum ERoutePath {
  Root = '/',
  Home = '/',
  SignIn = '/signIn',
  Setting = '/setting',
  Workspace = '/workspace',
  WorkspaceCreate = '/workspace/create',
  Project = '/project/:id',
}
