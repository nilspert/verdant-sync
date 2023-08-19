import React from 'react';
import { FlatList, Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import defaultStyles from '../../assets/themes/default-styles';
import InfoMessage from '../common/info-message';
import { SettingsListItem } from '../../screens/settings-screen';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Separator from '../common/separator';

type SettingsListProps = {
  settingsListData: SettingsListItem[];
  onNavigate: (navPath: string) => void;
};

const RenderSeparator = () => {
  return <Separator mode="horizontal" />;
};

const SettingsList: React.FC<SettingsListProps> = ({
  settingsListData,
  onNavigate,
}: SettingsListProps) => {
  return (
    <FlatList
      nestedScrollEnabled
      style={{ ...defaultStyles.contentContainer, ...styles.container }}
      data={Object.values(settingsListData)}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={RenderSeparator}
      ListEmptyComponent={
        <InfoMessage message="No events found with current settings. Please update your settings." />
      }
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={() => onNavigate(item.navPath)}>
          <View style={styles.settingsListItem}>
            <Text>{item.title}</Text>
            <Icon name="chevron-right" size={24} />
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  settingsListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
});

export default SettingsList;
