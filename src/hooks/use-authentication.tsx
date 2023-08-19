import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserInfo } from 'firebase/auth';
import { NODE_PATHS, fetchFromDatabase } from '../services/firebase-utils';

export interface UserSettings {
  ssid: string;
}

interface AuthProps {
  user: UserInfo | null;
  settings: UserSettings | null;
}

const useAuthentication = (): AuthProps => {
  const [user, setUser] = React.useState<UserInfo | null>(null);
  const [settings, setSettings] = React.useState<UserSettings | null>(null);
  const auth = getAuth();

  React.useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribeFromAuthStateChanged();
    };
  }, [auth]);

  React.useEffect(() => {
    if (user) {
      const onDataFetched = (data: UserSettings) => {
        setSettings(data);
      };

      const unsubscribeFromSettings = fetchFromDatabase(
        `${NODE_PATHS.USERS}/${user.uid}/settings`,
        onDataFetched,
      );

      return () => {
        unsubscribeFromSettings();
      };
    } else {
      setSettings(null);
    }
  }, [user]);

  return {
    user,
    settings,
  };
};

export default useAuthentication;
