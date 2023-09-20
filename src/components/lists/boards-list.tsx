import React from 'react';
import { FlatList, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Board } from '../../types/types';
import DecryptedText from '../common/decrypted-text';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import InfoMessage from '../common/info-message';
import Separator from '../common/separator';
import defaultStyles from '../../assets/themes/default-styles';
import { calculatePercentage } from '../../utils/helpers';
import { theme } from '../../assets/themes/theme';

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
                <View>
                  <DecryptedText
                    style={styles.iconListItemValue}
                    encryptedHex={item.temperature || ''}
                  />
                </View>
                <Icon name="temperature-celsius" size={24} />
              </View>
              <Separator mode="vertical" />
              <View style={styles.iconListItem}>
                <Icon name="weather-sunny" size={24} />
                <View>
                  <Text style={styles.iconListItemValue}>High</Text>
                </View>
              </View>
              <Separator mode="vertical" />
              <View style={styles.iconListItem}>
                <Icon name="cup-water" size={24} />
                <View>
                  <DecryptedText
                    style={styles.iconListItemValue}
                    formatter={calculatePercentage}
                    encryptedHex={item.soil_moisture || ''}
                  />
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
  iconListItemValue: {
    fontSize: 18,
    color: theme.colors.accent,
  },
});

export default BoardsList;
