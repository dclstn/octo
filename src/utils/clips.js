import { StorageKeys, Games } from './contants';
import storage from './storage';
import { getClipsByGame } from './twitch';

export default async function getClips() {
  const searchByGame = storage.get(StorageKeys.GAME_ENABLED);

  if (searchByGame) {
    const gameKey = storage.get(StorageKeys.GAME_SET);
    const period = storage.get(StorageKeys.DATE_KEY);
    const dateEnabled = storage.get(StorageKeys.DATE_ENABLED);

    const game = Games.find(({ key }) => key === gameKey);

    if (game == null) {
      Promise.reject(new Error('Could not find game.'));
    }

    let response;

    if (period.length > 0 && dateEnabled) {
      const start = new Date(period[0]).toISOString();
      const end = new Date(period[1]).toISOString();

      response = await getClipsByGame(game.id, start, end);
    } else {
      response = await getClipsByGame(game.id);
    }

    return response.data;
  }

  return {
    data: [],
  };
}
