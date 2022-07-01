import { computed, makeAutoObservable } from 'mobx';
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
  public targetWorkspaceId: string | undefined;
  public signedIn = getLocalSignedIn();

  get mainWorkspaceId() {
    return this.current?.mainWorkspace;
  }

  constructor() {
    makeAutoObservable(this, { mainWorkspaceId: computed });
  }

  public setCurrent = (user: IUser | null) => {
    this.current = user;
    this.setSignedIn(!!user);
  };

  public updateCurrent = (user: Partial<IUser>) => {
    if (this.current) {
      this.setCurrent({ ...this.current, ...user });
    }
  };

  public setTargetWorkspaceId = (workspaceId: string | undefined) => {
    this.targetWorkspaceId = workspaceId;
  };

  public setMainWorkspaceId = (workspaceId: string) => {
    this.updateCurrent({ mainWorkspace: workspaceId });
  };

  public setSignedIn = (signedIn: boolean) => {
    setLocalSignedIn(signedIn);
    this.signedIn = signedIn;
  };
}

export default new UserStore();
