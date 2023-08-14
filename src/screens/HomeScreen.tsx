import React from 'react';
import { Text, View } from 'react-native';
import useAuthentication from '../hooks/useAuthentication';
import { signOut, getAuth } from 'firebase/auth';
import { Button } from 'react-native-paper';
import styles from '../themes/defaultStyles';

const auth = getAuth();

export default function SignInScreen() {
  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <Text>Home screen!</Text>
      <Text>Welcome {user?.email}!</Text>

      <Button mode="contained" style={styles.button} onPress={() => signOut(auth)}>
        Sign Out
      </Button>
    </View>
  );
}
