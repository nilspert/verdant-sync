import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Board, RootStackParamList } from '../types/types';
import EventsList from '../components/lists/events-list';
import BoardInfo from '../components/board/board-info';
import useFilteredBoards from '../hooks/use-filtered-boards';
import { useRoute } from '@react-navigation/native';
import LoadingSpinner from '../components/common/loading-spinner';
import { Button } from 'react-native-paper';

type BoardViewSelectorScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'BoardViewSelector'>;
};

interface RouteProps {
  id: string;
}

const BoardViewSelectorScreen: React.FC<BoardViewSelectorScreenProps> = () => {
  const [activeScreen, setActiveScreen] = React.useState('BoardInfo'); // Initial active screen
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

  const renderScreen = () => {
    switch (activeScreen) {
      case 'BoardInfo':
        return <BoardInfo filteredBoard={filteredBoard} />;
      case 'EventsList':
        return <EventsList filteredBoard={filteredBoard} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.tabContainer}>
          <Button
            mode={activeScreen === 'BoardInfo' ? 'contained' : 'outlined'}
            onPress={() => setActiveScreen('BoardInfo')}
          >
            Status
          </Button>
          <Button
            mode={activeScreen === 'EventsList' ? 'contained' : 'outlined'}
            onPress={() => setActiveScreen('EventsList')}
          >
            Events
          </Button>
        </View>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    color: '#ccc',
  },
});

export default BoardViewSelectorScreen;
