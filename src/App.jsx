import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomProvider } from 'rsuite';
import TwitchAuthentication from './Auth/Twitch';
import LoginWithTwitch from './pages/Login';
import Main from './pages/Main';
import { StorageKeys } from './utils/contants';
import storage from './utils/storage';
import { getCurrentUser } from './utils/twitch';

function ProtectedElement({ element }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    const currentUser = await getCurrentUser();

    if (currentUser == null) {
      storage.set(StorageKeys.LAST_VISIT, window.location.pathname);
      window.location.href = 'https://id.twitch.tv/oauth2/authorize?client_id=w6e6774i052v1ds6acg6oy64zufmny&redirect_uri=http://localhost:3000/twitch&response_type=token&scope=user:edit';
    }

    setAuthenticated(currentUser);
  }, []);

  if (!authenticated) {
    return <LoginWithTwitch />;
  }

  return element;
}

export default function App() {
  return (
    <CustomProvider theme="dark">
      <Router>
        <Routes>
          <Route path="/twitch" element={<TwitchAuthentication />} />
          <Route path="/" element={<ProtectedElement element={<Main />} />} />
        </Routes>
      </Router>
    </CustomProvider>
  );
}
