/**
 * File: settings-list.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for SettingsList.
 * This component is used to display list of user settings
 */
import React from 'react';
import { FlatList, Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import defaultStyles from '../../assets/themes/default-styles';
import { SettingsListItem } from '../../screens/settings-screen';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Separator from '../common/separator';

// SettingsList props
type SettingsListProps = {
  settingsListData: SettingsListItem[];
  onNavigate: (navPath: string) => void;
};

// Function to render separator component horizontally
const RenderSeparator = () => {
  return <Separator mode="horizontal" />;
};

// Component definition
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

// SettingsList styles
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

// Export SettingsList component
export default SettingsList;
