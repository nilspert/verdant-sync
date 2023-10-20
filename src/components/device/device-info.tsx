/**
 * File: device-info.tsx
 * Author: Joonas Nislin
 * Date: 23.9.2023
 * Description: This file contains component definition for DeviceInfo.
 * Wrapper component for device-info-item.tsx which displays VerdantSync IoT device properties like Temperature and Humidity
 */

import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Device } from '../../types/types';
import { theme } from '../../assets/themes/theme';
import {
  addHpa,
  addPercentage,
  getBrightness,
  getSoilMoisture,
  getWaterTankLevel,
} from '../../utils/helpers';
import DeviceInfoItem from './device-info-item';

// Calculate scrollViewHeight so that the flatlist does not get overlapped by bottom navigation
const windowHeight = Dimensions.get('window').height;
const eventListHeaderHeight = 190;
const scrollViewHeight = windowHeight - eventListHeaderHeight;

// DeviceInfo props
interface Props {
  filteredDevice: Device;
}

// RenderRow props
interface RowProps {
  children: ReactNode;
}

// Function for rendering row
const RenderRow = ({ children }: RowProps) => {
  return <View style={styles.row}>{children}</View>;
};

// Component definition
const DeviceInfo: React.FC<Props> = ({ filteredDevice }) => {
  return (
    <ScrollView style={styles.scrollView}>
      <RenderRow>
        <DeviceInfoItem
          deviceProperty={String(filteredDevice?.water_tank_level)}
          propertyLabel="Water tank level"
          formatter={getWaterTankLevel}
        />
        <DeviceInfoItem
          deviceProperty={String(filteredDevice?.soil_moisture)}
          propertyLabel="Soil moisture"
          formatter={getSoilMoisture}
        />
      </RenderRow>
      <RenderRow>
        <DeviceInfoItem
          deviceProperty={String(filteredDevice?.luminosity)}
          propertyLabel="Luminosity"
          formatter={getBrightness}
        />
      </RenderRow>
      <RenderRow>
        <DeviceInfoItem
          deviceProperty={String(filteredDevice?.temperature)}
          propertyLabel="Air temperature"
          iconName="temperature-celsius"
        />
        <DeviceInfoItem
          deviceProperty={String(filteredDevice?.humidity)}
          propertyLabel="Air humidity"
          formatter={addPercentage}
        />
      </RenderRow>
      <RenderRow>
        <DeviceInfoItem
          deviceProperty={String(filteredDevice?.air_pressure)}
          propertyLabel="Air pressure"
          formatter={addHpa}
        />
      </RenderRow>
    </ScrollView>
  );
};

// Styles for DeviceInfo
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
  scrollView: {
    height: scrollViewHeight,
  },
});

// Export DeviceInfo component
export default DeviceInfo;
