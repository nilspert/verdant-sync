import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import useAuthentication from '../hooks/useAuthentication';
import { signOut, getAuth } from 'firebase/auth';
import { Button } from 'react-native-paper';
import styles from '../themes/defaultStyles';
import { NODE_PATHS, fetchFromDatabase } from '../api/firebaseUtils';
import DecryptedText from '../components/DecryptedText';
import { Board } from '../types/types';

const auth = getAuth();

export default function HomeScreen() {
  const { user } = useAuthentication();
  const [boardsData, setBoardsData] = useState<Board[]>([]);

  useEffect(() => {
    const onDataFetched = (data: any) => {
      setBoardsData(data);
    };

    const unsubscribe = fetchFromDatabase(NODE_PATHS.BOARDS, onDataFetched);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home screen!</Text>
      <Text>Welcome {user?.email}!</Text>
      {Object.values(boardsData).map((board: any, index: number) => (
        <View key={index}>
          <DecryptedText encryptedHex={board?.name || ''} />
          <DecryptedText encryptedHex={board?.firmware || ''} />
          <DecryptedText encryptedHex={board?.ip || ''} />
          <DecryptedText encryptedHex={board?.ssid || ''} />
          <DecryptedText encryptedHex={board?.temperature || ''} />
        </View>
      ))}
      <Button mode="contained" style={styles.button} onPress={() => signOut(auth)}>
        Sign Out
      </Button>
    </View>
  );
}
