import { Edit } from '@rsuite/icons';
import React, { useState } from 'react';
import { Checkbox, IconButton } from 'rsuite';
import { StorageKeys } from '../utils/contants';
import storage from '../utils/storage';
import styles from './UserWhitelist.module.css';

export default function UserWhitelist() {
  const [whitelistEnabled, setWhitelistEnabled] = useState(storage.get(StorageKeys.USER_WHITELIST));

  function setWhitelist(value) {
    storage.set(StorageKeys.USER_WHITELIST, value);
    setWhitelistEnabled(value);
  }

  return (
    <div className={styles.content}>
      <div className={styles.toggle}>
        <Checkbox onChange={(_, bool) => setWhitelist(bool)} checked={whitelistEnabled} />
        <div>Filter by Users</div>
      </div>
      <IconButton icon={<Edit />} disabled={!whitelistEnabled} placement="right" size="sm">
        Edit
      </IconButton>
    </div>
  );
}
