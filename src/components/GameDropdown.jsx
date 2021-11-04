import React, { useMemo, useState } from 'react';
import {
  Dropdown, IconButton, Popover, Toggle, Whisper,
} from 'rsuite';
import { ArrowDown } from '@rsuite/icons';
import { Games, StorageKeys } from '../utils/contants';
import storage from '../utils/storage';
import styles from './GameDropdown.module.css';

const DropdownInstance = React.forwardRef(({ onSelect, active, ...rest }, ref) => (
  <Popover ref={ref} {...rest} full>
    <Dropdown.Menu onSelect={onSelect} activeKey={active}>
      {Games.map((game) => (
        <Dropdown.Item key={game.key} eventKey={game.key}>
          {game.name}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Popover>
));

export default function GameDropdown() {
  const [gameKey, setGameKey] = useState(storage.get(StorageKeys.GAME_SET));
  const [gameEnabled, setGameEnabled] = useState(storage.get(StorageKeys.GAME_ENABLED));

  function handleGameKey(value) {
    storage.set(StorageKeys.GAME_SET, value);
    setGameKey(value);
  }

  function handleGameEnabled(value) {
    storage.set(StorageKeys.GAME_ENABLED, value);
    setGameEnabled(value);
  }

  const selectedGame = useMemo(() => Games.find(({ key }) => key === gameKey), [gameKey]);

  return (
    <div className={styles.content}>
      <div className={styles.toggle}>
        <Toggle onChange={(bool) => handleGameEnabled(bool)} checked={gameEnabled} />
        <div>Filter by Game</div>
      </div>
      <Whisper
        trigger="click"
        placement="bottomEnd"
        speaker={<DropdownInstance active={gameKey} onSelect={(key) => handleGameKey(key)} />}
      >
        <IconButton size="sm" disabled={!gameEnabled} placement="right" icon={<ArrowDown />}>
          {selectedGame?.name}
        </IconButton>
      </Whisper>
    </div>
  );
}
