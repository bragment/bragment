export function getFirstChar(str: string, upperCase = true) {
  for (const ch of str) {
    return upperCase ? ch.toUpperCase() : ch;
  }
}

export function checkIfSafari() {
  const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
  const isSafari = navigator.userAgent.indexOf('Safari') > -1;
  if (isSafari) {
    if (isChrome) return false;
    else return true;
  }
  return false;
}
