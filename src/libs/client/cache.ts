import { IUser } from './types';

const CURRENT_USER = 'CURRENT_USER';

export function getCachedCurrentUser() {
  try {
    const data = window.localStorage.getItem(CURRENT_USER);
    if (data) {
      return JSON.parse(data) as IUser;
    }
  } catch (error) {
    // do nothing
  }
  return null;
}

export function setCachedCurrentUser(user: IUser | null) {
  if (user) {
    window.localStorage.setItem(
      CURRENT_USER,
      JSON.stringify({ _id: user._id })
    );
  } else {
    window.localStorage.removeItem(CURRENT_USER);
  }
}
