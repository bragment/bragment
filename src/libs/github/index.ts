export function getOauthUrl(
  clientId = process.env.GITHUB_CLIENT_ID,
  scope = 'user:email'
) {
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;
}
