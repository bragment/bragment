export enum ERoutePathName {
  Any = '*',
  Auth = 'Auth',
  Create = 'create',
  ForgotPassword = 'forgotPassword',
  Home = '',
  Id = ':id',
  Project = 'project',
  Setting = 'setting',
  SignIn = 'signIn',
  SignUp = 'signUp',
  Workspace = 'workspace',
  WorkspaceId = ':workspaceId',
}

export enum ERoutePath {
  AuthSignIn = '/auth/signIn',
  AuthSignUp = '/auth/signUp',
  AuthForgotPassword = '/auth/forgotPassword',
  Root = '/',
  Home = '/',
  SignIn = '/signIn',
  Setting = '/setting',
  Workspace = '/workspace',
  WorkspaceCreate = '/workspace/create',
  WorkspaceInstance = '/workspace/:workspaceId',
  Project = '/project/:id',
}
