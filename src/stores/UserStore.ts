import { makeAutoObservable } from 'mobx';
import { ICurrentUser } from './types';

export default class UserStore {
  public current: ICurrentUser | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  public setCurrent = (user: ICurrentUser | undefined) => {
    this.current = user;
  };
}
