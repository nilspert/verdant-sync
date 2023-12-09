/**
 * File: use-authentication.tsx
 * Author: Joonas Nislin
 * Date: 18.8.2023
 * Description: This file contains hook definition for useAuthentication.
 * This hook is used to manage user authentication and settings retrieval
 */
import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserInfo } from 'firebase/auth';
import { NODE_PATHS, fetchFromDatabase } from '../services/firebase-utils';

// UserSettings props.
export interface UserSettings {
  ssid: string;
}

// AuthProps props.
interface AuthProps {
  user: UserInfo | null;
  settings: UserSettings | null;
}

// Hook definition
const useAuthentication = (): AuthProps => {
  // State variables for user and settings.
  const [user, setUser] = React.useState<UserInfo | null>(null);
  const [settings, setSettings] = React.useState<UserSettings | null>(null);
  // Firebase authentication instance.
  const auth = getAuth();

  // useEffect to listen for changes in user authentication state.
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

  // useEffect to fetch user settings when user is authenticated.
  React.useEffect(() => {
    // Check if user is authenticated.
    if (user) {
      // Callback function to set retrieved settings data.
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
      // Reset settings to null when user is not authenticated.
      setSettings(null);
    }
  }, [user]);

  // Return the current user and settings for use in the component.
  return {
    user,
    settings,
  };
};

// Export useAuthentication hook.
export default useAuthentication;
