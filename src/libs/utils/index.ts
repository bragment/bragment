export function getMetaValue(name: string) {
  const meta = window.document.querySelector(`meta[name=${name}]`);
  return meta?.getAttribute('content');
}

export function getEnvironment() {
  return getMetaValue('environment');
}
