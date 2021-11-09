import React, { useState } from 'react';
import { Button, Message, Panel } from 'rsuite';
import { StorageKeys } from '../utils/contants';
import storage from '../utils/storage';
import twitchApi from '../utils/twitch-api';
import styles from './Login.module.css';

const { ipcRenderer } = window.require('electron');

export default function LoginWithTwitch({ setAuthenticated }) {
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const { token, scope } = await ipcRenderer.invoke('create-auth-window');
      storage.set(StorageKeys.TWITCH_AUTH, {
        token,
        scope,
      });

      twitchApi.setAccessToken(token);
      setAuthenticated(true);
    } catch (e) {
      setError(e);
    }
  }

  return (
    <Panel className={styles.panel} bordered>
      {error != null ? <Message type="error">{error.message}</Message> : null}
      <div className={styles.content}>
        <h3>🐙 Octo</h3>
        <p className={styles.description}>
          This application requires you to authenticate your Twitch account to proceed.
        </p>
        <Button onClick={() => handleClick()} appearance="primary">
          Login with Twitch
        </Button>
      </div>
    </Panel>
  );
}
