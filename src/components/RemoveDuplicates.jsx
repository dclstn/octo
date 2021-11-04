import React, { useState } from 'react';
import { Checkbox } from 'rsuite';
import { StorageKeys } from '../utils/contants';
import storage from '../utils/storage';
import styles from './RemoveDuplicates.module.css';

export default function RemoveDuplicates() {
  const [removeDuplicates, setRemoveDuplicates] = useState(
    storage.get(StorageKeys.REMOVE_DUPLICATES),
  );

  function handleRemoveDuplicates(value) {
    storage.set(StorageKeys.USER_WHITELIST, value);
    setRemoveDuplicates(value);
  }

  return (
    <div className={styles.toggle}>
      <Checkbox checked={removeDuplicates} onChange={(_, bool) => handleRemoveDuplicates(bool)} />
      <div>Remove Duplicates</div>
    </div>
  );
}
