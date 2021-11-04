export const StorageKeys = {
  USER_WHITELIST: 'user:whitelist',
  GAME_SET: 'game:set',
  GAME_ENABLED: 'game:enabled',
  REMOVE_DUPLICATES: 'duplicates:remove',
  TWITCH_AUTH: 'twitch:oauth',
  LAST_VISIT: 'visit:last',
};

export const Games = [
  {
    name: 'Overwatch',
    key: 'overwatch',
  },
  {
    name: 'Valorant',
    key: 'valorant',
  },
  {
    name: 'Apex Legends',
    key: 'apex',
  },
];

export const DefaultStorageVaues = {
  [StorageKeys.USER_WHITELIST]: false,
  [StorageKeys.GAME_ENABLED]: false,
  [StorageKeys.GAME_SET]: 'overwatch',
  [StorageKeys.REMOVE_DUPLICATES]: false,
  [StorageKeys.LAST_VISIT]: '/',
  [StorageKeys.TWITCH_AUTH]: {
    token: null,
    scope: null,
  },
};
