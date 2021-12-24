import { action, computed, makeAutoObservable } from 'mobx';
import {
  getMainColor,
  getMainImageUrl,
  getThumbImageUrl,
} from '../../api/unsplash/helpers';
import type { IRandomPhoto } from '../../api/unsplash/types';
import { IBackground, ISelectedStandByBgData } from '../types';

class ProjectStore {
  public loading = false;
  public standByUnsplashPhotos: IRandomPhoto[] = [];
  public selectedStandByBgData: ISelectedStandByBgData | null = null;
  public standByBgColors = [
    '#2196f3',
    '#00bcd4',
    '#4caf50',
    '#9e9e9e',
    '#ff9800',
    '#9c27b0',
    '#f44336',
    '#fbc02d',
  ];
  get standByBgPhotos() {
    return this.standByUnsplashPhotos.map((photo) => ({
      image: getThumbImageUrl(getMainImageUrl(photo)),
      color: getMainColor(photo),
    }));
  }
  get selectedStandByBg() {
    const bg: IBackground = {};
    if (this.selectedStandByBgData) {
      const { index, type } = this.selectedStandByBgData;
      if (type === 'color') {
        bg.color = this.standByBgColors[index];
      }
      if (type === 'photo') {
        bg.image = this.standByBgPhotos[index].image;
        bg.color = this.standByBgPhotos[index].color;
      }
    }
    return bg;
  }

  constructor() {
    makeAutoObservable(this, {
      standByBgPhotos: computed,
      setStandByUnsplashPhotos: action,
    });
  }

  public setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  public setStandByUnsplashPhotos = (photos: IRandomPhoto[]) => {
    this.standByUnsplashPhotos = photos;
  };

  public setSelectedStandByBgData = (data: ISelectedStandByBgData | null) => {
    this.selectedStandByBgData = data;
  };
}

export default new ProjectStore();
