import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserInfo } from "firebase/auth";

interface AuthProps {
  user: UserInfo | null
}

const useAuthentication = (): AuthProps => {
  const [user, setUser] = useState<UserInfo | null>(null);
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
