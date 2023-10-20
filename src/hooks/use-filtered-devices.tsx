import React from 'react';
import { NODE_PATHS, QueryOptions, fetchFromDatabase } from '../services/firebase-utils';
import useAuthentication from './use-authentication';
import { Device, AuthorizedDevice } from '../types/types';

interface FilteredDevicesProps {
  filteredDevicesData: { [key: string]: Device };
  loadingDevicesData: boolean;
  authorizedDevicesData: { [key: string]: AuthorizedDevice };
  loadingAuthorizedDevicesData: boolean;
}

const useFilteredDevices = (): FilteredDevicesProps => {
  const { user, settings } = useAuthentication();
  const [devicesData, setDevicesData] = React.useState<{ [key: string]: Device }>({});
  const [loadingDevicesData, setLoadingDevicesData] = React.useState(true);
  const [authorizedDevicesData, setAuthorizedDevicesData] = React.useState<{
    [key: string]: AuthorizedDevice;
  }>({});
  const [loadingAuthorizedDevicesData, setLoadingAuthorizedDevicesData] = React.useState(true);

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

  return {
    filteredDevicesData,
    loadingDevicesData,
    authorizedDevicesData,
    loadingAuthorizedDevicesData,
  };
};

export default useFilteredDevices;
