/**
 * File: device-info-item.tsx
 * Author: Joonas Nislin
 * Date: 8.10.2023
 * Description: This file contains component definition for DeviceInfoItem.
 * Component used in device-info.tsx for displaying VerdantSync IoT device properties eq. Temperature, Soil moisture, Water tank level
 * Uses DecryptedText component to display value of the device property
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../assets/themes/theme';
import DecryptedText from '../common/decrypted-text';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Separator from '../common/separator';

// Type definition for property iconName
// Add more icons from MaterialCommunityIcons if needed
type Icon = 'temperature-celsius';

// DeviceInfoItem props
interface Props {
  deviceProperty: string;
  propertyLabel: string;
  formatter?: (data: string) => string;
  iconName?: Icon;
}

// Function to return Separator component in horizantal mode
const RenderSeparator = () => {
  return <Separator mode="horizontal" />;
};

// Component definition
const DeviceInfoItem: React.FC<Props> = ({
  deviceProperty,
  propertyLabel,
  formatter,
  iconName,
}: Props) => {
  return (
    <View style={styles.column}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <DecryptedText
            style={styles.iconItemValue}
            formatter={formatter}
            encryptedHex={deviceProperty}
          />
          {iconName && <Icon name={iconName} color={theme.colors.primary} size={36} />}
        </View>
        {RenderSeparator()}
        <Text style={styles.itemLabel}>{propertyLabel}</Text>
      </View>
    </View>
  );
};

// Styles for DeviceInfoItem
const styles = StyleSheet.create({
  column: {
    flex: 1,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
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

// Export DeviceInfoItem component
export default DeviceInfoItem;
