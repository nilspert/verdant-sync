import React from 'react';
import { NODE_PATHS, QueryOptions, fetchFromDatabase } from '../services/firebase-utils';
import useAuthentication from './use-authentication';
import { Board, Device } from '../types/types';

interface FilteredBoardsProps {
  filteredBoardsData: { [key: string]: Board };
  loadingBoardsData: boolean;
  authorizedDevicesData: { [key: string]: Device };
  loadingAuthorizedDevicesData: boolean;
}

const useFilteredBoards = (): FilteredBoardsProps => {
  const { user, settings } = useAuthentication();
  const [boardsData, setBoardsData] = React.useState<{ [key: string]: Board }>({});
  const [loadingBoardsData, setLoadingBoardsData] = React.useState(true);
  const [authorizedDevicesData, setAuthorizedDevicesData] = React.useState<{
    [key: string]: Device;
  }>({});
  const [loadingAuthorizedDevicesData, setLoadingAuthorizedDevicesData] = React.useState(true);

  const getFilteredBoardsData = () => {
    return Object.keys(boardsData).reduce((result: { [key: string]: Board }, boardKey) => {
      if (
        !authorizedDevicesData[boardKey] ||
        (authorizedDevicesData[boardKey] && authorizedDevicesData[boardKey].authorized)
      ) {
        result[boardKey] = boardsData[boardKey];
      }
      return result;
    }, {});
  };

  const fetchBoardsData = React.useCallback(() => {
    setLoadingBoardsData(true);

    const onDataFetched = (data: any) => {
      if (data == null) {
        setBoardsData({});
      } else {
        setBoardsData(data);
      }
      setLoadingBoardsData(false);
    };

    const onError = () => {
      setLoadingBoardsData(false);
    };

    const queryOptions = {
      orderByChildValue: 'ssid',
      equalToValue: settings?.ssid,
    } as QueryOptions;

    const unsubscribe = fetchFromDatabase(NODE_PATHS.BOARDS, onDataFetched, onError, queryOptions);

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
      fetchBoardsData();
    }
  }, [user, settings, fetchBoardsData]);

  React.useEffect(() => {
    if (user && settings && settings != null) {
      fetchAuthorizedDevicesData();
    }
  }, [user, settings, fetchAuthorizedDevicesData]);

  const filteredBoardsData = getFilteredBoardsData();

  return {
    filteredBoardsData,
    loadingBoardsData,
    authorizedDevicesData,
    loadingAuthorizedDevicesData,
  };
};

export default useFilteredBoards;
