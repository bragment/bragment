import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateElementScrollable(el: HTMLElement) {
  if (el.scrollTop > 0) {
    // container.classList.add('top-scrollable');
    el.dataset.topScrollable = 'true';
  } else {
    // container.classList.remove('top-scrollable');
    delete el.dataset.topScrollable;
  }
  if (el.scrollLeft > 0) {
    // container.classList.add('left-scrollable');
    el.dataset.leftScrollable = 'true';
  } else {
    // container.classList.remove('left-scrollable');
    delete el.dataset.leftScrollable;
  }
  if (el.scrollTop + el.clientHeight < el.scrollHeight) {
    // container.classList.add('bottom-scrollable');
    el.dataset.bottomScrollable = 'true';
  } else {
    // container.classList.remove('bottom-scrollable');
    delete el.dataset.bottomScrollable;
  }
  if (el.scrollLeft + el.clientWidth < el.scrollWidth) {
    // container.classList.add('right-scrollable');
    el.dataset.rightScrollable = 'true';
  } else {
    // container.classList.remove('right-scrollable');
    delete el.dataset.rightScrollable;
  }
}
