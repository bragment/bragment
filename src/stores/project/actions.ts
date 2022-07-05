import { getRandomPhoto } from '../../libs/unsplash';
import projectStore from './index';

export async function loadStandByUnsplashPhotos() {
  const photos = await getRandomPhoto();
  projectStore.setStandByUnsplashPhotos(photos);
  return photos;
}

export function resetSelectedUnsplashPhoto() {
  const { selectedBuiltinColor, selectedUnsplashPhoto, standByUnsplashPhotos } =
    projectStore;
  if (selectedBuiltinColor) {
    return;
  }
  let newPhoto = standByUnsplashPhotos[0];
  if (selectedUnsplashPhoto) {
    newPhoto =
      standByUnsplashPhotos.find((el) => el.id === selectedUnsplashPhoto.id) ||
      newPhoto;
  }
  projectStore.setSelectedUnsplashPhoto(newPhoto);
}
