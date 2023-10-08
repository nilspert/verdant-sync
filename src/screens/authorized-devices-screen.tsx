import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import DeviceList from '../components/lists/device-list';
import InfoMessage from '../components/common/info-message';
import useFilteredBoards from '../hooks/use-filtered-boards';
import defaultStyles from '../assets/themes/default-styles';
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
    <SafeAreaView style={defaultStyles.screenContainer}>
      <InfoMessage message="View and authorize devices that are linked to WiFi SSID specified in your settings." />
      {Object.keys(authorizedDevicesData).length === 0 && (
        <View style={[defaultStyles.contentContainer, defaultStyles.highlightedLeftBorder]}>
          <InfoMessage message="No devices found with current user settings. Please update your settings." />
        </View>
      )}
      <DeviceList authorizedDevicesData={authorizedDevicesData} />
    </SafeAreaView>
  );
};

export default AuthorizedDevicesScreen;
