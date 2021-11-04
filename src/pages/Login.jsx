import React from 'react';
import { Button, Panel } from 'rsuite';
import { StorageKeys, TWITCH_AUTH_URL } from '../utils/contants';
import storage from '../utils/storage';
import styles from './Login.module.css';

export default function LoginWithTwitch() {
  function handleClick() {
    storage.set(StorageKeys.LAST_VISIT, window.location.pathname);
    window.location.href = TWITCH_AUTH_URL;
  }

  return (
    <Panel className={styles.panel} bordered>
      <div className={styles.content}>
        <h3>🐙 Octo</h3>
        <p className={styles.description}>
          This application requires you to authenticate you Twitch account to proceed
        </p>
        <Button onClick={() => handleClick()} appearance="primary">
          Login with Twitch
        </Button>
      </div>
    </Panel>
  );
}
