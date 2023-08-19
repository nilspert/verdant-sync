import React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from '../assets/themes/default-styles';
import { RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import useFilteredBoards from '../hooks/use-filtered-boards';
import BoardsList from '../components/lists/boards-list';
import ScreenTitle from '../components/common/screen-title';
import LoadingSpinner from '../components/common/loading-spinner';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { filteredBoardsData, loadingBoardsData } = useFilteredBoards();

  const handleOnNavigate = (navPath: string, macAddress: string) => {
    navigation.navigate(navPath, { id: macAddress });
  };

  if (loadingBoardsData) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <ScreenTitle title={'Devices'} />
        <BoardsList filteredBoardsData={filteredBoardsData} onNavigate={handleOnNavigate} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
