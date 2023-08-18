import { database } from '../../config/firebase';
import {
  ref,
  off,
  onValue,
  push,
  update,
  remove,
  DatabaseReference,
  DataSnapshot,
} from 'firebase/database';

export const fetchFromDatabase = (nodePath: string, onDataFetched: (data: any) => void) => {
  const dataRef: DatabaseReference = ref(database, nodePath);

  const valueCallback = (snapshot: DataSnapshot) => {
    const fetchedData = snapshot.val();
    onDataFetched(fetchedData);
  };

  onValue(dataRef, valueCallback, (error) => {
    console.error("Error fetching data:", error);
  });

  return () => {
    off(dataRef, 'value', valueCallback);
  };
};

export const pushToDatabase = (nodePath: string, data: any) => {
  const dataRef: DatabaseReference = ref(database, nodePath);
  push(dataRef, data);
};

export const updateInDatabase = (nodePath: string, updates: any) => {
  const dataRef: DatabaseReference = ref(database, nodePath);
  update(dataRef, updates);
};

export const removeFromDatabase = (nodePath: string) => {
  const dataRef: DatabaseReference = ref(database, nodePath);
  remove(dataRef);
};

export const NODE_PATHS = {
  BOARDS: '/boards',
};
