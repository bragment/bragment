import { createApi } from 'unsplash-js';
import type { IRandomPhoto } from './types';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

export async function getRandomPhoto(count = 4): Promise<IRandomPhoto[]> {
  try {
    const result = await unsplash.photos.getRandom({
      count,
      collectionIds: ['wallpapers'],
      query: 'desktop',
    });
    const photos = result.response;
    if (photos instanceof Array) {
      return photos;
    }
    return photos ? [photos] : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export * from './helpers';
