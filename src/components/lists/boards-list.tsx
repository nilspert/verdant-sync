import React from 'react';
import { FlatList, View, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { Board } from '../../types/types';
import DecryptedText from '../common/decrypted-text';
import InfoMessage from '../common/info-message';
import Separator from '../common/separator';
import defaultStyles from '../../assets/themes/default-styles';
import { theme } from '../../assets/themes/theme';

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
        <InfoMessage message="No devices found with current settings. Please update your settings and approve any devices that have pending authorization." />
      }
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={() => onNavigate('BoardInfo', item.macAddress)}>
          <View style={{ ...defaultStyles.contentContainer, ...styles.itemContainer }}>
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
    borderLeftWidth: 6,
    borderLeftColor: theme.colors.primary,
  },
  flatList: {
    height: flatListHeight,
  },
});

export default BoardsList;
