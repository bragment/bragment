import { ROUTE_BEFORE_SIGN_IN } from './types';

export function getTheRoutePathBeforeSignIn(once = false) {
  const item = window.sessionStorage.getItem(ROUTE_BEFORE_SIGN_IN);
  if (once) {
    window.sessionStorage.removeItem(ROUTE_BEFORE_SIGN_IN);
  }
  return item;
}

export function setTheRoutePathBeforeSignIn(url: string) {
  return window.sessionStorage.setItem(ROUTE_BEFORE_SIGN_IN, url);
}
