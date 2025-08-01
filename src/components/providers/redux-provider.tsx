'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  // Always render the same structure to avoid hydration mismatch
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div>Loading...</div>}
        persistor={persistor}
      // On server-side, skip the rehydration check to avoid mismatch
      // The loading state will be bypassed on server
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
