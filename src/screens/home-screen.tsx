import React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from '../assets/themes/default-styles';
import { RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import useFilteredDevices from '../hooks/use-filtered-devices';
import DevicesList from '../components/lists/devices-list';
import ScreenTitle from '../components/common/screen-title';
import LoadingSpinner from '../components/common/loading-spinner';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { filteredDevicesData, loadingDevicesData } = useFilteredDevices();

  const handleOnNavigate = (navPath: string, macAddress: string) => {
    navigation.navigate(navPath, { id: macAddress });
  };

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

export default HomeScreen;
