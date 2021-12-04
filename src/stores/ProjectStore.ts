import { makeAutoObservable } from 'mobx';

export default class ProjectStore {
  public loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setLoading = (loading: boolean) => {
    this.loading = loading;
  };
}
