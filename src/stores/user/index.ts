import { computed, makeAutoObservable } from 'mobx';
import { setSentryUser, unsetSentryUser } from '../../api/sentry';
import { IWorkspaceFragment, WorkspaceType } from '../../graphql';
import { ICurrentUser } from '../types';

class UserStore {
  public current: ICurrentUser | undefined;
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

  public setCurrent = (user: ICurrentUser | undefined) => {
    this.current = user;
    if (user) {
      setSentryUser({
        id: user.id,
        email: user.getEmail(),
        username: user.getUsername(),
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
