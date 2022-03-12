import { action, makeAutoObservable } from 'mobx';
import type { IRandomPhoto } from '../../api/unsplash/types';
import { IProjectFragment } from '../../graphql';

const builtinColors = [
  '#2196f3',
  '#00bcd4',
  '#4caf50',
  '#9e9e9e',
  '#ff9800',
  '#9c27b0',
  '#f44336',
  '#fbc02d',
];

class ProjectStore {
  public current: IProjectFragment | null = null;
  public loading = false;
  public selectedBuiltinColor: string | null = null;
  public selectedUnsplashPhoto: IRandomPhoto | null = null;
  public standByBuiltinColors = builtinColors;
  public standByUnsplashPhotos: IRandomPhoto[] = [];

  constructor() {
    makeAutoObservable(this, {
      setStandByUnsplashPhotos: action,
    });
  }

  public setCurrent = (project: IProjectFragment | null) => {
    this.current = project;
  };

  public setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  public setStandByUnsplashPhotos = (photos: IRandomPhoto[]) => {
    this.standByUnsplashPhotos = photos;
  };

  public setSelectedUnsplashPhoto = (photo: IRandomPhoto | null) => {
    this.selectedUnsplashPhoto = photo;
  };

  public setSelectedBuiltinColor = (color: string | null) => {
    this.selectedBuiltinColor = color;
  };
}

export default new ProjectStore();
