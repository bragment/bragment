import { builtinColors } from './types';

export function getRandomColor(existing?: string[]) {
  const set = new Set(existing);
  let list = set.size
    ? builtinColors.filter((el) => set.has(el))
    : builtinColors;
  list = list.length ? list : builtinColors;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}
