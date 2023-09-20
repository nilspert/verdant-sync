import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Board, RootStackParamList } from '../types/types';
import defaultStyles from '../assets/themes/default-styles';
import { useRoute } from '@react-navigation/native';
import useFilteredBoards from '../hooks/use-filtered-boards';
import DecryptedText from '../components/common/decrypted-text';
import LoadingSpinner from '../components/common/loading-spinner';
import Separator from '../components/common/separator';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { theme } from '../assets/themes/theme';
import { addHpa, addPercentage, calculatePercentage } from '../utils/helpers';

type BoardInfoScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'BoardInfo'>;
};

interface RouteProps {
  id: string;
}

const RenderSeparator = () => {
  return <Separator mode="horizontal" />;
};

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
    <SafeAreaView style={{ ...defaultStyles.subScreenContainer }}>
      <ScrollView>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconItemValue}>90 %</Text>
              </View>
              {RenderSeparator()}
              <Text style={styles.itemLabel}>Luminosity</Text>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <DecryptedText
                  style={styles.iconItemValue}
                  formatter={calculatePercentage}
                  encryptedHex={String(filteredBoard?.soil_moisture)}
                />
              </View>
              {RenderSeparator()}
              <Text style={styles.itemLabel}>Soil moisture</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconItemValue}>60 %</Text>
              </View>
              {RenderSeparator()}
              <Text style={styles.itemLabel}>Water tank level</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <DecryptedText
                  style={styles.iconItemValue}
                  encryptedHex={String(filteredBoard?.temperature)}
                />
                <Icon name={'temperature-celsius'} color={theme.colors.primary} size={36} />
              </View>
              {RenderSeparator()}
              <Text style={styles.itemLabel}>Air temperature</Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <DecryptedText
                  style={styles.iconItemValue}
                  formatter={addPercentage}
                  encryptedHex={String(filteredBoard?.humidity)}
                />
              </View>
              {RenderSeparator()}
              <Text style={styles.itemLabel}>Air humidity</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <DecryptedText
                  style={styles.iconItemValue}
                  formatter={addHpa}
                  encryptedHex={String(filteredBoard?.air_pressure)}
                />
              </View>
              {RenderSeparator()}
              <Text style={styles.itemLabel}>Air pressure</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    marginHorizontal: 8,
    borderRadius: 8,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  iconItemValue: {
    fontSize: 26,
    color: theme.colors.primaryContainer,
  },
  itemLabel: {
    marginTop: 5,
  },
});

export default BoardInfo;
