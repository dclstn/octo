import React, { useMemo, useState } from 'react';
import {
  Divider, IconButton, Panel, Progress,
} from 'rsuite';
import { FileDownload, Search } from '@rsuite/icons';
import GameDropdown from '../components/GameDropdown';
import styles from './Main.module.css';
import getClips from '../utils/clips';
import DateDropdown from '../components/DateDropdown';
import ClipsTable from '../components/ClipsTable';
import getClipMetaData from '../utils/download';

const { ipcRenderer } = window.require('electron');

export default function Main() {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clips, setClips] = useState([]);
  const [progress, setProgress] = useState(100);

  const checkedClips = useMemo(
    () => clips.filter(({ id }) => checkedKeys.includes(id)),
    [checkedKeys],
  );

  async function handleDownload() {
    const responses = await getClipMetaData(checkedClips);
    await ipcRenderer.invoke('select-directory');

    const iteration = 100 / responses.length;
    setProgress(0);
    setLoading(true);

    responses.forEach(async ({ url, meta }) => {
      await ipcRenderer.invoke('download-clip', url, meta);
      setProgress((prog) => prog + iteration);
    });

    setLoading(false);
  }

  async function handleSearch() {
    setLoading(true);
    setClips([]);
    setCheckedKeys([]);

    const { data } = await getClips();

    setClips(data);
    setLoading(false);
  }

  return (
    <div className={styles.content}>
      <Panel>
        <div className={styles.config}>
          <GameDropdown />
          <DateDropdown />
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
        <div className={styles.config}>
          <Progress percent={progress} />
          <IconButton
            disabled={checkedKeys.length === 0}
            appearance="primary"
            size="sm"
            icon={<FileDownload />}
            onClick={() => handleDownload(checkedClips)}
          >
            {`Download ${checkedKeys.length} clips`}
          </IconButton>
        </div>
      </Panel>
      <ClipsTable clips={clips} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
    </div>
  );
}
