import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const useAuthentication = () => {
  const [user, setUser] = (useState < User) | (null > null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => {
      unsubscribeFromAuthStateChanged();
    };
  }, [auth]);

  return {
    user,
  };
};

export default useAuthentication;
