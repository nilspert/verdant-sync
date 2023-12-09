/**
 * File: home-screen.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for HomeScreen.
 * UI component for Devices view
 */
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from '../assets/themes/default-styles';
import { RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import useFilteredDevices from '../hooks/use-filtered-devices';
import DevicesList from '../components/lists/devices-list';
import ScreenTitle from '../components/common/screen-title';
import LoadingSpinner from '../components/common/loading-spinner';

// Homescreen props
type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

// Component definition
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { filteredDevicesData, loadingDevicesData } = useFilteredDevices();

  // Function for handling navigation to device view
  const handleOnNavigate = (navPath: string, macAddress: string) => {
    navigation.navigate(navPath, { id: macAddress });
  };

  // Display loading spinner if devices are still being loaded
  if (loadingDevicesData) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <ScreenTitle title={'Devices'} />
        <DevicesList filteredDevicesData={filteredDevicesData} onNavigate={handleOnNavigate} />
      </View>
    </SafeAreaView>
  );
};

// Export HomeScreen component
export default HomeScreen;
