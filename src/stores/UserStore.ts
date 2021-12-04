import { computed, makeAutoObservable } from 'mobx';
import { ICurrentUser } from './types';

export default class UserStore {
  public current: ICurrentUser | undefined;
  get signedIn() {
    return !!this.current;
  }

  constructor() {
    makeAutoObservable(this, {
      signedIn: computed,
    });
  }

  public setCurrent = (user: ICurrentUser | undefined) => {
    this.current = user;
  };
}
