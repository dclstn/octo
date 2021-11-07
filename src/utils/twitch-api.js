import querystring from 'querystring';
import axios from 'axios';
import storage from './storage';
import { CLIENT_ID, StorageKeys } from './contants';

const API_ENDPOINT = 'https://api.twitch.tv/helix/';
const GQL_ENDPOINT = 'https://gql.twitch.tv/gql';

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
      Authorization: `Bearer ${accessToken}`,
    },
    timeout: 30000,
  });
}

export default {
  setAccessToken(newAccessToken) {
    accessToken = newAccessToken;
  },

  graphqlQuery(data) {
    return axios.post(GQL_ENDPOINT, data, {
      headers: {
        'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
      },
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
