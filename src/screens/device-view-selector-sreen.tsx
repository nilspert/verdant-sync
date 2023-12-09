/**
 * File: device-view-selector-screen.tsx
 * Author: Joonas Nislin
 * Date: 20.10.2023
 * Description: This file contains component definition for DeviceViewSelectorScreen.
 * UI component for device view which handles showing of device info or device events
 */
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Device, RootStackParamList } from '../types/types';
import EventsList from '../components/lists/events-list';
import DeviceInfo from '../components/device/device-info';
import useFilteredDevices from '../hooks/use-filtered-devices';
import { useRoute } from '@react-navigation/native';
import LoadingSpinner from '../components/common/loading-spinner';
import { Button } from 'react-native-paper';

// DeviceViewSelectorScreen props
type DeviceViewSelectorScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'DeviceViewSelector'>;
};

// Route props
interface RouteProps {
  id: string;
}

// Component definition
const DeviceViewSelectorScreen: React.FC<DeviceViewSelectorScreenProps> = () => {
  // State variable for active screen
  const [activeScreen, setActiveScreen] = React.useState('DeviceInfo');
  // Get id of device from route
  const route = useRoute();
  const { id } = route.params as RouteProps;
  const { filteredDevicesData, loadingDevicesData } = useFilteredDevices();

  // State to hold the filtered device
  const [filteredDevice, setFilteredDevice] = useState<Device | null>(null);

  useEffect(() => {
    // Filter out the device based on the macAddress matching the id
    const foundDevice = Object.values(filteredDevicesData).find(
      (device) => device.macAddress === id,
    );

    // Update the state with the found device or null if not found
    setFilteredDevice(foundDevice || null);
  }, [filteredDevicesData, id]);

  if (filteredDevice == null || loadingDevicesData) {
    return <LoadingSpinner />;
  }

  // Function for rendering ui component based on activeScreen
  const renderScreen = () => {
    switch (activeScreen) {
      case 'DeviceInfo':
        return <DeviceInfo filteredDevice={filteredDevice} />;
      case 'EventsList':
        return <EventsList filteredDevice={filteredDevice} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.tabContainer}>
          <Button
            mode={activeScreen === 'DeviceInfo' ? 'contained' : 'outlined'}
            onPress={() => setActiveScreen('DeviceInfo')}
          >
            Status
          </Button>
          <Button
            mode={activeScreen === 'EventsList' ? 'contained' : 'outlined'}
            onPress={() => setActiveScreen('EventsList')}
          >
            Events
          </Button>
        </View>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
};

// DeviceViewSelectorScreen styles
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    color: '#ccc',
  },
});

// Export DeviceViewSelectorScreen screen
export default DeviceViewSelectorScreen;
