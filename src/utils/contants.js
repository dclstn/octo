export const StorageKeys = {
  USER_WHITELIST: 'user:whitelist',
  GAME_SET: 'game:set',
  GAME_ENABLED: 'game:enabled',
  REMOVE_DUPLICATES: 'duplicates:remove',
  TWITCH_AUTH: 'twitch:access_token',
  TWITCH_OAUTH: 'twitch:oauth',
  LAST_VISIT: 'visit:last',
  DATE_KEY: 'date:key',
  DATE_ENABLED: 'date:enabled',
};

export const CLIENT_ID = '44myc6m2b760fckgsbpko1upvjv2kb';
export const TWITCH_AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:8000/twitch&response_type=token&scope=user:edit`;

export const Games = [
  {
    name: 'Overwatch',
    id: '488552',
    key: 'overwatch',
  },
  {
    name: 'Valorant',
    id: '516575',
    key: 'valorant',
  },
  {
    name: 'Apex Legends',
    id: '511224',
    key: 'apex',
  },
];

export const DefaultStorageVaues = {
  [StorageKeys.USER_WHITELIST]: false,
  [StorageKeys.GAME_ENABLED]: false,
  [StorageKeys.GAME_SET]: 'overwatch',
  [StorageKeys.REMOVE_DUPLICATES]: false,
  [StorageKeys.LAST_VISIT]: '/',
  [StorageKeys.DATE_KEY]: [],
  [StorageKeys.DATE_ENABLED]: false,
  [StorageKeys.TWITCH_AUTH]: {
    token: null,
    scope: null,
  },
  [StorageKeys.TWITCH_OAUTH]: null,
};
