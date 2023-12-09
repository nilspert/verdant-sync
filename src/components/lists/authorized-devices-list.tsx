/**
 * File: authorized-devices-list.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains component definition for AuthorizedDevicesList.
 * This component is used to manage authorized devices
 */

import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AuthorizedDevice } from '../../types/types';
import { updateInDatabase } from '../../services/firebase-utils';
import { decryptData } from '../../utils/crypto-utils';
import DecryptedText from '../common/decrypted-text';
import CustomButton from '../common/custom-button';
import defaultStyles from '../../assets/themes/default-styles';
import Toast from '../common/toast';

// AuthorizedDevicesList props
type DeviceListProps = {
  authorizedDevicesData: { [key: string]: AuthorizedDevice };
};

// Component definition
const AuthorizedDevicesList: React.FC<DeviceListProps> = ({ authorizedDevicesData }) => {
  // Function for persisting authorized device status to database
  const updateDeviceAuthorizationStatus = (macAddress: string, authorized: boolean) => {
    const decryptedMacAddress = decryptData(macAddress);
    const devicePath = `/authorized_devices/${decryptedMacAddress}`;
    const updates = { authorized };

    // Try catch to display success and error toast from database operation
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

// AuthorizedDevicesList styles
const styles = StyleSheet.create({
  itemText: {
    fontWeight: 'bold',
  },
});

// Export AuthorizedDevicesList component
export default AuthorizedDevicesList;
