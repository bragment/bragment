export function getMetaValue(name: string) {
  const meta = window.document.querySelector(`meta[name=${name}]`);
  return meta?.getAttribute('content');
}

export function getEnvironment() {
  return getMetaValue('environment');
}

export function getServerURL() {
  return process.env.SERVER_URL || '/parse';
}

export function getGraphqlURL() {
  return process.env.GRAPHQL_URL || '/graphql';
}
