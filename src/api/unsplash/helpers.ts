import type { IRandomPhoto } from './types';

export function getMainImageUrl(photo: IRandomPhoto) {
  return photo.urls.raw;
}

export function getMainColor(photo: IRandomPhoto) {
  return photo.color || undefined;
}

function getScaledImageUrl(mainUrl: string, width: number) {
  // TODO: if it is a unsplash url, then
  return mainUrl + `&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=${width}`;
}

export function getThumbImageUrl(mainUrl: string) {
  return getScaledImageUrl(mainUrl, 200);
}

export function getSmallImageUrl(mainUrl: string) {
  return getScaledImageUrl(mainUrl, 400);
}

export function getRegularImageUrl(mainUrl: string) {
  return getScaledImageUrl(mainUrl, 1080);
}
