export function getFirstChar(str: string, upperCase = true) {
  for (const ch of str) {
    return upperCase ? ch.toUpperCase() : ch;
  }
}

export function verifyEmail(email: string) {
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
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

export function getAvailableTitle(prefix: string, existing?: string[]) {
  const existingSet = new Set(existing || []);
  let i = 0;
  while (++i) {
    const title = `${prefix}${i}`;
    if (!existingSet.has(title)) {
      return title;
    }
  }
}
