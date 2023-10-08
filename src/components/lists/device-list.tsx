import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Device } from '../../types/types';
import { updateInDatabase } from '../../services/firebase-utils';
import { decryptData } from '../../utils/crypto-utils';
import DecryptedText from '../common/decrypted-text';
import CustomButton from '../common/custom-button';
import defaultStyles from '../../assets/themes/default-styles';
import Toast from '../common/toast';

type DeviceListProps = {
  authorizedDevicesData: { [key: string]: Device };
};

const DeviceList: React.FC<DeviceListProps> = ({ authorizedDevicesData }) => {
  const updateDeviceAuthorizationStatus = (macAddress: string, authorized: boolean) => {
    const decryptedMacAddress = decryptData(macAddress);
    const devicePath = `/authorized_devices/${decryptedMacAddress}`;
    const updates = { authorized };
    try {
      updateInDatabase(devicePath, updates);
      Toast({ message: `Device ${authorized ? 'authorized' : 'deauthorized'} successfully` });
    } catch {
      Toast({ message: `Device ${authorized ? 'authorization' : 'deauthorization'} failed` });
    }
  };

  return (
    <FlatList
      nestedScrollEnabled
      data={Object.values(authorizedDevicesData)}
      keyExtractor={(item) => item.macAddress}
      renderItem={({ item }) => (
        <View style={[defaultStyles.contentContainer, defaultStyles.highlightedLeftBorder]}>
          <DecryptedText style={styles.itemText} encryptedHex={item.name} />
          {item.authorized && (
            <CustomButton
              mode="contained-tonal"
              onPress={() => updateDeviceAuthorizationStatus(item.macAddress, false)}
              label="Deauthorize"
            />
          )}
          {!item.authorized && (
            <CustomButton
              mode="contained"
              onPress={() => updateDeviceAuthorizationStatus(item.macAddress, true)}
              label="Authorize"
            />
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontWeight: 'bold',
  },
});

export default DeviceList;
