import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/auth';
import userSlice from './slices/user';
import projectSlice from './slices/project';
import sprintSlice from './slices/sprint';
import ticketSlice from './slices/ticket';

// Create a fallback storage for SSR
const createNoopStorage = () => {
  return {
    getItem(): Promise<string | null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string): Promise<string> {
      return Promise.resolve(value);
    },
    removeItem(): Promise<void> {
      return Promise.resolve();
    },
  };
};

const isClient = typeof window !== 'undefined';
const persistStorage = isClient ? storage : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage: persistStorage,
  whitelist: ['auth', 'user'], // Only persist auth and user data
};

const rootReducer = {
  auth: persistReducer(persistConfig, authSlice),
  user: userSlice,
  project: projectSlice,
  sprint: sprintSlice,
  ticket: ticketSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
