import React from 'react';
import { FlatList, View, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { Board } from '../../types/types';
import DecryptedText from '../common/decrypted-text';
import InfoMessage from '../common/info-message';
import Separator from '../common/separator';
import defaultStyles from '../../assets/themes/default-styles';
import { Text } from 'react-native-paper';

const windowHeight = Dimensions.get('window').height;
const eventListHeaderHeight = 220;
const flatListHeight = windowHeight - eventListHeaderHeight;

type BoardsListProps = {
  filteredBoardsData: { [key: string]: Board };
  onNavigate: (navPath: string, macAddress: string) => void;
};

const RenderSeparator = () => {
  return <Separator mode="horizontal" />;
};

const BoardsList: React.FC<BoardsListProps> = ({
  filteredBoardsData,
  onNavigate,
}: BoardsListProps) => {
  return (
    <FlatList
      nestedScrollEnabled
      style={styles.flatList}
      data={Object.values(filteredBoardsData)}
      keyExtractor={(item) => item.ip}
      ItemSeparatorComponent={RenderSeparator}
      ListEmptyComponent={
        <View style={[defaultStyles.contentContainer, defaultStyles.highlightedLeftBorder]}>
          <Text style={styles.infoLabel}>No devices found with current settings.</Text>
          <InfoMessage message="Please update your user settings and approve any devices that have pending authorization." />
        </View>
      }
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={() => onNavigate('BoardInfo', item.macAddress)}>
          <View
            style={[
              defaultStyles.contentContainer,
              defaultStyles.highlightedLeftBorder,
              styles.itemContainer,
            ]}
          >
            <DecryptedText style={styles.title} encryptedHex={item.name || ''} />
            <DecryptedText encryptedHex={item.ssid || ''} />
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 10,
  },
  flatList: {
    height: flatListHeight,
  },
  infoLabel: {
    paddingHorizontal: 5,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default BoardsList;
