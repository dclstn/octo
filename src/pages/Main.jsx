import React from 'react';
import { IconButton, Panel } from 'rsuite';
import { FileDownload, Search } from '@rsuite/icons';
import GameDropdown from '../components/GameDropdown';
import UserWhitelist from '../components/UserWhitelist';
import styles from './Main.module.css';
import RemoveDuplicates from '../components/RemoveDuplicates';
import twitchApi from '../utils/twitch-api';

export default function Main() {
  async function handleSearch() {
    const res = await twitchApi.get('users', { auth: true });
    console.log(res);
  }

  return (
    <div className={styles.content}>
      <Panel bordered>
        <div className={styles.config}>
          <GameDropdown />
          <UserWhitelist />
          <RemoveDuplicates />
        </div>
      </Panel>
      <IconButton onClick={() => handleSearch()} icon={<Search />}>
        Search for Clips
      </IconButton>
      <Panel bordered>clips</Panel>
      <IconButton disabled appearance="primary" icon={<FileDownload />}>
        Download Clips
      </IconButton>
    </div>
  );
}
