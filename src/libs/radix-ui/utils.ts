import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateElementScrollable(el: HTMLElement) {
  if (el.scrollTop > 0) {
    el.dataset.topScrollable = 'true';
  } else {
    delete el.dataset.topScrollable;
  }
  if (el.scrollLeft > 0) {
    el.dataset.leftScrollable = 'true';
  } else {
    delete el.dataset.leftScrollable;
  }
  if (el.scrollTop + el.clientHeight < el.scrollHeight) {
    el.dataset.bottomScrollable = 'true';
  } else {
    delete el.dataset.bottomScrollable;
  }
  if (el.scrollLeft + el.clientWidth < el.scrollWidth) {
    el.dataset.rightScrollable = 'true';
  } else {
    delete el.dataset.rightScrollable;
  }
}
