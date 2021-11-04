import querystring from 'querystring';
import axios from 'axios';
import storage from './storage';
import { StorageKeys } from './contants';

const API_ENDPOINT = 'https://api.twitch.tv/helix/';
const GQL_ENDPOINT = 'https://gql.twitch.tv/gql';
const CLIENT_ID = 'w6e6774i052v1ds6acg6oy64zufmny';

let accessToken = storage.get(StorageKeys.TWITCH_AUTH).token;

function request(method, path, options = {}) {
  const url = options.url
    || `${API_ENDPOINT}${path}${options.qs ? `?${querystring.stringify(options.qs)}` : ''}`;

  return axios({
    url,
    method,
    data: options.body ? JSON.stringify(options.body) : undefined,
    headers: {
      'Client-ID': CLIENT_ID,
      Authorization: options.auth && accessToken !== null ? `Bearer ${accessToken}` : undefined,
    },
    timeout: 30000,
  });
}

export default {
  setAccessToken(newAccessToken) {
    accessToken = newAccessToken;
  },

  graphqlQuery(query, variables) {
    if (accessToken == null) {
      return Promise.reject(new Error('unset accessToken'));
    }

    const body = { query };
    if (variables) {
      body.variables = variables;
    }

    return request('POST', null, {
      url: GQL_ENDPOINT,
      body,
      auth: true,
    });
  },

  get(path, options) {
    return request('GET', path, options);
  },

  post(path, options) {
    return request('POST', path, options);
  },

  put(path, options) {
    return request('PUT', path, options);
  },

  patch(path, options) {
    return request('PATCH', path, options);
  },

  delete(path, options) {
    return request('DELETE', path, options);
  },
};
