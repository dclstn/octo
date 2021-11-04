import React, { useState } from 'react';
import { Divider, IconButton, Panel } from 'rsuite';
import { FileDownload, Search } from '@rsuite/icons';
import GameDropdown from '../components/GameDropdown';
import UserWhitelist from '../components/UserWhitelist';
import styles from './Main.module.css';
import getClips from '../utils/clips';
import DateDropdown from '../components/DateDropdown';
import ClipsTable from '../components/ClipsTable';
import RemoveDuplicates from '../components/RemoveDuplicates';

export default function Main() {
  const [clips, setClips] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    const { data } = await getClips();
    setClips(data);
    setLoading(false);
  }

  return (
    <div className={styles.content}>
      <Panel>
        <div className={styles.config}>
          <GameDropdown />
          <UserWhitelist />
          <DateDropdown />
          <RemoveDuplicates />
          <IconButton
            appearance="default"
            className={styles.searchButton}
            size="sm"
            loading={loading}
            onClick={() => handleSearch()}
            icon={<Search />}
          >
            Search for Clips
          </IconButton>
        </div>
        <Divider />

        <IconButton
          disabled={checkedKeys.length === 0}
          appearance="primary"
          size="sm"
          icon={<FileDownload />}
        >
          {`Download ${checkedKeys.length} clips`}
        </IconButton>
      </Panel>
      <ClipsTable clips={clips} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
    </div>
  );
}
