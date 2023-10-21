/**
 * File: devices-list.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for DevicesList.
 * Used to display VerdantSync IoT devices in Devices view.
 */

import React from 'react';
import { FlatList, View, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { Device } from '../../types/types';
import DecryptedText from '../common/decrypted-text';
import InfoMessage from '../common/info-message';
import Separator from '../common/separator';
import defaultStyles from '../../assets/themes/default-styles';
import { Text } from 'react-native-paper';
import { formatEpochTime } from '../../utils/helpers';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { theme } from '../../assets/themes/theme';

// Calculate scrollViewHeight so that the flatlist does not get overlapped by bottom navigation
const windowHeight = Dimensions.get('window').height;
const devicesListHeaderHeight = 220;
const flatListHeight = windowHeight - devicesListHeaderHeight;

// DevicesList props
type DevicesListProps = {
  filteredDevicesData: { [key: string]: Device };
  onNavigate: (navPath: string, macAddress: string) => void;
};

// Function to render separator component horizontally
const RenderSeparator = () => {
  return <Separator mode="horizontal" />;
};

// Component definition
const DevicesList: React.FC<DevicesListProps> = ({
  filteredDevicesData,
  onNavigate,
}: DevicesListProps) => {
  return (
    <FlatList
      nestedScrollEnabled
      style={styles.flatList}
      data={Object.values(filteredDevicesData)}
      keyExtractor={(item) => item.ip}
      ItemSeparatorComponent={RenderSeparator}
      ListEmptyComponent={
        <View style={[defaultStyles.contentContainer, defaultStyles.highlightedLeftBorder]}>
          <Text style={styles.infoLabel}>No devices found with current settings.</Text>
          <InfoMessage message="Please update your user settings and approve any devices that have pending authorization." />
        </View>
      }
      renderItem={({ item }) => (
        <TouchableWithoutFeedback onPress={() => onNavigate('DeviceInfo', item.macAddress)}>
          <View
            style={[
              defaultStyles.contentContainer,
              defaultStyles.highlightedLeftBorder,
              styles.itemContainer,
            ]}
          >
            <DecryptedText style={styles.title} encryptedHex={item.name || ''} />
            <DecryptedText encryptedHex={item.ssid || ''} />
            <View style={styles.timestampRow}>
              <Icon size={20} style={styles.icon} name="antenna" />
              <DecryptedText
                style={styles.timestamp}
                encryptedHex={item.latest_sensor_reading_time || ''}
                formatter={formatEpochTime}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  );
};

// DevicesList styles
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  timestampRow: {
    flexDirection: 'row',
    gap: 5,
  },
  timestamp: {
    color: theme.colors.primaryContainer,
    fontWeight: '400',
  },
  icon: {
    color: theme.colors.primaryContainer,
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

// Export DevicesList component
export default DevicesList;
