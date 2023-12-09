/**
 * File: use-events.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains hook definition for useEvents.
 * This hook is used to manage events fetch by severity filter
 */
import React from 'react';
import { NODE_PATHS, QueryOptions, fetchFromDatabase } from '../services/firebase-utils';
import useAuthentication from './use-authentication';
import { Event, Severity } from '../types/types';
import { decryptData } from '../utils/crypto-utils';

// Number of events per load
const EVENTS_PER_LOAD = 20;

// Empty initialize object for data
const defaultEventsData = {
  INFO: {},
  WARNING: {},
  ERROR: {},
};

// Empty loading object for severity filters
const defaultLoadingEventsData = {
  INFO: true,
  WARNING: true,
  ERROR: true,
};

// Hook definition
const useEvents = (severityFilter: string | null, deviceId: string | null) => {
  // Use settings from useAuthentication hook
  const { settings } = useAuthentication();
  // State variable for selected date
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  // Decrypted device id
  const decryptedDeviceId = decryptData(String(deviceId));

  // State variable for events data and loading
  const [eventsData, setEventsData] = React.useState<{
    [severity: string]: { [key: string]: Event };
  }>(defaultEventsData);
  const [loadingEventsData, setLoadingEventsData] = React.useState<{ [severity: string]: boolean }>(
    defaultLoadingEventsData,
  );

  // Function for fetching events from backend
  const fetchEvents = React.useCallback(
    (severity: Severity, endAtValue: string) => {
      // Return if user settings are not found
      if (!settings) {
        return;
      }

      // Set loading true for selected severity
      setLoadingEventsData((prevLoading) => ({ ...prevLoading, [severity]: true }));

      // Get formatted date via selectedDate
      const formattedDate = `${selectedDate.getFullYear()}/${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${selectedDate.getDate().toString().padStart(2, '0')}`;

      // Firebase realtime database node path for targeted event
      const pathWithFilter = `${NODE_PATHS.EVENTS}/${severity}/${formattedDate}/${settings.ssid}/${decryptedDeviceId}`;

      // Query options for the query
      const queryOptions: QueryOptions = {
        orderByChildValue: 'timestamp',
        endAtValue: endAtValue,
        pageSize: EVENTS_PER_LOAD,
      };

      // Callback for handling data fetch
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

        // Handle post fetch variable resets and data set
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

      // Handle data fetch failure
      const handleError = () => {
        setLoadingEventsData((prevLoading) => ({ ...prevLoading, [severity]: false }));
      };

      // Try catch for event fetch from database
      try {
        fetchFromDatabase(pathWithFilter, onDataFetched, handleError, queryOptions, true);
      } catch (error) {
        handleError();
      }
    },
    [selectedDate, settings, severityFilter, decryptedDeviceId],
  );

  // useEffect for resetting data when selectedDate changes
  React.useEffect(() => {
    setEventsData(defaultEventsData);
    setLoadingEventsData(defaultLoadingEventsData);
  }, [selectedDate]);

  // useEffect for fetching data when severity filter is present
  React.useEffect(() => {
    if (severityFilter) {
      fetchEvents(severityFilter as Severity, '');
    }
  }, [settings, severityFilter, selectedDate, fetchEvents]);

  // Function for handling loading of more events
  const handleLoadMore = (severity: Severity) => {
    // Return if user settings are not found or if current severity data is already being fetched
    if (!settings || loadingEventsData[severity]) {
      return;
    }
    // Set current severity loading to true
    setLoadingEventsData((prevLoading) => ({ ...prevLoading, [severity]: true }));

    // Data for events are fetched in reversed order
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
  // Return the events data and loading state and utility functions for use in the component.
  return {
    eventsData,
    loadingEventsData,
    handleLoadMore,
    selectedDate,
    handleDateNavigation,
  };
};

// Export useEvents hook
export default useEvents;
