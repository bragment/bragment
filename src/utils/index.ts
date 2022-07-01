export function getFirstChar(str: string, upperCase = true) {
  for (const ch of str) {
    return upperCase ? ch.toUpperCase() : ch;
  }
}
