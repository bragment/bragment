import { getRandomPhoto } from '../../api/unsplash';
import projectStore from './index';

export async function loadStandByUnsplashPhotos() {
  const photos = await getRandomPhoto();
  projectStore.setStandByUnsplashPhotos(photos);
  return photos;
}
