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

export interface QueryOptions {
  orderByChildValue: string;
  equalToValue?: string;
  startAtValue?: string;
  endAtValue?: string;
  pageSize?: number;
}

type ValueCallback = (snapshot: DataSnapshot) => void;

export const getDatabaseReference = (nodePath: string) => ref(database, nodePath);

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

export const fetchFromDatabase = (
  nodePath: string,
  onDataFetched: (data: any) => void,
  onError?: (error: Error) => void,
  queryOptions?: QueryOptions,
  useGet: boolean = false,
): (() => void) => {
  const dataRef = getDatabaseReference(nodePath);

  const queryRef = queryOptions ? buildQueryRef(dataRef, queryOptions) : dataRef;

  const valueCallback: ValueCallback = (snapshot) => {
    const fetchedData = snapshot.val();
    onDataFetched(fetchedData);
  };

  const errorHandler = (error: Error) => {
    console.error('Error fetching data:', error);
    if (onError) {
      onError(error);
    }
  };

  if (useGet) {
    get(queryRef)
      .then((snapshot) => {
        valueCallback(snapshot);
      })
      .catch(errorHandler);
  } else {
    onValue(queryRef, valueCallback, errorHandler);
  }

  return () => {
    if (useGet) {
      // Nothing to clean up if using get
    } else {
      off(queryRef, 'value', valueCallback);
    }
  };
};

export const pushToDatabase = (nodePath: string, data: any) => {
  const dataRef = getDatabaseReference(nodePath);
  push(dataRef, data);
};

export const updateInDatabase = (nodePath: string, updates: any) => {
  const dataRef = getDatabaseReference(nodePath);
  update(dataRef, updates);
};

export const removeFromDatabase = (nodePath: string) => {
  const dataRef = getDatabaseReference(nodePath);
  remove(dataRef);
};

export const NODE_PATHS = {
  DEVICES: '/devices',
  AUTHORIZED_DEVICES: '/authorized_devices',
  USERS: '/users',
  EVENTS: '/events',
};
