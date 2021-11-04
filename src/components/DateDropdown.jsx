import React, { useState } from 'react';
import { Checkbox, DateRangePicker } from 'rsuite';
import { StorageKeys } from '../utils/contants';
import storage from '../utils/storage';
import styles from './DateDropdown.module.css';

export default function DateDropdown() {
  const [, setDateValue] = useState(storage.get(StorageKeys.DATE_KEY));
  const [dateEnabled, setDateEnabled] = useState(storage.get(StorageKeys.DATE_ENABLED));

  function handleGameKey(value) {
    storage.set(StorageKeys.DATE_KEY, value);
    setDateValue(value);
  }

  function handleDateEnabled(value) {
    storage.set(StorageKeys.DATE_ENABLED, value);
    setDateEnabled(value);
  }

  return (
    <div className={styles.content}>
      <div className={styles.toggle}>
        <Checkbox onChange={(_, bool) => handleDateEnabled(bool)} checked={dateEnabled} />
        <div>Filter by date</div>
      </div>
      <DateRangePicker
        placeholder="Select Date Range"
        disabled={!dateEnabled}
        size="sm"
        placement="auto"
        onChange={(value) => handleGameKey(value)}
      />
    </div>
  );
}
