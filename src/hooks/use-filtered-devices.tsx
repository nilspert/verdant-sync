/**
 * File: use-filtered-devices.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains hook definition for useFilteredDevices.
 * This hook is used to get user devices that are authorized and also
 * devices that need authorization from the user.
 * filteredDevicesData
 * - Used in Devices view
 * - Device has to be authorized so that user can see info about the device
 * authorizedDevicesData
 * - Used in settings -> authorized devices view
 */
import React from 'react';
import { NODE_PATHS, QueryOptions, fetchFromDatabase } from '../services/firebase-utils';
import useAuthentication from './use-authentication';
import { Device, AuthorizedDevice } from '../types/types';

// Filtered devices props
interface FilteredDevicesProps {
  filteredDevicesData: { [key: string]: Device };
  loadingDevicesData: boolean;
  authorizedDevicesData: { [key: string]: AuthorizedDevice };
  loadingAuthorizedDevicesData: boolean;
}

// Component definition
const useFilteredDevices = (): FilteredDevicesProps => {
  // Use user and settings from useAuthentication hook
  const { user, settings } = useAuthentication();
  // State variables for devices, authorized devices and their loading states
  const [devicesData, setDevicesData] = React.useState<{ [key: string]: Device }>({});
  const [loadingDevicesData, setLoadingDevicesData] = React.useState(true);
  const [authorizedDevicesData, setAuthorizedDevicesData] = React.useState<{
    [key: string]: AuthorizedDevice;
  }>({});
  const [loadingAuthorizedDevicesData, setLoadingAuthorizedDevicesData] = React.useState(true);

  // Function for returning only devices that are authorized by the user
  const getFilteredDevicesData = () => {
    return Object.keys(devicesData).reduce((result: { [key: string]: Device }, deviceKey) => {
      if (
        !authorizedDevicesData[deviceKey] ||
        (authorizedDevicesData[deviceKey] && authorizedDevicesData[deviceKey].authorized)
      ) {
        result[deviceKey] = devicesData[deviceKey];
      }
      return result;
    }, {});
  };

  // Function for fetching devices data
  const fetchDevicesData = React.useCallback(() => {
    setLoadingDevicesData(true);

    const onDataFetched = (data: any) => {
      if (data == null) {
        setDevicesData({});
      } else {
        setDevicesData(data);
      }
      setLoadingDevicesData(false);
    };

    const onError = () => {
      setLoadingDevicesData(false);
    };

    const queryOptions = {
      orderByChildValue: 'ssid',
      equalToValue: settings?.ssid,
    } as QueryOptions;

    const unsubscribe = fetchFromDatabase(NODE_PATHS.DEVICES, onDataFetched, onError, queryOptions);

    return () => {
      unsubscribe();
    };
  }, [settings?.ssid]);

  // Function for fetching authorized devices data
  const fetchAuthorizedDevicesData = React.useCallback(() => {
    setLoadingAuthorizedDevicesData(true);

    const onDataFetched = (data: any) => {
      if (data != null) {
        setAuthorizedDevicesData(data);
      } else {
        setAuthorizedDevicesData({});
      }
      setLoadingAuthorizedDevicesData(false);
    };

    const onError = () => {
      setLoadingAuthorizedDevicesData(false);
    };

    const queryOptions = {
      orderByChildValue: 'ssid',
      equalToValue: settings?.ssid,
    } as QueryOptions;

    const unsubscribe = fetchFromDatabase(
      NODE_PATHS.AUTHORIZED_DEVICES,
      onDataFetched,
      onError,
      queryOptions,
    );

    return () => {
      unsubscribe();
    };
  }, [settings?.ssid]);

  // useEffects for calling fetchDevicesData & fetchAuthorizedDevicesData
  React.useEffect(() => {
    if (user && settings != null) {
      fetchDevicesData();
    }
  }, [user, settings, fetchDevicesData]);

  React.useEffect(() => {
    if (user && settings && settings != null) {
      fetchAuthorizedDevicesData();
    }
  }, [user, settings, fetchAuthorizedDevicesData]);

  const filteredDevicesData = getFilteredDevicesData();

  // Return filtered and authorized devices and loading states.
  return {
    filteredDevicesData,
    loadingDevicesData,
    authorizedDevicesData,
    loadingAuthorizedDevicesData,
  };
};

// Export useFilteredDevices hook
export default useFilteredDevices;
