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
  return prefix;
}

export function getCurrentSearchParam(name: string) {
  const url = new URL(window.location.href);
  if (url.searchParams) {
    return url.searchParams.get(name);
  }
  const search = url.search.slice(1);
  const item = search
    .split('&')
    .map((el) => el.split('='))
    .find((el) => el[0] === name);
  if (item) {
    return decodeURI(item[1]);
  }
  return null;
}
