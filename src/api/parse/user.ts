import { User } from 'parse';

export enum EUserErrorCode {
  INTERNET_DISCONNECTED = 100,
  PASSWORD_INVALID = 101,
  USERNAME_EXISTS = 202,
  EMAIL_EXISTS = 203,
}

export function signUp(username: string, password: string, email?: string) {
  return User.signUp(username, password, { email });
}

export function signIn(username: string, password: string) {
  return User.logIn(username, password);
}

export function signOut() {
  return User.logOut();
}

export function requestPasswordReset(email: string) {
  return User.requestPasswordReset(email);
}

export function getCurrentUser() {
  return User.current();
}
