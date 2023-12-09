/**
 * File: device-info.tsx
 * Author: Joonas Nislin
 * Date: 23.9.2023
 * Description: This file contains component definition for DeviceInfo.
 * Wrapper component for device-info-item.tsx which displays VerdantSync IoT device properties like Temperature and Humidity
 */

import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text } from 'react-native';
import { Device } from '../../types/types';
import { theme } from '../../assets/themes/theme';
import {
  addHpa,
  addPercentage,
  getBrightness,
  getSoilMoisture,
  getWaterTankLevel,
  formatEpochTime,
  getSoilMoistureLevel,
} from '../../utils/helpers';
import DeviceInfoItem from './device-info-item';
import Separator from '../common/separator';
import { decryptData } from '../../utils/crypto-utils';

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
  const getFormattedTime = (timeValue: string): string => {
    return formatEpochTime(String(`${decryptData(timeValue)}`));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <RenderRow>
        <View style={styles.column}>
          <Text style={styles.recentActivityLabel}>Recent activity</Text>
          <Separator mode="horizontal" />
          <View style={styles.recentActivityRow}>
            <Text>Sensor reading time</Text>
            <Text style={styles.recentActivityValue}>
              {getFormattedTime(String(filteredDevice?.latest_sensor_reading_time))}
            </Text>
          </View>
          <Separator mode="horizontal" />
          <View style={styles.recentActivityRow}>
            <Text>Last watering time</Text>
            <Text style={styles.recentActivityValue}>
              {getFormattedTime(String(filteredDevice?.latest_watering_time))}
            </Text>
          </View>
        </View>
      </RenderRow>
      <RenderRow>
        <DeviceInfoItem
          deviceProperty={String(filteredDevice?.water_tank_level)}
          propertyLabel="Water tank level"
          formatter={getWaterTankLevel}
          displayValueAsProgressBar
          progressValue={getWaterTankLevel(String(decryptData(filteredDevice?.water_tank_level)))}
        />
        <DeviceInfoItem
          deviceProperty={String(filteredDevice?.soil_moisture)}
          propertyLabel="Soil moisture"
          formatter={getSoilMoisture}
          displayValueAsProgressBar
          progressValue={getSoilMoistureLevel(
            String(decryptData(filteredDevice?.soil_moisture)),
            false,
          )}
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
  recentActivityLabel: {
    fontSize: 26,
    color: theme.colors.primaryContainer,
    paddingBottom: 5,
  },
  recentActivityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  recentActivityValue: {
    color: theme.colors.primaryContainer,
    fontWeight: 'bold',
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
