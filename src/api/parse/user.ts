import Parse from 'parse';

export enum EUserErrorCode {
  InternetDisconnected = 100,
  PasswordInvalid = 101,
  UsernameExists = 202,
  EmailExists = 203,
}

export function signUp(username: string, password: string, email?: string) {
  return Parse.User.signUp(username, password, { email });
}

export function signIn(username: string, password: string) {
  return Parse.User.logIn(username, password);
}

export function signOut() {
  return Parse.User.logOut();
}

export function requestPasswordReset(email: string) {
  return Parse.User.requestPasswordReset(email);
}

export function getCurrentUser() {
  return Parse.User.current();
}
