import { makeAutoObservable } from 'mobx';
import { IUser } from '../../libs/client/types';

const SIGNED_IN = 'SIGNED_IN';
function getLocalSignedIn() {
  return !!window.localStorage.getItem(SIGNED_IN);
}
function setLocalSignedIn(signedIn: boolean) {
  if (signedIn) {
    window.localStorage.setItem(SIGNED_IN, 'true');
  } else {
    window.localStorage.removeItem(SIGNED_IN);
  }
}

class UserStore {
  public current: IUser | null = null;
  public signedIn = getLocalSignedIn();

  constructor() {
    makeAutoObservable(this);
  }

  public setCurrent = (user: IUser | null) => {
    this.current = user;
    this.setSignedIn(!!user);
  };

  public setSignedIn = (signedIn: boolean) => {
    setLocalSignedIn(signedIn);
    this.signedIn = signedIn;
  };
}

export default new UserStore();
