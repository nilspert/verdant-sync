import React from 'react';
import { NODE_PATHS, QueryOptions, fetchFromDatabase } from '../services/firebase-utils';
import useAuthentication from './use-authentication';
import { Event, Severity } from '../types/types';
import { decryptData } from '../utils/crypto-utils';

const EVENTS_PER_LOAD = 20;

const defaultEventsData = {
  INFO: {},
  WARNING: {},
  ERROR: {},
};

const defaultLoadingEventsData = {
  INFO: true,
  WARNING: true,
  ERROR: true,
};

const useEvents = (severityFilter: string | null, boardId: string | null) => {
  const { settings } = useAuthentication();
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const decryptedBoardId = decryptData(String(boardId));

  const [eventsData, setEventsData] = React.useState<{
    [severity: string]: { [key: string]: Event };
  }>(defaultEventsData);
  const [loadingEventsData, setLoadingEventsData] = React.useState<{ [severity: string]: boolean }>(
    defaultLoadingEventsData,
  );

  const fetchEvents = React.useCallback(
    (severity: Severity, endAtValue: string) => {
      if (!settings) {
        return;
      }

      setLoadingEventsData((prevLoading) => ({ ...prevLoading, [severity]: true }));

      const formattedDate = `${selectedDate.getFullYear()}/${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${selectedDate.getDate().toString().padStart(2, '0')}`;

      const pathWithFilter = `${NODE_PATHS.EVENTS}/${severity}/${formattedDate}/${settings.ssid}/${decryptedBoardId}`;

      const queryOptions: QueryOptions = {
        orderByChildValue: 'timestamp',
        endAtValue: endAtValue,
        pageSize: EVENTS_PER_LOAD,
      };

      const onDataFetched = (data: any) => {
        const handleDataReversion = () => {
          // Reverse the data fetched from the database
          const reversedData = data !== null ? (Object.values(data).reverse() as Event[]) : [];

          // Create a new object that includes the reversed data
          const reversedDataObject: { [key: string]: Event } = {};
          reversedData.forEach((item: Event) => {
            reversedDataObject[item.messageId] = item;
          });

          return reversedDataObject;
        };

        setLoadingEventsData((prevLoading) => ({
          ...prevLoading,
          [severityFilter as Severity]: false,
        }));
        setEventsData((prevData) => ({
          ...prevData,
          [severityFilter as Severity]: {
            ...prevData[severityFilter as Severity],
            ...(data !== null ? handleDataReversion() : {}),
          },
        }));
      };

      const handleError = () => {
        setLoadingEventsData((prevLoading) => ({ ...prevLoading, [severity]: false }));
      };

      try {
        fetchFromDatabase(pathWithFilter, onDataFetched, handleError, queryOptions, true);
      } catch (error) {
        handleError();
      }
    },
    [selectedDate, settings, severityFilter, decryptedBoardId],
  );

  React.useEffect(() => {
    setEventsData(defaultEventsData);
    setLoadingEventsData(defaultLoadingEventsData);
  }, [selectedDate]);

  React.useEffect(() => {
    if (severityFilter) {
      fetchEvents(severityFilter as Severity, '');
    }
  }, [settings, severityFilter, selectedDate, fetchEvents]);

  const handleLoadMore = (severity: Severity) => {
    if (!settings || loadingEventsData[severity]) {
      return;
    }
    setLoadingEventsData((prevLoading) => ({ ...prevLoading, [severity]: true }));

    const firstEvent =
      eventsData[severityFilter as Severity]?.[
        Object.keys(eventsData[severityFilter as Severity]).pop() || ''
      ];
    const endAtValue = firstEvent?.timestamp || '';

    if (severityFilter && Object.values(eventsData[severityFilter as Severity]).length) {
      fetchEvents(severity as Severity, endAtValue);
    } else {
      setLoadingEventsData((prevLoading) => ({ ...prevLoading, [severity]: false }));
    }
  };

  const handleDateNavigation = (daysToAdd: number) => {
    const currentDate = new Date();
    const newDate = new Date(selectedDate);

    // Calculate the new date by adding the specified number of days
    newDate.setDate(newDate.getDate() + daysToAdd);

    if (currentDate < newDate) {
      // The new date is in the future, don't update it
      return;
    }

    setSelectedDate(newDate);
  };

  return {
    eventsData,
    loadingEventsData,
    handleLoadMore,
    selectedDate,
    handleDateNavigation,
  };
};

export default useEvents;
