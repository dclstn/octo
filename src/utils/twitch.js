import twitchApi from './twitch-api';

let currentUser = null;

export function getClipsByChannel() {
  return twitchApi.get('clips');
}

export async function getCurrentUser() {
  if (currentUser != null) {
    return currentUser;
  }

  const { data } = await twitchApi.get('users', { auth: true });
  [currentUser] = data.data;

  return currentUser;
}
