import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import DeviceList from '../components/lists/device-list';
import InfoMessage from '../components/common/info-message';
import useFilteredBoards from '../hooks/use-filtered-boards';
import styles from '../assets/themes/default-styles';
import LoadingSpinner from '../components/common/loading-spinner';

type AuthorizedDevicesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AuthorizedDevices'>;
};

const AuthorizedDevicesScreen: React.FC<AuthorizedDevicesScreenProps> = () => {
  const { authorizedDevicesData, loadingAuthorizedDevicesData } = useFilteredBoards();

  if (loadingAuthorizedDevicesData) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.subScreenContainer}>
      <InfoMessage message="View and manage devices that are linked to SSID specified in your settings." />
      <View style={styles.contentContainer}>
        {Object.keys(authorizedDevicesData).length === 0 && (
          <InfoMessage message="No devices found with current settings. Please update your settings." />
        )}
        <DeviceList authorizedDevicesData={authorizedDevicesData} />
      </View>
    </SafeAreaView>
  );
};

export default AuthorizedDevicesScreen;
