import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Board, RootStackParamList } from '../types/types';
import styles from '../assets/themes/default-styles';
import { useRoute } from '@react-navigation/native';
import useFilteredBoards from '../hooks/use-filtered-boards';
import DecryptedText from '../components/common/decrypted-text';
import LoadingSpinner from '../components/common/loading-spinner';

type BoardInfoScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'BoardInfo'>;
};

interface RouteProps {
  id: string;
}

const BoardInfo: React.FC<BoardInfoScreenProps> = () => {
  const route = useRoute();
  const { id } = route.params as RouteProps;
  const { filteredBoardsData, loadingBoardsData } = useFilteredBoards();

  // State to hold the filtered board
  const [filteredBoard, setFilteredBoard] = useState<Board | null>(null);

  useEffect(() => {
    // Filter out the board based on the macAddress matching the id
    const foundBoard = Object.values(filteredBoardsData).find((board) => board.macAddress === id);

    // Update the state with the found board or null if not found
    setFilteredBoard(foundBoard || null);
  }, [filteredBoardsData, id]);

  if (filteredBoard == null || loadingBoardsData) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={{ ...styles.subScreenContainer }}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <DecryptedText encryptedHex={String(filteredBoard?.name)} />
        </View>
        <View style={styles.contentContainer}>
          <DecryptedText encryptedHex={String(filteredBoard?.name)} />
        </View>
        <View style={styles.contentContainer}>
          <DecryptedText encryptedHex={String(filteredBoard?.name)} />
        </View>
        <View style={styles.contentContainer}>
          <DecryptedText encryptedHex={String(filteredBoard?.name)} />
        </View>
        <View style={styles.contentContainer}>
          <DecryptedText encryptedHex={String(filteredBoard?.name)} />
        </View>
        <View style={styles.contentContainer}>
          <DecryptedText encryptedHex={String(filteredBoard?.name)} />
        </View>
        <View style={styles.contentContainer}>
          <DecryptedText encryptedHex={String(filteredBoard?.name)} />
        </View>
        <View style={styles.contentContainer}>
          <DecryptedText encryptedHex={String(filteredBoard?.name)} />
        </View>
        <View style={styles.contentContainer}>
          <DecryptedText encryptedHex={String(filteredBoard?.name)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BoardInfo;
