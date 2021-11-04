import twitchApi from './twitch-api';

let currentUser = null;

export function getClipsByGame(id, start = null, end = null) {
  return start == null && end == null
    ? twitchApi.get(`clips?game_id=${id}`, { auth: true })
    : twitchApi.get(`clips?game_id=${id}&started_at=${start}&ended_at=${end}`, { auth: true });
}

export function getAllClips(start = null, end = null) {
  return start == null && end == null
    ? twitchApi.get('clips', { auth: true })
    : twitchApi.get(`clips?started_at=${start}&ended_at=${end}`, { auth: true });
}

export function getGames(name) {
  return twitchApi.get(`games?name=${name}`, { auth: true });
}

export async function getCurrentUser() {
  if (currentUser != null) {
    return currentUser;
  }

  const { data } = await twitchApi.get('users', { auth: true });
  [currentUser] = data.data;

  return currentUser;
}
