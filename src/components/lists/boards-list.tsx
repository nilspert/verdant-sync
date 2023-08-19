import React from 'react';
import { FlatList, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Board } from '../../types/types';
import DecryptedText from '../common/decrypted-text';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import InfoMessage from '../common/info-message';
import Separator from '../common/separator';
import defaultStyles from '../../assets/themes/default-styles';

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
      style={defaultStyles.contentContainer}
      data={Object.values(filteredBoardsData)}
      keyExtractor={(item) => item.ip}
      ItemSeparatorComponent={RenderSeparator}
      ListEmptyComponent={
        <InfoMessage message="No devices found with current settings. Please update your settings and approve any devices that have pending authorization." />
      }
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={() => onNavigate('BoardInfo', item.macAddress)}>
          <View style={styles.itemContainer}>
            <DecryptedText style={styles.title} encryptedHex={item.name || ''} />
            <DecryptedText encryptedHex={item.ssid || ''} />
            <View style={styles.iconList}>
              <View style={styles.iconListItem}>
                <Icon name="temperature-celsius" size={24} />
                <View>
                  <DecryptedText encryptedHex={item.temperature || ''} />
                </View>
              </View>
              <Separator mode="vertical" />
              <View style={styles.iconListItem}>
                <Icon name="weather-sunny" size={24} />
                <View>
                  <Text>High</Text>
                </View>
              </View>
              <Separator mode="vertical" />
              <View style={styles.iconListItem}>
                <Icon name="cup-water" size={24} />
                <View>
                  <Text>70%</Text>
                </View>
              </View>
            </View>
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
  iconList: {
    paddingTop: 15,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#666',
    borderBottomWidth: 1,
  },
  iconListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
});

export default BoardsList;
