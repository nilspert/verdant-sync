/**
 * File: firebase-utils.tsx
 * Author: Joonas Nislin
 * Date: 27.8.2023
 * Description: This file contains utility functions for firebase CRUD database operations.
 */
import { database } from '../../config/firebase';
import {
  ref,
  off,
  onValue,
  get,
  push,
  update,
  remove,
  query,
  orderByChild,
  startAt,
  endAt,
  limitToFirst,
  limitToLast,
  DatabaseReference,
  DataSnapshot,
  equalTo,
} from 'firebase/database';

// Database query options
export interface QueryOptions {
  orderByChildValue: string;
  equalToValue?: string;
  startAtValue?: string;
  endAtValue?: string;
  pageSize?: number;
}

// Callback type for data snapshots
type ValueCallback = (snapshot: DataSnapshot) => void;

// Function to retrieve a reference to a specific node in the Firebase database
export const getDatabaseReference = (nodePath: string) => ref(database, nodePath);

// Function to build a query reference based on specified query options
function buildQueryRef(dataRef: DatabaseReference, queryOptions: QueryOptions): DatabaseReference {
  const { orderByChildValue, equalToValue, startAtValue, endAtValue, pageSize } = queryOptions;
  const orderByChildQuery = orderByChild(orderByChildValue);

  if (equalToValue !== undefined) {
    return query(dataRef, orderByChildQuery, equalTo(equalToValue)) as DatabaseReference;
  } else if (startAtValue !== undefined && pageSize !== undefined) {
    return query(
      dataRef,
      orderByChildQuery,
      startAt(startAtValue),
      limitToFirst(pageSize),
    ) as DatabaseReference;
  } else if (endAtValue !== undefined && pageSize !== undefined) {
    if (!endAtValue.length) {
      return query(dataRef, orderByChildQuery, limitToLast(pageSize)) as DatabaseReference;
    } else {
      return query(
        dataRef,
        orderByChildQuery,
        endAt(endAtValue),
        limitToLast(pageSize),
      ) as DatabaseReference;
    }
  }
  return dataRef;
}

// Function to fetch data from the Firebase database based on the provided parameters
export const fetchFromDatabase = (
  nodePath: string,
  onDataFetched: (data: any) => void,
  onError?: (error: Error) => void,
  queryOptions?: QueryOptions,
  useGet: boolean = false,
): (() => void) => {
  const dataRef = getDatabaseReference(nodePath);

  const queryRef = queryOptions ? buildQueryRef(dataRef, queryOptions) : dataRef;

  // Callback function for handling data snapshots
  const valueCallback: ValueCallback = (snapshot) => {
    const fetchedData = snapshot.val();
    onDataFetched(fetchedData);
  };

  // Error handler for database fetch errors
  const errorHandler = (error: Error) => {
    console.error('Error fetching data:', error);
    if (onError) {
      onError(error);
    }
  };

  if (useGet) {
    // Use get() method for a single-time data fetch
    get(queryRef)
      .then((snapshot) => {
        valueCallback(snapshot);
      })
      .catch(errorHandler);
  } else {
    // Use onValue() method for real-time data updates
    onValue(queryRef, valueCallback, errorHandler);
  }

  // Return cleanup function to detach listeners when necessary
  return () => {
    if (useGet) {
      // Nothing to clean up if using get
    } else {
      // Detach onValue listener when the component unmounts
      off(queryRef, 'value', valueCallback);
    }
  };
};

// Function to push data to the Firebase database
export const pushToDatabase = (nodePath: string, data: any) => {
  const dataRef = getDatabaseReference(nodePath);
  push(dataRef, data);
};

// Function to update data in the Firebase database
export const updateInDatabase = (nodePath: string, updates: any) => {
  const dataRef = getDatabaseReference(nodePath);
  update(dataRef, updates);
};

// Function to remove data from the Firebase database
export const removeFromDatabase = (nodePath: string) => {
  const dataRef = getDatabaseReference(nodePath);
  remove(dataRef);
};

// Main node paths
export const NODE_PATHS = {
  DEVICES: '/devices',
  AUTHORIZED_DEVICES: '/authorized_devices',
  USERS: '/users',
  EVENTS: '/events',
};
