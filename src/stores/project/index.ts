import { action, makeAutoObservable } from 'mobx';
import type { IRandomPhoto } from '../../libs/unsplash/types';

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
  public selectedBuiltinColor: string | null = null;
  public selectedUnsplashPhoto: IRandomPhoto | null = null;
  public standByBuiltinColors = builtinColors;
  public standByUnsplashPhotos: IRandomPhoto[] = [];

  constructor() {
    makeAutoObservable(this, {
      setStandByUnsplashPhotos: action,
    });
  }

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
