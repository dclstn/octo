import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageKeys } from '../utils/contants';
import storage from '../utils/storage';
import twitchApi from '../utils/twitch-api';

function saveCredentials() {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.hash);
  const params = Object.fromEntries(urlSearchParams.entries());

  // eslint-disable-next-line no-prototype-builtins
  if (!params.hasOwnProperty('#access_token')) {
    window.location.pathname = '/';
    return;
  }

  const token = params['#access_token'];

  storage.set(StorageKeys.TWITCH_AUTH, {
    token,
    scope: params.scope,
  });

  twitchApi.setAccessToken(token);

  const lastVisit = storage.get(StorageKeys.LAST_VISIT);
  navigate(lastVisit);
}

export default function TwitchAuthentication() {
  useEffect(() => saveCredentials(), []);

  return <h1>Hello</h1>;
}
