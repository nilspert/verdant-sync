/**
 * File: authorized-devices-screen.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for AuthorizedDevicesScreen.
 * UI component for Authorized devices view
 */
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import AuthorizedDevicesList from '../components/lists/authorized-devices-list';
import InfoMessage from '../components/common/info-message';
import useFilteredDevices from '../hooks/use-filtered-devices';
import defaultStyles from '../assets/themes/default-styles';
import LoadingSpinner from '../components/common/loading-spinner';

// AuthorizedDevicesScreen props
type AuthorizedDevicesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AuthorizedDevices'>;
};

// Component definition
const AuthorizedDevicesScreen: React.FC<AuthorizedDevicesScreenProps> = () => {
  // Use authorizedDevicesData from useFilteredDevices hook
  const { authorizedDevicesData, loadingAuthorizedDevicesData } = useFilteredDevices();

  // If still fetching authorizedDevicesData, display loading spinner
  if (loadingAuthorizedDevicesData) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={defaultStyles.screenContainer}>
      <InfoMessage message="View and authorize devices that are linked to WiFi SSID specified in your settings." />
      {Object.keys(authorizedDevicesData).length === 0 && (
        <View style={[defaultStyles.contentContainer, defaultStyles.highlightedLeftBorder]}>
          <InfoMessage message="No devices found with current user settings. Please update your settings." />
        </View>
      )}
      <AuthorizedDevicesList authorizedDevicesData={authorizedDevicesData} />
    </SafeAreaView>
  );
};

// Export AuthorizedDevicesScreen component
export default AuthorizedDevicesScreen;
