import React, { useEffect, useState } from 'react';
import { CustomProvider } from 'rsuite';
import LoginWithTwitch from './pages/Login';
import Main from './pages/Main';
import { getCurrentUser } from './utils/twitch';

function ProtectedElement({ element }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    try {
      const currentUser = await getCurrentUser();
      setAuthenticated(currentUser.hasOwnProperty('id'));
    } catch (e) {
      setAuthenticated(false);
    }
  }, []);

  if (!authenticated) {
    return <LoginWithTwitch setAuthenticated={setAuthenticated} />;
  }

  return element;
}

export default function App() {
  return (
    <CustomProvider theme="dark">
      <ProtectedElement element={<Main />} />
    </CustomProvider>
  );
}
