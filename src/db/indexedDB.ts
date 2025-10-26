import { openDB } from 'idb';

const DB_NAME = 'user_widgets_db';
const DB_VERSION = 1;
const STORE_NAME = 'widgets';

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    },
  });
};

export const getWidgetData = async (key: string) => {
  const db = await initDB();
  const data = await db.get(STORE_NAME, key);
  return data?.value ?? null;
};

export const setWidgetData = async (key: string, value: any) => {
  const db = await initDB();
  await db.put(STORE_NAME, { key, value });
};
