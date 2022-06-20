import { computed, makeAutoObservable } from 'mobx';
import { setSentryUser, unsetSentryUser } from '../../api/sentry';
import { IWorkspaceFragment, WorkspaceType } from '../../graphql';
import { setCachedCurrentUser } from '../../libs/client';
import { ICurrentUser } from '../types';

class UserStore {
  public current: ICurrentUser | null = null;
  public workspaces: IWorkspaceFragment[] = [];
  get signedIn() {
    return !!this.current;
  }
  get currentPersonalWorkspace() {
    return this.workspaces.find((el) => el.type === WorkspaceType.Personal);
  }

  constructor() {
    makeAutoObservable(this, {
      signedIn: computed,
    });
  }

  public setCurrent = (user: ICurrentUser | null) => {
    this.current = user;
    setCachedCurrentUser(user);
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

  public setWorkspaces = (workspaces: IWorkspaceFragment[]) => {
    this.workspaces = workspaces;
  };
}

export default new UserStore();
