import { computed, makeAutoObservable } from 'mobx';
import { IUser } from '../../libs/client/types';
import { setSentryUser, unsetSentryUser } from '../../libs/sentry';

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
  public me: IUser | null = null;
  public signedIn = getLocalSignedIn();

  get myMainWorkspaceId() {
    return this.me?.mainWorkspace;
  }

  constructor() {
    makeAutoObservable(this, { myMainWorkspaceId: computed });
  }

  public setMe = (user: IUser | null) => {
    this.me = user;
    this.setSignedIn(!!user);
    if (user) {
      setSentryUser({
        id: user._id,
        email: user.email,
        username: user.username,
      });
    } else {
      unsetSentryUser();
    }
  };

  public updateMe = (user: Partial<IUser>) => {
    if (this.me) {
      this.setMe({ ...this.me, ...user });
    }
  };

  public setMyMainWorkspaceId = (workspaceId: string) => {
    this.updateMe({ mainWorkspace: workspaceId });
  };

  public setSignedIn = (signedIn: boolean) => {
    setLocalSignedIn(signedIn);
    this.signedIn = signedIn;
  };
}

export default new UserStore();
